"use client";

/**
 * useReducedMotion Hook
 *
 * Detects user's motion preference from system settings.
 * Essential for accessibility - respects users who have
 * vestibular disorders or motion sensitivity.
 *
 * Usage:
 * const prefersReducedMotion = useReducedMotion();
 * if (prefersReducedMotion) { // skip animation }
 */

import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Returns true if the user has requested reduced motion.
 * Listens for changes to the media query.
 */
export function useReducedMotion(): boolean {
  // Default to no preference during SSR
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    // Set initial value
    setPrefersReducedMotion(mediaQueryList.matches);

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
}
