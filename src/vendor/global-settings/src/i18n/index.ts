import { setupLibrary, type I18nInstanceAccessors } from '@sqs/i18n-ui/lib/library-helpers';
import type { TranslationDictionary } from '@sqs/i18n-ui';

const PACKAGE_NAME = 'global-settings';

function translationsLoader(translationLocale: string): TranslationDictionary {
  // Make a dynamic request via a `require()` statement to load locale-specific translations
  // Should point to the location of your translated YAML files
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(`../../sqs-i18n-translations/strings/${PACKAGE_NAME}.${translationLocale}.yaml`);
}

const { getI18nInstance, setI18nInstance }: I18nInstanceAccessors = setupLibrary(
  PACKAGE_NAME,
  translationsLoader,
);

export { getI18nInstance, setI18nInstance };
