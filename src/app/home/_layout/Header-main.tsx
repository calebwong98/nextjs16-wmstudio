"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MainButton() {
  const pathname = usePathname();
  const isActive = pathname === "/contact";
  return (
    <Button
      className={cn("px-8 text-sm", isActive && "ring-2 ring-success")}
      asChild
    >
      <Link href="/contact">Open to Work</Link>
    </Button>
  );
}
