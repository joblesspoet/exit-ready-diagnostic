export enum MaturityTier {
  BEGINNER = 'Beginner',
  DEVELOPING = 'Developing',
  PROFICIENT = 'Proficient',
  ADVANCED = 'Advanced'
}

export interface Question {
  id: string;
  category: 'Financial' | 'Operational' | 'Market' | 'Strategic';
  text: string;
  weight: number; // 1-3
  options: {
    value: number; // 0-10 score contribution
    label: string;
  }[];
}

export interface UserState {
  callsign: string | null;
  isAuthenticated: boolean;
}

export interface AssessmentState {
  answers: Record<string, number>; // questionId -> value
  currentQuestionIndex: number;
  isComplete: boolean;
  completedAt: string | null;
}

export interface AssessmentResult {
  totalScore: number;
  categoryScores: Record<string, number>; // category -> percentage
  tier: MaturityTier;
  timestamp: string;
  aiInsights?: string;
}
