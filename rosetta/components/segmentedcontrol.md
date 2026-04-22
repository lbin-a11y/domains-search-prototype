# Segmented Control

Segmented Control is a group of related buttons that acts as a switch; only one option can be selected at a time.

## Guidance

### General guidance

Segmented Controls are effectively stylized radio buttons, providing users with a visual way to choose between a small handful of options. One, and only one, option is always selected.

Don't use Segmented Controls as an alternative to Tabs. Segmented Controls are inputs for single selection, similar to a Radio Button; Tabs are for navigation.

### Content

Don't use periods at the end of a Segmented Control label, even if the label is a complete sentence. Limit the content inside to one or two words whenever possible.

### Accessibility

Segmented Controls must always have an accessible name. To increase accessibility and avoid odd screen reader behavior, wrap a group of Segmented Controls in a `<fieldset>` element with a `<legend>`.

Include the Segmented Control container and associated words as a click target so mouse and touch users can easily access it.

## Usage

### Anatomy

1. **Option** — A single, selectable option.
2. **Label** — Either text or an Icon, but not both in one option.
3. **Indicator** — Indicates selected option.
4. **Container**

---

### Variants

#### Default

The default Segmented Control provides a bold visual element for option selection. Always use it with an external label, and ensure the content fits in all supported languages. If there's a chance that the labels get too long, or that there will be too many labels to fit in the container, use a Dropdown or Radio buttons.

Generally, use the default variant with two to three options, though there is no defined maximum number of options because of varying container widths and Rosetta use cases.

You can use icons as an alternative to text labels, but ensure the meaning of the icon is easily understood by users globally.

##### Layout

Default Segmented Controls have a squared edge that aligns by default — they should not be offset by 2px on each side.

#### Compact

Use compact Segmented Controls when you need to save vertical space, and the selection does not need to be as visually prominent as the default variant. Compact Segmented Controls should always be used in a Cell.

Generally, use the compact variant with two to three options. Ensure the label does not wrap in all supported languages.

Compact Segmented Controls should ideally use icons, with the exception of one or two letter text labels such as S/M/L. Ensure these labels work in all supported languages.

##### Layout

Compact Segmented Controls should always be used in Cells, stacked with other Cells.

- Use the default variant for any "floating" — i.e. outside of a stack of Cells — use cases.
- Don't use the compact variant for any "floating" use cases. Without the wrapper of a Cell, the compact variant lacks affordance to show how the icons are a group of options.

---

### Selection inputs

Refer to the selection input reference table for comparisons between Checkbox, Radio, Toggle, Dropdown, Combobox, and Segmented Control.
## Examples


### Default

```jsx
{
  const [value, setValue] = useState<number>(1);
  return (
    <SegmentedControl onChange={setValue} value={value}>
      <Option value={1}>
        {'Uno'}
      </Option>
      <Option value={2}>
        {'Dos'}
      </Option>
      <Option value={3}>
        {'Tres'}
      </Option>
      <Option value={4}>
        {'Cuatro'}
      </Option>
    </SegmentedControl>
  );
}
```

### With Data Test Attributes

```jsx
{
  const [value, setValue] = useState<number>(1);
  return (
    <SegmentedControl onChange={setValue} value={value}>
      <Option data-test="uno-1" value={1}>
        {'Uno'}
      </Option>
      <Option data-test="uno-2" value={2}>
        {'Dos'}
      </Option>
      <Option data-test="uno-3" value={3}>
        {'Tres'}
      </Option>
      <Option data-test="uno-4" value={4}>
        {'Cuatro'}
      </Option>
    </SegmentedControl>
  );
}
```

### With Icon Button Options

```jsx
{
  const [value, setValue] = useState<number>(1);

  return (
    <SegmentedControl onChange={setValue} value={value}>
      <Option ariaLabel="Volume High" data-test="uno-1" value={1}>
        <VolumeHigh />
      </Option>
      <Option ariaLabel="Volume Low" data-test="uno-2" value={2}>
        <VolumeLow />
      </Option>
      <Option ariaLabel="Volume Zero" data-test="uno-3" value={3}>
        <VolumeZero />
      </Option>
      <Option ariaLabel="Volume Off" data-test="uno-4" value={4}>
        <VolumeOff />
      </Option>
    </SegmentedControl>
  );
}
```

### Compact With Icon Options

```jsx
{
  const [value, setValue] = useState<number>(1);

  return (
    <SegmentedControl onChange={setValue} value={value} variant="compact">
      <Option data-test="uno-1" label="Volume High" value={1}>
        <VolumeHigh />
      </Option>
      <Option data-test="uno-2" label="Volume Low" value={2}>
        <VolumeLow />
      </Option>
      <Option data-test="uno-3" label="Volume Zero" value={3}>
        <VolumeZero />
      </Option>
      <Option data-test="uno-4" label="Volume Off" value={4}>
        <VolumeOff />
      </Option>
    </SegmentedControl>
  );
}
```

### Compact With Text Options

```jsx
{
  const [value, setValue] = useState<number>(1);
  return (
    <SegmentedControl onChange={setValue} value={value} variant="compact">
      <Option data-test="uno-1" value={1}>
        {'Small'}
      </Option>
      <Option data-test="uno-2" value={2}>
        {'Medium'}
      </Option>
      <Option data-test="uno-3" value={3}>
        {'Large'}
      </Option>
    </SegmentedControl>
  );
}
```

### Compact And Disabled

