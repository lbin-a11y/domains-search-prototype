// See https://i18n-docs.squarespace.net/docs/setting-up-a-library#i18nindexjs
import { setupLibrary } from '@sqs/i18n-ui/lib/library-helpers';
import { setI18nInstance as setUniversalUiI18nInstance } from '@sqs/universal-ui/i18n';
import type { I18nInstanceAccessors, SetI18nInstanceOptions } from '@sqs/i18n-ui/lib/library-helpers';
import type { TranslationDictionary, I18nUI } from '@sqs/i18n-ui';

const PACKAGE_NAME = 'config-persistent-navigation';

function translationsLoader(translationLocale: string): TranslationDictionary {
  // Make a dynamic request via a `require()` statement to load locale-specific translations
  // Should point to the location of your translated YAML files
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(`../../sqs-i18n-translations/strings/${PACKAGE_NAME}.${translationLocale}.yaml`);
}

const {
  // Getter function for i18nInstance, this will be used by your library
  getI18nInstance,
  // Setter function for the shared i18nInstance, other consumers/applications that
  // use your library will call this to set a different i18nInstance for your library.
  setI18nInstance: setConfigPersistentNavigationI18nInstance,
}: I18nInstanceAccessors = setupLibrary(PACKAGE_NAME, translationsLoader);

const setI18nInstance = (i18nInstance: I18nUI, options?: SetI18nInstanceOptions) => {
  setUniversalUiI18nInstance(i18nInstance, options);
  setConfigPersistentNavigationI18nInstance(i18nInstance, options);
};

export {
  getI18nInstance,
  setI18nInstance
};
