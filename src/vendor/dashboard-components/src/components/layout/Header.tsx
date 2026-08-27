import React, { PropsWithChildren } from 'react';
import { Grid } from '@sqs/rosetta-elements';
import { PageHeader } from '@sqs/rosetta-compositions';
import { Columns } from './constants';
import DashboardSection from './Section';

const Header: React.FC<PropsWithChildren> = ({ children }) => (
  <DashboardSection>
    <Grid.Item columns={Columns.FULL}>
      <PageHeader py={6} px={0} m={0}>
        <PageHeader.Body width="100%" mx="auto">
          {children}
        </PageHeader.Body>
      </PageHeader>
    </Grid.Item>
  </DashboardSection>
);

export default Header;
