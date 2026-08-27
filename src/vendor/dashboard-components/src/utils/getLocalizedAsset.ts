import type { SupportedTranslationLocale } from '@sqs/i18n-locale-list';
import { getAccountContext } from '@sqs/config-context/account';

const defaultLocale = 'en-US';

type RequiredAssets = { [defaultLocale]: string };

type AdditionalAssets = Record<SupportedTranslationLocale, string>;

export type LocalizedAssets = RequiredAssets & Partial<AdditionalAssets>;

const getLocalizedAsset = (localizedAssets: LocalizedAssets): string => {
  const preferredLocale = getAccountContext()?.authenticatedAccount?.preferredLocale;
  const fallbackAsset = localizedAssets[defaultLocale];
  const preferredAsset = preferredLocale && localizedAssets[preferredLocale];
  return preferredAsset || fallbackAsset;
};

export default getLocalizedAsset;
