import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Moon,
  Sun,
  Volume2,
  Shield,
  HelpCircle,
  Download,
  Upload
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">Customize your learning experience</p>
        </header>

        <div className="max-w-2xl space-y-8">
          {/* Profile Settings */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Profile</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Student" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="student@example.com" />
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Sun className="w-5 h-5 text-warning" />
              </div>
              <h2 className="text-xl font-bold">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about your progress</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </section>

          {/* Audio */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success/10 rounded-lg">
                <Volume2 className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-xl font-bold">Audio</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Enable sound effects for interactions</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="text-xl font-bold">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
              <Separator />
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </div>
          </section>

          {/* Data Management */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-creative/10 rounded-lg">
                <Download className="w-5 h-5 text-creative" />
              </div>
              <h2 className="text-xl font-bold">Data Management</h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </div>
          </section>

          {/* Help & Support */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-muted rounded-lg">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold">Help & Support</h2>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Feedback
              </Button>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}