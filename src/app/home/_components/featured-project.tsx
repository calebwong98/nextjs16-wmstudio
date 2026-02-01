import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
};

const featuredProject: Project = {
  title: "Portfolio & Component Library",
  description: "A modern developer portfolio built with Next.js 16",
  longDescription:
    "This portfolio showcases a custom component library featuring interactive animations, accessible UI patterns, and a modular architecture. Built from scratch to demonstrate frontend expertise.",
  techStack: [
    "Next.js 16",
    "TypeScript",
    "Tailwind v4",
    "Drizzle ORM",
    "shadcn/ui",
  ],
  highlights: [
    "Server Components with streaming",
    "Type-safe database layer",
    "Dark mode with system detection",
    "Responsive & accessible design",
  ],
  liveUrl: "/",
  githubUrl: "https://github.com",
};

/**
 * Featured Project Section
 *
 * Showcases the most impressive project with details
 */
export function FeaturedProjectSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Project
          </h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Latest
          </span>
        </div>

        {/* Project Card */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card">
          {/* Gradient Accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative p-6 md:p-8 space-y-6">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  {featuredProject.title}
                </h3>
                <p className="text-muted-foreground">
                  {featuredProject.longDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 shrink-0">
                {featuredProject.githubUrl && (
                  <Button variant="outline" size="icon-sm" asChild>
                    <Link
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code"
                    >
                      <Github className="size-4" />
                    </Link>
                  </Button>
                )}
                {featuredProject.liveUrl && (
                  <Button variant="outline" size="icon-sm" asChild>
                    <Link
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View live site"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {featuredProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-secondary rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredProject.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="size-1.5 rounded-full bg-success shrink-0" />
                  {highlight}
                </div>
              ))}
            </div>

            {/* View More Link */}
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Explore all projects
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
