import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagTheme =
  | "blue"
  | "green"
  | "teal"
  | "yellow"
  | "orange"
  | "pink"
  | "cyan";

type ProjectTag = {
  title: string;
  theme: TagTheme;
};

type Project = {
  title: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
};

const featuredProject: Project = {
  title: "WMStudio.dev",
  description: "A modern developer portfolio built with Next.js 16",
  longDescription:
    "This portfolio showcases my frontend expertise with a project schedule planner, interactive component demos, and a modular architecture. Built from scratch using the latest Next.js 16 App Router with Server Components.",
  tags: [
    { title: "Next.js 16", theme: "blue" },
    { title: "TypeScript", theme: "blue" },
    { title: "Tailwind v4", theme: "teal" },
    { title: "Drizzle ORM", theme: "green" },
    { title: "shadcn/ui", theme: "cyan" },
    { title: "Better Auth", theme: "orange" },
  ],
  highlights: [
    "Project Schedule Planner with calendar timeline and daily kanban board",
    "Interactive component demos with live code preview",
    "Server Components with App Router streaming",
    "Type-safe database layer with Drizzle ORM and PostgreSQL",
    "OAuth authentication with Better Auth (Google, GitHub)",
    "Dark/light mode with system detection",
  ],
  liveUrl: "https://wmstudio.dev",
  githubUrl: "https://github.com/calebwong98/nextjs16-wmstudio",
};

/**
 * Featured Project
 *
 * Showcases the most impressive project with details
 */
export function FeaturedProject() {
  return (
    <section className="">
      <div className="space-y-6">
        {/* Project Card */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card">
          {/* Gradient Accent */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
            <div className="flex flex-wrap gap-1.5">
              {featuredProject.tags.map((tag) => (
                <Badge
                  key={tag.title}
                  className={cn(
                    "rounded-sm py-1.5",
                    tag.theme === "blue" && "bg-blue-500",
                    tag.theme === "green" && "bg-green-500",
                    tag.theme === "teal" && "bg-teal-500",
                    tag.theme === "yellow" && "bg-yellow-500",
                    tag.theme === "orange" && "bg-orange-500",
                    tag.theme === "pink" && "bg-pink-500",
                    tag.theme === "cyan" && "bg-cyan-500",
                    "text-white",
                  )}
                >
                  {tag.title}
                </Badge>
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
