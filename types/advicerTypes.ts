export interface AdvicerForm {
  age: number;
  gender: string;
  goals: string[];
  healthIssues: string[];
  sleepQuality: string;
  stressLevel: string;
}

export interface SupplementRecommendation {
  supplements: Array<{
    name: string;
    description: string;
    benefits: string[];
    dosage: string;
  }>;
  explanation: string;
}
