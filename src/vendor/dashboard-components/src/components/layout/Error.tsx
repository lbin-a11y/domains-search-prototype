import React from 'react';
import { Text, Flex, FlexProps } from '@sqs/rosetta-primitives';
import useI18n from '../../i18n';

type Props = Partial<FlexProps>;

const Error: React.FC<React.PropsWithChildren<Props>> = ({ children, ...props }) => {
  const { T } = useI18n();
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" {...props}>
      <Text.Subtitle>
        {children || (
          <T project="dashboard-components">
            Something went wrong. Please try again later.
          </T>
        )}
      </Text.Subtitle>
    </Flex>
  );
};

export default Error;


