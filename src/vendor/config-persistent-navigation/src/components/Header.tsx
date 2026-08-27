import React from 'react';
import { Flex } from '@sqs/rosetta-primitives';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = (props: HeaderProps) => (
  props.children ? (
    <Flex
      // Ensure height doesn't change when switching in/out of edit mode.
      minHeight="84px"
      px={6}
      pb={10}
      justifyContent="space-between"
    >
      {props.children}
    </Flex>
  ) : null
);

export default Header;