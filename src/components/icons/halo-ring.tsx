import { cn } from "@/lib/utils";

export default function HaloRing() {
  return (
    <div
      className={cn(
        `hidden sm:block w-[40vw] h-[40vw] -z-10 p-0.5 sm:min-w-162.5 sm:min-h-162.5 min-w-87.5 min-h-87.5`,
        "fixed left-1/2 -translate-x-1/2  sm:top-1/2 sm:-translate-y-1/2",
        "top-[20lvh]",
        "rounded-full bg-linear-to-b",
        "from-muted-foreground from-10%  to-background to-80%",
      )}
    >
      <div className="bg-background w-full h-full rounded-full"></div>
    </div>
  );
}
