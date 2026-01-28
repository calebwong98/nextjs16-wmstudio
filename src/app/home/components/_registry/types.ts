/**
 * Component Registry Types
 *
 * Defines the shape of component metadata for the showcase.
 * Each component in the registry must conform to this interface.
 */

import type { ReactNode } from "react";

/**
 * Metadata for a showcased component.
 * This structure enables dynamic rendering of component demos
 * with consistent documentation across all showcased items.
 */
export interface ComponentMeta {
  /** URL-friendly identifier used in routing */
  slug: string;

  /** Display name for the component */
  title: string;

  /** Brief description of what the component does */
  description: string;

  /** Categorization tags for filtering/search */
  tags: string[];

  /** The actual component preview (rendered in demo) */
  preview: ReactNode;

  /** Code example showing how to use the component */
  usage: string;

  /** Full source code of the component (copyable) */
  code: string;

  /** Explanation of animation techniques used */
  animationNotes: string;

  /** Performance considerations and optimizations */
  performanceNotes: string;

  /** Accessibility features and considerations */
  accessibilityNotes?: string;
}

/**
 * Registry entry for lazy loading components.
 * Separates static metadata from the actual component to enable
 * server-side rendering of the index page.
 */
export interface RegistryEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}
