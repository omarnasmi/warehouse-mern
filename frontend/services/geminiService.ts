
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getWarehouseInsights = async (products: any[], garages: any[]) => {
  const prompt = `
    Analyze this warehouse state and provide 3 key insights or recommendations for the manager:
    Products: ${JSON.stringify(products)}
    Garages: ${JSON.stringify(garages)}

    Return the analysis in a helpful, professional tone focusing on inventory health and capacity utilization.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior logistics consultant specializing in warehouse optimization. Provide concise, actionable insights."
      }
    });

    return response.text || "No insights available at the moment.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "The AI assistant is temporarily unavailable. Check your stock levels manually.";
  }
};
