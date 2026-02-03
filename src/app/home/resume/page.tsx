/**
 * Resume Page
 *
 * Professional experience and qualifications.
 * Clean, scannable layout optimized for recruiters.
 */

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <section>
          <ResumeHeading title="Frontend Developer" />
          <ResumeContent>
            <h2 className="text-xl font-bold uppercase pt-4 ">Wong Jia Le</h2>
            <div className="flex items-center gap-2 py-4">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                Applying for Frontend Roles
              </span>
            </div>
            <p className="text-md text-muted-foreground max-w-2xl">
              I build performant, accessible web applications with modern
              technologies. Passionate about clean code, great UX, and turning
              complex problems into elegant solutions.
            </p>
          </ResumeContent>
        </section>

        {/* Experience */}
        <section>
          <ResumeHeading title="Experience" />

          <ResumeContent>
            <ResumeItem
              title="Klinikkhome.com"
              subtitle="Full-Stack Developer"
              period="JUN 2025 - DEC 2025"
              tags={[
                { title: "React", theme: "blue" },
                { title: "Next.js", theme: "blue" },
                { title: "Node.js", theme: "green" },
                { title: "Tailwind CSS", theme: "teal" },
              ]}
              features={[
                "Designed and implemented a custom admin membership management system, enabling staff to manage users, roles, and access levels.",
                "Utilised  reusable design patterns using ShadCN and Tailwind utilities.",
                "Built a points-based membership system with configurable rules for earning, tracking, and redeeming points.",
                "Designed and optimized database schemas and queries using Drizzle ORM with PostgreSQL.",
              ]}
              isListItem
            />

            <ResumeItem
              title="CalebWONG.studio"
              subtitle="Full-Stack Developer (self-employed)"
              period="JUN 2023 - PRESENT"
              tags={[
                { title: "React", theme: "blue" },
                { title: "Next.js", theme: "blue" },
                { title: "Node.js", theme: "green" },
                { title: "Tailwind CSS", theme: "teal" },
              ]}
              features={[
                "Implemented secure authentication with Better Auth and integrated Stripe payment workflows.",
                "Created advanced UI animations using GSAP with sequenced and scroll-driven interactions.",
                "Designed scalable, maintainable component architectures and production-ready deployments.",
              ]}
              isListItem
            />
          </ResumeContent>
        </section>

        {/* Education */}
        <section>
          <ResumeHeading title="Education" />

          <ResumeContent>
            <ResumeItem
              title="Beijing University of Chinese Medicine"
              subtitle="Bachelor of Chinese Medicine"
              period="2016 - 2021"
              isListItem
            />
          </ResumeContent>
        </section>
      </div>

      {/* Sidebar */}
      <aside className="flex flex-col justify-between gap-4">
        {/* Skills */}
        <section>
          <ResumeHeading title="Technical Skills" />

          <ResumeContent>
            <ResumeItem
              title="Languages"
              tags={[
                { title: "TypeScript", theme: "blue" },
                { title: "JavaScript", theme: "yellow" },
                { title: "HTML/CSS", theme: "orange" },
                { title: "Python", theme: "green" },
              ]}
            />
            <ResumeItem
              title="Frameworks"
              tags={[
                { title: "React", theme: "blue" },
                { title: "Next.js", theme: "blue" },
                { title: "Node.js", theme: "green" },
                { title: "Tailwind CSS", theme: "teal" },
              ]}
            />
            <ResumeItem
              title="Tools"
              tags={[
                { title: "Git", theme: "orange" },
                { title: "Figma", theme: "pink" },
                { title: "PostgreSQL", theme: "blue" },
                { title: "Docker", theme: "cyan" },
              ]}
            />
          </ResumeContent>
        </section>
      </aside>

      <Link
        href="/contact"
        className={cn(
          "lg:col-span-3 group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",

          "bg-foreground text-background border-foreground",
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center",
            "bg-background/10",
          )}
        >
          <Mail className="size-5" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Let&apos;s Talk!
            <ArrowRight
              className={cn(
                "size-4 opacity-0 -translate-x-2 transition-all",
                "group-hover:opacity-100 group-hover:translate-x-0",
              )}
            />
          </h3>
          <p className={cn("text-sm", "text-background/70")}>
            Connect with me through socials
          </p>
        </div>
      </Link>
    </div>
  );
}

function ResumeHeading({ title }: { title: string }) {
  return (
    <h2 className="flex gap-1.5 w-full font-medium text-foreground uppercase">
      <span>[</span>
      <span>{title}</span>
      <span>]</span>
      <span className="h-px flex-1 my-auto bg-muted-foreground/40"></span>
    </h2>
  );
}

function ResumeContent({ children }: { children: React.ReactNode }) {
  return <div className="pl-4 pr-2 pb-16">{children}</div>;
}

function ResumeItem({
  title,
  subtitle,
  period,
  description,
  tags,
  features,

  isListItem = false,
}: {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  tags?: {
    title: string;
    theme: string;
  }[];
  features?: string[];

  isListItem?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative py-4",
        isListItem && "pl-6 border-l border-muted-foreground/40",
      )}
    >
      {isListItem && (
        <div className="absolute -left-2.25 top-7 size-4 rounded-full bg-background border border-muted-foreground/40" />
      )}
      <div className="flex items-start justify-between flex-wrap gap-2 py-2">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.title}
              className={cn(
                "rounded-sm py-1.5",
                tag.theme === "blue" && "bg-blue-500",
                tag.theme === "green" && "bg-green-500",
                tag.theme === "teal" && "bg-teal-500",
                tag.theme === "yellow" && "bg-yellow-500",
                tag.theme === "orange" && "bg-orange-500",
                tag.theme === "pink" && "bg-pink-500",
                tag.theme === "cyan" && "bg-cyan-500",
                "text-white",
              )}
            >
              {tag.title}
            </Badge>
          ))}
        </div>
      )}
      {features && (
        <ul className="space-y-4 py-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <div className="text-muted-foreground">+</div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
