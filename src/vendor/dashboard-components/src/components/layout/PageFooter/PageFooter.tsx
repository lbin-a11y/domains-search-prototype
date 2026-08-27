import React from 'react';
import { ThemeContext, useTheme } from '@sqs/rosetta-styled';
import { rosetta } from '@sqs/rosetta-themes';
import { isPristineEnabled, pristineDark } from '@sqs/rosetta-pristine-theme';
import { Grid, TextLink } from '@sqs/rosetta-elements';
import { Flex, Text } from '@sqs/rosetta-primitives';
import { useUnsafeAnalyticEvents } from '../../../utils/eventing/provider';
import { withValidEventIdentifier } from '../../../utils/eventing/helpers';
import { AnalyticsEventIdentifier } from '../../../types';
import DashboardSection from '../Section';
import { Columns } from '../constants';
import NavigationContainer, { NavigationContainerVariant } from './NavigationContainer';

export type QuickLink = {
  title: string,
  onClick: () => void
} & AnalyticsEventIdentifier;

export type KbArticle = {
  title: string,
  subtitle: string,
  onClick: () => void
} & AnalyticsEventIdentifier;

type Props = {
  quickLinks: Array<QuickLink>,
  kbArticles: Array<KbArticle>
};

const PageFooter: React.FC<Props> = ({ quickLinks, kbArticles }) => {
  const { events } = useUnsafeAnalyticEvents();
  const outerTheme = useTheme();
  const darkTheme = isPristineEnabled(outerTheme) ? pristineDark : rosetta.dark;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, onClick: () => void) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <ThemeContext.Provider theme={darkTheme}>
      <DashboardSection pt={6} pb={10} mt="auto" as="footer">
        <Grid.Item columns={Columns.FULL}>
          <Flex
            justifyContent="flex-start"
            width="100%"
            overflow="hidden"
            sx={{
              gap: 10,
              flexDirection: 'row',

              '@media (max-width: 834px)': {
                flexDirection: 'column',
              },
            }}
          >
            <NavigationContainer variant={NavigationContainerVariant.QUICK_LINKS}>
              {quickLinks.map(({ title, onClick, ...quickLink }) => (
                <TextLink
                  role="link"
                  tabIndex={0}
                  key={title}
                  textStyle="body"
                  sx={{ color: 'fg.default' }}
                  onClick={() => {
                    onClick();
                    withValidEventIdentifier(quickLink.eventIdentifier, (validEventId) => {
                      events?.userClicksQuickLink({ linkName: validEventId });
                    });
                  }}
                  onKeyDown={(e) => handleKeyDown(e, onClick)}
                  fontWeight="medium"
                >
                  {title}
                </TextLink>
              ))}
            </NavigationContainer>
            <NavigationContainer variant={NavigationContainerVariant.HELP_CENTER}>
              {kbArticles.map(({ title, subtitle, onClick, ...kbArticle }) => (
                <Flex
                  key={title}
                  flexDirection="column"
                  gap={1}
                >
                  <TextLink
                    role="link"
                    tabIndex={0}
                    textStyle="body"
                    sx={{ color: 'fg.default' }}
                    onClick={() => {
                      onClick();
                      withValidEventIdentifier(kbArticle.eventIdentifier, (validEventId) => {
                        events?.userClicksHelpCenterLink({ linkName: validEventId });
                      });
                    }}
                    onKeyDown={(e) => handleKeyDown(e, onClick)}
                    fontWeight="medium"
                  >
                    {title}
                  </TextLink>
                  <Text.Caption
                    color="fg.default"
                  >
                    {subtitle}
                  </Text.Caption>
                </Flex>
              ))}
            </NavigationContainer>
          </Flex>
        </Grid.Item>
      </DashboardSection>
    </ThemeContext.Provider>
  );
};


export default PageFooter;
