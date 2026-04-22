# Slider

Slider allows users to select a value within a defined range. The component works with the Field primitive for labels, descriptions, and error states.

## Guidance

### General guidance

Sliders provide a visual indication of adjustable content; for example, units of measurement or percentages. The user can move the handle along the track to increase or decrease the value.

In its default variant, a Slider should be accompanied by a label and a number input that doubles as a display for the Slider's current value.

**Do use a Slider when:**

- The user must select a value within a defined range that has a minimum and maximum.
- The specific value does not matter to the user, but an approximate is good enough.
- The user benefits from sliding the value along the track and seeing the result of the output; for example, the padding in a section.

**Don't use a Slider when:**

- A precise value is important.

### Content

By default, Sliders should be implemented with a label in the Field so the user knows exactly what input they are changing. Make sure the label is clear and succinct.

### Accessibility

An accessible name is required for all Sliders, even if there is an icon on the Slider. If an icon is serving as the visual label, it should always have a text alternative. However, if icons are there for decorative purposes (in addition to the label), they should be hidden from assistive technologies (`aria-hidden="true"`).

## Usage

### Anatomy

1. **Handle** — What the user drags to change the value.
2. **Fill** — Shows the selected range.
3. **Track** — Shows the full range of acceptable values.

---

### Composition

The Slider component is built as a compound component with the following parts:

- `Slider.Root` — The container for the slider.
- `Slider.Control` — The actual range input control.
- `Slider.NumberInput` — An optional integrated number input.
- `Slider.TickContainer` and `Slider.Tick` — Optional tick marks for discrete values.

### Behavior

#### Input

There are three ways for a user to change the value of the Slider:

- Drag the handle along the track.
- Press the left or right arrow key on their keyboard while focused on the slider.
- Type directly into the number input (when using `Slider.NumberInput`).

Note that if a Slider has a wide range, it will be harder for the user to select a precise value by dragging alone.

#### Minimums and maximums

Sliders must have minimum and maximum values. If the user enters a value that is outside of the acceptable range (when using the number input), the value resets to the closest acceptable value.

#### Disabled state

When a slider is disabled, both the slider control and any associated number input are disabled.
## Examples


### Default

```jsx
{
  const [value, setValue] = useState<number>(20);
  return (
    <Field.Root gap={2} width="sizes.750">
      <Field.Label>
        {'Default Slider'}
      </Field.Label>
      <Slider.Root>
        <Slider.Control
          height="sizes.250"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          step={10}
          value={value}
        />
      </Slider.Root>
      <Text.Body mt={2}>
        {'Current value'}: {value}
      </Text.Body>
    </Field.Root>
  );
}
```

### Default Disabled

```jsx
{
  const [value, setValue] = useState<number>(20);
  return (
    <Field.Root disabled gap={2} width="sizes.750">
      <Field.Label>
        {'Default Slider Disabled'}
      </Field.Label>
      <Slider.Root>
        <Slider.Control
          height="sizes.250"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          step={10}
          value={value}
        />
      </Slider.Root>
    </Field.Root>
  );
}
```

### Default With Number Display

```jsx
{
  const [value, setValue] = useState<number>(20);
  return (
    <Field.Root gap={2} width="sizes.750">
      <Field.Label>
        {'Default Slider with Number Display'}
      </Field.Label>
      <Slider.Root sx={{ gap: 3 }}>
        <Slider.Control
          height="sizes.250"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          step={10}
          value={value}
        />
        <Text.Body>{value}</Text.Body>
      </Slider.Root>
    </Field.Root>
  );
}
```

### Slider With Number Input

```jsx
{
  const [value, setValue] = useState<number>(50);
  return (
    <Flex flexDirection="column" gap={5}>
      {/* Slider with Number Input inline */}
      <Field.Root width="sizes.750">
        <Field.Label htmlFor="slider-with-number-input">
          {'Slider with Number Input'}
        </Field.Label>
        <Field.Description>
          {'The slider and number input are synchronized. Changing one updates the other.'}
        </Field.Description>
        <Slider.Root my={1} sx={{ gap: 3 }}>
          <Slider.Control
            height="sizes.250"
            id="slider-with-number-input"
            max={100}
            min={0}
            onChange={(e) => setValue(Number(e.target.value))}
            step={1}
            value={value}
          />
          <Slider.NumberInput />
        </Slider.Root>
      </Field.Root>

      {/* Slider with Number Input stacked */}
      <Field.Root width="sizes.750">
        <Field.Label htmlFor="slider-with-number-input-2">
          {'Slider with Number Input'}
        </Field.Label>
        <Slider.Root flexDirection="column" my={1}>
          <Slider.NumberInput />
          <Slider.Control
            height="sizes.150"
            id="slider-with-number-input-2"
            max={100}
            min={0}
            onChange={(e) => setValue(Number(e.target.value))}
            step={1}
            value={value}
          />
        </Slider.Root>
      </Field.Root>

      {/* Slider with Number Input stacked */}
      <Field.Root width="sizes.750">
        <Field.Label htmlFor="slider-with-number-input-3">
          {'Slider with Number Input'}
        </Field.Label>
        <Slider.Root flexDirection="column" my={1}>
          <Slider.Control
            height="sizes.150"
            id="slider-with-number-input-3"
            max={100}
            min={0}
            onChange={(e) => setValue(Number(e.target.value))}
            step={1}
            value={value}
          />
          <Slider.NumberInput />
        </Slider.Root>
      </Field.Root>

      <Text.Caption>
        {'Current value'}: {value}
      </Text.Caption>
    </Flex>
  );
}
```

