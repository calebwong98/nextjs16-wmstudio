import Link from "next/link";
import { componentRegistry, getAllTags } from "./_registry";

/**
 * Component Showcase Index Page
 *
 * Displays all available demo components in a grid layout.
 * Server component for fast initial load - component previews
 * are loaded on individual detail pages.
 */
export default function ComponentsPage() {
  const tags = getAllTags();

  return (
    <div className="px-4 sm:px-12 py-12">
      {/* Tags Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2 py-1">
            Filter:
          </span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 bg-muted rounded-full cursor-pointer hover:bg-muted/80 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Coming Soon Placeholder */}
      <div className="mt-12 p-8 rounded-xl border border-dashed bg-muted/30 text-center">
        <p className="text-muted-foreground mb-2">
          More components coming soon
        </p>
        <p className="text-sm text-muted-foreground/70">
          Toast notifications, modals, tooltips, and more
        </p>
      </div>
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
          <ArrowUpRightIcon className="size-5 text-muted-foreground opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
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

/**
 * Chevron left icon for back navigation
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
 * Arrow up-right icon for card hover state
 */
function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
