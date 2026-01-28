"use client";

/**
 * AnimatedButton Component
 *
 * A button with physics-based hover and press animations.
 * Demonstrates spring physics, scale transforms, and tactile feedback.
 *
 * Features:
 * - Smooth scale on hover using spring physics
 * - Press-down effect with instant response
 * - Glow effect on hover
 * - Respects reduced motion preferences
 */

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useSpring, useReducedMotion } from "../_hooks";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function AnimatedButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Spring-animated scale value
  // Hover: scale up slightly (1.05)
  // Press: scale down (0.95) - provides tactile feedback
  const targetScale = isPressed ? 0.95 : isHovered ? 1.05 : 1;
  const scale = useSpring(targetScale, {
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  });

  // Use target scale directly if user prefers reduced motion
  const currentScale = prefersReducedMotion ? targetScale : scale;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);
  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);

  // Variant styles
  const variantStyles = {
    primary: "bg-foreground text-background hover:shadow-lg",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    outline: "border-2 border-foreground text-foreground hover:bg-foreground/5",
  };

  // Size styles
  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl transition-shadow duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      style={{
        transform: `scale(${currentScale})`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {/* Glow effect on hover */}
      <span
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-300",
          variant === "primary" && "bg-primary/20 blur-xl",
          isHovered ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: "translateY(4px)",
        }}
      />

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
