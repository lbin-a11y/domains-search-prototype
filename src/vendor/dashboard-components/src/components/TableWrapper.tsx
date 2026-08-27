import React from 'react';
import { Card, CardProps } from '@sqs/rosetta-elements';
import { ArrowRight } from '@sqs/rosetta-icons';
import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
import { useIsMobile } from '../hooks/usePlatform';
import useI18n from '../i18n';
import { WidgetBorderRadius } from './layout';
import { useUnsafeAnalyticEvents } from '../utils/eventing/provider';
import { useWidgetInView } from '../utils/eventing/hooks/useWidgetInView';
import { AnalyticsEventIdentifier } from '../types';
import { withValidEventIdentifier } from '../utils/eventing/helpers';

type Props = CardProps & {
  title: string;
  onViewAllClick: () => void;
} & AnalyticsEventIdentifier;

const TableWrapper = ({ title, children, onViewAllClick, eventIdentifier, ...props }: Props) => {
  const isMobile = useIsMobile();
  const { T } = useI18n();
  const { events } = useUnsafeAnalyticEvents();

  const { ref } = useWidgetInView({
    payload: eventIdentifier ? {
      widgetName: eventIdentifier,
    } : null
  });

  const handleViewAllClick = () => {
    onViewAllClick();
    withValidEventIdentifier(eventIdentifier, (validEventId) => {
      events?.userClicksViewAll({ widgetName: validEventId });
    });
  };

  const viewAllButton = (
    <Button.Tertiary
      size={isMobile ? 'small' : 'large'}
      onClick={handleViewAllClick}
      sx={{
        alignSelf: 'flex-start',
        mt: 0,
        mb: 0,
        ...(isMobile && {
          mt: 2,
        })
      }}
    >
      <T project="dashboard-components">View All</T>
      <ArrowRight color="currentColor" sx={{ ml: 2 }} />
    </Button.Tertiary>
  );

  return (
    <Card
      sx={{
        p: 5,
        pb: 0,
        borderRadius: WidgetBorderRadius,
        width: '100%',
        ...(isMobile && {
          borderWidth: 0,
          p: 0
        })
      }}
      {...props}
    >
      <Flex
        ref={ref}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
          mt: -2,
          borderBottom: 1,
          borderColor: 'gray.800',
          ...(isMobile && {
            borderBottom: 0,
            pb: 0,
            mt: 0,
            mb: 2
          })
        }}
      >
        <Text.Subtitle m={0}>{title}</Text.Subtitle>
        {!isMobile ? viewAllButton : null}
      </Flex>
      <Box
        css={{
          // prevent table's last row's bottom border from stacking with card's border
          ...(!isMobile && { 'tr:last-child': { borderBottom: 0 } }),
        }}
      >
        {children}
      </Box>
      {isMobile ? viewAllButton : null}
    </Card>
  );
};

export default TableWrapper;
