export const PACKAGE_NAME = 'home-dashboard';

/**
 * Upstream this `require()`s the package's compiled YAML translation bundles.
 * The prototype ships English only, so the loader resolves to an empty
 * dictionary and every string falls back to the inline source copy.
 */
export function translationsLoader(_translationLocale: string) {
  return {};
}
