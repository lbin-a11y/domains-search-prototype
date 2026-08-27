/**
 * Ambient stubs for internal packages that the source ported from
 * sqsp/config-frontend references in type-only imports.
 *
 * These packages are not published to the registry this prototype installs
 * from, and the imports are erased at build time — they only need to resolve
 * for the type-checker.
 */

declare module '@sqs/business-ai-tools/seo-optimization/provider' {
  export const SEOOptimizationProvider: (props: {
    homepageSEODescription: string;
    homepageSEOTitleFormat: string;
    nonHomepageSEOTitleFormat: string;
    saveImageAltText: (...args: never[]) => unknown;
    savePageMetadata: (...args: never[]) => unknown;
  }) => unknown;
}

declare module '@sqs/websites-constants' {
  export type Domain = Record<string, unknown>;
  export type RegisteringDomain = Record<string, unknown>;
}
