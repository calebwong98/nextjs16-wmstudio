import Link from "next/link";

/**
 * Projects Page
 *
 * Showcases real-world projects and case studies.
 * Currently a placeholder with structure for future content.
 */
export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-12 py-12">
      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProjectCard
          title="E-Commerce Platform"
          description="Full-stack marketplace with real-time inventory, payment processing, and admin dashboard."
          tags={["Next.js", "PostgreSQL", "Stripe", "TypeScript"]}
          status="Featured"
        />
        <ProjectCard
          title="Design System"
          description="Comprehensive component library with theming, accessibility, and documentation."
          tags={["React", "Storybook", "Tailwind", "Radix UI"]}
          status="Open Source"
        />
        <ProjectCard
          title="Analytics Dashboard"
          description="Real-time data visualization with interactive charts and custom reporting."
          tags={["React", "D3.js", "WebSocket", "PostgreSQL"]}
          status="Case Study"
        />
        <ProjectCard
          title="Developer Portfolio"
          description="This site - a showcase of animation techniques and component architecture."
          tags={["Next.js", "TypeScript", "Tailwind", "Animation"]}
          status="Live"
        />
      </div>

      {/* Coming Soon Note */}
      <div className="mt-12 p-8 rounded-xl border border-dashed bg-muted/30 text-center">
        <p className="text-muted-foreground">
          Detailed case studies coming soon
        </p>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  status,
}: {
  title: string;
  description: string;
  tags: string[];
  status: string;
}) {
  return (
    <div className="group p-6 rounded-xl border bg-card hover:border-foreground/20 hover:shadow-lg transition-all">
      {/* Preview placeholder */}
      <div className="h-48 mb-6 rounded-lg bg-muted/50 border border-dashed flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Project Preview</span>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
          {title}
        </h2>
        <span className="text-xs font-mono px-2 py-1 bg-muted rounded-md">
          {status}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-1 bg-muted rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

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
