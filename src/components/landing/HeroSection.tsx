import { Button } from "@/components/ui/button";
import { Mic, Sparkles, BookOpen, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-creative/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

      {/* Floating Icons */}
      <div className="absolute top-32 left-[15%] animate-float">
        <div className="p-4 bg-card rounded-2xl shadow-lg border border-border">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-48 right-[20%] animate-float" style={{ animationDelay: "1s" }}>
        <div className="p-4 bg-card rounded-2xl shadow-lg border border-border">
          <Gamepad2 className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-48 left-[20%] animate-float" style={{ animationDelay: "2s" }}>
        <div className="p-4 bg-card rounded-2xl shadow-lg border border-border">
          <Sparkles className="w-8 h-8 text-creative" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">
              AI-Powered Learning Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Learn Anything with{" "}
            <span className="text-gradient">Your AI Tutor</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Voice-powered tutoring, gamified lessons, and personalized learning paths. 
            Transform studying into an adventure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" onClick={() => navigate("/dashboard")} className="group">
              <Mic className="w-5 h-5 mr-2 group-hover:animate-bounce-subtle" />
              Start Learning Free
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/dashboard")}>
              Explore Features
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">50+</div>
              <div className="text-muted-foreground">Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">10K+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
