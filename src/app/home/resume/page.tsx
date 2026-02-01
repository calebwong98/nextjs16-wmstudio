/**
 * Resume Page
 *
 * Professional experience and qualifications.
 * Clean, scannable layout optimized for recruiters.
 */

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { HeroSection } from "../_components/hero-section";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-12">
        <HeroSection />

        {/* Experience */}
        {/* <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" />
            Experience
          </h2>

          <div className="space-y-8">
            <ExperienceItem
              title="Senior Frontend Engineer"
              company="Tech Company"
              period="2023 - Present"
              description="Led frontend architecture for customer-facing products. Built design system used across 12 teams. Improved Core Web Vitals by 40%."
              highlights={[
                "Architected micro-frontend system serving 2M+ users",
                "Mentored team of 5 junior engineers",
                "Reduced bundle size by 60% through code splitting",
              ]}
            />

            <ExperienceItem
              title="Frontend Engineer"
              company="Startup Inc"
              period="2021 - 2023"
              description="Full-stack development with focus on interactive data visualization and real-time features."
              highlights={[
                "Built real-time collaboration features with WebSocket",
                "Created custom charting library with D3.js",
                "Implemented CI/CD pipeline reducing deploy time by 70%",
              ]}
            />

            <ExperienceItem
              title="UI/UX Developer"
              company="Agency Co"
              period="2019 - 2021"
              description="Designed and developed websites for clients across industries including fintech, healthcare, and e-commerce."
              highlights={[
                "Delivered 20+ client projects on time and budget",
                "Established component library and design system",
                "Improved average client site performance scores by 35%",
              ]}
            />
          </div>
        </section> */}

        {/* Education */}
        {/* <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" />
            Education
          </h2>

          <div className="p-6 rounded-xl border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Bachelor of Computer Science</h3>
                <p className="text-sm text-muted-foreground">University Name</p>
              </div>
              <span className="text-sm text-muted-foreground">2015 - 2019</span>
            </div>
          </div>
        </section> */}
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Technical Skills</h2>
          <div className="space-y-4">
            <SkillCategory
              title="Languages"
              skills={["TypeScript", "JavaScript", "HTML/CSS", "Python"]}
            />
            <SkillCategory
              title="Frameworks"
              skills={["React", "Next.js", "Node.js", "Tailwind CSS"]}
            />
            <SkillCategory
              title="Tools"
              skills={["Git", "Figma", "PostgreSQL", "Docker"]}
            />
            <SkillCategory
              title="Concepts"
              skills={[
                "Design Systems",
                "Accessibility",
                "Performance",
                "Animation",
              ]}
            />
          </div>
        </section>

        <Link
          href="/contact"
          className={cn(
            "group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300",
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
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  highlights,
}: {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}) {
  return (
    <div className="relative pl-6 border-l-2 border-muted">
      <div className="absolute -left-2.25 top-0 size-4 rounded-full bg-background border-2 border-muted" />
      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <ul className="space-y-1">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="text-sm text-muted-foreground flex items-start gap-2"
          >
            <span className="text-primary mt-1.5">•</span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-mono px-2 py-1 bg-muted rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
