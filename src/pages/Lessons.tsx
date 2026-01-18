import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  ArrowRight
} from "lucide-react";

const lessons = [
  {
    id: "math-algebra",
    subject: "Mathematics",
    title: "Introduction to Algebra",
    description: "Learn the fundamentals of algebraic expressions and equations",
    duration: "15 min",
    completed: true,
    rating: 4.5,
    difficulty: "Beginner"
  },
  {
    id: "physics-mechanics",
    subject: "Physics",
    title: "Newton's Laws of Motion",
    description: "Understanding the principles of classical mechanics",
    duration: "20 min",
    completed: false,
    rating: 4.8,
    difficulty: "Intermediate"
  },
  {
    id: "chemistry-periodic",
    subject: "Chemistry",
    title: "The Periodic Table",
    description: "Explore elements and their properties",
    duration: "12 min",
    completed: true,
    rating: 4.7,
    difficulty: "Beginner"
  },
  {
    id: "biology-cells",
    subject: "Biology",
    title: "Cell Structure and Function",
    description: "Discover the building blocks of life",
    duration: "18 min",
    completed: false,
    rating: 4.6,
    difficulty: "Intermediate"
  },
];

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology"];

export default function Lessons() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Lessons</h1>
          <p className="text-muted-foreground">Continue your learning journey with structured lessons</p>
        </header>

        {/* Subject Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={subject === "All" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {subject}
            </Button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{lesson.subject}</p>
                    <p className="text-sm font-medium text-muted-foreground">{lesson.difficulty}</p>
                  </div>
                </div>
                {lesson.completed && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {lesson.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{lesson.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {lesson.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-warning" />
                  {lesson.rating}
                </div>
              </div>

              <Button className="w-full group-hover:translate-y-0 transition-transform">
                {lesson.completed ? "Review" : "Start"} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Continue Learning Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Continue Where You Left Off</h2>
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">Newton's Laws of Motion</h3>
                <p className="text-muted-foreground text-sm">Physics • 65% Complete</p>
              </div>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
            <div className="mt-4 bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}