'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import ReportForm from '@/components/report-form';
import { useToast } from '@/hooks/use-toast';

export default function ReportPage() {
  const { toast } = useToast();

  const handleReportSubmit = () => {
    // In a real app, you would send the report to a server.
    // For this prototype, we'll just show a success message.
    toast({
      title: 'Report Submitted!',
      description: 'Thank you for helping keep our community clean.',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-6 border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="text-accent h-8 w-8" />
            <h1 className="text-3xl font-headline font-bold text-foreground">
              WasteWise - Report
            </h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <ReportForm onReportSubmit={handleReportSubmit} />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WasteWise. Built for a better planet.</p>
      </footer>
    </div>
  );
}
