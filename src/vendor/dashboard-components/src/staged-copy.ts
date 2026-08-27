/* eslint-disable @typescript-eslint/no-unused-vars */
import useI18n from './i18n';

const useStagedCopy = () => {
  const { t } = useI18n();

  const keyFiguresErrorMessage = t(
    'Something went wrong. Refresh the page to try again.',
    null,
    { project: 'dashboard-components' }
  );
};
