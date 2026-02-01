"use client";

import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Hero Section
 *
 * Main introduction with animated text and CTA
 */
export function HeroSection() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-12">
      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          Available for opportunities
        </span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="block">Frontend Developer</span>
          <span className="block text-muted-foreground">
            crafting{" "}
            <span className="text-foreground italic">digital experiences</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          I build performant, accessible web applications with modern
          technologies. Passionate about clean code, great UX, and turning
          complex problems into elegant solutions.
        </p>
      </div>

      {/* Location & Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="size-4" />
          <span>Malaysia • GMT+8</span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-4" />
          <span>3+ years of experience</span>
        </div>
      </div>
    </section>
  );
}
