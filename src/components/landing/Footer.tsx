import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 gradient-primary rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">StudyBuddy</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            © 2024 StudyBuddy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
