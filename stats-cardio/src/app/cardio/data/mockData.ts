// Mock data pour le dashboard d'essai - Auto-contenu
export interface MockCardioData {
  id: string;
  date: string;
  dureeExercice: number;
  distance: number;
  vitesseMoyenne: number;
  frequenceCardio: number;
  fcMax: number;
  calories: number;
  vo2Max: number;
  type: string;
  terrain: string;
  intensite: number;
  notes: string;
  intervals?: MockInterval[];
  heartRateTimeline?: MockHeartRatePoint[];
}

export interface MockInterval {
  type: 'effort' | 'repos';
  startTime: number;
  endTime: number;
  duration: number;
  avgHeartRate: number;
  maxHeartRate: number;
}

export interface MockHeartRatePoint {
  timestamp: string;
  heartRate: number;
  elapsedSeconds: number;
}

// Données d'exemple basées sur votre dernière séance
export const mockSessionData: MockCardioData = {
  id: "demo-session-001",
  date: "11/09/2025",
  dureeExercice: 82, // 1h22min
  distance: 3.423,
  vitesseMoyenne: 2.5,
  frequenceCardio: 155,
  fcMax: 177,
  calories: 1027,
  vo2Max: 35,
  type: "Course",
  terrain: "Route",
  intensite: 4,
  notes: "Excellente séance de fractionné, rythme soutenu",
  intervals: [
    { type: 'effort', startTime: 300, endTime: 652, duration: 352, avgHeartRate: 176, maxHeartRate: 182 },
    { type: 'repos', startTime: 652, endTime: 892, duration: 240, avgHeartRate: 145, maxHeartRate: 155 },
    { type: 'effort', startTime: 892, endTime: 1244, duration: 352, avgHeartRate: 178, maxHeartRate: 184 },
    { type: 'repos', startTime: 1244, endTime: 1484, duration: 240, avgHeartRate: 142, maxHeartRate: 150 },
    { type: 'effort', startTime: 1484, endTime: 1836, duration: 352, avgHeartRate: 175, maxHeartRate: 181 },
    { type: 'repos', startTime: 1836, endTime: 2076, duration: 240, avgHeartRate: 148, maxHeartRate: 158 },
    { type: 'effort', startTime: 2076, endTime: 2428, duration: 352, avgHeartRate: 177, maxHeartRate: 183 },
    { type: 'repos', startTime: 2428, endTime: 2668, duration: 240, avgHeartRate: 144, maxHeartRate: 152 }
  ],
  heartRateTimeline: generateMockHeartRateData()
};

function generateMockHeartRateData(): MockHeartRatePoint[] {
  const timeline: MockHeartRatePoint[] = [];
  const startTime = new Date('2025-09-11T10:00:00Z');
  
  for (let i = 0; i < 4920; i += 30) { // Toutes les 30 secondes pendant 82 minutes
    const currentTime = new Date(startTime.getTime() + (i * 1000));
    let heartRate = 140; // Base
    
    // Simulation des intervalles de fractionné
    const intervalIndex = Math.floor(i / 600); // Change tous les 10 minutes environ
    if (intervalIndex % 2 === 0) {
      heartRate = 165 + Math.random() * 20; // Phase d'effort
    } else {
      heartRate = 135 + Math.random() * 20; // Phase de repos
    }
    
    timeline.push({
      timestamp: currentTime.toISOString(),
      heartRate: Math.round(heartRate),
      elapsedSeconds: i
    });
  }
  
  return timeline;
}

// Données de comparaison pour les progressions
export const previousSessionData: MockCardioData = {
  id: "demo-session-previous",
  date: "04/09/2025",
  dureeExercice: 85,
  distance: 3.05,
  vitesseMoyenne: 2.15,
  frequenceCardio: 160,
  fcMax: 175,
  calories: 892,
  vo2Max: 33,
  type: "Course",
  terrain: "Route",
  intensite: 3,
  notes: "Séance de base tranquille",
  intervals: []
};
