import { Mic, FileUp, Brain, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: Mic,
    label: "Start Voice Lesson",
    description: "Learn through conversation",
    path: "/dashboard/tutor",
    gradient: "gradient-primary"
  },
  {
    icon: FileUp,
    label: "Upload Document",
    description: "Summarize notes or PDFs",
    path: "/dashboard/documents",
    gradient: "gradient-warm"
  },
  {
    icon: Brain,
    label: "Practice Quiz",
    description: "Test your knowledge",
    path: "/dashboard/games",
    gradient: "gradient-success"
  },
  {
    icon: Gamepad2,
    label: "Play & Learn",
    description: "Gamified flashcards",
    path: "/dashboard/games",
    gradient: "bg-creative"
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-1"
        >
          <div className={`inline-flex p-3 rounded-xl ${action.gradient} mb-4`}>
            <action.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
            {action.label}
          </h3>
          <p className="text-muted-foreground text-sm">{action.description}</p>
        </button>
      ))}
    </div>
  );
}
