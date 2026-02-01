/**
 * Quick navigation link card
 */

import { ProjectRepository } from "@/components/icons";

export function ProjectRepositories() {
  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto sm:mt-[18vh] sm:mb-[10vh] my-9">
      <p className="text-muted-foreground text-center px-2 rounded-xs uppercase text-sm font-mono">
        · on-going projects ·
      </p>

      <div className="grid grid-cols-5 gap-2 sm:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProjectRepository active={true} key={i} />
        ))}
      </div>
    </div>
  );
}
