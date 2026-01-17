import { 
  Calculator, 
  Atom, 
  Globe, 
  BookText, 
  Palette,
  Code,
  Languages,
  Music,
  Dumbbell
} from "lucide-react";

const subjects = [
  { icon: Calculator, name: "Mathematics", color: "bg-primary" },
  { icon: Atom, name: "Science", color: "bg-creative" },
  { icon: Globe, name: "History", color: "bg-accent" },
  { icon: BookText, name: "Literature", color: "bg-success" },
  { icon: Palette, name: "Art", color: "bg-warning" },
  { icon: Code, name: "Computer Science", color: "bg-primary" },
  { icon: Languages, name: "Languages", color: "bg-creative" },
  { icon: Music, name: "Music", color: "bg-accent" },
  { icon: Dumbbell, name: "Physical Ed", color: "bg-success" },
];

export function SubjectsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master Any{" "}
            <span className="text-gradient">Subject</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From math to music, our AI tutor is an expert in every field. Choose your subject and start learning.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {subjects.map((subject, index) => (
            <div
              key={subject.name}
              className="group flex items-center gap-3 px-6 py-4 bg-card rounded-full border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`p-2 rounded-full ${subject.color}`}>
                <subject.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold group-hover:text-primary transition-colors">
                {subject.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
