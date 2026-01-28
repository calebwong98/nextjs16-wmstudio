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
  { href: "/about", label: "About" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav className="flex items-center justify-center gap-10 py-8 uppercase">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm text-muted-foreground hover:text-foreground transition-colors",
            isActive(link.href) ? "font-bold text-foreground" : "font-medium",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
