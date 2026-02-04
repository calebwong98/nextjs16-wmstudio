/**
 * CTA Section
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

import { Mail, FileText, ArrowRight } from "lucide-react";

type CTACardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  variant?: "primary" | "secondary";
};

export function ResumeCTA() {
  return (
    <SectionCTA
      icon={<FileText className="size-5" />}
      title="View Resume"
      description="Learn more about my experience and skills"
      href="/resume"
      variant="secondary"
    />
  );
}

export function ContactCTA() {
  return (
    <SectionCTA
      icon={<Mail className="size-5" />}
      title="Let's Talk!"
      description="Connect with me through socials"
      href="/contact"
      variant="primary"
    />
  );
}

function SectionCTA({
  icon,
  title,
  description,
  href,
  variant = "secondary",
}: CTACardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        variant === "primary"
          ? "bg-foreground text-background border-foreground"
          : "bg-card hover:border-foreground/20",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "size-10 rounded-lg flex items-center justify-center",
          variant === "primary" ? "bg-background/10" : "bg-secondary",
        )}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {title}
          <ArrowRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
        </h3>
        <p
          className={cn(
            "text-sm",
            variant === "primary"
              ? "text-background/70"
              : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
