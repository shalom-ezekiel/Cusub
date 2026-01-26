
import { GoogleGenAI } from "@google/genai";
import { Subscription } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialHygieneAdvice = async (subscriptions: Subscription[]) => {
  if (subscriptions.length === 0) return "Phase 3 Modules Ready: Initialize your institutional asset tracking to receive a high-fidelity strategic audit.";

  const subSummary = subscriptions.map(s => `${s.name} (${s.cost} ${s.currency}, shared among ${s.shared_count}, cat: ${s.category}, usage: ${s.usage_score || 'N/A'}%)`).join(', ');
  
  const prompt = `
    Role: Senior Asset Portfolio Auditor (Phase 3 Institutional Intelligence).
    Context: Analyze this subscription portfolio for a high-end management app 'Cusub': ${subSummary}.
    Objective: Provide 3 professional, direct, and elite pieces of advice focusing on Phase 3 B2B and Enterprise capabilities:
    1. Team Asset Rotation: Identify high-cost assets with low usage scores (< 20%) and recommend "Strategic Rotation" (pausing or downsizing license count).
    2. License Efficiency: Suggest if seat counts are mismatched with actual utilization patterns.
    3. Bundle Detection: Specifically look for enterprise software overlap (e.g., Slack vs Teams vs Zoom) and suggest consolidated bundles.
    4. Burn Velocity Control: Propose a "Phase 3 Exit Plan" for assets renewal in the next 7 days that add minimal value.
    
    Tone: Sophisticated, quantitative, and elite. Focus on B2B efficiency and data sovereignty.
    Return as a simple bulleted list of 3 high-value insights.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 0.9,
      }
    });
    return response.text || "Strategic audit modules are recalibrating.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Audit engines offline. Focus on Phase 3 sector rotation and license hygiene.";
  }
};
