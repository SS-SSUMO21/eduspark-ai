import { 
  Mic, 
  Brain, 
  FileText, 
  Gamepad2, 
  Music, 
  Video,
  BookOpen,
  Users,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice-Powered Learning",
    description: "Have natural conversations with your AI tutor. Ask questions, get explanations, and learn through dialogue.",
    color: "primary"
  },
  {
    icon: Brain,
    title: "Adaptive Tutoring",
    description: "AI that understands your learning style and adjusts difficulty in real-time for optimal growth.",
    color: "creative"
  },
  {
    icon: FileText,
    title: "Smart Summarization",
    description: "Upload PDFs, notes, or lectures. Get instant summaries and structured study guides.",
    color: "success"
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Earn points, maintain streaks, unlock achievements. Turn studying into an addictive game.",
    color: "accent"
  },
  {
    icon: Music,
    title: "Creative Formats",
    description: "Transform lessons into songs, podcasts, or stories. Learn through formats that stick.",
    color: "warning"
  },
  {
    icon: Video,
    title: "Visual Explanations",
    description: "Generate educational videos and visual content to understand complex concepts.",
    color: "primary"
  },
  {
    icon: BookOpen,
    title: "Curriculum Aligned",
    description: "Follow your school's curriculum. Every lesson matches official standards and requirements.",
    color: "creative"
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Designed for students, teachers, and administrators. Everyone has the right tools.",
    color: "success"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security. Learn with peace of mind.",
    color: "accent"
  }
];

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  creative: "bg-creative/10 text-creative",
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning"
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete learning ecosystem powered by AI, designed to make education engaging and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
