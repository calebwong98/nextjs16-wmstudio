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
import { Checkbox } from "@/components/ui/checkbox";

function parseIsoLocal(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

function rangesOverlap(
  aStartIso: string,
  aEndIso: string,
  bStartIso: string,
  bEndIso: string,
) {
  const aStart = parseIsoLocal(aStartIso).getTime();
  const aEnd = parseIsoLocal(aEndIso).getTime();
  const bStart = parseIsoLocal(bStartIso).getTime();
  const bEnd = parseIsoLocal(bEndIso).getTime();
  return aStart <= bEnd && bStart <= aEnd;
}

function computeLaneMapForSelection(
  previousLaneMap: Record<string, number>,
  selectedProjects: Project[],
): Record<string, number> {
  const next: Record<string, number> = { ...previousLaneMap };

  const laneToProjects = new Map<number, Project[]>();
  for (const project of selectedProjects) {
    const lane = next[project.id];
    if (lane === undefined) continue;
    laneToProjects.set(lane, [...(laneToProjects.get(lane) ?? []), project]);
  }

  for (const project of selectedProjects) {
    if (next[project.id] !== undefined) continue;

    let lane = 0;
    while (true) {
      const existing = laneToProjects.get(lane) ?? [];
      const canPlace = existing.every(
        (other) =>
          !rangesOverlap(
            project.startDate,
            project.endDate,
            other.startDate,
            other.endDate,
          ),
      );
      if (canPlace) break;
      lane += 1;
    }

    next[project.id] = lane;
    laneToProjects.set(lane, [...(laneToProjects.get(lane) ?? []), project]);
  }

  return next;
}

interface ProjectMilestone {
  date: string; // YYYY-MM-DD
  label: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  colorClass: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  milestones: ProjectMilestone[];
}

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: "portfolio-v2",
    name: "Portfolio v2",
    summary: "Rebuild landing + case studies; polish UI and SEO.",
    colorClass: "bg-primary/10 text-primary border-primary/30",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    milestones: [
      { date: "2026-02-03", label: "Define sections" },
      { date: "2026-02-10", label: "Case study template" },
      { date: "2026-02-21", label: "SEO pass" },
    ],
  },
  {
    id: "wmstudio-dashboard",
    name: "WM Studio Dashboard",
    summary: "Admin dashboard scaffolding + auth + DB.",
    colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    startDate: "2026-03-01",
    endDate: "2026-03-24",
    milestones: [
      { date: "2026-03-02", label: "Routes + layout" },
      { date: "2026-03-10", label: "DB schema" },
      { date: "2026-03-20", label: "MVP demo" },
    ],
  },
  {
    id: "job-hunt",
    name: "Job Hunt Sprint",
    summary: "Applications, outreach, and interview prep.",
    colorClass: "bg-violet-500/10 text-violet-600 border-violet-500/30",
    startDate: "2026-02-15",
    endDate: "2026-03-15",
    milestones: [
      { date: "2026-02-18", label: "Target list" },
      { date: "2026-02-25", label: "Portfolio review" },
      { date: "2026-03-08", label: "Mock interview" },
    ],
  },
];

export function ProjectTimeline() {
  const initialSelectedProjectIds = PLACEHOLDER_PROJECTS[0]?.id
    ? [PLACEHOLDER_PROJECTS[0].id]
    : [];

  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>(
    initialSelectedProjectIds,
  );

  const [laneByProjectId, setLaneByProjectId] = useState<
    Record<string, number>
  >(() =>
    computeLaneMapForSelection(
      {},
      PLACEHOLDER_PROJECTS.filter((p) =>
        initialSelectedProjectIds.includes(p.id),
      ),
    ),
  );

  const selectedProjects = useMemo(
    () =>
      PLACEHOLDER_PROJECTS.filter((project) =>
        selectedProjectIds.includes(project.id),
      ),
    [selectedProjectIds],
  );

  const toggleProject = (projectId: string) => {
    setSelectedProjectIds((prevIds) => {
      const nextIds = prevIds.includes(projectId)
        ? prevIds.filter((id) => id !== projectId)
        : [...prevIds, projectId];

      const nextProjects = PLACEHOLDER_PROJECTS.filter((project) =>
        nextIds.includes(project.id),
      );

      setLaneByProjectId((prevLaneMap) =>
        computeLaneMapForSelection(prevLaneMap, nextProjects),
      );

      return nextIds;
    });
  };

  return (
    <section>
      <Card className="overflow-hidden border-border/50 gap-0 bg-card/50 backdrop-blur-sm p-0 grid lg:grid-cols-[380px_1fr] min-h-[60vh]">
        {/* Project Lists */}
        <CardContent className="flex flex-col gap-4 px-4 border-b lg:border-b-0 lg:border-r border-border/50 bg-muted/30 py-4">
          <div className="space-y-2">
            {PLACEHOLDER_PROJECTS.map((project) => {
              const checked = selectedProjectIds.includes(project.id);
              return (
                <Label
                  key={project.id}
                  className={cn(
                    "w-full rounded-md border px-4 py-3",
                    "hover:bg-background/60",
                    checked
                      ? "border-primary/50 bg-background"
                      : "border-border/50 bg-transparent",
                    "cursor-pointer select-none",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={`toggle-project-${project.id}`}
                      name={`toggle-project-${project.id}`}
                      checked={checked}
                      onChange={() => toggleProject(project.id)}
                      className={cn(
                        "mt-1 size-4 rounded border border-border bg-background",
                        "accent-primary",
                      )}
                      aria-label={`Select ${project.name}`}
                    />

                    <div className="flex-1 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {project.startDate} {"\u2192"} {project.endDate}
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
                  </div>
                </Label>
              );
            })}
          </div>
        </CardContent>

        <ProjectCalendar
          selectedProjects={selectedProjects}
          laneByProjectId={laneByProjectId}
        />
      </Card>
    </section>
  );
}
