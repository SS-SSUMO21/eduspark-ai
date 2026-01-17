import { BookOpen, CheckCircle, Trophy, Clock } from "lucide-react";

const activities = [
  {
    icon: BookOpen,
    title: "Completed Algebra Lesson",
    subject: "Mathematics",
    time: "2 hours ago",
    color: "text-primary"
  },
  {
    icon: CheckCircle,
    title: "Passed Chemistry Quiz",
    subject: "Science",
    time: "5 hours ago",
    color: "text-success"
  },
  {
    icon: Trophy,
    title: "Earned 'Quick Learner' Badge",
    subject: "Achievement",
    time: "Yesterday",
    color: "text-warning"
  },
  {
    icon: BookOpen,
    title: "Started French Vocabulary",
    subject: "Languages",
    time: "Yesterday",
    color: "text-creative"
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{activity.title}</h4>
              <p className="text-muted-foreground text-sm">{activity.subject}</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
