import { Flame, Zap, Trophy, Clock } from "lucide-react";

const stats = [
  {
    label: "Day Streak",
    value: "12",
    icon: Flame,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    label: "XP Points",
    value: "2,450",
    icon: Zap,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    label: "Achievements",
    value: "15",
    icon: Trophy,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    label: "Study Time",
    value: "24h",
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-6 bg-card rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className="text-muted-foreground text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
