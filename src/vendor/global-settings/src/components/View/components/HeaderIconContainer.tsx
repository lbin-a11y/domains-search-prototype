import React from 'react';

import { Flex } from '@sqs/rosetta-primitives';
/*
All items in the Header must match a 36px box size to ensure the
vertical centering is aligned. This helper component ensures that
icons stay centered in the 36px box
 */
const HeaderIconContainer: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Flex height="sizes.200" justifyContent="center" alignItems="center">
    {children}
  </Flex>
);

export default HeaderIconContainer;
