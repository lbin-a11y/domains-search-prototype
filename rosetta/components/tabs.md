# Tabs

Tabs organize content across different panes. The component allows a user to navigate between different sets of content from one area.

## Guidance

### General guidance

Tabs should be used to allow a user to navigate quickly between views within the same context. They can use either words or an icon as the label, but not both.

One — and only one — tab should be active at any given time.

**Do:**

- Use Tabs for quick navigation between different sets of content.
- Use text or an Icon for a tab label, but not both.

**Don't:**

- Don't use Tabs as an alternative to Segmented Controls. Segmented Controls are inputs for single selection, similar to a Radio Button; Tabs are for switching between sections.
- If more than four Tabs are necessary, consider a different navigation paradigm.
- Don't force users to jump between Tabs to complete a task.

### Content

**Do:**

- Ensure label lengths are checked in all supported languages.
- Write tab labels as simple, recognizable nouns.
- Keep tab labels at one to two words to account for limited space.

### Accessibility

Tabs follow WCAG specifications. Users can use the Tab key to focus on the active tab. Keyboard navigation is allowed by using the right and left arrow keys to change the active tab. If the user hits the right arrow on the last tab option, the first tab option becomes active (and vice-versa).

The Default variant of Tabs, with overflow, is slightly different. The user can use the Tab key to focus into the Overflow Box container first, and then use the right and left arrow key to navigate through the container. Using the Tab key again allows the user to interact with the tab options as described above.

## Usage

### Anatomy

1. **Tab item** — Single tab, can be in default or selected state.
2. **Label** — Short, concise label that describes the content in the pane.
3. **Indicator** — Indicates selected tab.
4. **Container**
5. **Pane** — Space for the content associated with each tab.

---

### Variants

#### Default

By default, the first tab is left-aligned in the component, and every tab after the first aligns horizontally. The tab label determines the width of each tab, though it shouldn't be too long in any supported language.

To ensure a proper tap zone, avoid the following:

- Use labels that are longer than four characters.
- Don't use Icons as labels; use the Fitted variant instead.

#### Fitted

In some situations, fitted Tabs are more appropriate to help instill the desired hierarchy in the view. Fitted Tabs should be used when Icons are being used for labels.

---

### Specs

For both variants, the Tabs container, including the bottom border line, fills the entire width of its parent element. There should be at least `space[2]` between the Tabs and the pane below.

#### Default

| Property | Value                                                       |
| -------- | ----------------------------------------------------------- |
| Width    | 100%, individual tab is set by the width of the inner label |
| Height   | space[10] plus 1px divider line; total of 56px              |
| Margin   | space[4] between tab items, space[2] below the component    |

#### Fitted

| Property | Value                                                    |
| -------- | -------------------------------------------------------- |
| Width    | 100%, individual tab is 100% ÷ number of tabs            |
| Height   | space[10] plus 1px divider line; total of 56px           |
| Margin   | space[4] between tab items, space[2] below the component |

---

### Behavior

#### Overflow

##### Default

Use default Tabs with overflow prop when content surpasses the given space.

##### Fitted

Fitted Tabs is specifically designed to not overflow gracefully. Long labels wrap and grow in height.

- Use concise labels that won't wrap.
- Use default Tabs with overflow prop to handle overflow content gracefully.
- Don't use lengthy labels that will wrap in fitted Tabs.

#### Motion

Upon selection of a different tab, the indicator transitions smoothly between the two tabs.
## Examples


### Default

```jsx
{
  const [value, setValue] = React.useState('one');
  const options = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    {
      label: 'Three',
      value: 'three',
    },
  ];

  return <Tabs onChange={setValue} options={options} value={value} />;
}
```

### Fitted

```jsx
{
  const [value, setValue] = React.useState('one');
  const options = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    {
      label: 'Three',
      value: 'three',
    },
  ];

  return (
    <Tabs fitted={true} onChange={setValue} options={options} value={value} />
  );
}
```

### With Disabled Options

```jsx
{
  const [value, setValue] = React.useState('one');
  const optionsWithDisabledValues = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    {
      label: 'Three',
      value: 'three',
    },
    {
      isDisabled: true,
      label: 'Four',
      value: 'four',
    },
    {
      isDisabled: true,
      label: 'Five',
      value: 'five',
    },
  ];

  return (
    <Tabs
      onChange={setValue}
      options={optionsWithDisabledValues}
      value={value}
    />
  );
}
```

### Fitted With Disabled Options

```jsx
{
  const [value, setValue] = React.useState('one');
  const optionsWithDisabledValues = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    {
      label: 'Three',
      value: 'three',
    },
    {
      isDisabled: true,
      label: 'Four',
      value: 'four',
    },
    {
      isDisabled: true,
      label: 'Five',
      value: 'five',
    },
  ];

  return (
    <Tabs
      fitted={true}
      onChange={setValue}
      options={optionsWithDisabledValues}
      value={value}
    />
  );
}
```

### I18n Word Wrap

```jsx
{
  const [value, setValue] = React.useState('one');
  return (
    <Tabs
      onChange={setValue}
      options={[
        {
          label: 'This should wrap and stay inside just like everyone else in quarantine',
          value: 'one',
        },
        {
          label: 'His/Her neighbour should stay inside as well',
          value: 'two',
        },
        {
          label: 'something something something quarantine',
          value: 'three',
        },
      ]}
      value={value}
    />
  );
}
```

### Icon Labels

```jsx
{
  const [value, setValue] = React.useState('global');
  return <Tabs onChange={setValue} options={iconOptions} value={value} />;
}
```

### Overflow Labels

```jsx
{
  const [value, setValue] = React.useState('furniture');
  return (
    <Tabs
      onChange={setValue}
      options={overflowOptions}
      overflow={true}
      value={value}
    />
  );
}
```

### Styled

```jsx
{
  const [value, setValue] = React.useState('one');
  const tablistStyles = { gap: '6px', '&:before': { display: 'none' } };

  const tabStyles = {
    height: 'sizes.200',
    margin: 0,
    minHeight: 0,
    '& [role="tab"]': {
      borderRadius: '6px',
      px: 2,
      '&[aria-selected="true"]': {
        backgroundColor: 'gray.900',
      },
    },
  };

  const options = [
    {
      label: 'One',
      value: 'one',
      sx: tabStyles,
    },
    {
      label: 'Two',
      value: 'two',
      sx: tabStyles,
    },
    {
      label: 'Three',
      value: 'three',
      sx: tabStyles,
    },
  ];

  return (
    <Tabs
      onChange={setValue}
      options={options}
      showIndicator={false}
      sx={tablistStyles}
      value={value}
    />
  );
}
```

### Without Indicator

```jsx
{
  const [value, setValue] = React.useState('one');
  const options = [
    {
      label: 'One',
      value: 'one',
    },
    {
      label: 'Two',
      value: 'two',
    },
    {
      label: 'Three',
      value: 'three',
    },
  ];

  return (
    <Tabs
      onChange={setValue}
      options={options}
      showIndicator={false}
      value={value}
    />
  );
}
```