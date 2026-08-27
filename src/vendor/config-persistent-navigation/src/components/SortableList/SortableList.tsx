import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Active } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { PrimaryItemConfigType } from '../../types/NavigationTypes';
import { SortableOverlay } from './SortableOverlay';
import { SortableItem, DragHandle } from './SortableItem';

interface Props {
  items: PrimaryItemConfigType[];
  onChange(items: PrimaryItemConfigType[]): void;
  renderItem(item: PrimaryItemConfigType): ReactNode;
  onDragStart?(): void;
  onDragEnd?(): void;
}

export function SortableList({
  items,
  onChange,
  renderItem,
  onDragStart,
  onDragEnd
}: Props) {
  const [current, setCurrent] = useState<Active | null>(null);
  const [itemsSnapshot, setItemsSnapshot] =
    useState<PrimaryItemConfigType[]>(items);

  const activeItem = useMemo(
    () =>
      itemsSnapshot.find(({ visibilityKey }) => visibilityKey === current?.id),
    [current, itemsSnapshot]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        onDragStart?.();
        setCurrent(active);
      }}
      onDragOver={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = itemsSnapshot.findIndex(
            ({ visibilityKey }) => visibilityKey === active.id
          );
          const overIndex = itemsSnapshot.findIndex(
            ({ visibilityKey }) => visibilityKey === over.id
          );

          const reorderedItems = arrayMove(
            itemsSnapshot,
            activeIndex,
            overIndex
          );
          setItemsSnapshot(reorderedItems);
        }
      }}
      onDragEnd={() => {
        onDragEnd?.();
        onChange(itemsSnapshot);
        setCurrent(null);
      }}
      onDragCancel={() => setCurrent(null)}
    >
      <SortableContext
        items={itemsSnapshot.map(({ visibilityKey }) => visibilityKey!)}
      >
        {itemsSnapshot.map((item) => (
          <SortableItem key={item.visibilityKey} id={item.visibilityKey!}>
            {renderItem(item)}
          </SortableItem>
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
