import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Star,
  Target,
  Flame,
  BookOpen,
  Brain,
  Award,
  Medal
} from "lucide-react";

const achievements = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: BookOpen,
    earned: true,
    earnedDate: "2024-01-15",
    xpReward: 50,
    rarity: "Common"
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: Flame,
    earned: true,
    earnedDate: "2024-01-20",
    xpReward: 200,
    rarity: "Uncommon"
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Score 100% on 5 quizzes",
    icon: Brain,
    earned: false,
    xpReward: 500,
    rarity: "Rare"
  },
  {
    id: "subject-expert",
    title: "Subject Expert",
    description: "Complete all lessons in one subject",
    icon: Award,
    earned: false,
    xpReward: 1000,
    rarity: "Epic"
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Complete a lesson in under 5 minutes",
    icon: Target,
    earned: true,
    earnedDate: "2024-01-18",
    xpReward: 150,
    rarity: "Uncommon"
  },
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Complete all daily goals for a week",
    icon: Star,
    earned: false,
    xpReward: 750,
    rarity: "Rare"
  }
];

const stats = {
  totalXP: 2450,
  lessonsCompleted: 12,
  streakCurrent: 5,
  streakBest: 14,
  quizzesPassed: 8,
  accuracy: 87
};

export default function Achievements() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Achievements</h1>
          <p className="text-muted-foreground">Track your progress and unlock rewards</p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalXP.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold text-success">{stats.lessonsCompleted}</div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold text-warning">{stats.streakCurrent}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold text-accent">{stats.streakBest}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold text-creative">{stats.quizzesPassed}</div>
            <div className="text-xs text-muted-foreground">Quizzes</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative bg-card rounded-2xl border p-6 transition-all duration-300 ${
                achievement.earned
                  ? "border-primary/30 bg-primary/5"
                  : "border-border opacity-60"
              }`}
            >
              {achievement.earned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-success-foreground" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  achievement.earned ? "bg-primary/20" : "bg-muted"
                }`}>
                  <achievement.icon className={`w-6 h-6 ${
                    achievement.earned ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${
                      achievement.earned ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {achievement.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        achievement.rarity === "Common" ? "bg-muted" :
                        achievement.rarity === "Uncommon" ? "bg-warning/20 text-warning" :
                        achievement.rarity === "Rare" ? "bg-accent/20 text-accent" :
                        "bg-creative/20 text-creative"
                      }`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>

                  <p className={`text-sm mb-3 ${
                    achievement.earned ? "text-muted-foreground" : "text-muted-foreground/70"
                  }`}>
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-warning">
                      +{achievement.xpReward} XP
                    </div>
                    {achievement.earned && (
                      <div className="text-xs text-muted-foreground">
                        Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Achievement */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Next Achievement</h2>
          <div className="bg-gradient-to-r from-primary/10 to-creative/10 rounded-2xl border border-primary/20 p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/20 rounded-xl">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">Quiz Master</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Score 100% on 5 quizzes • 3/5 completed
                </p>
                <div className="bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">500</div>
                <div className="text-xs text-muted-foreground">XP Reward</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}