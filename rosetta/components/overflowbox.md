# Overflow Box

A container with pagination that reveals or hides overflowing content.

## Guidance

### General guidance

Use an Overflow Box when the layout of the page or nested elements may break because of overflowing content. When content overflows, users are still aware of hidden content because of the gradient and pagination buttons used by the component.

Keep in mind that overflowing content remains hidden from the user until they click on either the next or previous pagination button. For this reason, keep the number of clicks to reveal hidden content to a minimum.

### Content

No guidance.

### Accessibility

For screen readers, the Overflow Box can be focused using the Tab key. Keyboard navigation is also allowed by using the arrow keys to scroll left or right through the container. For these two reasons, users cannot focus on the component's pagination buttons.

## Usage

### Anatomy

1. **Overflow container**
2. **Pagination buttons** — Appear only when there's overflow content.

---

### Behavior

#### Responsiveness

If there is no set width on the parent container, the Overflow Box adapts to its parent container and detects overflow dynamically.

#### Motion

Clicking either the next or previous pagination button makes the container scroll in that direction.
## Examples


### Default

```jsx
{
  const listElements: HTMLElement[] = [];
  return (
    <Box width="300px">
      <OverflowBox>
        <Stack direction="row" p={1} space={2}>
          {elements.map((element: { label: string }, index: number) => {
            return (
              <Chip
                key={element.label}
                ref={(elem: HTMLElement) => {
                  listElements[index] = elem;
                }}
                label={element.label}
              />
            );
          })}
        </Stack>
      </OverflowBox>
    </Box>
  );
}
```

### Responsive

```jsx
{
  const listElements: HTMLElement[] = [];
  return (
    <Box p={1}>
      <Text.Body>Resize me!</Text.Body>
      <OverflowBox listElements={listElements}>
        <Stack direction="row" p={1} space={2}>
          {elements.map((element: { label: string }, index: number) => {
            return (
              <Chip
                key={element.label}
                ref={(elem: HTMLElement) => {
                  listElements[index] = elem;
                }}
                label={element.label}
              />
            );
          })}
        </Stack>
      </OverflowBox>
    </Box>
  );
}
```

### Styled Start And End Buttons

```jsx
{
  const listElements: HTMLElement[] = [];
  const { PreviousButton, NextButton } = OverflowBox;

  return (
    <Box width="300px">
      <OverflowBox
        listElements={listElements}
        renderNextButton={(buttonProps: OverflowButtonProps) => (
          <NextButton {...buttonProps} sx={{ svg: { fill: 'red.300' } }} />
        )}
        renderPreviousButton={(buttonProps: OverflowButtonProps) => (
          <PreviousButton {...buttonProps} sx={{ svg: { fill: 'blue.300' } }} />
        )}
      >
        <Stack direction="row" p={1} space={2}>
          {elements.map((element: { label: string }, index: number) => {
            return (
              <Chip
                key={element.label}
                ref={(elem: HTMLElement) => {
                  listElements[index] = elem;
                }}
                label={element.label}
              />
            );
          })}
        </Stack>
      </OverflowBox>
    </Box>
  );
}
```

### With Custom Start And End Icons

```jsx
{
  const listElements: HTMLElement[] = [];
  const { PreviousButton, NextButton } = OverflowBox;

  return (
    <Box width="300px">
      <OverflowBox
        listElements={listElements}
        renderNextButton={(buttonProps: OverflowButtonProps) => (
          <NextButton {...buttonProps} icon={<ArrowRight />} />
        )}
        renderPreviousButton={(buttonProps: OverflowButtonProps) => (
          <PreviousButton {...buttonProps} icon={<ArrowLeft />} />
        )}
      >
        <Stack direction="row" p={1} space={2}>
          {elements.map((element: { label: string }, index: number) => {
            return (
              <Chip
                key={element.label}
                ref={(elem: HTMLElement) => {
                  listElements[index] = elem;
                }}
                label={element.label}
              />
            );
          })}
        </Stack>
      </OverflowBox>
    </Box>
  );
}
```

### Empty Icons

```jsx
{
  const listElements: HTMLElement[] = [];
  const { PreviousButton, NextButton } = OverflowBox;

  return (
    <Box width="300px">
      <OverflowBox
        listElements={listElements}
        renderNextButton={(buttonProps: OverflowButtonProps) => (
          <NextButton {...buttonProps} icon={null} />
        )}
        renderPreviousButton={(buttonProps: OverflowButtonProps) => (
          <PreviousButton {...buttonProps} icon={null} />
        )}
      >
        <Stack direction="row" p={1} space={2}>
          {elements.map((element: { label: string }, index: number) => {
            return (
              <Chip
                key={element.label}
                ref={(elem: HTMLElement) => {
                  listElements[index] = elem;
                }}
                label={element.label}
              />
            );
          })}
        </Stack>
      </OverflowBox>
    </Box>
  );
}
```