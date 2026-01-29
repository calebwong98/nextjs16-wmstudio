"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation links for the portfolio
 */
const navLinks = [
  { href: "/components", label: "Components" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav className="px-1 w-full max-w-lg flex flex-col sm:flex-row gap-8 sm:gap-2 items-start justify-between mx-auto py-4 sm:py-8 my-8 uppercase">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex w-full sm:w-fit text-sm text-muted-foreground hover:text-foreground transition-colors",
            isActive(link.href) ? "font-bold text-foreground" : "font-medium",
          )}
        >
          <span
            className={cn(
              "font-medium opacity-0 pr-1",
              isActive(link.href) && "opacity-100",
            )}
          >
            [
          </span>
          {link.label}
          <span
            className={cn(
              "font-medium opacity-0 pl-1",
              isActive(link.href) && "opacity-100",
            )}
          >
            ]
          </span>
          <div
            className={cn(
              "bg-muted-foreground/10 h-px mx-2 my-auto w-full sm:hidden",
              isActive(link.href) && "bg-muted-foreground",
            )}
          />
        </Link>
      ))}
    </nav>
  );
}

export function HeaderNavRoot() {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground font-mono tracking-wider",
        isActive ? "font-bold text-foreground" : "font-medium",
      )}
    >
      <span
        className={cn("font-medium opacity-0 pr-1", isActive && "opacity-100")}
      >
        [
      </span>
      FRONTEND DEVELOPER
      <span
        className={cn("font-medium opacity-0 pl-1", isActive && "opacity-100")}
      >
        ]
      </span>
    </p>
  );
}
