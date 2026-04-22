# Disclosure

A Cell with a label and a right-pointing chevron that pushes into the next panel when selected.

> **Pattern:** This is not a packaged Rosetta component — it is a custom composition built on top of `Cell` from `@sqs/rosetta-elements`. Copy and adapt the implementation for your use case.

## Key components used

- `Cell` from `@sqs/rosetta-elements` — provides the layout structure (label, subtitle, detail, slots)
- `Touchable.Element.WithoutFeedback` from `@sqs/rosetta-primitives` — makes the entire Cell tappable
- `ChevronSmallRight` from `@sqs/rosetta-icons` — indicates the Cell is a Disclosure

## Guidance

### When to use

Disclosures should be used for revealing a list of options in a new panel when a Dropdown isn't appropriate. For example, an extremely long list, or options that require specific design or formatting.

### Anatomy

1. **Label** — Primary text.
2. **Subtitle** — Optional, additional info.
3. **Detail** — Optional, additional info, generally used to show the selected option.
4. **Chevron Small Right Icon** — Indicates the Cell is a Disclosure.

### Specs

A Disclosure is a specific construction of a Cell, and therefore follows all Cell specs in regards to padding, overflow, and other behavior.

### Behavior

Disclosures should be stacked vertically with no space in between.

#### Overflow

Label, subtitle, and detail copy inside Cells should be kept as short as possible in all supported languages. When content does require more space, label and subtitle copy will wrap and the Cell will grow in height. Detail text should be truncated. The `space[2]` gutter between the two sides should remain for readability.

## Examples

### Basic use

```jsx
// import { Cell } from '@sqs/rosetta-elements';
// import { Touchable, Box } from '@sqs/rosetta-primitives';
// import { ChevronSmallRight } from '@sqs/rosetta-icons';

<Touchable.Element.WithoutFeedback onClick={() => {}}>
  <Cell
    label="Label"
    description="Subtitle"
    interiorPre={<Box size="sizes.250" bg="gray.900" />}
    exteriorAccessory={<ChevronSmallRight color="gray.300" />}
  />
</Touchable.Element.WithoutFeedback>
```

### With detail text

Use `interiorAccessory` to show the currently selected value.

```jsx
<Touchable.Element.WithoutFeedback onClick={() => {}}>
  <Cell
    label="Font"
    interiorAccessory={
      <Text.Body color="gray.300" m={0}>
        Helvetica
      </Text.Body>
    }
    exteriorAccessory={<ChevronSmallRight color="gray.300" />}
  />
</Touchable.Element.WithoutFeedback>
```

### Stacked

Stack Disclosures vertically with no space between them.

```jsx
<>
  <Touchable.Element.WithoutFeedback onClick={() => {}}>
    <Cell
      label="Font"
      interiorAccessory={
        <Text.Body color="gray.300" m={0}>Helvetica</Text.Body>
      }
      exteriorAccessory={<ChevronSmallRight color="gray.300" />}
    />
  </Touchable.Element.WithoutFeedback>
  <Touchable.Element.WithoutFeedback onClick={() => {}}>
    <Cell
      label="Size"
      interiorAccessory={
        <Text.Body color="gray.300" m={0}>16px</Text.Body>
      }
      exteriorAccessory={<ChevronSmallRight color="gray.300" />}
    />
  </Touchable.Element.WithoutFeedback>
  <Touchable.Element.WithoutFeedback onClick={() => {}}>
    <Cell
      label="Color"
      interiorAccessory={
        <Text.Body color="gray.300" m={0}>Black</Text.Body>
      }
      exteriorAccessory={<ChevronSmallRight color="gray.300" />}
    />
  </Touchable.Element.WithoutFeedback>
</>
```

## Related components

- [Cell](cell.md) — the underlying component providing the layout structure
