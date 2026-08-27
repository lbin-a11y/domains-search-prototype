import { useTranslateWithTranslationLoader } from '@sqs/i18n-react';
import type { TranslationHelpers } from '@sqs/i18n-react';
import { getI18nInstance } from './legacy';
import { translationsLoader } from './shared';

const { translate: t } = getI18nInstance();

function useI18n() : TranslationHelpers {
  return useTranslateWithTranslationLoader(translationsLoader);
}

export { useI18n, t };
