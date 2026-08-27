import React, { useState } from 'react';

import { PopOver } from '@sqs/rosetta-elements';
import { ActionList } from '@sqs/rosetta-compositions';
import { Box } from '@sqs/rosetta-primitives';

import DisplayCard from '../../SellingCard/DisplayCard';
import { CardProps } from '../../SellingCard/types';
import { useIsDesktop } from '../../../hooks/usePlatform';

type ActionItemProps = {
  onRequestClose: () => void;
  onClick: () => void;
  label: string;
  cardProps?: CardProps;
};

export default ({ onRequestClose, onClick, label, cardProps }: ActionItemProps) => {
  const [ref, setRef] = useState();
  const [openPopOver, setOpenPopOver] = useState(false);
  const isHoverStateEnabled = useIsDesktop();

  return (
    <>
      {cardProps && (
        <PopOver
          isOpen={openPopOver}
          anchor={ref}
          anchorPoint={{ x: 'left', y: 'bottom' }}
          position="top-left"
          offset={{ x: 0, y: -11 }}
          mr={5}
          borderRadius={6}
          bodyStyles={{ borderRadius: 1, overflow: 'hidden' }}
        >
          <DisplayCard
            boxShadow={200}
            {...cardProps}
          />
        </PopOver>
      )}
      <ActionList.Item
        textStyle="body"
        onClick={() => {
          onClick();
          onRequestClose();
        }}
        onMouseOver={() => {
          if (isHoverStateEnabled) {
            setOpenPopOver(true);
          }
        }}
        onMouseOut={() => {
          if (isHoverStateEnabled) {
            setOpenPopOver(false);
          }
        }}
      >
        <Box ref={setRef} position="absolute" left="-20px" />
        {label}
      </ActionList.Item>
    </>
  );
};
