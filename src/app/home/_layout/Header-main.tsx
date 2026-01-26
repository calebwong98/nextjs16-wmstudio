import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MainButton() {
  return (
    <Link
      className={cn(buttonVariants({ variant: "default" }), "px-8 text-sm")}
      href="/projects/create"
    >
      Generate Plan
    </Link>
  );
}
