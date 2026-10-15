import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateChatResponse,
  generateCodeAssistant,
  generateAiImage,
  summarizePdfOrText,
  generateWebsiteCode,
  enhanceResumeContent,
} from './server/geminiService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', platform: 'ZAIN TECH AI Engine', timestamp: new Date().toISOString() });
});

// AI Chatbot
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;
    const reply = await generateChatResponse(messages || [], systemPrompt);
    res.json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error processing chat response.' });
  }
});

// AI Code Assistant
app.post('/api/gemini/code', async (req, res) => {
  try {
    const result = await generateCodeAssistant(req.body);
    res.json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error processing code request.' });
  }
});

// AI Image Generation
app.post('/api/gemini/image', async (req, res) => {
  try {
    const { prompt, style, aspectRatio } = req.body;
    const result = await generateAiImage(prompt, style, aspectRatio);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error generating image.' });
  }
});

// PDF & Document Summarizer
app.post('/api/gemini/pdf-summarize', async (req, res) => {
  try {
    const { text, mode, question } = req.body;
    const summary = await summarizePdfOrText(text, mode, question);
    res.json({ summary });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error summarizing document.' });
  }
});

// AI Website Generator
app.post('/api/gemini/website', async (req, res) => {
  try {
    const { prompt, templateType } = req.body;
    const raw = await generateWebsiteCode(prompt, templateType);
    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : { html: raw, css: '', js: '', title: 'Generated Project' };
    }
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error generating website code.' });
  }
});

// AI Resume Enhancer
app.post('/api/gemini/resume', async (req, res) => {
  try {
    const enhanced = await enhanceResumeContent(req.body);
    res.json({ enhanced });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Error enhancing resume content.' });
  }
});

// Serve frontend in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ZAIN TECH full-stack production server listening on port ${PORT}`);
});
