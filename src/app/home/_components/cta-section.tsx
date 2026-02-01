import { Mail, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CTACard = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  variant: "primary" | "secondary";
};

const ctaCards: CTACard[] = [
  {
    icon: <FileText className="size-5" />,
    title: "View Resume",
    description: "Download my detailed resume with work history and skills",
    href: "/resume",
    variant: "secondary",
  },
  {
    icon: <Mail className="size-5" />,
    title: "Let's Talk!",
    description: "Connect with me through socials",
    href: "/contact",
    variant: "primary",
  },
];

/**
 * CTA Section
 *
 * Call-to-action cards for resume and contact
 */
export function CTASection() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ctaCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={cn(
              "group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-1",
              card.variant === "primary"
                ? "bg-foreground text-background border-foreground"
                : "bg-card hover:border-foreground/20",
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "size-10 rounded-lg flex items-center justify-center",
                card.variant === "primary"
                  ? "bg-background/10"
                  : "bg-secondary",
              )}
            >
              {card.icon}
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {card.title}
                <ArrowRight
                  className={cn(
                    "size-4 opacity-0 -translate-x-2 transition-all",
                    "group-hover:opacity-100 group-hover:translate-x-0",
                  )}
                />
              </h3>
              <p
                className={cn(
                  "text-sm",
                  card.variant === "primary"
                    ? "text-background/70"
                    : "text-muted-foreground",
                )}
              >
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
