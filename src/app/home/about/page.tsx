import Link from "next/link";

/**
 * About Page
 *
 * Personal background, philosophy, and approach to work.
 * Humanizes the portfolio beyond just technical skills.
 */
export default function AboutPage() {
  return (
    <div className="px-4 sm:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
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

            {/* Contact CTA */}
            <div className="pt-6 border-t">
              <a
                href="mailto:hello@example.com"
                className="w-full inline-flex items-center justify-center h-11 px-6 font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
            </div>
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
