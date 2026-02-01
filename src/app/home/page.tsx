import { CTASection } from "./_components/cta-section";
import { EventPlanner } from "./_components/event-planner";

/**
 * Landing Page
 *
 * Frontend Developer portfolio landing page.
 * Showcases skills, tech stack, and featured projects
 * to attract potential employers and opportunities.
 */

export default function HomePage() {
  return (
    <div className="flex flex-col my-auto">
      <EventPlanner />

      <CTASection />
    </div>
  );
}
