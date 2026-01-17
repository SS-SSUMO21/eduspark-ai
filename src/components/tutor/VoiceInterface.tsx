import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Voice Visualization */}
      <div className="relative mb-8">
        {/* Outer Ring */}
        <div className={cn(
          "w-48 h-48 rounded-full transition-all duration-500",
          isListening 
            ? "bg-primary/20 animate-pulse" 
            : "bg-muted"
        )}>
          {/* Inner Ring */}
          <div className={cn(
            "absolute inset-4 rounded-full transition-all duration-500 flex items-center justify-center",
            isListening 
              ? "gradient-primary shadow-glow" 
              : "bg-card border-2 border-border"
          )}>
            {/* AI Avatar */}
            <div className="text-center">
              <Sparkles className={cn(
                "w-12 h-12 mx-auto mb-2 transition-colors",
                isListening ? "text-primary-foreground" : "text-primary"
              )} />
              <span className={cn(
                "text-sm font-medium",
                isListening ? "text-primary-foreground" : "text-muted-foreground"
              )}>
                {isListening ? "Listening..." : "Press to talk"}
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
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full w-12 h-12"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>

        <Button
          variant={isListening ? "destructive" : "hero"}
          size="xl"
          onClick={() => setIsListening(!isListening)}
          className="rounded-full w-20 h-20"
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </Button>

        <div className="w-12 h-12" /> {/* Spacer for symmetry */}
      </div>

      {/* Status Text */}
      <p className="mt-6 text-muted-foreground text-center max-w-md">
        {isListening 
          ? "I'm listening! Ask me anything about your lessons or upload a document to get started."
          : "Click the microphone to start a voice conversation with your AI tutor."
        }
      </p>
    </div>
  );
}
