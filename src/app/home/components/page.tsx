/**
 * Component Showcase Index Page
 */

import Link from "next/link";
import { componentRegistry, getAllTags } from "./_registry";
import { ArrowUpRight } from "lucide-react";

export default function ComponentsPage() {
  const tags = getAllTags();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {componentRegistry.map((component, index) => (
        <ComponentCard
          key={component.slug}
          slug={component.slug}
          title={component.title}
          description={component.description}
          tags={component.tags}
          index={index}
        />
      ))}
    </div>
  );
}

/**
 * Individual component card in the grid
 */
function ComponentCard({
  slug,
  title,
  description,
  tags,
  index,
}: {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  index: number;
}) {
  return (
    <Link
      href={`/components/${slug}`}
      className="group relative flex flex-col p-6 rounded-xl border bg-card hover:border-foreground/20 hover:shadow-lg transition-all duration-300"
      style={{
        // Stagger animation delay based on index
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Preview Placeholder */}
      <div className="h-40 mb-6 rounded-lg bg-muted/50 border border-dashed flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Live Preview</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {title}
          </h2>
          <ArrowUpRight className="size-5 text-muted-foreground opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-1 bg-muted rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
