// src/components/CardioUploader.tsx
"use client";

import { useState, useEffect } from 'react';
import { FileUp, Loader2, XCircle } from 'lucide-react';
import { CardioData, HeartRateZone, HeartRatePoint, IntervalData } from '@/types/data';

interface CardioUploaderProps {
  onAnalyseExtracted: (data: CardioData) => void;
}

const HEART_RATE_ZONES_CONFIG = [
  { name: 'VO2 Max', minBpm: 156, maxBpm: 174, color: '#EF4444' },
  { name: 'Anaérobie', minBpm: 139, maxBpm: 155, color: '#F97316' },
  { name: 'Aérobie', minBpm: 121, maxBpm: 138, color: '#EAB308' },
  { name: 'Intensif', minBpm: 104, maxBpm: 120, color: '#22C55E' },
  { name: 'Léger', minBpm: 87, maxBpm: 103, color: '#3B82F6' },
];

const LOCAL_STORAGE_KEY_AGE = 'userAge';
const LOCAL_STORAGE_KEY_SEX = 'userSexe';

export default function CardioUploader({ onAnalyseExtracted }: CardioUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filesToProcess, setFilesToProcess] = useState<File[]>([]);
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState<'M' | 'F' | ''>('');

  // Charger les données de l'utilisateur depuis le stockage local au démarrage
  useEffect(() => {
    const savedAge = localStorage.getItem(LOCAL_STORAGE_KEY_AGE);
    const savedSexe = localStorage.getItem(LOCAL_STORAGE_KEY_SEX);
    if (savedAge) setAge(savedAge);
    if (savedSexe) setSexe(savedSexe as 'M' | 'F');
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const validFiles = files.filter(file => file.name.endsWith('.tcx'));
    if (validFiles.length === 0) {
      setError('Format de fichier invalide. Veuillez sélectionner des fichiers .tcx.');
      return;
    }
    setFilesToProcess(validFiles);
  };

  const handleAnalyse = () => {
    if (filesToProcess.length === 0 || !age || (sexe !== 'M' && sexe !== 'F')) {
      setError('Veuillez remplir toutes les informations utilisateur.');
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_AGE, age);
    localStorage.setItem(LOCAL_STORAGE_KEY_SEX, sexe);
    setLoading(true);
    setError(null);
    const finalSexe: 'M' | 'F' = sexe;
    let processedCount = 0;
    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const text = e.target?.result as string;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, 'text/xml');
          const laps = Array.from(xmlDoc.getElementsByTagName('Lap'));
          if (laps.length === 0) {
            throw new Error('Le fichier TCX est mal formé ou ne contient pas d\'activité valide.');
          }
          const totalDistanceMeters = laps.reduce((sum, lap) => sum + parseFloat(lap.getElementsByTagName('DistanceMeters')[0]?.textContent || '0'), 0);
          const totalCalories = laps.reduce((sum, lap) => sum + parseFloat(lap.getElementsByTagName('Calories')[0]?.textContent || '0'), 0);
          const totalDurationSeconds = laps.reduce((sum, lap) => sum + parseFloat(lap.getElementsByTagName('TotalTimeSeconds')[0]?.textContent || '0'), 0);
          const maxHeartRateElement = laps[0]?.getElementsByTagName('MaximumHeartRateBpm')[0]?.getElementsByTagName('Value')[0];
          const maxHeartRate = maxHeartRateElement ? parseFloat(maxHeartRateElement.textContent || '0') : 0;
          const trackpoints = Array.from(xmlDoc.getElementsByTagName('Trackpoint'));
          const heartRateTimeline: HeartRatePoint[] = [];
          const activityStartTime = trackpoints[0]?.getElementsByTagName('Time')[0]?.textContent;
          const startTimestamp = activityStartTime ? new Date(activityStartTime).getTime() : Date.now();
          trackpoints.forEach((tp, index) => {
            const timeElement = tp.getElementsByTagName('Time')[0];
            const hrElement = tp.getElementsByTagName('HeartRateBpm')[0]?.getElementsByTagName('Value')[0];
            if (timeElement && hrElement) {
              const timestamp = timeElement.textContent || '';
              const heartRate = parseFloat(hrElement.textContent || '0');
              const currentTime = new Date(timestamp).getTime();
              const elapsedSeconds = Math.round((currentTime - startTimestamp) / 1000);
              if (heartRate > 0) {
                heartRateTimeline.push({
                  timestamp,
                  heartRate,
                  elapsedSeconds
                });
              }
            }
          });
          const heartRates = heartRateTimeline.map(point => point.heartRate);
          const averageHeartRate = heartRates.length > 0 ? heartRates.reduce((sum, hr) => sum + hr, 0) / heartRates.length : 0;
          const detectIntervals = (timeline: HeartRatePoint[]): IntervalData[] => {
            if (timeline.length < 10) return [];
            const intervals: IntervalData[] = [];
            const fcMoyenne = averageHeartRate;
            const seuilEffort = fcMoyenne + 20;
            const seuilRepos = fcMoyenne - 10;
            interface TempInterval {
              type: 'effort' | 'repos';
              start: number;
              heartRates: number[];
            }
            let currentInterval: TempInterval | null = null;
            const finishInterval = (endTime: number) => {
              if (currentInterval && currentInterval.heartRates.length >= 5) {
                const duration = endTime - currentInterval.start;
                if (duration >= 30) {
                  const avgHR = currentInterval.heartRates.reduce((sum: number, hr: number) => sum + hr, 0) / currentInterval.heartRates.length;
                  intervals.push({
                    type: currentInterval.type,
                    startTime: currentInterval.start,
                    endTime: endTime,
                    duration,
                    avgHeartRate: Math.round(avgHR),
                    maxHeartRate: Math.max(...currentInterval.heartRates)
                  });
                }
              }
            };
            timeline.forEach((point, index) => {
              const isEffort = point.heartRate > seuilEffort;
              const isRepos = point.heartRate < seuilRepos;
              const currentType = isEffort ? 'effort' : isRepos ? 'repos' : null;
              if (currentType && (!currentInterval || currentInterval.type !== currentType)) {
                finishInterval(point.elapsedSeconds);
                currentInterval = {
                  type: currentType,
                  start: point.elapsedSeconds,
                  heartRates: [point.heartRate]
                };
              } else if (currentInterval && currentType === currentInterval.type) {
                currentInterval.heartRates.push(point.heartRate);
              }
            });
            if (timeline.length > 0) {
              finishInterval(timeline[timeline.length - 1].elapsedSeconds);
            }
            return intervals;
          };
          const detectedIntervals = detectIntervals(heartRateTimeline);
          const fractionsCount = Math.floor(detectedIntervals.filter(interval => interval.type === 'effort').length);
          const totalTimeSeconds = heartRateTimeline.length > 0 ? heartRateTimeline[heartRateTimeline.length - 1].elapsedSeconds : 0;
          const fileName = file.name;
          let activityDate = new Date().toLocaleDateString();
          const datePatterns = [
            /[A-Za-z]*(\d{4})(\d{2})(\d{2})\d*/,
            /(\d{4})-(\d{2})-(\d{2})/,
            /(\d{4})(\d{2})(\d{2})/,
            /(\d{2})-(\d{2})-(\d{4})/,
            /(\d{2})(\d{2})(\d{4})/,
            /(\d{4})_(\d{2})_(\d{2})/,
            /(\d{2})_(\d{2})_(\d{4})/
          ];
          for (const pattern of datePatterns) {
            const dateMatch = fileName.match(pattern);
            if (dateMatch) {
              let year, month, day;
              if (dateMatch[1].length === 4) {
                year = dateMatch[1];
                month = dateMatch[2];
                day = dateMatch[3];
              } else {
                day = dateMatch[1];
                month = dateMatch[2];
                year = dateMatch[3];
              }
              const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
              if (dateObj.getFullYear() == parseInt(year) && 
                  dateObj.getMonth() == parseInt(month) - 1 && 
                  dateObj.getDate() == parseInt(day)) {
                activityDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
                break;
              }
            }
          }
          const zoneDurations: { [key: string]: number } = {};
          HEART_RATE_ZONES_CONFIG.forEach(zone => zoneDurations[zone.name] = 0);
          if (trackpoints.length > 1) {
            for (let i = 0; i < trackpoints.length - 1; i++) {
              const currentTrackpoint = trackpoints[i];
              const nextTrackpoint = trackpoints[i + 1];
              const currentTime = new Date(currentTrackpoint.getElementsByTagName('Time')[0]?.textContent || '').getTime();
              const nextTime = new Date(nextTrackpoint.getElementsByTagName('Time')[0]?.textContent || '').getTime();
              if (isNaN(currentTime) || isNaN(nextTime)) continue;
              const durationSegmentSeconds = (nextTime - currentTime) / 1000;
              if (durationSegmentSeconds <= 0) continue;
              const hrValue = parseFloat(currentTrackpoint.getElementsByTagName('HeartRateBpm')[0]?.getElementsByTagName('Value')[0]?.textContent || '0');
              if (hrValue > 0) {
                for (const zone of HEART_RATE_ZONES_CONFIG) {
                  if (hrValue >= zone.minBpm && hrValue <= zone.maxBpm) {
                    zoneDurations[zone.name] += durationSegmentSeconds;
                    break;
                  }
                }
              }
            }
          }
          const calculatedHeartRateZones: HeartRateZone[] = HEART_RATE_ZONES_CONFIG.map(zone => {
            const duration = zoneDurations[zone.name] || 0;
            const percentage = totalDurationSeconds > 0 ? (duration / totalDurationSeconds) * 100 : 0;
            return {
              ...zone,
              durationSeconds: Math.round(duration),
              percentage: parseFloat(percentage.toFixed(1)),
            };
          });
          const distanceKm = totalDistanceMeters / 1000;
          const dureeHeures = totalDurationSeconds / 3600; 
          const dureeMinutes = totalDurationSeconds / 60; 
          let vo2MaxEstimate = 0;
          if (distanceKm > 0 && dureeHeures > 0) {
            const vitesseMoyenneKmH = distanceKm / dureeHeures;
            const vmaEstimate = vitesseMoyenneKmH * 1.05; 
            vo2MaxEstimate = vmaEstimate * 3.5;
            if (finalSexe === 'F') {
              vo2MaxEstimate = vo2MaxEstimate * 0.9;
            }
          }
          const newAnalysis: CardioData = {
            id: Math.random().toString(36).substring(7),
            date: activityDate,
            dureeExercice: totalTimeSeconds / 60,
            distance: distanceKm,
            fcMax: maxHeartRate || 0,
            frequenceCardio: Math.round(averageHeartRate),
            calories: totalCalories || 0,
            vitesseMoyenne: distanceKm > 0 && totalTimeSeconds > 0 ? (distanceKm / (totalTimeSeconds / 3600)) : 0,
            vo2Max: Math.round(vo2MaxEstimate),
            notes: '',
            type: 'Course',
            terrain: 'Route',
            intensite: 3,
            heartRateTimeline: heartRateTimeline,
            intervals: detectedIntervals,
            fractionsCount: fractionsCount
          };
          onAnalyseExtracted(newAnalysis);
        } catch (err) {
          setError("Une erreur est survenue lors de l'analyse du fichier. Le fichier peut être corrompu.");
          console.error("Erreur de parsing TCX:", err);
        } finally {
          processedCount++;
          if (processedCount === filesToProcess.length) {
            setLoading(false);
            setFilesToProcess([]);
          }
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg shadow-inner">
      {filesToProcess.length === 0 ? (
        <>
          <label htmlFor="tcx-file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <FileUp className="h-12 w-12 text-blue-500" />
              <p className="mt-4 text-center text-gray-700">
                Cliquez pour sélectionner votre fichier .tcx
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Format : .tcx
              </p>
            </div>
          </label>
          <input
            id="tcx-file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      ) : (
        <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Informations utilisateur</h3>
            <button onClick={() => setFilesToProcess([])}>
              <XCircle className="h-6 w-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Votre âge et votre sexe sont nécessaires pour une estimation plus précise du VO2 Max. Ces données sont sauvegardées localement pour vos prochaines utilisations.
          </p>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Âge</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Ex: 30"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sexe</label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sexe"
                  value="M"
                  checked={sexe === 'M'}
                  onChange={(e) => setSexe(e.target.value as 'M' | 'F')}
                  className="form-radio"
                />
                <span className="ml-2">Homme</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sexe"
                  value="F"
                  checked={sexe === 'F'}
                  onChange={(e) => setSexe(e.target.value as 'M' | 'F')}
                  className="form-radio"
                />
                <span className="ml-2">Femme</span>
              </label>
            </div>
          </div>
          <button
            onClick={handleAnalyse}
            disabled={loading || !age || !sexe}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Analyser'}
          </button>
          {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}