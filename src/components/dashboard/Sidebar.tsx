import { 
  Sparkles, 
  LayoutDashboard, 
  Mic, 
  BookOpen, 
  FileText,
  Gamepad2,
  Trophy,
  Settings,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Mic, label: "AI Tutor", path: "/dashboard/tutor" },
  { icon: BookOpen, label: "Lessons", path: "/dashboard/lessons" },
  { icon: FileText, label: "Documents", path: "/dashboard/documents" },
  { icon: Gamepad2, label: "Games", path: "/dashboard/games" },
  { icon: Trophy, label: "Achievements", path: "/dashboard/achievements" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="p-2 gradient-primary rounded-lg shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="text-xl font-bold">StudyBuddy</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">Log Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 p-1.5 bg-card border border-border rounded-full shadow-md hover:bg-muted transition-colors"
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform",
            collapsed && "rotate-180"
          )} />
        </button>
      </div>
    </aside>
  );
}
