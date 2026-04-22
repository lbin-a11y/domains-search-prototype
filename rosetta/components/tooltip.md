# Tooltip

Small dialogs that provide additional information upon hover or focus. The information should be contextual and useful.

## Guidance

### General guidance

Tooltips are non-modal components and should never block a user from performing other tasks on the screen. They can be used to provide additional context or help for a user, and used as an alternative to a Dialog or Pop Over when delivering contextual messages to users.

Tooltips help reduce UI content on screen until the user acts to reveal additional information. Because this information is initially hidden, limit the use of Tooltips, and only include information that is not critical to the functionality of the UI (such as support or help content).

In contrast to Pop Over or Dialog, Tooltip should be used almost exclusively for short, additional context or text links. When actions or more content is required, consider Pop Over instead.

**Do:**

- Use Tooltips to tell the user about the functionality of the product or offer support.
- Use Tooltips to reduce UI copy, but limit the information to non-critical content.
- Have clear anchors like an icon or styled text to indicate that a Tooltip is available.
- Use to provide context on what happens when a user takes an action.
- Keep Tooltips directly related to the task at hand.

### Content

A Tooltip is a help component, not a marketing tool. Avoid upsell language and provide only what is needed.

Tooltip descriptions should be written in full sentences without any rich text (bold, italics, etc.), and should be as concise as possible. Limit characters inside Tooltips to 160 characters, but aim to be under 100 characters as a best practice.

- Write in full sentences without any rich text (e.g., bold, italics, code, etc.).
- Do not include rich text, links, or any interactive elements. Do not exceed the character limit of 160.

### Accessibility

Tooltips are not accessible for users on touch devices (like mobile) since they cannot hover or focus on an element without activating it. Aim to make all designs intuitive without needing help content through Tooltips or other hover and focus-enabled interactive elements.

Tooltip triggers (often icons) tend to be small. Consider making the click target around the icon larger by adding padding, so mouse and touch users can more easily activate it.

#### Keyboard navigation

When focused on the trigger, the Tooltip should automatically activate and remain in view until the user dismisses it. When focus is removed, the Tooltip should be dismissed. The ESC key should close the Tooltip.

## Usage

### Anatomy

1. **Trigger** — Can be the default icon for help content or any icon that may require additional clarification.
2. **Container** — The box holding the Tooltip's content.
3. **Content** — The information in the Tooltip.
4. **Close button** — A button to dismiss the Tooltip; mobile only.

---

### Specs

Tooltips are simply Body text in a gray.100 container. They take the width and height of their content and have a maximum character length of 160.

| Property  | Value                                                              |
| --------- | ------------------------------------------------------------------ |
| Width     | Set by inner content plus horizontal padding of space[3], max. 320px |
| Height    | Set by inner content plus vertical padding of space[2]            |
| Elevation | shadows[400]                                                       |

The trigger should have a tap area of at least 38×44px.

#### Trigger positioning

Position the Tooltip's trigger either next to the label or on the opposite side of the parent element.

#### Tooltip positioning

##### Desktop

A Tooltip can be positioned in four different directions from the trigger, where right is the default. The space between a trigger and a Tooltip is `space[2]`.

Ideally, a Tooltip shouldn't cover related content, but it can float outside its parent element.

By default, a Tooltip should be centered with its trigger. However, it should not cross the edge of the viewport.

If a trigger is at the edge of the viewport, right-align the Tooltip with the trigger.

##### Mobile

On mobile, where it is not possible to align the Tooltip with its trigger, center the Tooltip in the viewport instead.

---

### Behavior

#### Display

##### Desktop

On desktop, the user activates the Tooltip by hovering on the related trigger.

##### Touch devices

On touch devices, the user activates the Tooltip by tapping on the Trigger.

#### Dismissal

##### Desktop

When the user moves their cursor away, the Tooltip should disappear.

##### Touch devices

To close the Tooltip on touch devices, the user should tap the Close Button. The Tooltip should also close on scroll.
## Examples


### I18NWith TComponent

```jsx
{
  const [anchor, setAnchor] = React.useState<HTMLElement>();
  return (
    <Flex>
      <Box ref={setAnchor} aria-describedby="tooltip">
        Anchor
      </Box>
      <Tooltip anchor={anchor} id="tooltip" isOpen={true} position="right">
        Basic Tooltip
      </Tooltip>
    </Flex>
  );
}
```