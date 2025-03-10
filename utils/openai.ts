import OpenAI from "openai";
import type { FormData } from "../types/formDataTypes";
import type { SupplementRecommendation } from "../types/supplementRecommendationTypes";

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

const AVAILABLE_SUPPLEMENTS = [
  "MACA",
  "TRYPTOPHAN USP32",
  "TYROSINE",
  "ALA",
  "Reg Ginseng",
  "L-Theanine",
  "Green Tea extract",
  "NAC",
  "DHM",
  "5HTP 99%",
  "B complex",
  "Melatonin",
  "L-Arginine USP43",
  "Horny Goat Weed Icarins 20%",
  "Creatine monohydrate 99%",
  "Fish Collagen",
  "Tongkat Ali Extract eurycomanone 3%",
  "L-Carnitine 50",
  "VC Liposomes",
  "Ashwagandha (withanolides 10%)",
  "S-Adenosyl-L-methionine Disulfate Tosylate",
  "Salidroside 3%",
  "St john's Wort (hypericin 0.3%)",
  "L-Dopa",
  "Parsley leaf extract",
  "Clove",
  "NMN",
  "NR",
  "NAD+",
  "Psyllium husk",
  "tryptophan",
  "Tyrosine",
  "ALA",
];

export async function getSupplementRecommendations(
  formData: FormData
): Promise<SupplementRecommendation> {
  const prompt = `Based on the following user profile, recommend supplements from this list: ${AVAILABLE_SUPPLEMENTS.join(
    ", "
  )}

User Profile:
- Age: ${formData.age}
- Gender: ${formData.gender}
- Health Goals: ${formData.goals}
- Health Issues: ${formData.healthIssues}
- Sleep Quality: ${formData.sleepQuality}
- Stress Level: ${formData.stressLevel}

Provide recommendations in a valid JSON format with the following structure:
{
  "supplements": [
    {
      "name": "Supplement Name",
      "description": "Brief description",
      "benefits": ["benefit 1", "benefit 2"],
      "dosage": "Recommended dosage"
    }
  ],
  "explanation": "Overall explanation of the recommendations"
}

Consider interactions, contraindications, and the user's specific needs. Only recommend supplements from the provided list.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable supplement advisor. Provide evidence-based recommendations tailored to the user's profile. Always respond with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    console.log("OpenAI response:", response);

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response content from OpenAI");
    }

    try {
      return JSON.parse(content) as SupplementRecommendation;
    } catch (e) {
      console.error("Failed to parse OpenAI response:", e);
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}
