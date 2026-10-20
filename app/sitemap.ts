import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/how-it-works", "/learners", "/employers", "/sponsors", "/tracks", "/portfolio/sample", "/outcomes", "/about", "/faq", "/contact", "/apply", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
