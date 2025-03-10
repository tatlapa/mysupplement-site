export interface SupplementRecommendation {
    supplements: Array<{
      name: string;
      description: string;
      benefits: string[];
      dosage: string;
    }>;
    explanation: string;
  }