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
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });
      const chatInstance = model.startChat();
      setClient(chatInstance);
      setReady(true);
      console.log("Gemini client ready");
    } catch (error) {
      console.error("Error initializing Gemini client:", error);
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
      const isFirstMessage = messages.length === 1;
      const textPrompt = isFirstMessage
        ? "You are an AI tutor. Help students learn by explaining concepts clearly and engagingly. Be helpful and patient. " +
          (input || "Please analyze the attached files.")
        : input || "Please analyze the attached files.";

      const parts: any[] = [{ text: textPrompt }];

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

      const result = await client.sendMessage(parts);
      const response = result.response;
      const text = response.text();
      console.log("AI response:", text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
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