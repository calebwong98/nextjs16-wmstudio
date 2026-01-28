import Link from "next/link";

/**
 * Contact Page
 *
 * Personal background, philosophy, and approach to work.
 * Humanizes the portfolio beyond just technical skills.
 */
export default function MyContactPage() {
  return (
    <div className="px-4 sm:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
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

          {/* Bio */}
          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-lg leading-relaxed">
              I'm a frontend engineer and product designer with a passion for
              creating digital experiences that delight users. My work sits at
              the intersection of design and engineering—I care deeply about
              both how things look and how they're built.
            </p>

            <p>
              Over the past 6 years, I've worked with startups and established
              companies to build products used by millions. I specialize in
              component architecture, animation systems, and performance
              optimization. I believe the best interfaces are invisible—they get
              out of the way and let users accomplish their goals effortlessly.
            </p>

            <p>
              When I'm not coding, you'll find me exploring new coffee shops,
              reading about design history, or tinkering with generative art.
              I'm always looking for interesting problems to solve and people to
              collaborate with.
            </p>
          </div>

          {/* Philosophy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Design Philosophy</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PhilosophyCard
                title="Performance is a feature"
                description="Users don't think about load times—they just notice when things feel slow. I obsess over bundle sizes, render performance, and perceived speed."
              />
              <PhilosophyCard
                title="Motion with purpose"
                description="Animation should guide attention, provide feedback, and create continuity. Every transition needs to earn its place by improving clarity."
              />
              <PhilosophyCard
                title="Accessible by default"
                description="Good design works for everyone. I build with keyboard navigation, screen readers, and reduced motion preferences in mind from the start."
              />
              <PhilosophyCard
                title="Simple > Clever"
                description="The best code is code that's easy to understand and maintain. I favor explicit patterns over magic, composition over inheritance."
              />
            </div>
          </section>

          {/* Approach */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How I Work</h2>

            <div className="space-y-6">
              <ProcessStep
                number="01"
                title="Understand the problem"
                description="Before writing any code, I dig into user needs, business constraints, and technical requirements. The best solutions come from deeply understanding the problem space."
              />
              <ProcessStep
                number="02"
                title="Prototype quickly"
                description="I build rough versions fast to validate ideas. Static mockups can't capture how interactions feel—working prototypes reveal issues early."
              />
              <ProcessStep
                number="03"
                title="Iterate with feedback"
                description="Design is a conversation. I ship early, gather feedback, and refine. The first version is never the final version."
              />
              <ProcessStep
                number="04"
                title="Polish the details"
                description="The difference between good and great is in the details. Micro-interactions, error states, edge cases—these are where craft lives."
              />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          {/* Profile Image Placeholder */}
          <div className="aspect-square rounded-2xl bg-muted/50 border border-dashed flex items-center justify-center mb-8">
            <span className="text-sm text-muted-foreground">Photo</span>
          </div>

          {/* Quick Facts */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Location
              </h3>
              <p className="font-medium">Malaysia (GMT+8)</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h3>
              <p className="font-medium flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-500" />
                Open to opportunities
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Currently
              </h3>
              <p className="text-sm">
                Building design systems and exploring WebGL
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Animation",
                  "Typography",
                  "Coffee",
                  "Generative Art",
                  "Photography",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="text-xs px-2 py-1 bg-muted rounded-md"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <section className="pt-6">
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

          {/* Contact CTA */}
          <div className="pt-6">
            <a
              href="mailto:hello@example.com"
              className="w-full inline-flex items-center justify-center h-11 px-6 font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PhilosophyCard({
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

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6">
      <span className="text-4xl font-bold text-muted/50">{number}</span>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
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
