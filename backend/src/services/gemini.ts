import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GOOGLE_AI_API_KEY  must be set");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const aiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
