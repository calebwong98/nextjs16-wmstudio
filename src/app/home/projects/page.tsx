/**
 * Projects Page
 */

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { SectionHeading } from "../_layout/SectionHeading";
import { ContactCTA } from "../_layout/SectionCTA";

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
  tags: ProjectTag[];
  features: string[];
  status: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    title: "WMStudio.dev",
    description:
      "This portfolio showcases my frontend expertise with a project schedule planner, interactive component demos, and a modular architecture. Built from scratch using the latest Next.js 16 App Router with Server Components.",
    tags: [
      { title: "Next.js 16", theme: "blue" },
      { title: "TypeScript", theme: "blue" },
      { title: "Tailwind v4", theme: "teal" },
      { title: "Drizzle ORM", theme: "green" },
      { title: "shadcn/ui", theme: "cyan" },
      { title: "Better Auth", theme: "orange" },
    ],
    features: [
      "Project Schedule Planner with calendar timeline and daily kanban board",
      "Interactive component demos with live code preview",
      "Server Components with App Router streaming",
      "Type-safe database layer with Drizzle ORM and PostgreSQL",
      "OAuth authentication with Better Auth (Google, GitHub)",
      "Dark/light mode with system detection",
    ],
    status: "Current",
    liveUrl: "https://wmstudio.dev",
    githubUrl: "https://github.com/calebwong98/nextjs16-wmstudio",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <section className="flex flex-col gap-4">
        <SectionHeading title="Projects" />
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
      <ContactCTA />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group p-6 rounded-xl border bg-card hover:border-foreground/20 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-lg">{project.title}</h2>
          <span className="text-xs font-medium px-2 py-1 bg-success/10 text-success rounded-md">
            {project.status}
          </span>
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="icon-sm" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code"
              >
                <Github className="size-4" />
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="outline" size="icon-sm" asChild>
              <Link
                href={project.liveUrl}
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

      <p className="text-sm text-muted-foreground mb-4">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
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

      {/* Features */}
      <ul className="space-y-2">
        {project.features.map((feature, index) => (
          <li
            key={index}
            className="text-sm text-muted-foreground flex items-start gap-2"
          >
            <div className="size-1.5 rounded-full bg-success shrink-0 mt-1.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
