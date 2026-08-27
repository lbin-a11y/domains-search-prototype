import React, { useState } from 'react';

import { Card, Cell, Chip, Stack } from '@sqs/rosetta-elements';
import { Flex, Text, Touchable, TouchableSolidProps } from '@sqs/rosetta-primitives';
import { withRouter, WithRouterComponentProps } from '@sqs/universal-router';
import { getBreakpoint } from '@sqs/rosetta-utilities';
import { useTheme } from '@sqs/rosetta-styled';

import SettingsTitle from './SettingsTitle';
import SettingsPrimaryContent from './SettingsPrimaryContent';
import { t } from '../i18n/helpers';

export type SettingsLandingItem = {
  to: string,
  title: string,
  description: string,
  icon: React.ReactNode,
  detail?: string,
  isNew?: boolean,
};

const Item = ({
  item: {
    to,
    title,
    description,
    icon,
    detail,
    isNew,
  },
  onNavigate,
  onBeforeNavigate,
}: {
  item: SettingsLandingItem,
  onNavigate: (path: string) => void,
  onBeforeNavigate?: (path: string) => void,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colors } = useTheme();

  return (
    <Touchable
      as="a"
      href={`/config${to}`}
      interaction={(props: TouchableSolidProps) => (
        <Touchable.Element.Solid {...props} display="block" width="100%" tabIndex={-1} />
      )}
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        onBeforeNavigate?.(to);
        onNavigate(to);
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      css={{
        display: 'block',
        width: '100%',
        '&:focus-visible': { outline: `2px solid ${colors.gray['100']}` },
      }}
    >
      {/*
        We need to specify the borderColor here to work around a Safari-specific bug (XPS-1687)
        where users were seeing a black border around cards they'd previously visited.
      */}
      <Card sx={{ borderColor: 'gray.800' }}>
        <Cell.Container mx={4}>
          <Cell.Shell>
            <Cell.InteriorPre mr={4} alignSelf="center">
              {icon}
            </Cell.InteriorPre>
            <Cell.Body>
              <Flex flexDirection="row" alignItems="center" gap={1}>
                <Text.Body fontWeight="semibold" my={0}>
                  {title}
                </Text.Body>
                {isNew && (
                  <Chip
                    usage="badge"
                    status="info"
                    label={(
                      <Text.Label color="inherit">
                        {t('new', null, { project: 'global-settings', notes: 'badge label indicating a setting is new' })}
                      </Text.Label>
                    )}
                  />
                )}
                {detail && (
                  <Chip
                    usage="badge"
                    bg={isHovered ? 'gray.700' : 'gray.800'}
                    label={detail}
                    data-testid="settings-landing-card-detail"
                  />
                )}
              </Flex>
              <Text.Body color="gray.300" my={0}>
                {description}
              </Text.Body>
            </Cell.Body>
          </Cell.Shell>
        </Cell.Container>
      </Card>
    </Touchable>
  );
};

const SettingsLanding = ({
  title,
  banner,
  items,
  router,
  onBeforeItemNavigate,
}: {
  title: React.ReactNode,
  banner?: React.ReactNode,
  items: SettingsLandingItem[],
  onBeforeItemNavigate?: (path: string) => void,
} & WithRouterComponentProps) => {
  const { breakpoints } = useTheme();
  const { platform } = getBreakpoint(breakpoints);

  return (
    <SettingsPrimaryContent isSaving={false}>
      <SettingsTitle mb={5}>{title}</SettingsTitle>
      {banner}
      <Stack
        space={2}
        pb={platform === 'mobile' ? 10 : 0}
      >
        {items
          .filter((item) => router.isValidPath(item.to))
          .map((item) => (
            <Item
              item={item}
              onNavigate={(path) => router.push(path)}
              onBeforeNavigate={onBeforeItemNavigate}
              key={item.to}
            />
          ))}
      </Stack>
    </SettingsPrimaryContent>
  );
};

export default withRouter(SettingsLanding);
