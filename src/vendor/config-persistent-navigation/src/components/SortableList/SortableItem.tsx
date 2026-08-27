import React, { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Flex } from '@sqs/rosetta-primitives';
import { Drag } from '@sqs/rosetta-icons';
import { useTheme } from '@sqs/rosetta-styled';

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <Box ref={setNodeRef} style={style}>
        {children}
      </Box>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  const { space } = useTheme();

  return (
    <Flex
      {...attributes}
      {...listeners}
      ref={ref}
      data-cy="draghandle"
      sx={{
        alignItems: 'center',
        paddingLeft: `calc(${space[1]} - 1px)`,
        cursor: 'grab',
        height: '100%',
      }}
    >
      <Drag sx={{
        color: 'gray.300',
        height: '34px',
      }}
      />
    </Flex>
  );
}
