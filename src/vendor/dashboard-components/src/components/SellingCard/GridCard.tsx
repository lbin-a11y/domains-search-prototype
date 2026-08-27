import React, { useState } from 'react';
import { Card } from '@sqs/rosetta-elements';
import { ArrowRight } from '@sqs/rosetta-icons';
import { useTheme } from '@sqs/rosetta-styled';
import { handleEnterKeyDown } from '@sqs/universal-utils';
import useI18n from '../../i18n';
import TextSection from './TextSection';
import ImageSection from './ImageSection';
import { CardProps } from './types';
import { WidgetBorderRadius } from '../layout';

export default ({ title, subtitle, onClick, src, alt, children, sx, ...rest }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useI18n();
  const { shadows } = useTheme();

  return (
    <Card
      borderRadius={WidgetBorderRadius}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleEnterKeyDown(() => onClick?.())}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        ...(onClick && {
          '&:hover, &:focus-within': {
            transform: 'translateY(-2px)',
            cursor: 'pointer',
            // @ts-expect-error invalid key for shadows
            'box-shadow': shadows['light.100'],
          }
        }),
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease',
        ...sx
      }}
      role="listitem"
      {...rest}
    >
      <TextSection
        title={title}
        subtitle={subtitle}
        accessory={isHovered ? (
          <ArrowRight
            aria-label={t('arrow icon', null, {
              project: 'dashboard-components'
            })}
            role="img"
          />
        ) : undefined}
        sx={{
          minHeight: 160
        }}
      />
      {src && <ImageSection src={src} alt={alt} />}
      {children}
    </Card>
  );
};
