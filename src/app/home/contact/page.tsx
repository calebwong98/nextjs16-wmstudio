/**
 * Contact Page
 *
 * Personal background, philosophy, and approach to work.
 * Humanizes the portfolio beyond just technical skills.
 */

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Mail } from "lucide-react";

export default function MyContactPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Main Content */}
      <div className="lg:col-span-8">
        {/* Main Headline */}
        {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
          Building interfaces that{" "}
          <span className="text-primary">feel alive</span>
        </h1> */}

        {/* Subheading */}
        {/* <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          I craft high-performance web experiences with obsessive attention to
          detail, smooth animations, and thoughtful interactions. Every pixel
          serves a purpose.
        </p> */}

        {/* Bio */}
        {/* <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg leading-relaxed">
            I'm a frontend engineer and product designer with a passion for
            creating digital experiences that delight users. My work sits at the
            intersection of design and engineering—I care deeply about both how
            things look and how they're built.
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
            reading about design history, or tinkering with generative art. I'm
            always looking for interesting problems to solve and people to
            collaborate with.
          </p>
        </div> */}

        {/* Philosophy */}
        {/* <section className="mb-12">
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
        </section> */}

        {/* Approach */}
        {/* <section>
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
        </section> */}
      </div>

      {/* Sidebar */}
      <aside className="h-fit lg:col-span-4 sticky top-0 space-y-6 py-10">
        {/* Profile Image Placeholder */}
        <div className="aspect-square rounded-2xl bg-muted/50 border border-dashed flex items-center justify-center">
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
        </div>

        {/* Contact */}
        <section className="">
          <div className="space-y-3 text-sm">
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="size-4" />
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
      </aside>
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
