import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Gamepad2, 
  Brain, 
  Zap, 
  Trophy, 
  Star,
  ArrowRight,
  Clock,
  Users
} from "lucide-react";

const games = [
  {
    id: "flashcards",
    title: "Flashcard Challenge",
    description: "Quick-fire flashcards to boost memory retention",
    icon: Zap,
    players: "Solo",
    duration: "5-10 min",
    difficulty: "Easy",
    color: "bg-accent",
    xpReward: 50
  },
  {
    id: "quiz-race",
    title: "Quiz Race",
    description: "Beat the clock in this fast-paced quiz game",
    icon: Clock,
    players: "Solo",
    duration: "10-15 min",
    difficulty: "Medium",
    color: "bg-primary",
    xpReward: 100
  },
  {
    id: "brain-battles",
    title: "Brain Battles",
    description: "Challenge friends or AI in knowledge duels",
    icon: Brain,
    players: "1v1",
    duration: "15-20 min",
    difficulty: "Hard",
    color: "bg-creative",
    xpReward: 200
  },
  {
    id: "word-builder",
    title: "Word Builder",
    description: "Build vocabulary through engaging word puzzles",
    icon: Gamepad2,
    players: "Solo",
    duration: "5-10 min",
    difficulty: "Easy",
    color: "bg-success",
    xpReward: 75
  },
];

const leaderboard = [
  { rank: 1, name: "Alex Chen", xp: 12450, avatar: "A" },
  { rank: 2, name: "Sarah Kim", xp: 11200, avatar: "S" },
  { rank: 3, name: "Mike Johnson", xp: 10800, avatar: "M" },
  { rank: 4, name: "You", xp: 8500, avatar: "Y", isYou: true },
  { rank: 5, name: "Emma Davis", xp: 7900, avatar: "E" },
];

export default function Games() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Learn & Play</h1>
          <p className="text-muted-foreground">Turn studying into an adventure with gamified learning</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Games Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Available Games</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`inline-flex p-3 rounded-xl ${game.color} mb-4`}>
                    <game.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{game.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {game.players}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {game.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{game.xpReward} XP</span>
                    </div>
                    <Button size="sm" className="group-hover:translate-x-1 transition-transform">
                      Play <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-xl font-bold mb-4">Weekly Leaderboard</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 gradient-primary">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Top Learners</span>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 p-4 ${user.isYou ? "bg-primary/5" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.rank === 1 ? "bg-warning text-warning-foreground" :
                      user.rank === 2 ? "bg-muted text-muted-foreground" :
                      user.rank === 3 ? "bg-accent text-accent-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {user.rank}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      user.isYou ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${user.isYou ? "text-primary" : ""}`}>
                        {user.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {user.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
