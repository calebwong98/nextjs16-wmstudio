import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Quick navigation link card
 */
export function QuickLink({
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
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="size-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
