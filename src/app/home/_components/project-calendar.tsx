"use client";

/**
 * Project Timeline Component
 *
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "./project-timeline";

const LANE_TOP_PX = 24;
const LANE_HEIGHT_PX = 14;
const MAX_VISIBLE_LANES = 4;

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
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 7 : day;
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

export function ProjectCalendar({
  selectedProjects,
  laneByProjectId,
}: {
  selectedProjects?: Project[];
  laneByProjectId?: Record<string, number>;
}) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDateIso, setSelectedDateIso] = useState<string>(
    toIsoDate(today),
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

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

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">
          {MONTHS[currentMonth]} {currentYear}
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

      <WeekHeader />

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, index) => {
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
          const day = daysInPrevMonth - firstDay + index + 1;

          return (
            <div
              key={`empty-end-${index}`}
              className="relative border border-transparent rounded-md bg-muted aspect-square flex items-center justify-center text-sm text-muted-foreground/50"
            >
              <span className="absolute left-1 top-1 text-xs font-medium opacity-90">
                {day}
              </span>
            </div>
          );
        })}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dateIso = toIsoDate(new Date(currentYear, currentMonth, day));
          const isTodayDate = isToday(day);

          const activeProjects = (selectedProjects ?? []).filter((project) =>
            isIsoBetween(dateIso, project.startDate, project.endDate),
          );

          const activeWithLane = activeProjects
            .map((project) => ({
              project,
              lane: laneByProjectId?.[project.id] ?? 0,
            }))
            .sort(
              (a, b) =>
                a.lane - b.lane || a.project.name.localeCompare(b.project.name),
            );

          const visible = activeWithLane.filter(
            (p) => p.lane < MAX_VISIBLE_LANES,
          );
          const hiddenCount = activeWithLane.length - visible.length;

          return (
            <div
              key={dateIso}
              onClick={() => setSelectedDateIso(dateIso)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "border",
                isTodayDate && "border border-primary text-primary",
              )}
            >
              <span className="absolute left-1 top-1 text-xs font-medium opacity-90">
                {day}
              </span>

              {/* Stable project blocks (lanes) */}
              {visible.map(({ project, lane }) => (
                <div
                  key={`${dateIso}:${project.id}`}
                  className={cn(
                    "pointer-events-none absolute left-1 right-1 rounded-xs border px-1",
                    "text-[10px] leading-3 h-3 truncate",
                    project.colorClass,
                  )}
                  style={{ top: LANE_TOP_PX + lane * LANE_HEIGHT_PX }}
                  title={project.name}
                ></div>
              ))}

              {hiddenCount > 0 && (
                <div className="pointer-events-none absolute bottom-1 right-1 text-[10px] text-muted-foreground">
                  +{hiddenCount}
                </div>
              )}
            </div>
          );
        })}

        {Array.from({ length: 42 - firstDay - daysInMonth }).map((_, index) => {
          const day = index + 1;

          return (
            <div
              key={`empty-end-${index}`}
              className="relative border border-transparent rounded-md bg-muted aspect-square flex items-center justify-center text-sm text-muted-foreground/50"
            >
              <span className="absolute left-1 top-1 text-xs font-medium opacity-90">
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekHeader() {
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
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
  );
}
