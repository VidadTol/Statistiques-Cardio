export interface CardioData {
  id: string;
  date: string;
  dureeExercice: number;
  distance: number;
  vitesseMoyenne: number;
  frequenceCardio: number;
  calories: number;
  vo2Max: number;
  notes: string;
}

export interface SommeilData {
  id: string;
  date: string;
  dureeSommeil: number;
  qualiteSommeil: 'faible' | 'moyenne' | 'bonne' | 'excellente';
  notes: string;
}