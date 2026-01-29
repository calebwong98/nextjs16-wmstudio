"use client";

import Copyright from "@/components/shared/copyright";

export default function Footer() {
  return (
    <>
      <footer className="mt-auto container mx-auto px-4 sm:px-8 py-8">
        <Copyright className="w-full text-center sm:text-right pt-4" />
      </footer>
    </>
  );
}
