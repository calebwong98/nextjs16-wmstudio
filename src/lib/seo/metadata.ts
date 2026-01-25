import type { Metadata } from "next";

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  links?: {
    twitter?: string;
    github?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "WMStudio Next.js Starter",
  description:
    "A production-ready Next.js starter template with authentication, database, and modern UI components.",
  url: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    // twitter: "https://twitter.com/yourhandle",
    // github: "https://github.com/wmstudio/wmstudio-nextjs-starter",
  },
};

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Creates consistent metadata for pages
 *
 * @example
 * // In a page.tsx file:
 * export const metadata = createMetadata({
 *   title: "Dashboard",
 *   description: "View your dashboard",
 * });
 */
export function createMetadata({
  title,
  description,
  image,
  noIndex = false,
  keywords = [],
}: CreateMetadataOptions = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...keywords, "Next.js", "React", "TypeScript"],
    authors: [{ name: "WMStudio" }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: metaImage
        ? [
            {
              url: metaImage,
              width: 1200,
              height: 630,
              alt: metaTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: metaImage ? [metaImage] : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Creates metadata for pages that should not be indexed
 *
 * @example
 * export const metadata = createNoIndexMetadata({
 *   title: "Admin Dashboard",
 * });
 */
export function createNoIndexMetadata(
  options: Omit<CreateMetadataOptions, "noIndex"> = {},
): Metadata {
  return createMetadata({ ...options, noIndex: true });
}
