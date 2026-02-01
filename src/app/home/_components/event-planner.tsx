"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type TaskStatus = "todo" | "in-progress" | "done";

interface ProjectMilestone {
  date: string; // YYYY-MM-DD
  label: string;
}

interface Project {
  id: string;
  name: string;
  summary: string;
  colorClass: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  milestones: ProjectMilestone[];
}

interface ProjectTask {
  id: string;
  projectId: string;
  date: string; // YYYY-MM-DD
  title: string;
  status: TaskStatus;
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

const PLACEHOLDER_TASKS: ProjectTask[] = [
  // Portfolio v2
  {
    id: "t-portfolio-1",
    projectId: "portfolio-v2",
    date: "2026-02-02",
    title: "Draft home page sections + copy",
    status: "in-progress",
  },
  {
    id: "t-portfolio-2",
    projectId: "portfolio-v2",
    date: "2026-02-02",
    title: "Add schedule planner widget polish",
    status: "todo",
  },
  {
    id: "t-portfolio-3",
    projectId: "portfolio-v2",
    date: "2026-02-03",
    title: "Implement case study layout skeleton",
    status: "todo",
  },

  // WM Studio Dashboard
  {
    id: "t-wm-1",
    projectId: "wmstudio-dashboard",
    date: "2026-03-02",
    title: "Create dashboard layout + nav",
    status: "todo",
  },
  {
    id: "t-wm-2",
    projectId: "wmstudio-dashboard",
    date: "2026-03-10",
    title: "Define tables + migrations",
    status: "todo",
  },

  // Job Hunt Sprint
  {
    id: "t-job-1",
    projectId: "job-hunt",
    date: "2026-02-18",
    title: "Build target company list",
    status: "todo",
  },
  {
    id: "t-job-2",
    projectId: "job-hunt",
    date: "2026-02-18",
    title: "Write 2 outreach messages",
    status: "todo",
  },
  {
    id: "t-job-3",
    projectId: "job-hunt",
    date: "2026-03-08",
    title: "Run mock interview (45 min)",
    status: "todo",
  },
];

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseIsoLocal(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

function isIsoBetween(
  dateIso: string,
  startIso: string,
  endIso: string,
): boolean {
  const d = parseIsoLocal(dateIso).getTime();
  const s = parseIsoLocal(startIso).getTime();
  const e = parseIsoLocal(endIso).getTime();
  return d >= s && d <= e;
}

/**
 * Event Planner Component
 *
 * Cal.com-inspired booking widget with calendar and time slot selection
 */
export function EventPlanner() {
  const today = new Date();
  const [selectedProjectId, setSelectedProjectId] = useState(
    PLACEHOLDER_PROJECTS[0]?.id ?? "",
  );
  const selectedProject = useMemo(
    () => PLACEHOLDER_PROJECTS.find((p) => p.id === selectedProjectId),
    [selectedProjectId],
  );

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDateIso, setSelectedDateIso] = useState<string>(
    toIsoDate(today),
  );

  const [tasks, setTasks] = useState<ProjectTask[]>(PLACEHOLDER_TASKS);

  const nowLabel = useMemo(() => {
    const hh = String(today.getHours()).padStart(2, "0");
    const mm = String(today.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }, [today]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  useEffect(() => {
    if (!selectedProject) return;

    const todayIso = toIsoDate(new Date());
    const defaultIso = isIsoBetween(
      todayIso,
      selectedProject.startDate,
      selectedProject.endDate,
    )
      ? todayIso
      : selectedProject.startDate;

    setSelectedDateIso(defaultIso);

    const defaultDate = parseIsoLocal(defaultIso);
    setCurrentMonth(defaultDate.getMonth());
    setCurrentYear(defaultDate.getFullYear());
  }, [selectedProjectId]);

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const selectedDateLabel = useMemo(() => {
    const d = parseIsoLocal(selectedDateIso);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }, [selectedDateIso]);

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedProject) return [];
    return tasks.filter(
      (t) => t.projectId === selectedProject.id && t.date === selectedDateIso,
    );
  }, [tasks, selectedProject, selectedDateIso]);

  const groupedTasks = useMemo(() => {
    const base: Record<TaskStatus, ProjectTask[]> = {
      todo: [],
      "in-progress": [],
      done: [],
    };
    for (const task of tasksForSelectedDate) base[task.status].push(task);
    return base;
  }, [tasksForSelectedDate]);

