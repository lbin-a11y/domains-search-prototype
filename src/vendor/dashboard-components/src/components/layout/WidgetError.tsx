import React from 'react';
import { Text, Flex, FlexProps } from '@sqs/rosetta-primitives';
import useI18n from '../../i18n';
import { WidgetSpacingY } from './constants';

type Props = Partial<FlexProps>;

const WidgetError: React.FC<React.PropsWithChildren<Props>> = ({ children, ...props }) => {
  const { T } = useI18n();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      border={1}
      borderColor={'gray.800'}
      p={3}
      mb={WidgetSpacingY}
      {...props}
    >
      <Text.Body textAlign="center">
        {children || (
          <T project="dashboard-components">
            There was a problem loading this widget. Please try again later.
          </T>
        )}
      </Text.Body>
    </Flex>
  );
};

export default WidgetError;


