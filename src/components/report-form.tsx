'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, MapPin, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Report } from '@/components/map';

interface ReportFormProps {
  onReportSubmit: (report: Omit<Report, 'id' | 'timestamp'>) => void;
}

export default function ReportForm({ onReportSubmit }: ReportFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
        toast({ title: 'Success', description: 'Location acquired.' });
      },
      (error) => {
        setIsLocating(false);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not get location. Please enable location services.' });
        console.error('Geolocation error:', error);
      }
    );
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setLocation(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !location || !previewUrl) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please provide an image and location.' });
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      onReportSubmit({
        imagePreview: previewUrl,
        location: location,
      });
      setIsSubmitting(false);
      toast({ title: 'Success', description: 'Report submitted successfully!' });
      resetForm();
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Report</CardTitle>
        <CardDescription>Upload a picture of the waste and add your location.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={cn(
              'relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 cursor-pointer',
              isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            )}
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            {previewUrl ? (
              <div className="relative w-full h-40">
                <img src={previewUrl} alt="Image preview" className="rounded-md object-contain w-full h-full" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="h-10 w-10" />
                <p className="font-semibold">Drag & drop an image</p>
                <p className="text-sm">or click to browse</p>
              </div>
            )}
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={handleGetLocation} disabled={isLocating || !!location}>
            {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
            {location ? `Location Acquired (${location.lat.toFixed(2)}, ${location.lng.toFixed(2)})` : 'Get My Current Location'}
          </Button>
          
          <div className="flex justify-around text-sm">
              <div className="flex items-center gap-2">
                  {file ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                  <span>Image Added</span>
              </div>
              <div className="flex items-center gap-2">
                  {location ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                  <span>Location Added</span>
              </div>
          </div>

          <Button type="submit" className="w-full" disabled={!file || !location || isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
