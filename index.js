import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs/promises";   
import { GoogleGenAI } from "@google/genai"; 
const app = express();
const upload = multer();
const genAI = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

const GEMINI_MODEL = "gemini-1.5-flash";


app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Ready on http://localhost:${PORT}`);
});

app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;
  try { 
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error(error);   
    res.status(500).json({ error: "Failed to generate text" });
    }
});




 