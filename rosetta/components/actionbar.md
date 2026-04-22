# Action Bar

A bar that allows users to perform single or multiple actions on items. Often used with Tables for batch actions.

## Usage

### General guidance

The Action Bar allows the user to perform an action on multiple items in a list or Table.

The Action Bar can contain a single action or scale up to six actions, though it is advised to limit to three when possible. Depending on the available space, additional actions may collapse into an Action List component.

---

### Anatomy

1. **Checkbox** — Used for selecting or deselecting all items.
2. **Label** — Displays number of selected items.
3. **Action Button** — Tertiary Button, for any actions that can be applied in bulk.
4. **Action List** — Actions that don't fit in the bar show in an Action List.
   - a. **Trigger** — Ellipses Icon, opens the dialog on selection.
   - b. **Dialog** — Displays in a Sheet on mobile.

---

### Specs

The Action Bar is always fixed to the bottom of the viewport and to the sides of the primary content area. The x-padding of the Action Bar should be adjusted so that the Checkbox in the Action Bar aligns with the Checkboxes in the list or Table.

The Buttons are always the tertiary variant in the small size.

---

### Behavior

#### Visibility

The Action Bar is hidden until the user selects an item. It goes away when the user deselects all items or completes an action.

#### Select all or none

The user can select the entire list by tapping or clicking the bulk selection tool. A second tap or click will deselect the entire list.

#### Overflow

The Action Bar is designed to handle multiple actions. Place the most important actions at the top of the list. As the width of the container shrinks, and the space between the checkbox label and the leftmost action hits space[5], actions move into an Action List.

---

### Content guidance

- Actions are designed to reveal themselves at the top level when layout space permits. With this in mind, order actions from most frequently used to least frequently used.
- Single-verb actions are ideal for both space and scanning. When possible, keep Button labels between one to three words.
- Avoid using articles (i.e. "a", "an", "the") and possessive adjectives (i.e. your) in Buttons.
- Action colors should align with Button guidelines (i.e. use red for destructive actions, such as "Delete").

---
## Examples


### Default

```jsx
(
  <ActionBar
    actions={[
    { label: "Mark as read", onClick: () => {} },
    { label: "Delete", onClick: () => {} },
    { label: "Archive", onClick: () => {} },
  ]}
    itemSelectedNumber={2}
    maxItemsNumber={6}
    onDeselectItems={() => {}}
    onSelectAllItems={() => {}}
  />
)
```

### Default With Elements

```jsx
{
  const actions = [
    { label: "Mark as read", onClick: () => {} },
    { label: "Delete", onClick: () => {} },
    { label: "Archive", onClick: () => {} },
  ];

  return (
    <ActionBar
      actions={actions.map(({ label }) => ({
        key: label,
        element: <Button.Tertiary data-test={label}>{label}</Button.Tertiary>,
      }))}
      itemSelectedNumber={2}
      maxItemsNumber={1}
      onDeselectItems={() => {}}
      onSelectAllItems={() => {}}
    />
  );
}
```