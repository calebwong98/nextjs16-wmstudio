"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MainButton({ className }: { className?: string }) {
  const pathname = usePathname();
  const isActive = pathname === "/contact";
  return (
    <Button
      className={cn(
        "px-8 text-sm ring-2 ring-success/30",
        isActive && "ring-success",
        className,
      )}
      asChild
    >
      <Link href="/contact">Open to Work</Link>
    </Button>
  );
}
