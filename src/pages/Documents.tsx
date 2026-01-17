import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, Trash2, Sparkles, Clock } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "processing" | "ready" | "error";
}

const mockDocuments: Document[] = [
  { id: "1", name: "Physics Chapter 5.pdf", type: "PDF", uploadedAt: "2 hours ago", status: "ready" },
  { id: "2", name: "History Notes.docx", type: "Word", uploadedAt: "Yesterday", status: "ready" },
  { id: "3", name: "Math Formulas.pdf", type: "PDF", uploadedAt: "3 days ago", status: "ready" },
];

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Documents</h1>
          <p className="text-muted-foreground">Upload notes, PDFs, and lectures for AI summarization</p>
        </header>

        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center mb-8 transition-colors ${
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="inline-flex p-4 bg-muted rounded-full mb-4">
            <FileUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Drop files here or click to upload</h3>
          <p className="text-muted-foreground mb-4">Supports PDF, Word, PowerPoint, and text files</p>
          <Button variant="default">
            <FileUp className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </div>

        {/* Documents List */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Your Documents</h2>
            <span className="text-muted-foreground text-sm">{documents.length} files</span>
          </div>

          <div className="divide-y divide-border">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{doc.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Summarize
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
