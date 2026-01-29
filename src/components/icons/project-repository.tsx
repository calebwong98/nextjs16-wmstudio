import { cn } from "@/lib/utils";

interface ProjectRepositoryProps {
  size?: number;
  active?: boolean;
  className?: string;
}

export default function ProjectRepository({
  size = 3,
  active = true,
  className = "",
}: ProjectRepositoryProps) {
  return (
    <div
      className={cn(
        className,
        "rounded-lg border-2 flex flex-col transition-all cursor-pointer",
        "border-border hover:bg-border dark:border-foreground dark:hover:bg-foreground",
      )}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <div
        className={cn(
          "h-2 w-2 rounded-full mr-1 mt-1 self-end",
          active ? "bg-green-500" : "bg-primary",
        )}
      ></div>
    </div>
  );
}
