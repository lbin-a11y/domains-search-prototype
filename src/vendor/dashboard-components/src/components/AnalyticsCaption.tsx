import React from 'react';
import { KeyFigures } from '@sqs/rosetta-compositions';
import { ArrowUpRight, ArrowDownRight, Minus } from '@sqs/rosetta-glyphs';
import { useFormatters } from '@sqs/i18n-react';
import { rosetta } from '@sqs/rosetta-themes';
import useI18n from '../i18n';

const { Footer } = KeyFigures.Card;
const { colors } = rosetta.default;

enum ChangeTypes {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

const ChangeUi = {
  [ChangeTypes.POSITIVE]: {
    color: colors.green[300],
    Glyph: ArrowUpRight
  },
  [ChangeTypes.NEGATIVE]: {
    color: colors.red[300],
    Glyph: ArrowDownRight
  },
  [ChangeTypes.NEUTRAL]: {
    color: colors.gray[300],
    Glyph: Minus
  },
};

export type AnalyticsCaptionProps = {
  currentPeriodCount?: number,
  previousPeriodCount?: number,
  comparisonInterval: string,
};

const AnalyticsCaption: React.FC<AnalyticsCaptionProps> = ({
  currentPeriodCount = 0,
  previousPeriodCount = 0,
  comparisonInterval
}) => {
  const { formatQuantity } = useFormatters();
  const { t } = useI18n();

  const changePercentage = (currentPeriodCount - previousPeriodCount) / previousPeriodCount * 100;
  const isNeutral = changePercentage === 0 || isNaN(changePercentage);
  const isInfinite = changePercentage === Infinity;

  const changeType = isNeutral ? ChangeTypes.NEUTRAL :
    changePercentage < 0 ?
      ChangeTypes.NEGATIVE :
      ChangeTypes.POSITIVE;

  const { Glyph, color } = ChangeUi[changeType];

  return (
    <Footer.Caption
      color={color}
      display="inline-flex"
      gap={1}
      m={0}
    >
      <Glyph sx={{ color: 'inherit' }} />
      {isNeutral ?
        t('No change', null, { project: 'dashboard-components' }) : (
          <>
            {formatQuantity({
              // When the previous period had a count of zero and the current period has a non-zero count,
              // the change percentage is Infinity. When this is the case, we show the user a 100% increase.
              // This is not completely accurate, but this is what design platform suggested.
              value: isInfinite ? 100 : changePercentage,
              unit: 'percent'
            }, {
              length: 'narrow',
              maximumFractionDigits: 0
            })} {comparisonInterval}
          </>
        )
      }
    </Footer.Caption>
  );
};

export default AnalyticsCaption;
