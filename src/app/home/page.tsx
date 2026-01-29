import HaloRing from "@/components/icons/halo-ring";
import ProjectRepository from "@/components/icons/project-repository";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChatbotDemo } from "./_components/chatbot-demo";

/**
 * Landing Page
 *
 * The main entry point for the portfolio.
 * Showcases the developer's skills with a clean, impactful hero
 * and clear navigation to key sections.
 */

export default function HomePage() {
  return (
    <>
      <section className="flex-1 flex flex-col">
        <div className="grid grid-cols-5 gap-2 sm:gap-6 max-w-lg mx-auto my-auto pb-12">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProjectRepository active={true} key={i} />
          ))}
        </div>

        <ChatbotDemo maxUsage={5} />

        <div className="flex flex-col gap-4 pt-12">
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
    </>
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
      <ArrowRight className="size-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
