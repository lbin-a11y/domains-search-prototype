import React, { PropsWithChildren } from 'react';
import { Grid } from '@sqs/rosetta-elements';
import DashboardSection from './Section';
import { Columns } from './constants';
import { ThemeContext, useTheme } from '@sqs/rosetta-styled';
import { rosetta } from '@sqs/rosetta-themes';
import { isPristineEnabled, pristineDark } from '@sqs/rosetta-pristine-theme';
import { Text, TextProps } from '@sqs/rosetta-primitives';

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  const outerTheme = useTheme();
  const darkTheme = isPristineEnabled(outerTheme) ? pristineDark : rosetta.dark;
  return (
    <ThemeContext.Provider theme={darkTheme}>
      <DashboardSection pt={6} pb={10} flex={1} as="footer">
        <Grid.Item columns={Columns.FULL}>
          {children}
        </Grid.Item>
      </DashboardSection>
    </ThemeContext.Provider>
  );
};

type FooterTitleProps = Partial<TextProps>;

export const FooterTitle: React.FC<PropsWithChildren<FooterTitleProps>> = ({ children, ...rest }) => {
  return (
    <Text.Title mb={6} as="h3" {...rest}>
      {children}
    </Text.Title>
  );
};

export default Footer;