```jsx
{
  const [value, setValue] = useState<number>(1);
  return (
    <SegmentedControl
      isDisabled
      onChange={setValue}
      value={value}
      variant="compact"
    >
      <Option data-test="uno-1" value={1}>
        {'Small'}
      </Option>
      <Option data-test="uno-2" value={2}>
        {'Medium'}
      </Option>
      <Option data-test="uno-3" value={3}>
        {'Large'}
      </Option>
    </SegmentedControl>
  );
}
```

### Compact In ACell

```jsx
{
  const [value, setValue] = useState<number>(1);

  return (
    <Cell
      description="Subtitle"
      interiorAccessory={
        <SegmentedControl onChange={setValue} value={value} variant="compact">
          <Option data-test="uno-1" label="Volume High" value={1}>
            <VolumeHigh />
          </Option>
          <Option data-test="uno-2" label="Volume Low" value={2}>
            <VolumeLow />
          </Option>
          <Option data-test="uno-3" label="Volume zero" value={3}>
            <VolumeZero />
          </Option>
          <Option data-test="uno-4" label="Volume off" value={4}>
            <VolumeOff />
          </Option>
        </SegmentedControl>
      }
      label="Cell Title"
    />
  );
}
```

### Compact In Cell No Subtitle

```jsx
{
  const [value, setValue] = useState<number>(1);

  return (
    <Cell
      interiorAccessory={
        <SegmentedControl onChange={setValue} value={value} variant="compact">
          <Option data-test="uno-1" label="Volume High" value={1}>
            <VolumeHigh />
          </Option>
          <Option data-test="uno-2" label="Volume Low" value={2}>
            <VolumeLow />
          </Option>
          <Option data-test="uno-3" label="Volume zero" value={3}>
            <VolumeZero />
          </Option>
          <Option data-test="uno-4" label="Volume off" value={4}>
            <VolumeOff />
          </Option>
        </SegmentedControl>
      }
      label="Cell Title"
    />
  );
}
```

### Single Disabled Option

```jsx
{
  const [value, setValue] = useState<number>(1);
  return (
    <Flex flexDirection="column" gap={2}>
      <SegmentedControl onChange={setValue} value={value}>
        <Option isDisabled value={1}>
          {'Disabled Option'}
        </Option>
        <Option value={2}>
          {'Option'}
        </Option>
        <Option value={3}>
          {'Option'}
        </Option>
        <Option value={4}>
          {'Option'}
        </Option>
      </SegmentedControl>
      <SegmentedControl onChange={setValue} value={value} variant="compact">
        <Option data-test="uno-1" isDisabled label="Volume High" value={1}>
          <VolumeHigh />
        </Option>
        <Option data-test="uno-2" label="Volume Low" value={2}>
          <VolumeLow />
        </Option>
        <Option data-test="uno-3" label="Volume zero" value={3}>
          <VolumeZero />
        </Option>
        <Option data-test="uno-4" label="Volume off" value={4}>
          <VolumeOff />
        </Option>
        <Option data-test="uno-3" isDisabled label="Volume zero" value={3}>
          SM
        </Option>
        <Option data-test="uno-4" label="Volume off" value={4}>
          XL
        </Option>
      </SegmentedControl>
    </Flex>
  );
}
```

### All Options Disabled

```jsx
{
  const [value, setValue] = useState<number>(1);
  return (
    <Flex flexDirection="column" gap={2}>
      <SegmentedControl isDisabled onChange={setValue} value={value}>
        <Option value={1}>
          {'Disabled'}
        </Option>
        <Option value={2}>
          {'Disabled'}
        </Option>
        <Option value={3}>
          {'Disabled'}
        </Option>
        <Option value={4}>
          {'Disabled'}
        </Option>
      </SegmentedControl>
      <SegmentedControl
        isDisabled
        onChange={setValue}
        value={value}
        variant="compact"
      >
        <Option data-test="uno-1" label="Volume High" value={1}>
          <VolumeHigh />
        </Option>
        <Option data-test="uno-2" label="Volume Low" value={2}>
          <VolumeLow />
        </Option>
        <Option data-test="uno-3" label="Volume zero" value={3}>
          <VolumeZero />
        </Option>
        <Option data-test="uno-4" label="Volume off" value={4}>
          <VolumeOff />
        </Option>
      </SegmentedControl>
    </Flex>
  );
}
```

### With Auto Focus

```jsx
{
  const [value, setValue] = useState<number>(1);
  const [ref, setRef] = useState<HTMLElement | null>();
  useEffect(() => {
    ref?.focus();
  }, [ref]);

  return (
    <SegmentedControl onChange={setValue} value={value}>
      <Option ref={setRef} value={1}>
        {'Uno'}
      </Option>
      <Option value={2}>
        {'Dos'}
      </Option>
      <Option value={3}>
        {'Tres'}
      </Option>
      <Option value={4}>
        {'Cuatro'}
      </Option>
    </SegmentedControl>
  );
}
```

### Custom Floater

```jsx
{
  const { space } = useTheme();
  const [value, setValue] = useState<number>(1);
  return (
    <SegmentedControl
      borderWidth="3px"
      floaterProps={{
        height: space[7],
      }}
      height={space[8]}
      onChange={setValue}
      sx={{
        '& [role="tablist"]': {
          height: space[7],
        },
      }}
      value={value}
    >
      <Option value={1}>
        {'Uno'}
      </Option>
      <Option value={2}>
        {'Dos'}
      </Option>
      <Option value={3}>
        {'Tres'}
      </Option>
      <Option value={4}>
        {'Cuatro'}
      </Option>
    </SegmentedControl>
  );
}
```