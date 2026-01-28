import { notFound } from "next/navigation";
import { componentRegistry, getRegistryEntry } from "../_registry";
import { ComponentDetailClient } from "./_components/component-detail-client";

/**
 * Component Detail Page
 *
 * Dynamic route that renders individual component showcases.
 * Uses hybrid rendering:
 * - Server: Route validation, metadata, layout
 * - Client: Interactive preview, code blocks
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all registered components.
 * Enables static generation of all component pages at build time.
 */
export async function generateStaticParams() {
  return componentRegistry.map((component) => ({
    slug: component.slug,
  }));
}

/**
 * Generate metadata for SEO and social sharing.
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = getRegistryEntry(slug);

  if (!entry) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: `${entry.title} | Component Showcase`,
    description: entry.description,
  };
}

/**
 * Main component detail page.
 * Validates the slug server-side and delegates rendering
 * to a client component for interactivity.
 */
export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getRegistryEntry(slug);

  // 404 if component doesn't exist in registry
  if (!entry) {
    notFound();
  }

  return <ComponentDetailClient slug={slug} />;
}
