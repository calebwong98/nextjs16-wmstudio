import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./_providers/theme-provider";

import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WMStudio Next.js Starter",
    template: "%s | WMStudio",
  },
  description:
    "A production-ready Next.js starter template with authentication, database, and modern UI components.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Starter"],
  authors: [{ name: "WMStudio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WMStudio Next.js Starter",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scrollbar-gutter-stable"
    >
      <body className={`${inter.className} ${styles.gridBackground}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
