import { seo } from "@config/seo";
import { withBase } from "./url";

export type PageSeo = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
  ogImage?: string;
};

export function getSeoMeta(pageSeo: PageSeo = {}) {
  const title = pageSeo.title
    ? seo.titleTemplate.replace("%s", pageSeo.title)
    : seo.defaultTitle;
  const description = pageSeo.description ?? seo.defaultDescription;
  const canonicalUrl = new URL(
    withBase(pageSeo.canonicalPath ?? "/"),
    seo.canonicalBaseUrl
  ).toString();
  const imagePath = pageSeo.ogImage ?? seo.openGraph.image;
  const image = new URL(withBase(imagePath), seo.canonicalBaseUrl).toString();

  return {
    title,
    description,
    canonicalUrl,
    image,
    robots: {
      index: pageSeo.noindex ? false : seo.robots.index,
      follow: seo.robots.follow
    }
  };
}
