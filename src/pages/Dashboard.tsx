import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SubjectProgress } from "@/components/dashboard/SubjectProgress";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, Student! 👋</h1>
            <p className="text-muted-foreground">Ready to continue your learning journey?</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search lessons, subjects..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Stats */}
        <section className="mb-8">
          <StatsCards />
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <QuickActions />
        </section>

        {/* Activity & Progress */}
        <div className="grid lg:grid-cols-2 gap-8">
          <RecentActivity />
          <SubjectProgress />
        </div>
      </main>
    </div>
  );
}
