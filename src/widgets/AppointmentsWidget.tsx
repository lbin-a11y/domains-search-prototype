import { KeyFigures } from '@sqs/rosetta-compositions';
import { AnalyticsCard, TableRowCard } from '@sqs/dashboard-components';
import { businessMetrics, upcomingAppointments } from '../mocks/data';
import { WidgetCard } from './WidgetCard';
import { Button } from '@sqs/rosetta-react/button/next';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Text } from '@sqs/rosetta-react/text/next';

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

/**
 * The salon's booking schedule. This is the module a services seller opens the
 * dashboard for once the business is running.
 */
const AppointmentsWidget = () => (
  <WidgetCard
    title="Appointments"
    description="Your next bookings"
    actions={<Button.Subtle>View calendar</Button.Subtle>}
  >
    <KeyFigures variant="dashboard" sx={{ p: '2px !important', mb: 5 }}>
      <AnalyticsCard
        title="Bookings"
        currentPeriodCount={businessMetrics.bookingsThisWeek}
        previousPeriodCount={Math.round(
          businessMetrics.bookingsThisWeek / (1 + businessMetrics.bookingsChangePct / 100),
        )}
        dateRangeLabel="This week"
        comparisonInterval="last week"
      />
      <AnalyticsCard
        title="New clients"
        currentPeriodCount={businessMetrics.newClientsThisMonth}
        previousPeriodCount={Math.round(
          businessMetrics.newClientsThisMonth / (1 + businessMetrics.newClientsChangePct / 100),
        )}
        dateRangeLabel="This month"
        comparisonInterval="last month"
      />
    </KeyFigures>

    <Box as="table" role="table" width="100%" sx={{ borderCollapse: 'collapse' }}>
      {/* TableRowCard renders a <tr>, so it needs an explicit row-group parent. */}
      <Box as="tbody">
        {upcomingAppointments.map((appointment) => {
        const at = new Date(appointment.at);
        return (
          <TableRowCard key={appointment.id}>
            <TableRowCard.Header>
              <Text.Body fontWeight="medium" m={0}>
                {appointment.client}
              </Text.Body>
              <Text.Body m={0}>{`USD ${appointment.price}`}</Text.Body>
            </TableRowCard.Header>
            <TableRowCard.Body>
              <Flex gap={4} flexWrap="wrap">
                <Text.Body color="fg.muted" m={0}>
                  {appointment.service}
                </Text.Body>
                <Text.Body color="fg.muted" m={0}>
                  {`${dayFormatter.format(at)} at ${timeFormatter.format(at)}`}
                </Text.Body>
                <Text.Body color="fg.muted" m={0}>
                  {`${appointment.durationMinutes} min`}
                </Text.Body>
              </Flex>
            </TableRowCard.Body>
          </TableRowCard>
          );
        })}
      </Box>
    </Box>

    <Box mt={4}>
      <Button.Subtle>Add appointment</Button.Subtle>
    </Box>
  </WidgetCard>
);

export default AppointmentsWidget;
