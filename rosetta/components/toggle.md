# Toggle

A control that is used to quickly switch between two possible states.

## Guidance

### General guidance

Toggles are only used for binary actions that occur immediately after the user slides the Toggle handle. They are commonly used for "on/off" switches. A Toggle should always be accompanied by a clear, concise label.

### Content

- Keep Toggle labels brief to account for panel space in other languages.
- Make sure Toggle labels are **_direct objects_**, as the activation state (on or off) is communicated by the component.
- Present options in a logical list (simple to complex, numerical/alphabetical order, etc.).
- Don't use periods at the end of a Toggle label, even if the label is a complete sentence.

### Accessibility

Toggles must always have an accessible name. A group of Toggles must also be wrapped in a `<fieldset>` element with a `<legend>` to help increase accessibility and avoid odd screen reader behavior. A single Toggle that makes sense from its label alone does not require `<fieldset>` and `<legend>`.

Because Toggles are small, include the label and associated words as a click target so mouse and touch users can more easily access it. If a `<label>` element is correctly used to label the control, this behavior will happen automatically.

## Usage

### Anatomy

1. **Container** — Background color is the main indicator of whether the Toggle is set to "on" or "off".
2. **Handle** — Position of the handle also indicates whether the Toggle is set to "on" or "off".

---

### Specs

The Toggle component is purposely flexible to allow for easier use. It can be used either simply with a text label, or in a Cell.

#### With label

Toggles can be used simply with a label, using the Body Book type style with `space[2]` margins.

#### In Cells

To fit with many Squarespace UI conventions, Toggles can also be used in stackable Cells with a label. Note that when a Toggle is used in a Cell, the entire Cell should act as the tap zone.

---

### Behavior

#### Overflow

In the unlikely case of a long label accompanying a Toggle, the label should wrap next to the Toggle, not underneath it.

### Motion

Upon triggering, both the background color and the handle position transition smoothly to their "on" position.

---

### Selection inputs

Refer to the selection input reference table for comparisons between Checkbox, Radio, Toggle, Dropdown, Combobox, and Segmented Control.
## Examples


### Default

```jsx
{
  const [checked, setChecked] = React.useState(false);
  return (
    <Toggle.Root>
      <Toggle.Control
        aria-label={'default toggle example'}
        checked={checked}
        onChange={() => setChecked(!checked)}
        value="toggle"
      />
      <Toggle.Label>
        {'Default'}
      </Toggle.Label>
    </Toggle.Root>
  );
}
```

### Disabled

```jsx
{
  const [checked, setChecked] = React.useState(false);
  return (
    <Toggle.Root>
      <Toggle.Control
        aria-label={'toggle disabled example'}
        checked={checked}
        disabled
        onChange={() => setChecked(!checked)}
        value={'disabled toggle'}
      />
      <Toggle.Label>
        {'Disabled'}
      </Toggle.Label>
    </Toggle.Root>
  );
}
```

### Multiple Toggles

```jsx
{
  // Initialize with 'notifications' selected to match test expectations
  const [selectedSettings, setSelectedSettings] = React.useState<string[]>([
    'notifications',
  ]);

  const settings = [
    {
      id: 'darkMode',
      label: 'Dark Mode',
    },
    {
      id: 'notifications',
      label: 'Notifications',
    },
    {
      id: 'autoSave',
      label: 'Auto Save',
    },
    {
      id: 'locationAccess',
      label: 'Location Access',
    },
    {
      id: 'dataCollection',
      label: 'Data Collection',
    },
  ];

  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium" textStyle="body">
        {'Settings'}
      </Fieldset.Legend>
      <Fieldset.Description mb="2">
        {'Select your preferences'}
      </Fieldset.Description>
      <Toggle.Group
        name="settings"
        onValuesChange={setSelectedSettings}
        values={selectedSettings}
      >
        <Flex flexDirection="column" gap={2}>
          {settings.map((setting) => (
            <Toggle.Root
              key={setting.id}
              justifyContent="space-between"
              sx={{ width: 'sizes.700' }}
            >
              <Toggle.Label>{setting.label}</Toggle.Label>
              <Toggle.Control
                aria-label={`toggle ${setting.id}`}
                checked={selectedSettings.includes(setting.id)}
                value={setting.id}
              />
            </Toggle.Root>
          ))}
        </Flex>
      </Toggle.Group>

      <Fieldset.Description mt={3}>
        {'Selected settings'}:{' '}
        {selectedSettings.length > 0
          ? selectedSettings.join(', ')
          : 'none'}
      </Fieldset.Description>
    </Fieldset.Root>
  );
}
```

### Direct Composition

```jsx
{
  const [value, setValue] = React.useState(false);
  return (
    <Toggle.Root>
      <Toggle.Label>
        {'Custom Toggle with Direct Composition'}
      </Toggle.Label>
      <Checkbox.HiddenControl
        aria-label={'directly composed toggle example'}
        checked={value}
        onChange={() => setValue(!value)}
        value="custom-toggle"
      />
      <Toggle.Indicator sx={{ backgroundColor: 'red.500' }} />
    </Toggle.Root>
  );
}
```

### With Description

```jsx
{
  const [checked, setChecked] = React.useState(false);
  return (
    <Toggle.Root
      flexDirection="column"
      sx={{ alignItems: 'flex-start', gap: 1 }}
    >
      <Flex alignItems="center" gap={2}>
        <Toggle.Control
          checked={checked}
          onChange={() => setChecked(!checked)}
          value="toggle"
        />
        <Toggle.Label>
          {'Default'}
        </Toggle.Label>
      </Flex>
      <Toggle.Description>
        {'This is a description'}
      </Toggle.Description>
    </Toggle.Root>
  );
}
```

### With Field Context

```jsx
{
  const [notifications, setNotifications] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);
  return (
    <Flex flexDirection="column" gap={4}>
      <Field.Root>
        <Field.Label>
          {'Email Settings'}
        </Field.Label>
        <Toggle.Root my={1}>
          <Toggle.Control
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            value="notifications"
          />
          <Toggle.Label>
            {'Email Notifications'}
          </Toggle.Label>
        </Toggle.Root>
        <Field.Description>
          {'Receive email notifications about your account activity'}
        </Field.Description>
      </Field.Root>

      <Field.Root disabled>
        <Field.Label>
          {'Marketing Settings'}
        </Field.Label>
        <Toggle.Root my={1}>
          <Toggle.Control
            checked={marketing}
            onChange={() => setMarketing(!marketing)}
            value="marketing"
          />
          <Toggle.Label>
            {'Marketing Emails'}
          </Toggle.Label>
        </Toggle.Root>

        <Field.Description>
          {'This option is currently disabled'}
        </Field.Description>
      </Field.Root>
    </Flex>
  );
}
```