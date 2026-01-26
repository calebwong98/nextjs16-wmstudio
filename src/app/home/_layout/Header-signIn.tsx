"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function SignInButton({ className }: { className?: string }) {
  return (
    <Button className={cn(className, "px-8")} asChild>
      <Link
        href={`/sign-in?callbackUrl=${encodeURIComponent(
          usePathname() + useSearchParams().toString(),
        )}`}
      >
        Login
      </Link>
    </Button>
  );
}
