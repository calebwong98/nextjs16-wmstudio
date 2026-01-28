"use client";

import Copyright from "@/components/shared/copyright";
import FooterLinks from "./Footer-links";

export default function Footer() {
  return (
    <>
      <footer className="mt-auto container mx-auto px-4 sm:px-8 py-8">
        <div className="bg-card rounded-lg p-6 flex flex-col gap-6">
          <FooterLinks
            githubUrl="https://github.com/yourusername"
            linkedinUrl="https://linkedin.com/in/yourusername"
            twitterUrl="https://twitter.com/yourusername"
            emailUrl="mailto:hello@wmstudio.dev"
            iconSize={6}
            className="mx-auto sm:ml-auto sm:mr-0"
          />
        </div>
        <Copyright className="w-full text-center sm:text-right pt-4" />
      </footer>
    </>
  );
}
