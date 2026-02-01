"use client";

import { cn } from "@/lib/utils";

type TechItem = {
  name: string;
  category: "framework" | "language" | "styling" | "database" | "tool";
  proficiency: "expert" | "advanced" | "intermediate";
};

const techStack: TechItem[] = [
  // Core
  { name: "React", category: "framework", proficiency: "expert" },
  { name: "Next.js", category: "framework", proficiency: "expert" },
  { name: "TypeScript", category: "language", proficiency: "expert" },
  // Styling
  { name: "Tailwind CSS", category: "styling", proficiency: "expert" },
  { name: "CSS/SCSS", category: "styling", proficiency: "advanced" },
  { name: "Framer Motion", category: "styling", proficiency: "advanced" },
  // Backend & DB
  { name: "Node.js", category: "framework", proficiency: "advanced" },
  { name: "PostgreSQL", category: "database", proficiency: "intermediate" },
  { name: "Drizzle ORM", category: "database", proficiency: "advanced" },
  // Tools
  { name: "Git", category: "tool", proficiency: "expert" },
  { name: "Figma", category: "tool", proficiency: "intermediate" },
  { name: "Vercel", category: "tool", proficiency: "advanced" },
];

const categoryColors = {
  framework:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  language:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  styling: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  database:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  tool: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

const proficiencyIndicator = {
  expert: "●●●",
  advanced: "●●○",
  intermediate: "●○○",
};

/**
 * Tech Stack Section
 *
 * Displays technologies with cool visual categorization
 */
export function TechStackSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Technologies I work with daily
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="font-mono">●●●</span> Expert
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono">●●○</span> Advanced
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono">●○○</span> Learning
            </span>
          </div>
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={cn(
                "group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                "hover:scale-105 hover:shadow-md cursor-default",
                categoryColors[tech.category],
              )}
            >
              <span className="font-medium text-sm">{tech.name}</span>
              <span className="font-mono text-[10px] opacity-60 tracking-tighter">
                {proficiencyIndicator[tech.proficiency]}
              </span>
            </div>
          ))}
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap gap-3 pt-2">
          {Object.entries(categoryColors).map(([category, colors]) => (
            <div key={category} className="flex items-center gap-1.5 text-xs">
              <div className={cn("size-2.5 rounded-full border", colors)} />
              <span className="text-muted-foreground capitalize">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
