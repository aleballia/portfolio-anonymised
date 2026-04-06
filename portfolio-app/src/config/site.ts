/**
 * Central site copy — override with NEXT_PUBLIC_SITE_TITLE / NEXT_PUBLIC_SITE_ROLE at build time.
 */
export const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? "Portfolio";
export const siteRole = process.env.NEXT_PUBLIC_SITE_ROLE ?? "Product designer";
