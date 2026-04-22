# Divider

A thin line that groups and separates content in lists and layouts.

## Guidance

### General guidance

Dividers bring clarity to a layout by grouping and separating content that's close in proximity. They can also be used to establish rhythm and hierarchy.

In Rosetta, Dividers are used to visually separate stacked Cells.

**Do**

- Use Dividers to separate stacked Cells.
- When not used with Cells, only use Dividers if elements can't be separated by white space.

**Don't**

- When not used with Cells, don't overuse Dividers. Dividers lose their value when overused because they add visual clutter.

### Content

No guidance.

### Accessibility

Dividers are not just visual. They play a role in contextualizing the surrounding content. Make sure your HTML element represents the Divider as a paragraph-level thematic break or transition.

**Note:** The color of the current Rosetta Divider does not pass WCAG color contrast on black, gray, or white backgrounds.

## Usage

### Specs

| Property         | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| Width            | 100% of container                                               |
| Height           | 1px                                                             |
| Margin           | 0px by default, or any space token value top/bottom             |
| Background color | gray.800                                                        |
## Examples


### Default

```jsx
<Divider />
```

### Vertical Divider

```jsx
<Divider.Vertical height="200px" />
```

### Within AStack

```jsx
(
  <Stack divider={<Divider />}>
    <Button.Tertiary>button 1</Button.Tertiary>
    <Button.Tertiary>button 2</Button.Tertiary>
    <Button.Tertiary>button 3</Button.Tertiary>
  </Stack>
)
```

### Within ARow Stack

```jsx
(
  <Stack direction="row" divider={<Divider orientation="vertical" />} space={1}>
    <Button.Tertiary>button 1</Button.Tertiary>
    <Button.Tertiary>button 2</Button.Tertiary>
    <Button.Tertiary>button 3</Button.Tertiary>
  </Stack>
)
```

### Within AFocused Cell

```jsx
{
  const FocusedCell = withFocusManagedDivider(Cell, Divider);
  const CellInput = (props: CellProps) => <FocusedCell as="label" {...props} />;
  return <CellInput body={<TextInput.Control />} interiorPre="label" />;
}
```