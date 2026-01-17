import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { VoiceInterface } from "@/components/tutor/VoiceInterface";
import { ChatInterface } from "@/components/tutor/ChatInterface";
import { SubjectSelector } from "@/components/tutor/SubjectSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MessageSquare } from "lucide-react";

export default function Tutor() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>("Math");

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="ml-64 h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold mb-1">AI Tutor</h1>
          <p className="text-muted-foreground">Learn through natural conversation</p>
        </header>

        {/* Subject Selector */}
        <SubjectSelector selected={selectedSubject} onSelect={setSelectedSubject} />

        {/* Tabs for Voice/Chat */}
        <Tabs defaultValue="voice" className="flex-1 flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="voice" className="gap-2">
                <Mic className="w-4 h-4" />
                Voice Mode
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat Mode
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="voice" className="flex-1 flex items-center justify-center">
            <VoiceInterface />
          </TabsContent>

          <TabsContent value="chat" className="flex-1">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
