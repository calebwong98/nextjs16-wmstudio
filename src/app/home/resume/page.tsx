import Link from "next/link";

/**
 * Resume Page
 *
 * Professional experience and qualifications.
 * Clean, scannable layout optimized for recruiters.
 */
export default function ResumePage() {
  return (
    <div className="px-4 sm:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Experience */}
          <section>
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
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Education
            </h2>

            <div className="p-6 rounded-xl border bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">
                    Bachelor of Computer Science
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    University Name
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  2015 - 2019
                </span>
              </div>
            </div>
          </section>
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

          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MailIcon className="size-4" />
                hello@example.com
              </a>
              <a
                href="https://github.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubIcon className="size-4" />
                github.com/username
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedInIcon className="size-4" />
                linkedin.com/in/username
              </a>
            </div>
          </section>
        </div>
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
      <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-background border-2 border-muted" />
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

// Icons
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
