# Action List

An Action List displays a list of secondary actions to the user that are concealed either because of space constraints, or to limit distractions.

## Guidance

### General guidance

Action Lists are useful for grouping multiple actions relevant to an item. They can hold anywhere from two actions to as many as needed. On desktop, Action Lists are displayed in a Pop Over; on mobile they are displayed in a Sheet.

- When there is only one action, display the action inline, not in an Action List.
- Do not use an Action List to display just one single action.

---

### Anatomy

1. **Trigger** — Ellipses Icon is the default, but the trigger can be another icon or a label.
2. **Container** — Area that contains the action items.
3. **List of action items** — Each option should be a clear action verb.
4. **Toolbar** — Mobile only.

---

### Specs

#### Mobile

| Property | Value                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Width    | 100% of screen (see Sheet for more information)                                                                    |
| Height   | Set by inner content, but shouldn't exceed 50% of screen on display (see Sheet for more information)              |
| Padding  | space[3] left and right, space[6] bottom                                                                           |
| Margin   | space[2] between Toolbar and action list items                                                                     |

#### Desktop

| Property  | Value                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Width     | Default set by the action item with the greatest width plus left and right padding of space[4]. An Action List can have a custom width, but it shouldn't be less than the default. |
| Height    | Set by inner content, scrolling begins once the Pop Over hits the edge of the viewport                                                           |
| Padding   | space[1] top and bottom                                                                                                                          |
| Margin    | space[1] between trigger and Pop Over                                                                                                            |
| Elevation | shadows[200]                                                                                                                                     |

### Positioning

#### Mobile

Since an Action List is displayed in a Sheet, positioning specs aren't necessary.

#### Desktop

An Action List is always anchored to the trigger and is positioned above or below it. Horizontally, position the component either left-aligned, centered, or right-aligned to the trigger. The default position for an Action List is below and centered to the trigger.

Space between the trigger and the Action List is space[1], and space between the Action List and any viewport edge is space[4].

---

### Behavior

#### Trigger

In most cases, an Ellipses Icon should serve as the trigger for an Action List. However, any appropriate Icon can be used. When using an Icon for the trigger, a gray.800 circle of sizes.200 should appear on hover.

If the added clarity of a label is needed, a Tertiary Button can be an Action List trigger.

#### Display

On mobile, the Action List container (Sheet) slides up from the bottom and is anchored to the edge of the screen. On desktop, a user triggers the Action List in a Pop Over container.

Note that there should be a minimum tap zone of 44×44px on the trigger.

#### Scrolling

Avoid triggering a scrolling Action List by reducing the amount of action items. Work with Content Design to reduce action options and validate any edge cases before proceeding.

##### Mobile

Action Lists display action items in a Sheet. If the height of the action items in the Sheet exceeds 50% of the screen, then the container should start scrolling with the following specifications:

- Sheet Toolbar pins to the top.
- Sheet Toolbar is allowed to be pulled up and down the screen.
- A "Cancel" Button should be added to the Toolbar to close the Sheet; this is only necessary if the Sheet covers the screen.

##### Desktop

The Action List displays action items in a Pop Over. The Pop Over's height is set by the number of action items it contains. If the Pop Over height edges outside of the viewport, then the Pop Over becomes scrollable.

#### Dismissal

##### Mobile

An Action List can be dismissed in multiple ways:

- Swiping the Action List's Sheet down.
- A "Cancel" Button in the Action List's Sheet Toolbar; this is only present if Sheet covers the screen.
- Tapping the overlay.
- Tapping an action within the Sheet.

##### Desktop

- Clicking anywhere outside the Action List's Pop Over.
- Clicking an action item in the Action List's Pop Over.
- Pressing the Esc key.

---

## Content guidance

- Limit action item to a single verb. Validate any exceptions with Content Design.
- Hierarchy of listed action items should be determined by user insights.
- When applicable, destructive action should always be listed last and in red.
- Avoid creating a scrolling Action List by condensing or reducing action items.

---
## Examples


### Pop Over

```jsx
{
return (
    <ActionList.PopOver
      aria-label={'Open menu'}
      data-test="foo bar"
      position="bottom-right"
    >
      {({ onRequestClose }) => (
        <Flex bg="white" border={1} flexDirection="column" role="menu">
          <Text.Action
            {...textActionProps}
            data-test="rename"
            onClick={onRequestClose}
            role="menuitem"
          >
            Rename
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Duplicate
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Delete
          </Text.Action>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}
```

### Sheet

```jsx
{
return (
    <ActionList.Sheet
      aria-label={'Open menu'}
      renderHeader={() => (
        <Box>
          <Text.Subtitle textAlign="center">
            Title
          </Text.Subtitle>
        </Box>
      )}
    >
      {({ onRequestClose }) => (
        <Flex bg="white" border={1} flexDirection="column" role="menu">
          <Text.Action
            {...textActionProps}
            data-test="rename"
            onClick={onRequestClose}
            role="menuitem"
          >
            Rename
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Duplicate
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Delete
          </Text.Action>
        </Flex>
      )}
    </ActionList.Sheet>
  );
}
```

### Custom Trigger

```jsx
{
return (
    <ActionList.PopOver
      position="bottom-right"
      renderTrigger={({ toggleActionListOpen }) => (
        <Touchable.Element.Icon
          aria-label={'Open menu'}
          data-test="trigger"
          onClick={toggleActionListOpen}
        >
          <Ellipses />
        </Touchable.Element.Icon>
      )}
    >
      {({ onRequestClose }) => (
        <Flex bg="white" flexDirection="column">
          <Text.Action
            data-test="rename"
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Rename
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Duplicate
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Delete
          </Text.Action>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}
```

### Button As Trigger

```jsx
{
return (
    <ActionList.PopOver
      offset={{ x: -54 }}
      position="bottom-left"
      renderTrigger={({ toggleActionListOpen }) => (
        <Button
          aria-label={'Open menu'}
          data-test="trigger"
          onClick={() => toggleActionListOpen()}
        >
          <Text>Button</Text>
          <ChevronSmallDown color="base" sx={{ ml: 2 }} />
        </Button>
      )}
    >
      {({ onRequestClose }) => (
        <Flex bg="white" border={1} flexDirection="column" role="menu">
          <Text.Action
            {...textActionProps}
            data-test="rename"
            onClick={onRequestClose}
            role="menuitem"
          >
            Rename
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Duplicate
          </Text.Action>
          <Text.Action
            {...textActionProps}
            onClick={onRequestClose}
            role="menuitem"
          >
            Delete
          </Text.Action>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}
```

### Using Action List Item

```jsx
{
return (
    <ActionList.PopOver
      aria-label={'Open menu'}
      position="bottom-right"
    >
      {({ onRequestClose }) => (
        <Flex as="ul" bg="white" flexDirection="column" role="menu">
          <ActionList.Item
            onClick={() => {
              console.log('clicked');
              onRequestClose();
            }}
          >
            ActionList.Item 1
          </ActionList.Item>
          <ActionList.Item
            isDisabled
            onClick={() => {
              console.log('clicked');
              onRequestClose();
            }}
          >
            ActionList.Item 2
          </ActionList.Item>
          <ActionList.Item
            onClick={() => {
              console.log('clicked');
              onRequestClose();
            }}
          >
            ActionList.Item 3
          </ActionList.Item>
        </Flex>
      )}
    </ActionList.PopOver>
  );
}
```