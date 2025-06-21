'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import type { Report } from '@/components/map';
import ReportForm from '@/components/report-form';

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  // Use the last report's location as the map center, or a default
  const lastLocation = reports.length > 0 ? reports[reports.length - 1].location : null;

  const Map = useMemo(() => dynamic(() => import('@/components/map'), { 
    loading: () => <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /> <p className="ml-2">Loading Map...</p></div>,
    ssr: false 
  }), []);

  const handleReportSubmit = (newReportData: Omit<Report, 'id' | 'timestamp'>) => {
    const newReport: Report = {
      ...newReportData,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
    };
    setReports(prev => [...prev, newReport]);
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

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <ReportForm onReportSubmit={handleReportSubmit} />

          <Card className="h-[400px] lg:h-auto">
            <CardHeader>
              <CardTitle>Reported Waste Map</CardTitle>
              <CardDescription>Locations of recently reported waste.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-7rem)]">
              <Map reports={reports} center={lastLocation ? [lastLocation.lat, lastLocation.lng] : [51.505, -0.09]} />
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WasteWise. Built for a better planet.</p>
      </footer>
    </div>
  );
}
