# Pop Over

Small floating dialog that displays context information after user action (e.g. Button click). It can be anchored to a Button, Text, etc.

## Guidance

### General guidance

Pop Overs are a type of localized pop up used to present messaging or additional (non-critical) input on top of the main UI content. Pop Overs can also be used to guide users through a task, and act as a less disruptive alternative to a Dialog as they do not create an overlay over the entire screen and can be positioned closer to the target user action.

Pop Overs can contain Text, Checkboxes, Radio Buttons, CTAs, and other UI elements.

### Content

Pop Overs can be used to reduce the amount of copy on the screen in order to simplify the visual UI. They are used for simple actions, and should only contain one piece of information, such as a message or a set of Checkboxes to make a Filter. A Pop Over can also be used to introduce a user to a new product or feature.

The content inside a Pop Over should always be short and directly related to the current task. Pop Overs should never contain critical information that is essential to the functioning of the UI, or for the user to continue their task. To display critical information, use a Dialog or BasicDialog instead. Pop Overs should never have multiple pages of content or any navigational depth.

A Button, Icon Button, styled Text, or other UI elements are recommended as triggers for a Pop Over to indicate to users that there are additional simple actions or information available.

### Accessibility

While using the keyboard, the user should be able to Tab and Shift+Tab through the elements of the Pop Over. Pop Overs should close when the user hits Esc.

After triggering the Pop Over, focus should remain on its trigger. The next focused item should be any action within the Pop Over.

When the user hits Esc, focus should return to the element it was on before the Pop Over was opened (or if that element is no longer available, to a different element) to keep focus order logical.

## Usage

### Overview

Pop Overs are flexible containers that can be anchored to either a side of the viewport, or an element in the UI. They are similar to dialogs in that they appear on top of the interface, but do not block the user from what they were doing.

---

### Anatomy

1. **Container**
2. **Arrow** — Optional.

---

### Specs

The Pop Over is purposely flexible and has very few constraints, in order to serve as many use cases as possible.

| Property | Value                                            |
| -------- | ------------------------------------------------ |
| Width    | Set by inner content, or a custom maximum        |
| Height   | Set by inner content                             |
| Margin   | space[4] left and right, space[3] top and bottom |

---

### Behavior

#### Position

Pop Overs must be anchored to either a side of the viewport, or another element. The space between the anchor and the Pop Over should be a space token value.

## Examples

### Positioning

```jsx
{
  const [listPos, setListPos] = React.useState<{
    x?: 'center' | 'left' | 'right';
    y?: 'middle' | 'top' | 'bottom';
  }>({ x: 'center', y: 'middle' });
  const [triggerPos, setTriggerPos] = React.useState<
    'top' | 'bottom' | 'bottom-right' | 'top-right' | 'top-left' | 'bottom-left'
  >('top');
  const [x, setX] = React.useState('0');
  const [y, setY] = React.useState('22');
  const [isOpen, setOpen] = React.useState(false);
  const [ref, setRef] = React.useState();
  return (
    <>
      <Flex alignItems="center" gap={1} mb={8}>
        <Text.Body> I want the</Text.Body>
        <Flex flexDirection="column" gap={2}>
          <Button onClick={() => setListPos({ x: 'center', y: 'middle' })}>
            middle-center
          </Button>
          <Button onClick={() => setListPos({ x: 'right', y: 'middle' })}>
            middle-right
          </Button>
          <Button onClick={() => setListPos({ x: 'left', y: 'middle' })}>
            middle-left
          </Button>
          <Button onClick={() => setListPos({ x: 'center', y: 'bottom' })}>
            top-center
          </Button>
          <Button onClick={() => setListPos({ x: 'right', y: 'bottom' })}>
            top-right
          </Button>
          <Button onClick={() => setListPos({ x: 'left', y: 'bottom' })}>
            top-left
          </Button>
          <Button onClick={() => setListPos({ x: 'center', y: 'top' })}>
            bottom-center
          </Button>
          <Button onClick={() => setListPos({ x: 'right', y: 'top' })}>
            bottom-right
          </Button>
          <Button onClick={() => setListPos({ x: 'left', y: 'top' })}>
            bottom-left
          </Button>
        </Flex>
        <Text.Body> anchor point of the PopOver at the </Text.Body>
        <Flex flexDirection="column" gap={2}>
          <Button onClick={() => setTriggerPos('top')}>top</Button>
          <Button onClick={() => setTriggerPos('top-left')}>top-right</Button>
          <Button onClick={() => setTriggerPos('top-right')}>top-left</Button>
          <Button onClick={() => setTriggerPos('bottom')}>bottom</Button>
          <Button onClick={() => setTriggerPos('bottom-left')}>
            bottom-right
          </Button>
          <Button onClick={() => setTriggerPos('bottom-right')}>
            bottom-left
          </Button>
        </Flex>
        <Text.Body>location of the Trigger, with some offset:</Text.Body>
        <Flex alignItems="center" gap={1}>
          <TextField
            inputProps={{
              value: x,
              onChange: setX,
              width: 'sizes.250',
            }}
            label="X"
            labelPlacement="inline"
          />
          <TextField
            inputProps={{
              value: y,
              onChange: setY,
              width: 'sizes.250',
            }}
            label="Y"
            labelPlacement="inline"
          />
        </Flex>
      </Flex>
      <Flex alignItems="center" gap={3} mb={8}>
        <Text.Subtitle>My code:</Text.Subtitle>
        <Textarea.Control
          aria-label="code"
          border={1}
          maxWidth="sizes.700"
          value={`
              anchorPoint={{ x: "${listPos.x}", y: "${listPos.y}" }}
              position="\${triggerPos}"
              offset={{ x: ${x}, y: ${y} }}
            `}
        />
        <Text.Body>
          <Text>NOTES</Text>
          <Text>The component has a default offset: {`{x: 22, y: 22 }`}.</Text>
          <Text>
            The horizontal position is inverted: you see "bottom-right" but you
            get "bottom-left".
          </Text>
        </Text.Body>
      </Flex>

      <PopOver
        anchor={ref}
        anchorPoint={listPos}
        isOpen={isOpen}
        offset={{ x: parseInt(x), y: parseInt(y) }}
        position={triggerPos}
      >
        <Box px={4} py={3}>
          <Text.Body>I'm the PopOver</Text.Body>
        </Box>
      </PopOver>
      <Box ref={setRef} display="inline-block">
        <Button onClick={() => setOpen(!isOpen)} size="large" value={isOpen}>
          Trigger
        </Button>
      </Box>
    </>
  );
};
```
