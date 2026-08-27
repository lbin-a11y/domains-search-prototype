import { PACKAGE_NAME } from './shared';

type TranslateParams = Record<string, string | number> | null;

/**
 * Upstream this wires the package into `@sqs/i18n-ui`'s library registry, which
 * expects the V6 bundle to own the translation lifecycle. Outside that bundle
 * there is nothing to register with, so this returns an instance whose
 * `translate` renders the English source string and interpolates `{token}`
 * placeholders — matching what `setupLibrary` resolves to for `en-US`.
 */
type TranslateOptions = { project?: string; notes?: string };

function translate(
  source: string,
  params?: TranslateParams,
  _options?: TranslateOptions,
) {
  if (!params) {
    return source;
  }
  return Object.entries(params).reduce(
    (result, [token, value]) => result.split(`{${token}}`).join(String(value)),
    source,
  );
}

const i18nInstance = { name: PACKAGE_NAME, translate };

export const getI18nInstance = () => i18nInstance;
export const setI18nInstance = () => i18nInstance;
