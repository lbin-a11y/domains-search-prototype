import { useTranslateWithTranslationLoader } from '@sqs/i18n-react';
import type { TranslationHelpers } from '@sqs/i18n-react';

/**
 * Upstream this `require()`s the package's compiled YAML translation bundles.
 * The prototype ships English only, so the loader resolves to an empty
 * dictionary and every string falls back to the inline source copy.
 */
function translationsLoader(_translationLocale: string) {
  return {};
}

export default function useI18n(): TranslationHelpers {
  return useTranslateWithTranslationLoader(translationsLoader);
}
