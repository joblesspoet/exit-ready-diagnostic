import { GoogleGenAI } from "@google/genai";
import { AssessmentResult } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateInsights = async (result: AssessmentResult): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI Service unavailable: Missing API Key.";

  const prompt = `
    You are an expert M&A advisor and business exit consultant. 
    A business owner has completed an exit readiness assessment with the following results:
    
    Overall Score: ${Math.round(result.totalScore)}/100
    Maturity Tier: ${result.tier}
    
    Category Breakdown:
    - Financial Readiness: ${Math.round(result.categoryScores['Financial'] || 0)}%
    - Operational Independence: ${Math.round(result.categoryScores['Operational'] || 0)}%
    - Market Position: ${Math.round(result.categoryScores['Market'] || 0)}%
    - Strategic Readiness: ${Math.round(result.categoryScores['Strategic'] || 0)}%
    
    Please provide 3 concise, actionable, and high-impact strategic recommendations to improve their exit value and readiness. 
    Focus on the weakest areas. 
    Format the output as simple HTML with <h3> tags for titles and <p> tags for descriptions. Do not include markdown code blocks, just the raw HTML content.
    Tone: Professional, encouraging, and direct.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "An error occurred while analyzing your results. Please try again later.";
  }
};
