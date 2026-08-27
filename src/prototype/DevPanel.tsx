import { useState } from 'react';
import { PopOver } from '@sqs/rosetta-elements';
import { Box, Flex, Touchable } from '@sqs/rosetta-primitives';
import { ThemeContext } from '@sqs/rosetta-styled';
import { rosetta } from '@sqs/rosetta-themes';
import { Button } from '@sqs/rosetta-react/button/next';
import { Text } from '@sqs/rosetta-react/text/next';

import { MOBILE } from '../dashboard/components/breakpoints';
import {
  STAGE_DESCRIPTIONS,
  STAGE_LABELS,
  STAGES,
  useStage,
  type JourneyStage,
} from './StageContext';

const POPOVER_WIDTH = 300;

const CheckGlyph = () => (
  <Box aria-hidden sx={{ display: 'inline-flex', color: 'fg.default' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </Box>
);

/**
 * Prototype-only control for moving between stages of the user's journey.
 *
 * A single trigger button that opens a popover. The popover renders under the
 * Rosetta dark theme so it reads as tooling sitting above the product rather
 * than part of it, and its selection is mirrored into the `stage` query
 * parameter so any state can be linked to directly.
 */
export const DevPanel = () => {
  const { stage, setStage } = useStage();
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          [MOBILE]: { bottom: 12, right: 12 },
        }}
      >
        <Button.Alt
          ref={setAnchor}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {`Stage: ${STAGE_LABELS[stage]}`}
        </Button.Alt>
      </Box>

      <PopOver
        hideArrow
        closeOnEsc
        closeOnClickOutside
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        anchor={anchor}
        anchorPoint={{ x: 'right', y: 'top' }}
        position="top-left"
        offset={{ x: 0, y: -8 }}
        zIndex={10000}
        role="dialog"
        bodyStyles={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <ThemeContext.Provider theme={rosetta.dark}>
          <Box
            backgroundColor="base"
            p={4}
            sx={{
              width: POPOVER_WIDTH,
              maxWidth: 'calc(100vw - 24px)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'border.default',
              boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Text.Eyebrow as="span" color="fg.muted" m={0}>
              Journey stage
            </Text.Eyebrow>
            <Text.Body.Small color="fg.muted" m={0} mt={1} mb={3}>
              Prototype control — not part of the product
            </Text.Body.Small>

            <Flex flexDirection="column" gap={1}>
              {STAGES.map((option: JourneyStage) => {
                const isSelected = option === stage;
                return (
                  <Touchable
                    key={option}
                    onClick={() => {
                      setStage(option);
                      setIsOpen(false);
                    }}
                    aria-pressed={isSelected}
                    sx={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      p: 3,
                      borderRadius: 1,
                      backgroundColor: isSelected ? 'border.default' : 'transparent',
                      '&:hover': { backgroundColor: 'border.default' },
                    }}
                  >
                    <Flex alignItems="flex-start" gap={2}>
                      <Box flex="1 1 auto" minWidth={0}>
                        <Text.Bold as="span" color="fg.default" m={0}>
                          {STAGE_LABELS[option]}
                        </Text.Bold>
                        <Text.Body.Small color="fg.muted" m={0} mt={1}>
                          {STAGE_DESCRIPTIONS[option]}
                        </Text.Body.Small>
                      </Box>
                      {isSelected && <CheckGlyph />}
                    </Flex>
                  </Touchable>
                );
              })}
            </Flex>
          </Box>
        </ThemeContext.Provider>
      </PopOver>
    </>
  );
};

export default DevPanel;
