import React from 'react';

import { Image } from '@sqs/rosetta-elements';
import { Flex } from '@sqs/rosetta-primitives';

type ImageSectionProps = {
  src: string;
  alt?: string;
  sx?: Record<string, any>;
};

export default ({ src, alt, sx }: ImageSectionProps) => (
  <Flex
    justifyContent="center"
    backgroundColor="gray.900"
    overflow="hidden"
    p={6}
    sx={sx}
  >
    <Image
      borderRadius={6}
      src={src}
      alt={alt}
      width="100%"
    />
  </Flex>
);
