/**
 * Resume Page
 */

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Link2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { SectionHeading } from "../_layout/SectionHeading";
import { ContactCTA } from "../_layout/SectionCTA";

export default function ResumePage() {
  return (
    <div className="grid grid-cols-1 gap-4 flex-1">
      {/* Main Content */}
      <div className="">
        <section>
          <SectionHeading title="Frontend Developer" />
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
          <SectionHeading title="Experience" />

          <ResumeContent>
            <ResumeItem
              title="Klinikkhome.com"
              href="https://klinikkhome.com"
              subtitle="Full-Stack Developer"
              period={{ dates: "JUN 2025 - DEC 2025", durations: "6 months" }}
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
              href="https://calebwong.studio"
              subtitle="Full-Stack Developer (self-employed)"
              period={{ dates: "JUN 2023 - DEC 2023", durations: "6 months" }}
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
          <SectionHeading title="Education" />

          <ResumeContent>
            <ResumeItem
              title="Beijing University of Chinese Medicine"
              href="https://www.bucm.edu.cn/"
              subtitle="Bachelor of Chinese Medicine"
              period={{ dates: "JUN 2016 - JULY 2021", durations: "5 years" }}
              isListItem
            />
          </ResumeContent>
        </section>
      </div>

      <ContactCTA />
    </div>
  );
}

function ResumeContent({ children }: { children: React.ReactNode }) {
  return <div className="pl-4 pr-2 pb-16">{children}</div>;
}

function ResumeItem({
  title,
  href = "#",
  subtitle,
  period,
  description,
  tags,
  features,

  isListItem = false,
}: {
  title: string;
  href?: string;
  subtitle?: string;
  period?: {
    dates: string;
    durations?: string;
  };
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
      <div className="flex sm:items-end flex-col sm:flex-row justify-between flex-wrap gap-2 py-2">
        <div>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center hover:underline underline-offset-4"
          >
            <h3 className="font-semibold">{title}</h3>
            <Link2Icon className="ml-2 size-3 group-hover:text-foreground inline-block text-muted-foreground" />
          </Link>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex justify-between w-full sm:w-fit sm:flex-col sm:items-end">
          <span className="text-sm text-foreground uppercase">
            {period?.dates}
          </span>
          <span className="text-sm text-muted-foreground uppercase">
            [ {period?.durations} ]
          </span>
        </div>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      {tags && (
        <div className="flex flex-wrap gap-1">
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