### Slider With Number Input Invalid

```jsx
{
  const [value, setValue] = useState<number>(50);
  return (
    <Flex flexDirection="column" gap={5}>
      {/* Slider with Number Input inline */}
      <Field.Root invalid width="sizes.750">
        <Field.Label htmlFor="slider-with-number-input">
          {'Slider with Number Input Invalid'}
        </Field.Label>
        <Slider.Root my={1} sx={{ gap: 3 }}>
          <Slider.Control
            height="sizes.250"
            id="slider-with-number-input"
            max={100}
            min={0}
            onChange={(e) => setValue(Number(e.target.value))}
            step={1}
            value={value}
          />
          <Slider.NumberInput />
        </Slider.Root>
        <Field.Error>This is an error</Field.Error>
      </Field.Root>
      <Text.Caption>
        {'Current value'}: {value}
      </Text.Caption>
    </Flex>
  );
}
```

### Slider With Number Input Group Composed

```jsx
{
  const [value, setValue] = useState<number>(50);
  return (
    <Field.Root width="sizes.750">
      <Field.Label htmlFor="slider-with-number-input-group-composed">
        {'Slider with Number Input Group Composed'}
      </Field.Label>
      <Slider.Root flexDirection="column" my={1}>
        <Slider.Control
          height="sizes.150"
          id="slider-with-number-input-group-composed"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          step={1}
          value={value}
        />
        <Slider.NumberInput.Group width="100%">
          <Slider.NumberInput.Root width="100%">
            <Slider.NumberInput.Control
              max={100}
              min={0}
              onChange={(e) => setValue(Number(e.target.value))}
              step={1}
              value={value}
            />
          </Slider.NumberInput.Root>
        </Slider.NumberInput.Group>
      </Slider.Root>
    </Field.Root>
  );
}
```

### Disabled Slider With Number Input

```jsx
{
  const [value, setValue] = useState<number>(75);
  return (
    <Field.Root width="sizes.750">
      <Field.Label htmlFor="disabled-slider-with-number-input">
        {'Disabled Slider with Number Input'}
      </Field.Label>
      <Field.Description>
        {'Both the slider and number input are disabled.'}
      </Field.Description>
      <Slider.Root my={1} sx={{ gap: 3 }}>
        <Slider.Control
          disabled
          height="sizes.250"
          id="disabled-slider-with-number-input"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          step={5}
          value={value}
        />
        <Slider.NumberInput />
      </Slider.Root>

      <Text.Body mt={2}>
        {'Current value'}: {value}
      </Text.Body>
    </Field.Root>
  );
}
```

### With Ticks

```jsx
{
  const [value, setValue] = useState<number>(20);
  return (
    <Field.Root width="sizes.750">
      <Field.Label>
        {'Slider with Ticks'}
      </Field.Label>
      <Slider.Root>
        <Slider.TickContainer>
          {(tickValue: number) => <Slider.Tick key={tickValue} />}
        </Slider.TickContainer>
        <Slider.Control
          height="sizes.250"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          // optionally hide track-fill when using Sliders with ticks
          showTrackFill={false}
          step={10}
          value={value}
        />
      </Slider.Root>
      <Text.Body mt={2}>
        {'Current value'}: {value}
      </Text.Body>
    </Field.Root>
  );
}
```

### With Ticks Disabled

```jsx
{
  const [value, setValue] = useState<number>(20);
  return (
    <Field.Root disabled width="sizes.750">
      <Field.Label>
        {'Slider with Ticks'}
      </Field.Label>
      <Slider.Root>
        <Slider.TickContainer>
          {(tickValue: number) => <Slider.Tick key={tickValue} />}
        </Slider.TickContainer>
        <Slider.Control
          height="sizes.250"
          max={100}
          min={0}
          onChange={(e) => setValue(Number(e.target.value))}
          // optionally hide track-fill when using Sliders with ticks
          showTrackFill={false}
          step={10}
          value={value}
        />
      </Slider.Root>
      <Text.Body mt={2}>
        {'Current value'}: {value}
      </Text.Body>
    </Field.Root>
  );
}
```

### With Even Offset

```jsx
{
  const [value, setValue] = useState<number>(10);
  return (
    <Field.Root width="sizes.750">
      <Field.Label>
        {'Slider with Ticks'}
      </Field.Label>
      <Flex alignItems="center" flexDirection="row" gap={2}>
        <Slider.Root width="100%">
          <Moon />
          <Flex mx={2} position="relative" width="100%">
            <Slider.TickContainer>
              {(tickValue: number) => (
                <Slider.Tick key={tickValue} borderRadius="circle" />
              )}
            </Slider.TickContainer>
            <Slider.Control
              height="sizes.250"
              max={30}
              min={-30}
              onChange={(e) => setValue(Number(e.target.value))}
              step={10}
              value={value}
            />
          </Flex>
          <Brightness />
        </Slider.Root>
      </Flex>
      <Text.Body mt={2}>
        {'Current value'}: {value}
      </Text.Body>
    </Field.Root>
  );
}
```