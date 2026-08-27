import React from 'react';
import { BoxProps, Flex } from '@sqs/rosetta-primitives';
import { WidgetBorderRadius, WidgetSpacingY } from './constants';

type Props = Partial<BoxProps> & {
  title: string
};

const WidgetPlaceholder: React.FC<Props> = ({
  title,
  ...props
}) => {
  return (
    <Flex
      maxWidth="100%"
      height="88px" // temporary height
      p={1}
      mb={WidgetSpacingY}
      border={1}
      borderColor="gray.800"
      borderRadius={WidgetBorderRadius}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {title}
    </Flex>
  );
};

export default WidgetPlaceholder;
