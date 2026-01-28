"use client";

/**
 * ScrollRevealCard Component
 *
 * A card that animates into view when scrolled into the viewport.
 * Uses IntersectionObserver for efficient scroll detection.
 *
 * Features:
 * - Fade and slide animation on scroll
 * - Staggered entrance for multiple cards
 * - Configurable animation direction and distance
 * - Respects reduced motion preferences
 */

import { cn } from "@/lib/utils";
import { useIntersectionObserver, useReducedMotion } from "../_hooks";
import type { ReactNode, CSSProperties } from "react";

type AnimationDirection = "up" | "down" | "left" | "right";

interface ScrollRevealCardProps {
  children: ReactNode;
  className?: string;
  /** Direction the card animates from */
  direction?: AnimationDirection;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Distance to travel in pixels */
  distance?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Viewport threshold to trigger animation (0-1) */
  threshold?: number;
}

export function ScrollRevealCard({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 40,
  duration = 600,
  threshold = 0.1,
}: ScrollRevealCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useIntersectionObserver({
    threshold,
    triggerOnce: true, // Only animate once
    rootMargin: "-50px", // Start animation slightly before fully visible
  });

  // Calculate initial transform based on direction
  const getInitialTransform = (): string => {
    if (prefersReducedMotion) return "none";

    const transforms: Record<AnimationDirection, string> = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
    };
    return transforms[direction];
  };

  const style: CSSProperties = {
    opacity: prefersReducedMotion ? 1 : isInView ? 1 : 0,
    transform: isInView ? "none" : getInitialTransform(),
    transition: prefersReducedMotion
      ? "none"
      : `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("rounded-xl border bg-card p-6", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * Demo wrapper showing multiple cards with staggered animation
 */
export function ScrollRevealDemo() {
  const cards = [
    {
      title: "Performance First",
      description:
        "Built with performance in mind. Uses IntersectionObserver instead of scroll listeners for efficient detection.",
      direction: "up" as const,
    },
    {
      title: "Accessible Motion",
      description:
        "Respects prefers-reduced-motion setting. Animation is disabled for users who have motion sensitivity.",
      direction: "up" as const,
    },
    {
      title: "Customizable",
      description:
        "Configure direction, distance, duration, and delay. Perfect for creating staggered entrance animations.",
      direction: "up" as const,
    },
  ];

  return (
    <div className="grid gap-6 max-w-2xl mx-auto">
      {cards.map((card, index) => (
        <ScrollRevealCard
          key={card.title}
          direction={card.direction}
          delay={index * 100} // Staggered delay
          className="hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold mb-2">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </ScrollRevealCard>
      ))}
    </div>
  );
}
