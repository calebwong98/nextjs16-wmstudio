/**
 * Landing Page
 *
 */

import { SectionHeading } from "./_layout/SectionHeading";
import { ContactCTA, ResumeCTA } from "./_layout/SectionCTA";

import { FeaturedProject } from "./_components/project-featured";
import { ProjectTimeline } from "./_components/project-timeline";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeading title="Featured" />
      <FeaturedProject />

      <SectionHeading title="Schedules" />
      <ProjectTimeline />

      <section className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResumeCTA />
          <ContactCTA />
        </div>
      </section>
    </div>
  );
}
