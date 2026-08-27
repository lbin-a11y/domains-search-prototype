import { I18nUI } from '@sqs/i18n-ui';
import I18nReact from '@sqs/i18n-ui/lib/react';
import I18nIcuMessageFormatter from '@sqs/i18n-ui/lib/icu-message-formatter';

import { getI18nInstance } from './index';

const i18nInstance: I18nUI = getI18nInstance();

const i18nReactInstance: I18nReact = new I18nReact(i18nInstance);
const messageFormatterInstance = new I18nIcuMessageFormatter(i18nInstance);

export const {
  T,
  Plural,
  FormattedCurrency,
  FormattedNumber,
  FormattedMoney
}: I18nReact = i18nReactInstance;

export const {
  // Vanilla Formatters
  formatNumber,
  formatCurrency,
  formatCurrencyToParts,
  getCurrencySymbol,
  formatQuantity,
  translate: t,
  pluralize,
  formatMoney,
}: I18nUI = i18nInstance;

export const { formatIcuMessage } = messageFormatterInstance;