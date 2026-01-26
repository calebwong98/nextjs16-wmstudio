"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function SignInButton({ className }: { className?: string }) {
  return (
    <Button className={className} asChild>
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
