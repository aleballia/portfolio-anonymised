import type { Metadata } from "next";
import { siteTitle, siteRole } from "./site";

export const rootMetadata: Metadata = {
  title: {
    default: `${siteTitle} | ${siteRole}`,
    template: `%s | ${siteTitle}`,
  },
  description: `A ${siteRole.toLowerCase()} portfolio focused on strategy, execution, and AI-driven products.`,
  robots: {
    index: true,
    follow: true,
  },
};
