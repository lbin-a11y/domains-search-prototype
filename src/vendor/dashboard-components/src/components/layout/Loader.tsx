import React from 'react';
import { Flex, FlexProps } from '@sqs/rosetta-primitives';
import { ActivityIndicator, ActivityIndicatorProps } from '@sqs/rosetta-elements';

type Props = Partial<FlexProps & {
  size?: ActivityIndicatorProps['size']
}>;

const Loader: React.FC<Props> = ({ size = 1, ...props }): React.ReactElement => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" margin="auto 0" {...props}>
      <ActivityIndicator size={size} />
    </Flex>
  );
};

export const WidgetLoader: React.FC<Props> = (props) => (
  <Loader
    position="absolute"
    width="100%"
    backgroundColor="rgba(255, 255, 255, 0.5)"
    zIndex={1}
    left={0}
    top={0}
    size={0}
    {...props}
  />
);

export default Loader;
