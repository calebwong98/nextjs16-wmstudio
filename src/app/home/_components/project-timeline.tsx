"use client";

/**
 * Project Timeline Component
 *
 */

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProjectCalendar } from "./project-calendar";
import { Label } from "@/components/ui/label";

interface ProjectMilestone {
  date: string; // YYYY-MM-DD
  label: string;
}

export interface Project {
  id: string;
  name: string;
  colorClass: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: "project-01",
    name: "Project 01",
    colorClass: "bg-destructive/10 text-destructive border-destructive/30",
    startDate: "2026-02-09",
    endDate: "2026-02-20",
  },
  {
    id: "project-02",
    name: "Project 02",
    colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    startDate: "2026-02-16",
    endDate: "2026-03-06",
  },
  {
    id: "project-03",
    name: "Project 03",
    colorClass: "bg-violet-500/10 text-violet-600 border-violet-500/30",
    startDate: "2026-03-02",
    endDate: "2026-03-24",
  },
];

export function ProjectTimeline() {
  const [selectedProjectId, setSelectedProjectId] = useState(
    PLACEHOLDER_PROJECTS[0]?.id ?? "",
  );
  const selectedProject = useMemo(
    () => PLACEHOLDER_PROJECTS.find((p) => p.id === selectedProjectId),
    [selectedProjectId],
  );

  return (
    <section>
      <Card className="overflow-hidden border-border/50 gap-0 bg-card/50 backdrop-blur-sm p-0 grid lg:grid-cols-[380px_1fr] min-h-[60vh]">
        {/* Project Lists */}
        <CardContent className="flex flex-col gap-4 px-4 border-b lg:border-b-0 lg:border-r border-border/50 bg-muted/30 py-4">
          <div className="space-y-2">
            {PLACEHOLDER_PROJECTS.map((project) => {
              const active = project.id === selectedProjectId;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                    "hover:bg-background/60",
                    active
                      ? "border-primary/50 bg-background"
                      : "border-border/50 bg-transparent",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {project.startDate} → {project.endDate}
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-2 py-0.5 text-xs",
                        project.colorClass,
                      )}
                    >
                      Timeline
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>

        <ProjectCalendar selectedProject={selectedProject} />
      </Card>
    </section>
  );
}
