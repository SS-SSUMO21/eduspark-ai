import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTutorChat, Message } from "@/hooks/useTutorChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
    .replace(/\*(.*?)\*/g, "$1") // Italic
    .replace(/`(.*?)`/g, "$1") // Code
    .replace(/\[.*?\]\(.*?\)/g, "") // Links
    .replace(/#{1,6}\s*/g, "") // Headers
    .replace(/^\s*[-*+]\s+/gm, "") // Lists
    .replace(/\n+/g, " ") // Multiple newlines
    .trim();
}

async function textToSpeech(text: string, apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status}`);
        }
        return response.blob();
      })
      .then((audioBlob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error("Audio playback failed"));
        audio.play().catch(reject);
      })
      .catch((error) => {
        console.error("TTS error:", error);
        reject(error);
      });
  });
}

export function VoiceInterface() {
  const { messages, loading, sendMessage, ready } = useTutorChat();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript("");
        setFinalTranscript("");
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript("");
        // Keep finalTranscript for display until next start
      };

      recognition.onresult = (event) => {
        let final = "";
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }
        if (final) {
          console.log("Final transcript:", final.trim());
          setFinalTranscript(final);
          sendMessage(final.trim());
          setIsListening(false);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interim);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimTranscript("");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    // Play TTS for the latest AI message
    const latestMessage = messages[messages.length - 1];
    if (
      latestMessage &&
      latestMessage.role === "assistant" &&
      !loading &&
      !isMuted
    ) {
      setIsGeneratingVoice(true);
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      const cleanText = stripMarkdown(latestMessage.content);
      textToSpeech(cleanText, apiKey)
        .then(() => {
          setIsGeneratingVoice(false);
          setIsSpeaking(false);
        })
        .catch((error) => {
          console.error("TTS failed:", error);
          setIsGeneratingVoice(false);
          setIsSpeaking(false);
          // Show user they need to interact
          alert(
            "Audio playback blocked. Please click the microphone button again to enable voice responses.",
          );
        });
    }
  }, [messages, loading, isMuted]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Voice Visualization */}
      <div className="relative mb-8">
        {/* Outer Ring */}
        <div
          className={cn(
            "w-48 h-48 rounded-full transition-all duration-500",
            isListening ? "bg-primary/20 animate-pulse" : "bg-muted",
          )}
        >
          {/* Inner Ring */}
          <div
            className={cn(
              "absolute inset-4 rounded-full transition-all duration-500 flex items-center justify-center",
              isListening
                ? "gradient-primary shadow-glow"
                : "bg-card border-2 border-border",
            )}
          >
            {/* AI Avatar */}
            <div className="text-center">
              <Sparkles
                className={cn(
                  "w-12 h-12 mx-auto mb-2 transition-colors",
                  isListening ? "text-primary-foreground" : "text-primary",
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isListening
                    ? "text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {!ready
                  ? "Initializing..."
                  : loading
                    ? "Thinking..."
                    : isListening
                      ? "Listening..."
                      : "Press mic button to talk"}
              </span>
            </div>
          </div>
        </div>

        {/* Voice Waves Animation */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-voice-wave"
                  style={{
                    height: `${20 + Math.random() * 20}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border-2 border-primary/20 animate-pulse"></div>
          <div className="absolute w-64 h-64 rounded-full border border-primary/10 animate-ping"></div>
          <div
            className="absolute w-72 h-72 rounded-full border border-primary/5 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Live Captioning */}
      <div className="w-full max-w-4xl mb-6">
        {/* Current Speech Caption */}
        {(interimTranscript ||
          finalTranscript ||
          (isSpeaking && messages.length > 1)) && (
          <div className="bg-black/80 text-white p-4 rounded-lg mb-4 text-center">
            <div className="text-sm text-gray-300 mb-1">
              {isListening
                ? "You"
                : isGeneratingVoice
                  ? "AI"
                  : isSpeaking
                    ? "AI"
                    : "Transcript"}
            </div>
            <p className="text-xl font-medium">
              {isGeneratingVoice
                ? "Generating voice..."
                : isSpeaking && messages.length > 1
                  ? stripMarkdown(messages[messages.length - 1].content)
                  : finalTranscript || interimTranscript}
              {interimTranscript && !finalTranscript && (
                <span className="animate-pulse">...</span>
              )}
            </p>
          </div>
        )}

        {/* Conversation History */}
        <div className="bg-black/60 text-white rounded-lg p-4 max-h-80 overflow-y-auto scrollbar-hide">
          <h3 className="text-sm text-gray-300 mb-3 font-medium">
            Conversation History
          </h3>
          <div className="space-y-2">
            {messages.slice(1).map((message, index) => (
              <div key={message.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white",
                  )}
                >
                  {message.role === "user" ? "U" : "AI"}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-300 mb-1">
                    {message.role === "user" ? "You" : "AI Tutor"} •{" "}
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  <p className="text-white leading-relaxed">
                    {message.role === "assistant"
                      ? stripMarkdown(message.content)
                      : message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full w-12 h-12"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </Button>
        <Button
          variant={isListening ? "destructive" : "hero"}
          size="xl"
          onClick={toggleListening}
          disabled={loading || !ready}
          className="rounded-full w-20 h-20"
        >
          {isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
        <div className="w-12 h-12" /> {/* Spacer for symmetry */}
      </div>

      {/* Status Text */}
      <p className="mt-6 text-muted-foreground text-center max-w-md">
        {loading
          ? "AI is thinking..."
          : isListening
            ? "I'm listening! Ask me anything about your lessons."
            : "Click the microphone to start a voice conversation with your AI tutor."}
      </p>
    </div>
  );
}
