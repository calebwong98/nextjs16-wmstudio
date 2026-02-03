"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactHeadshotProps = {
  name: string;
  className?: string;
};

export function ContactHeadshot({ name, className }: ContactHeadshotProps) {
  const [isLoading, setIsLoading] = useState(true);

  const src = "/images/profile_picture.webp";

  const showFallback = !src;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-muted/40 border border-dashed rounded-full",
        "aspect-square max-w-48 mx-auto",
        className,
      )}
      aria-label={`${name} headshot`}
    >
      {showFallback ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="grid size-12 place-items-center rounded-full border bg-background/50">
              <User className="size-5" />
            </div>
            <div className="text-xs">Headshot unavailable</div>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="absolute inset-0 animate-pulse bg-muted/60" />
          ) : null}

          <Image
            key={src}
            src={src}
            alt={`${name} profile photo`}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 360px, 100vw"
            className={cn(
              "scale-135 translate-y-4 object-contain",
              isLoading ? "opacity-0" : "opacity-100",
              "transition-opacity duration-300",
            )}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
}
