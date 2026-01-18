import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi! 👋 I'm your AI tutor. I'm here to help you learn anything! What subject would you like to explore today?",
    timestamp: new Date(),
  },
];

export function useTutorChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY environment variable is not set");
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });
      const chatInstance = model.startChat();
      setClient(chatInstance);
      setReady(true);
      console.log("✓ Gemini AI client initialized successfully with gemini-2.5-flash");
    } catch (error) {
      console.error("✗ Error initializing Gemini AI client:", error);
      setReady(false);
    }
  }, []);

  const sendMessage = async (input: string, files: File[] = []) => {
    console.log("sendMessage called with:", input);
    if ((!input.trim() && files.length === 0) || loading || !client) {
      console.log("sendMessage skipped:", { input: input.trim(), filesLength: files.length, loading, client: !!client });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input || `Attached ${files.length} file(s)`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Send user input with system instruction to Gemini AI
      const systemInstruction = "You are an AI tutor. Help students learn by explaining concepts clearly and engagingly. Be helpful, patient, and encouraging.";
      const parts: any[] = [{ text: `${systemInstruction}\n\nStudent: ${input}` }];

      if (files.length > 0) {
        const filePromises = files.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const data = result.split(",")[1];
              resolve({ inlineData: { mimeType: file.type, data } });
            };
            reader.readAsDataURL(file);
          });
        });
        const fileParts = await Promise.all(filePromises);
        parts.push(...fileParts);
      }

      console.log("Sending request to Gemini AI:", { parts, clientReady: !!client });
      const result = await client.sendMessage(parts);
      console.log("Raw response object:", result);
      
      const response = result.response;
      console.log("Response object:", response);
      
      const text = response?.text?.();
      console.log("Extracted text:", text, "Type:", typeof text, "Length:", text?.length);

      if (!text || text.trim() === "") {
        console.warn("AI response is empty or undefined");
        throw new Error("AI returned an empty response");
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };
      console.log("Adding AI message to state:", aiMessage);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    ready,
  };
}