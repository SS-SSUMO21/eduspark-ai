import {
  Calculator,
  Atom,
  Globe,
  BookText,
  Palette,
  Code,
  Languages,
  Music,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { icon: Calculator, name: "Math", color: "bg-primary" },
  { icon: Atom, name: "Science", color: "bg-creative" },
  { icon: Globe, name: "History", color: "bg-accent" },
  { icon: BookText, name: "English", color: "bg-success" },
  { icon: Languages, name: "Spanish", color: "bg-warning" },
  { icon: Code, name: "Coding", color: "bg-primary" },
  { icon: Music, name: "Music", color: "bg-creative" },
  { icon: Palette, name: "Art", color: "bg-accent" },
];

interface SubjectSelectorProps {
  selected: string | null;
  onSelect: (subject: string) => void;
}

export function SubjectSelector({ selected, onSelect }: SubjectSelectorProps) {
  return (
    <div className="p-4 border-b border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Select Subject</h3>
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            onClick={() => onSelect(subject.name)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200",
              selected === subject.name
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/30 hover:bg-muted"
            )}
          >
            <subject.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{subject.name}</span>
          </button>
        ))}
        <button
          onClick={() => {
            // TODO: Open add subject dialog or navigate to add subject page
            console.log("Add subject clicked");
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Subject</span>
        </button>
      </div>
    </div>
  );
}
