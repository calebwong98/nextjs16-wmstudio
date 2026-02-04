/**
 * Projects Page
 */

import { SectionHeading } from "../_layout/SectionHeading";

export default function ProjectsPage() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeading title="Projects" />
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
    </section>
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

      {/* Content */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="font-semibold text-lg transition-colors">{title}</h2>
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
