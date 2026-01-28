/**
 * Component Registry Index
 *
 * Central registry for all showcased components.
 * Separates static metadata (for SSR index page) from
 * dynamic content (preview, code) loaded on detail pages.
 */

import type { RegistryEntry } from "./types";

/**
 * Static registry entries for the component index.
 * These are rendered server-side for fast initial load.
 */
export const componentRegistry: RegistryEntry[] = [
  {
    slug: "animated-button",
    title: "Animated Button",
    description:
      "A button with physics-based hover animations and tactile press feedback. Demonstrates spring animations and micro-interactions.",
    tags: ["interaction", "animation", "button", "spring"],
  },
  {
    slug: "scroll-reveal-card",
    title: "Scroll Reveal Card",
    description:
      "Cards that gracefully animate into view as you scroll. Uses intersection observer with staggered entrance animations.",
    tags: ["scroll", "animation", "card", "intersection-observer"],
  },
  {
    slug: "magnetic-cursor",
    title: "Magnetic Cursor",
    description:
      "Interactive elements that attract toward the cursor, creating a magnetic pull effect. Great for CTAs and navigation.",
    tags: ["cursor", "interaction", "magnetic", "hover"],
  },
];

/**
 * Get a specific registry entry by slug.
 * Used for validating routes and getting basic metadata.
 */
export function getRegistryEntry(slug: string): RegistryEntry | undefined {
  return componentRegistry.find((entry) => entry.slug === slug);
}

/**
 * Get all unique tags from the registry.
 * Useful for building filter interfaces.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  componentRegistry.forEach((entry) => {
    entry.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
