import React from 'react';
import { KeyFigures } from '@sqs/rosetta-compositions';
import { TextLink } from '@sqs/rosetta-elements';
import { useFormatters } from '@sqs/i18n-react';
import useI18n from '../i18n';
import AnalyticsCaption from './AnalyticsCaption';
// Imported from the constants module rather than the `layout` barrel: the
// barrel also re-exports PageHeader, which reaches for @sqs/clarkson-chat.
import { WidgetBorderRadius } from './layout/constants';
import { AnalyticsEventIdentifier } from '../types';

const { Title, Figure, Footer, Subtitle } = KeyFigures.Card;

export type AnalyticsCardProps = {
  isError?: boolean,
  currentPeriodCount?: number,
  previousPeriodCount?: number,
  title: string,
  dateRangeLabel: string,
  comparisonInterval: string,
  currencyCode?: string,
  accessory?: {
    onClick: ()=> void,
    label?: string,
    dataTestId?: string
  },
  dataTestId?: string,
  hideFooter?: boolean,
  isPercentage?: boolean,
  emptyString?: string,
} & AnalyticsEventIdentifier;

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  isError,
  currentPeriodCount,
  previousPeriodCount,
  title,
  dateRangeLabel,
  comparisonInterval,
  currencyCode,
  accessory,
  dataTestId,
  hideFooter,
  isPercentage,
  emptyString
}) => {
  const { t } = useI18n();
  const { formatCurrency, formatDecimal } = useFormatters();

  const isLoading = currentPeriodCount === undefined || previousPeriodCount === undefined;

  const errorMessage = t(
    'Something went wrong. Refresh the page to try again.',
    null,
    { project: 'dashboard-components' }
  );

  function getAmount() {
    if (isLoading) {
      return '';
    }

    if (currencyCode) {
      const amount = formatCurrency(currentPeriodCount, currencyCode, { maximumFractionDigits: 0 });
      return amount;
    }

    return formatDecimal(currentPeriodCount, isPercentage ? { style: 'percent' } : {});
  }

  return (
    <KeyFigures.Card
      borderRadius={WidgetBorderRadius}
      data-testid={dataTestId}
      isActive
      figure={(emptyString || isError) ? <Figure/> : <Figure m={0}>{getAmount()}</Figure>}
      footer={(!hideFooter && !emptyString && !isError) && (
        <Footer
          accessory={accessory && (
            <Footer.Accessory>
              <TextLink
                onClick={accessory.onClick}
                tabIndex={0}
                textStyle="caption"
                data-testid={accessory.dataTestId}
                onKeyDown={({ key }) => {
                  if (key === 'Enter') {
                    accessory.onClick();
                  }
                }}
              >
                {accessory.label || t('View All', null, { project: 'dashboard-components' })}
              </TextLink>
            </Footer.Accessory>
          )}
          caption={(
            <AnalyticsCaption
              currentPeriodCount={currentPeriodCount}
              previousPeriodCount={previousPeriodCount}
              comparisonInterval={comparisonInterval}
            />
          )}
        />
      )}
      sx={{
        ...(hideFooter && {
          pb: 4 })
      }}
      title={<Title mt={0} mb={1}>{title}</Title>}
      subtitle={<Subtitle m={0}>{isError ? errorMessage : (emptyString || dateRangeLabel)}</Subtitle>}
      width="auto"
      flex={1}
    />
  );
};

export default AnalyticsCard;
