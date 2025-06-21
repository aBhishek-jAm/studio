'use client';

import { useState } from 'react';
import type { ClassificationResult } from '@/app/actions';
import { getAlternativeHandlingAction } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { HelpCircle, Leaf, Loader2, Recycle, WandSparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  result: ClassificationResult;
  onReset: () => void;
}

const categoryStyles = {
  Biodegradable: {
    icon: Leaf,
    className: 'border-green-200 bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
    iconColor: 'text-green-500 dark:text-green-400',
  },
  Recyclable: {
    icon: Recycle,
    className: 'border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  Other: {
    icon: HelpCircle,
    className: 'border-gray-200 bg-gray-50 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700',
    iconColor: 'text-gray-500 dark:text-gray-400',
  },
};

function OtherWasteHandler() {
  const [description, setDescription] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestion('');
    const { suggestion: newSuggestion, error } = await getAlternativeHandlingAction(description);
    setIsLoading(false);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error });
    } else if (newSuggestion) {
      setSuggestion(newSuggestion);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="font-headline font-semibold text-lg">Need help with this item?</h3>
      <p className="text-sm text-muted-foreground">
        Describe the item below, and our AI will suggest how to dispose of it responsibly.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., 'old smartphone with a broken screen'"
          className="w-full"
          rows={3}
          disabled={isLoading}
        />
        <Button type="submit" disabled={!description.trim() || isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <WandSparkles className="mr-2 h-4 w-4" />
          )}
          Get Suggestions
        </Button>
      </form>
      {suggestion && (
        <Alert variant="default" className="mt-4 bg-background">
          <WandSparkles className="h-4 w-4" />
          <AlertTitle>Disposal Suggestion</AlertTitle>
          <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
            {suggestion}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default function ClassificationResultDisplay({ result, onReset }: Props) {
  const { category, summary } = result;
  const styles = categoryStyles[category];
  const Icon = styles.icon;

  return (
    <Card className={cn('transition-all duration-500 ease-in-out', styles.className)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className={cn('p-3 rounded-full', styles.bgColor)}>
            <Icon className={cn('h-8 w-8', styles.iconColor)} />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline">{category}</CardTitle>
            <CardDescription className={cn('font-medium', styles.iconColor)}>
              Classification Result
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="bg-background/80 border-2 border-dashed">
          <Leaf className="h-4 w-4" />
          <AlertTitle>Facts & Best Practices</AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
          </AlertDescription>
        </Alert>

        {category === 'Other' && <OtherWasteHandler />}
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} variant="outline" className="w-full bg-background/80 hover:bg-background">
          Classify Another Item
        </Button>
      </CardFooter>
    </Card>
  );
}
