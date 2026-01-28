import Link from "next/link";
import { componentRegistry } from "./components/_registry";

/**
 * Landing Page
 *
 * The main entry point for the portfolio.
 * Showcases the developer's skills with a clean, impactful hero
 * and clear navigation to key sections.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center px-4 sm:px-12">
        <div className="max-w-4xl">
          {/* Overline */}
          <p className="text-muted-foreground text-sm font-mono mb-4 tracking-wider">
            FRONTEND ENGINEER + PRODUCT DESIGNER
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Building interfaces that{" "}
            <span className="text-primary">feel alive</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            I craft high-performance web experiences with obsessive attention to
            detail, smooth animations, and thoughtful interactions. Every pixel
            serves a purpose.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/components"
              className="inline-flex items-center justify-center h-12 px-8 font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              View Components
              <ArrowIcon className="ml-2 size-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center h-12 px-8 font-medium border border-border rounded-lg hover:bg-accent transition-colors"
            >
              See Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Components Preview */}
      <section className="px-4 sm:px-12 pb-16">
        <div className="border-t pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Component Showcase</h2>
              <p className="text-muted-foreground">
                Interactive UI components with live demos and code
              </p>
            </div>
            <Link
              href="/components"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-2"
            >
              View all
              <ArrowIcon className="size-3" />
            </Link>
          </div>

          {/* Component Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentRegistry.slice(0, 3).map((component) => (
              <Link
                key={component.slug}
                href={`/components/${component.slug}`}
                className="group block p-6 rounded-xl border bg-card hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {component.title}
                  </h3>
                  <ArrowIcon className="size-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {component.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {component.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 bg-muted rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills/Expertise Section */}
      <section className="px-4 sm:px-12 pb-16">
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Core Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExpertiseCard
              title="Animation & Motion"
              description="Physics-based animations, micro-interactions, and smooth transitions that enhance UX without sacrificing performance."
            />
            <ExpertiseCard
              title="Component Systems"
              description="Scalable, accessible component architectures with proper composition patterns and design tokens."
            />
            <ExpertiseCard
              title="Performance"
              description="Core Web Vitals optimization, bundle analysis, lazy loading strategies, and rendering performance."
            />
            <ExpertiseCard
              title="TypeScript"
              description="Type-safe codebases with strict mode, generics, and well-defined interfaces for maintainable code."
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 sm:px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <QuickLink
            href="/projects"
            title="Projects"
            description="Real-world applications and case studies"
          />
          <QuickLink
            href="/resume"
            title="Resume"
            description="Experience and qualifications"
          />
          <QuickLink
            href="/about"
            title="About"
            description="Background and philosophy"
          />
        </div>
      </section>
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
        <h3 className="font-semibold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowIcon className="size-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
