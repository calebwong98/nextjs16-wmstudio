/**
 * Component Detail Layout
 *
 * Shared layout structure for individual component detail pages.
 * Provides consistent header, navigation, and section formatting.
 */

import Link from "next/link";
import type { ReactNode } from "react";

interface ComponentDetailLayoutProps {
  /** Component title */
  title: string;
  /** Component description */
  description: string;
  /** Tags for categorization */
  tags: string[];
  /** Child content sections */
  children: ReactNode;
}

export function ComponentDetailLayout({
  title,
  description,
  tags,
  children,
}: ComponentDetailLayoutProps) {
  return (
    <div className="px-4 sm:px-12 py-12">
      {/* Navigation */}
      <Link
        href="/components"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeftIcon className="size-4" />
        All Components
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-6">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm font-mono px-3 py-1 bg-muted rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      {children}
    </div>
  );
}

/**
 * Section wrapper for consistent spacing and titles
 */
export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Live preview container with border and background
 */
export function PreviewContainer({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-8 flex items-center justify-center min-h-[200px]">
      {children}
    </div>
  );
}

/**
 * Info card for notes (animation, performance, accessibility)
 */
export function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl border bg-card">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/**
 * Chevron left icon
 */
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Icon components for info cards
 */
export function AnimationIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "size-5"}
    >
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" />
    </svg>
  );
}

export function PerformanceIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "size-5"}
    >
      <path
        fillRule="evenodd"
        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "size-5"}
    >
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );
}
