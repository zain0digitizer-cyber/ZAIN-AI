import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY || "";

export const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

export async function generateChatResponse(messages: { role: string; content: string }[], systemPrompt?: string) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server. Please ensure the API key is set in AI Studio Secrets.");
  }

  const promptContents = messages.map((m) => `${m.role === "user" ? "User" : "ZAIN AI Assistant"}: ${m.content}`).join("\n\n");
  const fullPrompt = `${promptContents}\n\nZAIN AI Assistant:`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: fullPrompt,
    config: {
      systemInstruction: systemPrompt || "You are ZAIN AI, an intelligent, helpful, and highly skilled AI assistant built by ZAIN TECH. You provide clear, well-structured, modern markdown answers with syntax-highlighted code blocks where appropriate. Tagline: 'Your Intelligence. Your Creativity. Your Future.'",
      temperature: 0.7,
    },
  });

  return response.text || "I'm ready to assist you. What can I help you build or explore next?";
}

export async function generateCodeAssistant(task: {
  action: "generate" | "explain" | "debug" | "refactor" | "convert";
  language: string;
  targetLanguage?: string;
  code?: string;
  prompt: string;
}) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  let instructions = `You are the ZAIN TECH Senior AI Code Architect.`;
  let promptText = "";

  if (task.action === "generate") {
    instructions += ` Write clean, production-grade, modular, well-commented code in ${task.language}. Return the code, followed by an in-depth Explanation section, and a Suggested Improvements section.`;
    promptText = `Task: Generate ${task.language} code for the following request:\n${task.prompt}`;
  } else if (task.action === "explain") {
    instructions += ` Provide a clear, educational, line-by-line and architectural breakdown of the provided ${task.language} code.`;
    promptText = `Analyze and explain this ${task.language} code:\n\`\`\`${task.language}\n${task.code}\n\`\`\`\n\nSpecific questions: ${task.prompt || "Explain how this code works and its complexity."}`;
  } else if (task.action === "debug") {
    instructions += ` Identify bugs, edge cases, performance bottlenecks, and security vulnerabilities in the provided ${task.language} code. Provide fixed code, error explanations, and best practices.`;
    promptText = `Debug this ${task.language} code:\n\`\`\`${task.language}\n${task.code}\n\`\`\`\nIssue or goal: ${task.prompt}`;
  } else if (task.action === "refactor") {
    instructions += ` Refactor and optimize this ${task.language} code for modern design patterns, readability, performance, and best practices.`;
    promptText = `Refactor this ${task.language} code:\n\`\`\`${task.language}\n${task.code}\n\`\`\`\nRequirements: ${task.prompt}`;
  } else if (task.action === "convert") {
    instructions += ` Convert this ${task.language} code into clean, idiomatic ${task.targetLanguage || "Python"}.`;
    promptText = `Convert the following ${task.language} code to ${task.targetLanguage}:\n\`\`\`${task.language}\n${task.code}\n\`\`\``;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: promptText,
    config: {
      systemInstruction: instructions,
      temperature: 0.2,
    },
  });

  return response.text || "";
}

export async function generateAiImage(prompt: string, style: string = "Realistic", aspectRatio: string = "1:1") {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const enhancedPrompt = `${prompt}, style: ${style}, high quality, crisp details, stunning visual composition, 8k resolution`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: (["1:1", "3:4", "4:3", "9:16", "16:9"].includes(aspectRatio) ? aspectRatio : "1:1") as any,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData?.data) {
        return {
          imageUrl: `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`,
          prompt,
          style,
        };
      }
    }
  } catch (err: any) {
    console.warn("Direct image generation model fallback:", err?.message);
  }

  // Graceful fallback: SVG artistic banner generator powered by Gemini
  const svgPrompt = `Create an ultra-modern high-tech vector artwork SVG illustration representing: "${prompt}" in ${style} aesthetic. Deep cyberpunk neon electric blue, cyan, and violet colors. Return ONLY valid standalone <svg ...>...</svg> XML markup with width="800" height="800" viewBox="0 0 800 800".`;
  
  const svgResponse = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: svgPrompt,
  });

  let svgText = svgResponse.text || "";
  const svgMatch = svgText.match(/<svg[\s\S]*?<\/svg>/i);
  if (svgMatch) {
    const base64Svg = Buffer.from(svgMatch[0]).toString("base64");
    return {
      imageUrl: `data:image/svg+xml;base64,${base64Svg}`,
      prompt,
      style,
    };
  }

  throw new Error("Could not generate image. Please try adjusting your prompt.");
}

export async function summarizePdfOrText(text: string, mode: "short" | "detailed" | "keypoints" | "qa" | "notes", question?: string) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  let instructions = "You are ZAIN TECH Document & PDF Intelligence Engine. Analyze the provided document accurately without hallucinating.";
  let prompt = "";

  if (mode === "short") {
    prompt = `Provide an executive, high-impact summary (150-250 words) of the following text:\n\n${text}`;
  } else if (mode === "detailed") {
    prompt = `Provide an in-depth comprehensive analytical summary of the document, including background, main arguments, key findings, and conclusions:\n\n${text}`;
  } else if (mode === "keypoints") {
    prompt = `Extract the top critical bulleted key takeaways, core findings, metrics, and actionable items from this text:\n\n${text}`;
  } else if (mode === "notes") {
    prompt = `Transform this document into structured Cornell-style study notes with glossary terms, key definitions, and 5 self-test review questions:\n\n${text}`;
  } else if (mode === "qa") {
    prompt = `Based strictly on the following text, answer this question: "${question}"\n\nText:\n${text}`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      systemInstruction: instructions,
    },
  });

  return response.text || "Document processed.";
}

export async function generateWebsiteCode(prompt: string, templateType?: string) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const systemInstruction = `You are an elite front-end UI/UX architect and web designer for ZAIN TECH.
When prompted to create a website, output a complete, standalone, gorgeous single-page web application using modern HTML5, Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>), Lucide Icons via CDN or inline SVGs, and interactive JavaScript.
Requirements:
1. Return ONLY valid JSON with the format:
{
  "title": "Site Title",
  "html": "<!DOCTYPE html>... complete html document ...",
  "css": "/* custom CSS if needed */",
  "js": "// custom JS if needed"
}
2. The HTML must be modern, responsive, stunning, feature rich (hero, navigation, features, testimonials, interactive elements, forms, modal/tabs, footer).
3. Do not include markdown code block backticks around the JSON string if possible, or format as clean JSON.`;

  const userPrompt = `Create a complete, responsive modern website based on this specification:
"${prompt}"
${templateType ? `Category style: ${templateType}` : ""}
Make it look ultra-sleek, premium, and fully styled with Tailwind CSS.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: userPrompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
    },
  });

  return response.text || "{}";
}

export async function enhanceResumeContent(data: {
  role?: string;
  section: "summary" | "experience" | "skills" | "achievements";
  content: string;
}) {
  if (!ai) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const prompt = `You are a Fortune 500 Executive Career Coach & ATS Specialist for ZAIN TECH Resume Builder.
Enhance and elevate the following ${data.section} for a professional in ${data.role || "Technology"}.
Rules:
- High impact, active voice, action verbs (e.g., Spearheaded, Architected, Accelerated)
- Quantify accomplishments where possible
- ATS keyword optimized
- Do not invent fake degrees or false companies, but polish the tone to sound world-class
Content to enhance:
"""
${data.content}
"""`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return response.text || "";
}
