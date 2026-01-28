"use client";

/**
 * useIntersectionObserver Hook
 *
 * Detects when an element enters or exits the viewport.
 * Used for scroll-triggered animations and lazy loading.
 *
 * This is more performant than scroll listeners as it uses
 * the native IntersectionObserver API which runs off the
 * main thread.
 */

import { useState, useEffect, useRef, type RefObject } from "react";

interface IntersectionOptions {
  /** Root element for intersection (null = viewport) */
  root?: Element | null;
  /** Margin around root element */
  rootMargin?: string;
  /** Visibility threshold(s) to trigger callback */
  threshold?: number | number[];
  /** Only trigger once when first visible */
  triggerOnce?: boolean;
}

interface IntersectionResult {
  /** Ref to attach to the observed element */
  ref: RefObject<HTMLElement | null>;
  /** Whether the element is currently in view */
  isInView: boolean;
  /** The underlying IntersectionObserverEntry */
  entry: IntersectionObserverEntry | null;
}

const DEFAULT_OPTIONS: IntersectionOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
  triggerOnce: false,
};

/**
 * Observes an element and returns whether it's in the viewport.
 *
 * @param options - Intersection observer configuration
 * @returns Object with ref, isInView state, and entry data
 */
export function useIntersectionObserver(
  options?: IntersectionOptions,
): IntersectionResult {
  const { root, rootMargin, threshold, triggerOnce } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if triggerOnce and already triggered
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        setEntry(entry);
        setIsInView(isIntersecting);

        // Mark as triggered if using triggerOnce
        if (isIntersecting && triggerOnce) {
          hasTriggered.current = true;
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return { ref, isInView, entry };
}

/**
 * Observes multiple elements with staggered animation support.
 * Returns an array of visibility states for each ref.
 */
export function useIntersectionObserverMany(
  count: number,
  options?: IntersectionOptions,
): {
  refs: RefObject<HTMLElement | null>[];
  visibleItems: boolean[];
} {
  const refs = useRef<RefObject<HTMLElement | null>[]>(
    Array.from({ length: count }, () => ({ current: null })),
  ).current;

  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(count).fill(false),
  );

  const { root, rootMargin, threshold, triggerOnce } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const index = refs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) {
              next[index] = entry.isIntersecting;

              if (entry.isIntersecting && triggerOnce) {
                observer.unobserve(entry.target);
              }
            }
          });
          return next;
        });
      },
      { root, rootMargin, threshold },
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [refs, root, rootMargin, threshold, triggerOnce]);

  return { refs, visibleItems };
}
