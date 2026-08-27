import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Link, buildAriaAttributes, buildDataAttributes } from '@sqs/universal-router';
import { Touchable, type TouchableProps } from '@sqs/rosetta-primitives';

import { getTestId } from '../utils/testUtils';
import { getKey, isAccordion, isExternalLink } from '../utils/navItemUtils';
import type { PrimaryItemConfigType, SecondaryItemConfigType } from '../types/NavigationTypes';

type NavItemTouchableProps = {
  item: PrimaryItemConfigType | SecondaryItemConfigType;
  children: ReactNode;
  isSelected: boolean;
  isFocusable?: boolean;
  focusStateOffsetSize?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  hasInteraction?: boolean;
  interaction?: TouchableProps['interaction'];
  sx?: Record<string, any>;
};

const FOCUS_STATE_OFFSET_PX = 6;

const buildAnchorTagProps = (props: ComponentPropsWithoutRef<'a'>) => ({ as: 'a', ...props });
const buildLinkProps = (props: ComponentPropsWithoutRef<typeof Link>) => ({ as: Link, ...props });

function getComponentProps(
  item: PrimaryItemConfigType | SecondaryItemConfigType,
  isSelected: boolean,
): Record<string, unknown> {
  const ariaAttributes = item.ariaAttributes ?? {};

  // Warning: These test attributes are being used by e2e tests.
  // Be careful not to overrite/when updating them.
  const dataAttributes = {
    test: getTestId(getKey(item), item.title),
    ...'dataAttributes' in item ? item.dataAttributes : {}
  };

  const className = 'className' in item ? item.className : undefined;

  if (isExternalLink(item)) {
    return buildAnchorTagProps({
      href: item.href,
      target: item.target,
      className,
      ...buildAriaAttributes(ariaAttributes),
      ...buildDataAttributes(dataAttributes),
    });
  }

  const to = isAccordion(item) ? '' : item.to;

  return buildLinkProps({
    to,
    className,
    ariaAttributes: {
      ...ariaAttributes,
      current: isSelected ? 'true' : undefined,
    },
    dataAttributes,
  });
}

const NavItemTouchable = ({
  item,
  children,
  isSelected,
  focusStateOffsetSize = FOCUS_STATE_OFFSET_PX,
  onClick,
  hasInteraction = true,
  interaction = (touchableProps: any) => (
    <Touchable.Underline
      {...touchableProps}
      backgroundColor={isSelected ? undefined : 'gray.400'}
      isActive={isSelected ? true : undefined}
    />
  ),
  sx,
}: NavItemTouchableProps) => {
  const componentProps = getComponentProps(item, isSelected);

  return (
    <Touchable
      {...componentProps}
      interaction={hasInteraction ? interaction : undefined}
      sx={{
        position: 'relative',
        transition: 'opacity 0.2s',
        '&:focus-visible:after': {
          border: 2,
          borderColor: 'fg.default',
          boxSizing: 'border-box',
          top: `-${focusStateOffsetSize}px`,
          content: '""',
          height: `calc(100% + ${focusStateOffsetSize * 2}px)`,
          position: 'absolute',
          width: `calc(100% + ${focusStateOffsetSize * 2}px)`,
          left: `-${focusStateOffsetSize}px`,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Touchable>
  );
};

export default NavItemTouchable;