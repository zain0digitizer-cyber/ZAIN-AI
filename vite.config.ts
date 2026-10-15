import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import {
  generateChatResponse,
  generateCodeAssistant,
  generateAiImage,
  summarizePdfOrText,
  generateWebsiteCode,
  enhanceResumeContent,
} from './server/geminiService';

function parseRequestBody(req: any): Promise<any> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function aiStudioApiPlugin(): Plugin {
  return {
    name: 'aistudio-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/gemini/')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        try {
          const body = await parseRequestBody(req);

          if (req.url === '/api/gemini/chat') {
            const reply = await generateChatResponse(body.messages || [], body.systemPrompt);
            return res.end(JSON.stringify({ reply }));
          }

          if (req.url === '/api/gemini/code') {
            const result = await generateCodeAssistant(body);
            return res.end(JSON.stringify({ result }));
          }

          if (req.url === '/api/gemini/image') {
            const result = await generateAiImage(body.prompt, body.style, body.aspectRatio);
            return res.end(JSON.stringify(result));
          }

          if (req.url === '/api/gemini/pdf-summarize') {
            const summary = await summarizePdfOrText(body.text, body.mode, body.question);
            return res.end(JSON.stringify({ summary }));
          }

          if (req.url === '/api/gemini/website') {
            const raw = await generateWebsiteCode(body.prompt, body.templateType);
            let parsed = {};
            try {
              parsed = JSON.parse(raw);
            } catch {
              // Extract json if wrapped in markdown
              const match = raw.match(/\{[\s\S]*\}/);
              if (match) parsed = JSON.parse(match[0]);
              else parsed = { html: raw, css: '', js: '', title: 'Generated Project' };
            }
            return res.end(JSON.stringify(parsed));
          }

          if (req.url === '/api/gemini/resume') {
            const enhanced = await enhanceResumeContent(body);
            return res.end(JSON.stringify({ enhanced }));
          }

          res.statusCode = 404;
          return res.end(JSON.stringify({ error: 'Endpoint not found' }));
        } catch (error: any) {
          console.error('API Error:', error);
          res.statusCode = 500;
          return res.end(
            JSON.stringify({
              error: error?.message || 'Internal server error while processing AI request.',
            })
          );
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aiStudioApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
