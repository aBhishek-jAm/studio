'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Recycle, MapPin, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-primary/20">
      <header className="py-4 px-6">
        <div className="container mx-auto flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-accent"
          >
            <path d="M20.2 2.2c.2.2.2.5 0 .7l-7.2 7.2c-.2.2-.5.2-.7 0l-4.2-4.2c-.2-.2-.2-.5 0-.7l7.2-7.2c.2-.2.5-.2.7 0Z" />
            <path d="m11 13 4 4" />
            <path d="m5 11 4 4" />
            <path d="M3 21h18" />
          </svg>
          <h1 className="text-3xl font-headline font-bold text-foreground">
            WasteWise
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center p-4">
        <div className="animate-fade-in-up space-y-6">
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-foreground tracking-tight">
            A Cleaner Planet, <br />
            <span className="text-accent">One Snap at a Time.</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Use the power of AI to classify your waste for better recycling, or
            report illegally dumped trash to help keep your community clean.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl animate-fade-in-up animation-delay-300">
          <Link href="/classify" passHref>
            <Card className="h-full hover:shadow-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <Recycle className="h-16 w-16 text-accent mb-4" />
                <h3 className="text-2xl font-headline font-bold mb-2">
                  Classify Waste
                </h3>
                <p className="text-muted-foreground mb-6">
                  Not sure if it&apos;s recyclable? Snap a photo and let our AI tell
                  you how to dispose of it correctly.
                </p>
                <Button variant="default" size="lg" className="mt-auto">
                  Start Classifying <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/report" passHref>
            <Card className="h-full hover:shadow-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <MapPin className="h-16 w-16 text-accent mb-4" />
                <h3 className="text-2xl font-headline font-bold mb-2">
                  Report Waste
                </h3>
                <p className="text-muted-foreground mb-6">
                  Found a pile of trash? Report it with a photo and location to
                  help keep our public spaces clean.
                </p>
                <Button variant="default" size="lg" className="mt-auto">
                  Create a Report <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-full max-w-5xl mx-auto mt-16 animate-fade-in-up animation-delay-600">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Eco-friendly illustration"
            width={1200}
            height={400}
            className="rounded-lg shadow-2xl"
            data-ai-hint="nature environment"
          />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} WasteWise. Built for a better
          planet.
        </p>
      </footer>
    </div>
  );
}
