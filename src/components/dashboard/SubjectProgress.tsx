import { Progress } from "@/components/ui/progress";
import { Calculator, Atom, Globe, BookText } from "lucide-react";

const subjects = [
  {
    icon: Calculator,
    name: "Mathematics",
    progress: 75,
    lessons: "15/20",
    color: "bg-primary"
  },
  {
    icon: Atom,
    name: "Science",
    progress: 60,
    lessons: "12/20",
    color: "bg-creative"
  },
  {
    icon: Globe,
    name: "History",
    progress: 45,
    lessons: "9/20",
    color: "bg-accent"
  },
  {
    icon: BookText,
    name: "Literature",
    progress: 30,
    lessons: "6/20",
    color: "bg-success"
  },
];

export function SubjectProgress() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Subject Progress</h3>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${subject.color}`}>
                  <subject.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-medium">{subject.name}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                {subject.lessons} lessons
              </span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
