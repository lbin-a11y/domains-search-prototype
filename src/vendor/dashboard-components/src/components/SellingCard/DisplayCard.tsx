import React from 'react';

import { Card } from '@sqs/rosetta-elements';
import ImageSection from './ImageSection';
import TextSection from './TextSection';
import { CardProps } from './types';
import { WidgetBorderRadius } from '../layout';

// Card component for use in the PageHeader
export default ({ title, subtitle, src, alt, children, onClick, ...rest }: CardProps) => {
  return (
    <Card
      borderRadius={WidgetBorderRadius}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      width="sizes.700"
      tabIndex={0}
      onClick={onClick}
      {...rest}
    >
      {src && <ImageSection src={src} alt={alt} />}
      <TextSection title={title} subtitle={subtitle} />
    </Card>
  );
};
