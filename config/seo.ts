import { brand } from "./brand";
import { site } from "./site";

export type SeoConfig = {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  canonicalBaseUrl: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  openGraph: {
    type: "website";
    siteName: string;
    image: string;
    imageAlt: string;
    locale: string;
  };
  twitter: {
    card: "summary" | "summary_large_image";
    imageAlt: string;
  };
  sitemap: {
    changefreq: "daily" | "weekly" | "monthly" | "yearly";
    priority: {
      home: number;
      listing: number;
      detail: number;
      page: number;
    };
  };
};

export const seo: SeoConfig = {
  defaultTitle: brand.name,
  titleTemplate: `%s | ${brand.name}`,
  defaultDescription: brand.description,
  canonicalBaseUrl: site.url,
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    siteName: brand.name,
    image: "/favicon.svg",
    imageAlt: `${brand.name} preview image`,
    locale: site.locale
  },
  twitter: {
    card: "summary_large_image",
    imageAlt: `${brand.name} preview image`
  },
  sitemap: {
    changefreq: "weekly",
    priority: {
      home: 1,
      listing: 0.8,
      detail: 0.7,
      page: 0.8
    }
  }
} as const;
