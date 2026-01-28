import HaloRing from "@/components/icons/halo-ring";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Sparkles, SquareArrowUp } from "lucide-react";
import Link from "next/link";

/**
 * Landing Page
 *
 * The main entry point for the portfolio.
 * Showcases the developer's skills with a clean, impactful hero
 * and clear navigation to key sections.
 */

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 px-6 sm:px-12">
      <section className="h-full grid grid-rows-[1fr,auto] mt-auto ">
        <div className="flex flex-col gap-4 sm:gap-5 items-center">
          {/* PROJECT REPOSITORY */}
          {/* <div className="grid grid-cols-5 gap-2 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProjectRepository active={false} key={i} />
            ))}
          </div> */}
          {/* PAGE CTA */}
          <div
            className={cn(
              "mt-8",
              "rounded-lg bg-secondary w-11/12 max-w-2xl",
              "border border-primary border-opacity-15",
            )}
          >
            <div className="flex justify-between py-2">
              <p className="pl-4 text-sm text-secondary-foreground">
                10 plan generations left
              </p>
              <div className="flex gap-2 items-center pr-4">
                <p className="text-sm text-success">Upgrade Plan</p>
                <SquareArrowUp size={16} className="text-success" />
              </div>
            </div>

            <div className="border border-primary rounded-md focus-within:ring-success focus-within:ring-offset-2 bg-background">
              <Textarea
                placeholder="Describe your needs and we ll give you a plan !"
                className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="flex justify-between p-4">
                <Button
                  className="w-fit p-3"
                  variant="outline"
                  size="icon"
                  disabled
                >
                  <Sparkles size={16} />
                </Button>
                <Link
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "px-8 text-sm",
                  )}
                  href="/"
                >
                  Generate Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-auto">
        <div className="grid grid-cols-1 gap-4">
          <QuickLink
            href="/components"
            title="Component Showcase"
            description="Interactive UI components with live demos and code"
          />
          <QuickLink
            href="/projects"
            title="Project Showcase"
            description="Real-world applications and case studies"
          />
        </div>
      </section>
      <HaloRing />
    </div>
  );
}

/**
 * Arrow icon for CTAs and links
 */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Card displaying an area of expertise
 */
function ExpertiseCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border bg-card">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/**
 * Quick navigation link card
 */
function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between p-6 rounded-xl border bg-card hover:border-foreground/20 transition-colors"
    >
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowIcon className="size-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
