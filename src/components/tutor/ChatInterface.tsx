import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const chatInstance = model.startChat();
    setClient(chatInstance);
  }, []);

  const handleSend = async () => {
    if ((!input.trim() && files.length === 0) || loading || !client) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input || `Attached ${files.length} file(s)`,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    const currentInput = input;
    const currentFiles = [...files];
    setInput("");
    setFiles([]);
    setLoading(true);

    try {
      const isFirstMessage = messages.length === 1;
      const textPrompt = isFirstMessage
        ? "You are an AI tutor. Help students learn by explaining concepts clearly and engagingly. Be helpful and patient. " +
          (currentInput || "Please analyze the attached files.")
        : currentInput || "Please analyze the attached files.";

      const parts: any[] = [{ text: textPrompt }];

      if (currentFiles.length > 0) {
        const filePromises = currentFiles.map((file) => {
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

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "",
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "gradient-primary text-primary-foreground",
              )}
            >
              {message.role === "user" ? (
                <User className="w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[70%] p-4 rounded-2xl",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted rounded-tl-sm",
              )}
            >
              {message.role === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 gradient-primary text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="max-w-[70%] p-4 rounded-2xl bg-muted rounded-tl-sm">
              <p className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                AI is thinking...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1"
          />
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*,audio/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            +
          </Button>
          <Button
            onClick={handleSend}
            disabled={loading || (!input.trim() && files.length === 0)}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-sm"
              >
                {file.name}
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
