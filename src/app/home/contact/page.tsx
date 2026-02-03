/**
 * Contact Page
 */

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  FileText,
  Link2Icon,
  Mail,
  MailIcon,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ContactHeadshot } from "./_components/contact-headshot";

const CONTACT = {
  name: "Wong Jia Le",
  handle: "calebwong98",
  bio: "Hi",
  title: "Frontend Developer",
  location: "Kuala Lumpur, Malaysia",
  timezone: "UTC +08:00",
  responseTime: "within 24 – 48 hours",
  email: "jialewong98@gmail.com",
  website: {
    label: "wmstudio.dev",
    href: "https://wmstudio.dev",
  },
  linkedin: {
    label: "linkedin.com/in/calebwong98",
    href: "https://www.linkedin.com/in/calebwong98",
  },
  github: {
    label: "github.com/calebwong98",
    href: "https://github.com/calebwong98",
  },
  resume: {
    label: "Download Resume (PDF)",
    href: "/resume.pdf",
  },
} as const;

export default function MyContactPage() {
  const mailto = `mailto:${CONTACT.email}`;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 flex-1 mb-4">
        <div className="flex-1 h-full">
          <h2 className="flex gap-1.5 w-full font-medium text-foreground uppercase mb-4">
            <span>[ +</span>
            <span>Profile</span>
            <span>+ ]</span>
            <span className="h-px flex-1 my-auto bg-muted-foreground/40"></span>
          </h2>
          <Card>
            <CardContent className="space-y-4">
              <ContactHeadshot name={CONTACT.name} />

              <div className="text-center">
                <h2 className="text-xl font-bold uppercase">Wong Jia Le</h2>
                <p className="text-sm text-muted-foreground leading-none">
                  @{CONTACT.handle}
                </p>
              </div>

              <div className="flex items-center gap-2 py-4 justify-center">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Applying for Frontend Roles
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{CONTACT.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="size-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {new Date().toLocaleTimeString("en-US", {
                        timeZone: "Asia/Kuala_Lumpur",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      <span className="text-muted-foreground">
                        ({CONTACT.timezone})
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MailIcon className="size-4 mt-0.5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {CONTACT.responseTime}
                  </p>
                </div>
              </div>
            </CardContent>
            {/*
              <CardFooter className="mt-auto">
                <Button disabled asChild variant="outline" className="w-full">
                  <Link href={CONTACT.resume.href} target="_blank" rel="noreferrer">
                    <FileDown className="size-4" /> {CONTACT.resume.label}
                  </Link>
                </Button>
              </CardFooter>
            */}
          </Card>
        </div>

        <div className="flex-2 h-full">
          <h2 className="flex gap-1.5 w-full font-medium text-foreground uppercase mb-4">
            <span>[ +</span>
            <span>Socials</span>
            <span>+ ]</span>
            <span className="h-px flex-1 my-auto bg-muted-foreground/40"></span>
          </h2>
          <div className="space-y-3 text-sm">
            <Link
              href={mailto}
              className="bg-background flex items-center justify-between gap-3 rounded-sm border shadow-sm px-3 py-2 hover:bg-accent/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Mail className="size-4" /> {CONTACT.email}
              </span>
              <Link2Icon className="size-3 text-muted-foreground" />
            </Link>
            <Link
              href={CONTACT.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background flex items-center justify-between gap-3 rounded-sm border shadow-sm px-3 py-2 hover:bg-accent/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <GitHubIcon className="size-4" /> {CONTACT.github.label}
              </span>
              <Link2Icon className="size-3 text-muted-foreground" />
            </Link>
            <Link
              href={CONTACT.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background flex items-center justify-between gap-3 rounded-sm border shadow-sm px-3 py-2 hover:bg-accent/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LinkedInIcon className="size-4" /> {CONTACT.linkedin.label}
              </span>
              <Link2Icon className="size-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="/resume"
        className={cn(
          "shadow-sm h-fit mt-auto lg:col-span-3 group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",

          "bg-card hover:border-foreground/20",
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "size-10 rounded-lg flex items-center justify-center",
            "bg-secondary",
          )}
        >
          <FileText className="size-5" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            View Resume
            <ArrowRight
              className={cn(
                "size-4 opacity-0 -translate-x-2 transition-all",
                "group-hover:opacity-100 group-hover:translate-x-0",
              )}
            />
          </h3>
          <p className={cn("text-sm", "text-muted-foreground")}>
            View my resume to learn more about my experience and skills.
          </p>
        </div>
      </Link>
    </>
  );
}
