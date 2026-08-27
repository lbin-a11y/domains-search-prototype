import React, { ReactElement, forwardRef } from 'react';

import { NavMenu } from '@sqs/rosetta-compositions';
import { Settings } from '@sqs/rosetta-icons';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Link, RouterLocation } from '@sqs/universal-router';

import stylesheet from './SettingsLink.less';

interface SettingsLinkProps {
  link: string;
  hash?: string;
  label: ReactElement | string;
  linkState?: RouterLocation['state'];
  onClick?: () => void;
}

export const SettingsLink = forwardRef<typeof Box, SettingsLinkProps>(({
  link,
  hash,
  label,
  linkState,
  onClick,
}, ref) => {

  return (
    <Flex className={stylesheet.container}>
      <Box ref={ref}>
        <Link to={link} hash={hash} state={linkState} onClick={onClick}>
          <Flex>
            <Settings sx={{ mr: 2 }}/>
            <NavMenu.NavText className={stylesheet.navText} variant='subtitle'>
              {label}
            </NavMenu.NavText>
          </Flex>
        </Link>
      </Box>
    </Flex>
  );
});
