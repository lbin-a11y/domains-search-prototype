import type { I18nUI } from '@sqs/i18n-ui';
import I18nReact from '@sqs/i18n-ui/lib/react';
import I18nNumParser from '@sqs/i18n-ui/lib/number-parser';
import I18nIcuMessageFormatter from '@sqs/i18n-ui/lib/icu-message-formatter';

import { getI18nInstance } from './index';

const i18nInstance: I18nUI = getI18nInstance();

const messageFormatterInstance = new I18nIcuMessageFormatter(i18nInstance);
const i18nReact = new I18nReact(i18nInstance);
const i18nNumParser = new I18nNumParser(i18nInstance);

export const {
  parseNumber,
} = i18nNumParser;

export const {
  T,
  Plural,
  FormattedCurrency,
  FormattedNumber,
} = i18nReact;

export const {
  // Vanilla Formatters
  formatNumber,
  formatCurrency,
  formatCurrencyToParts,
  getCurrencySymbol,
  formatQuantity,
  translate: t,
  pluralize,
}: I18nUI = i18nInstance;

export const { formatIcuMessage } = messageFormatterInstance;
