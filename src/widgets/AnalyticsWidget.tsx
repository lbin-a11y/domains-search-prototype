import { KeyFigures } from '@sqs/rosetta-compositions';
import { AnalyticsCard } from '@sqs/dashboard-components';
import { businessMetrics } from '../mocks/data';
import { WidgetCard } from './WidgetCard';
import { Button } from '@sqs/rosetta-react/button/next';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

/** Visitors over the last 7 days, for the trend sparkline. */
const VISITOR_TREND = [128, 164, 149, 203, 187, 241, 212];

const priorPeriod = (current: number, changePct: number) =>
  Math.round(current / (1 + changePct / 100));

const AnalyticsWidget = () => {
  const max = Math.max(...VISITOR_TREND);

  return (
    <WidgetCard
      title="Analytics"
      description="Track your performance"
      actions={<Button.Subtle>View analytics</Button.Subtle>}
    >
      <KeyFigures variant="dashboard" sx={{ p: '2px !important', mb: 6 }}>
        <AnalyticsCard
          title="Site visitors"
          currentPeriodCount={businessMetrics.visitorsThisWeek}
          previousPeriodCount={priorPeriod(businessMetrics.visitorsThisWeek, businessMetrics.visitorsChangePct)}
          dateRangeLabel="Last 7 days"
          comparisonInterval="previous 7 days"
        />
        <AnalyticsCard
          title="Revenue"
          currentPeriodCount={businessMetrics.revenueThisMonth}
          previousPeriodCount={priorPeriod(businessMetrics.revenueThisMonth, businessMetrics.revenueChangePct)}
          dateRangeLabel="This month"
          comparisonInterval="last month"
          currencyCode="USD"
        />
        <AnalyticsCard
          title="Bookings"
          currentPeriodCount={businessMetrics.bookingsThisWeek}
          previousPeriodCount={priorPeriod(businessMetrics.bookingsThisWeek, businessMetrics.bookingsChangePct)}
          dateRangeLabel="Last 7 days"
          comparisonInterval="previous 7 days"
        />
      </KeyFigures>

      <Text.Body color="fg.muted" m={0} mb={3}>
        Visitors, last 7 days
      </Text.Body>
      <Flex alignItems="flex-end" gap={2} height="120px">
        {VISITOR_TREND.map((value, index) => (
          <Box
            key={index}
            flex="1"
            height={`${(value / max) * 100}%`}
            backgroundColor="fg.default"
            sx={{ borderRadius: 2, opacity: 0.15 + (index / VISITOR_TREND.length) * 0.6 }}
          />
        ))}
      </Flex>
    </WidgetCard>
  );
};

export default AnalyticsWidget;