  const moveTask = (taskId: string, direction: "left" | "right") => {
    const order: TaskStatus[] = ["todo", "in-progress", "done"];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const idx = order.indexOf(t.status);
        const nextIdx = direction === "left" ? idx - 1 : idx + 1;
        if (nextIdx < 0 || nextIdx >= order.length) return t;
        return { ...t, status: order[nextIdx] };
      }),
    );
  };

  return (
    <section>
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm p-0 grid lg:grid-cols-[380px_1fr] min-h-[60vh]">
        {/* Left: Project list ("description" area) */}
        {/* Project Lists */}
        <CardContent className="space-y-4 px-4 border-b lg:border-b-0 lg:border-r border-border/50 bg-muted/30 py-4">
          <CardTitle className="uppercase">[ Building Apps ]</CardTitle>
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
          <Separator />
          {selectedProject && (
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-medium">Milestones</div>
              <div className="mt-2 space-y-1">
                {selectedProject.milestones.map((m) => (
                  <button
                    key={m.date}
                    onClick={() => setSelectedDateIso(m.date)}
                    className="w-full text-left text-sm text-muted-foreground hover:text-foreground"
                  >
                    <span className="font-mono text-xs mr-2">{m.date}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        {/* Right: Calendar + daily kanban */}
        <div className="p-6">
          <div className="grid 2xl:grid-cols-[1fr_420px] gap-6">
            {/* Calendar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-semibold">
                    {MONTHS[currentMonth]} {currentYear}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedProject
                      ? `${selectedProject.name} timeline highlighted`
                      : "Select a project"}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={goToPrevMonth}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={goToNextMonth}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dateIso = toIsoDate(
                    new Date(currentYear, currentMonth, day),
                  );

                  const isSelected = selectedDateIso === dateIso;
                  const isTodayDate = isToday(day);

                  const inTimeline = selectedProject
                    ? isIsoBetween(
                        dateIso,
                        selectedProject.startDate,
                        selectedProject.endDate,
                      )
                    : false;

                  const milestone = selectedProject?.milestones.find(
                    (m) => m.date === dateIso,
                  );

                  return (
                    <button
                      key={dateIso}
                      onClick={() => setSelectedDateIso(dateIso)}
                      className={cn(
                        "relative aspect-square flex items-center justify-center text-sm rounded-lg transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        inTimeline && "bg-primary/5",
                        isSelected &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        isTodayDate &&
                          !isSelected &&
                          "border border-primary text-primary",
                      )}
                      title={milestone ? milestone.label : undefined}
                    >
                      <span>{day}</span>
                      {milestone && (
                        <span className="absolute bottom-1">
                          <CircleDot
                            className={cn(
                              "size-3",
                              isSelected
                                ? "text-primary-foreground"
                                : "text-primary",
                            )}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily kanban ("now timeslot") */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Daily target</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedDateLabel}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDateIso(toIsoDate(new Date()))}
                >
                  Today
                </Button>
              </div>

              {!selectedProject ? (
                <div className="flex items-center justify-center rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                  Select a project to see tasks.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: "todo" as const, title: "To do" },
                    { key: "in-progress" as const, title: "In progress" },
                    { key: "done" as const, title: "Done" },
                  ].map((col) => (
                    <div
                      key={col.key}
                      className="rounded-xl border bg-background/50"
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="text-sm font-medium">{col.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {groupedTasks[col.key].length}
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2 p-3">
                        {groupedTasks[col.key].length === 0 ? (
                          <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
                            No tasks
                          </div>
                        ) : (
                          groupedTasks[col.key].map((task) => (
                            <div
                              key={task.id}
                              className="rounded-lg border bg-card px-3 py-2"
                            >
                              <div className="text-sm font-medium">
                                {task.title}
                              </div>
                              <div className="mt-2 flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2"
                                  disabled={task.status === "todo"}
                                  onClick={() => moveTask(task.id, "left")}
                                >
                                  ←
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2"
                                  disabled={task.status === "done"}
                                  onClick={() => moveTask(task.id, "right")}
                                >
                                  →
                                </Button>
                                <div className="ml-auto text-xs text-muted-foreground">
                                  {task.date}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
