// Options du questionnaire, partagées par l'accueil et l'advisor.
// Les identifiants sont envoyés tels quels à l'API.
export const goals = [
  { id: "energy_focus", label: "Energy & focus", hint: "Steadier days, fewer slumps" },
  { id: "sleep_improvement", label: "Sleep", hint: "Fall asleep, stay asleep" },
  { id: "stress_management", label: "Stress", hint: "Calmer, more resilient" },
  { id: "physical_performance", label: "Physical performance", hint: "Strength, power, recovery" },
  { id: "mental_clarity", label: "Mental clarity", hint: "Focus and memory" },
  { id: "immune_support", label: "Immune support", hint: "Fewer sick days" },
  { id: "anti_aging", label: "Healthy ageing", hint: "Skin, joints, bones" },
  { id: "weight_management", label: "Weight management", hint: "Appetite and metabolism" },
];

export const healthIssues = [
  { id: "anxiety", label: "Anxiety" },
  { id: "depression", label: "Depression" },
  { id: "insomnia", label: "Insomnia" },
  { id: "joint_pain", label: "Joint pain" },
  { id: "digestive_issues", label: "Digestive issues" },
  { id: "high_blood_pressure", label: "High blood pressure" },
  { id: "diabetes", label: "Diabetes" },
  { id: "none", label: "None of these" },
];

export const sleepQualities = [
  { id: "excellent", label: "Excellent" },
  { id: "good", label: "Good" },
  { id: "fair", label: "Fair" },
  { id: "poor", label: "Poor" },
];

export const stressLevels = [
  { id: "low", label: "Low" },
  { id: "moderate", label: "Moderate" },
  { id: "high", label: "High" },
  { id: "severe", label: "Severe" },
];

export const genders = [
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
  { id: "other", label: "Other" },
];
