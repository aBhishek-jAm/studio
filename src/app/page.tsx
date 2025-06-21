'use client';

import { useState } from 'react';
import type { ClassificationResult } from '@/app/actions';
import { classifyWasteAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
import WasteUploader from '@/components/waste-uploader';
import ClassificationResultDisplay from '@/components/classification-result';

export default function Home() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleClassification = async (formData: FormData) => {
    setIsLoading(true);
    const { result, error } = await classifyWasteAction(formData);
    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Classification Error',
        description: error,
      });
    } else if (result) {
      setResult(result);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-6 border-b shadow-sm">
        <div className="container mx-auto flex items-center gap-3">
          <Trash2 className="text-accent h-8 w-8" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            WasteWise
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 p-12">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="text-muted-foreground font-medium text-lg">
                Classifying your waste...
              </p>
            </div>
          ) : result ? (
            <ClassificationResultDisplay
              result={result}
              onReset={handleReset}
            />
          ) : (
            <WasteUploader onClassify={handleClassification} />
          )}
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WasteWise. Built for a better planet.</p>
      </footer>
    </div>
  );
}
