# Dropdown

Collapsible and expandable list for selection by user.

## Usage

### General guidance

**Anatomy:**

1. **Field label** — Describes the selection being made.
2. **Helper text (optional)** — Gives additional context for the field. For example, if a selection made for this field may affect other options for the user later, like in settings.
3. **Trigger** — The main click target area.
4. **Placeholder/Value** — Placeholder text for dropdowns should either be "Select" or a preselected default option: "All", an intermediate option, "None", or today's date for a date format.
5. **Option** — Options should be 1–4 words or 1 numeral. Sort alphabetically, by default usage, or by popularity. They can also be grouped.
6. **List** — Try to keep lists under 10 items. Use Combobox for longer lists.

Dropdowns allow users to select one, or multiple, options from a list. They are useful when the space is too limited to display the whole list unconcealed.

Dropdowns should be used thoughtfully, and only when they make the data input easier for the user. For example, it is much easier to type a state (e.g., NY) or birth year (e.g., 1991) than it is to select them in a Dropdown. Combobox can get the best of both worlds: properly formatted information while providing the more ergonomic search.

- Use Dropdowns for limited lists of options.
- Don't use Dropdowns for binary options; use Toggle or Radio instead.

### Dropdown vs. Combobox

Dropdown may be a better option for:

- Limited lists of options that don't require a significant amount of scrolling.
- Lists in which options are arranged in a known pattern.

Combobox may be a better fit for:

- Longer lists that can benefit from search.
- Use cases where users should be able to create an option that isn't on the list.

**Dropdown** is more restrictive; the user can only select from a mutually exclusive set of options. For example, there are only a few days of the week arranged in a known order.

**Combobox** can be especially helpful for finding an option in a long list. The additional Checkbox affordance on a multiselect Combobox can be helpful for indicating multiple choices.

### Selection inputs

Refer to the selection input reference table for comparisons between Checkbox, Radio, Toggle, Dropdown, and Combobox.

### Multi-select

Dropdown also supports multi-select for use cases where users can select multiple options.

### Behavior

#### Grouping

To create separation and hierarchy between groups of options, use the Dropdown's option group component.

**Anatomy for grouped options:**

1. **Option Group** — Contains a related group of options.
2. **Option group label** — Descriptive label for the option group.

#### Scrolling

##### Desktop scrolling

While extremely long lists should be avoided, the dialog will cap space[4] from the edge of the viewport and scroll.

#### Overflow

Pay attention to the label length as it can expand drastically when translated. Interior labels should be kept as short as possible in all supported languages. Use an external label instead for long labels. Collaborate with the i18n team early to best design for localization.

When options inside the dialog require more space, the label will wrap. Note that for long single-word options, the label will break with hyphens.

### Accessibility

Every Dropdown must have an accessible name and label. Use the Field.Label to ensure proper accessibility.
## Examples


### Default

```jsx
{
  const [value, setValue] = useState('');
  const options = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];
return (
    <Field.Root>
      <Field.Label>
        {'Country'}
      </Field.Label>
      <Field.Description>
        {'Select a country to continue'}
      </Field.Description>
      <Dropdown.Root onValueChange={setValue} options={options} value={value}>
        <Dropdown.Trigger my={1}>
          <Dropdown.Trigger.Value
            placeholder={'Select a country...'}
          />
          <Dropdown.Trigger.Icon />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Overlay />
          <Dropdown.Positioner>
            <Dropdown.List>
              {options.map((option) => (
                <Dropdown.Option key={option.value} option={option}>
                  <Dropdown.Option.Label>{option.label}</Dropdown.Option.Label>
                  <Dropdown.Option.Icon />
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown.Root>
    </Field.Root>
  );
}
```

### Disabled

```jsx
{
  const [value, setValue] = useState('');
  const options = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];
return (
    <Field.Root>
      <Dropdown.Root
        disabled
        onValueChange={setValue}
        options={options}
        value={value}
      >
        <Dropdown.Trigger>
          <Dropdown.Trigger.Value
            placeholder={'Select a country...'}
          />
          <Dropdown.Trigger.Icon />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Overlay />
          <Dropdown.Positioner>
            <Dropdown.List>
              {options.map((option) => (
                <Dropdown.Option key={option.value} option={option}>
                  <Dropdown.Option.Label>{option.label}</Dropdown.Option.Label>
                  <Dropdown.Option.Icon />
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown.Root>
    </Field.Root>
  );
}
```

### Multi Select

```jsx
{
  const [value, setValue] = useState<string[]>([]);
  const options = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];
return (
    <Field.Root>
      <Field.Label>
        {'Country'}
      </Field.Label>
      <Field.Description>
        {'Multi-select options'}
      </Field.Description>
      <Dropdown.Root
        isMulti
        onValueChange={setValue}
        options={options}
        value={value}
      >
        <Dropdown.Trigger my={1}>
          <Dropdown.Trigger.Value
            placeholder={'Select countries...'}
          />
          <Dropdown.Trigger.Icon />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Overlay />
          <Dropdown.Positioner>
            <Dropdown.List>
              {options.map((option) => (
                <Dropdown.Option key={option.value} option={option}>
                  <Dropdown.Option.Checkbox />
                  <Dropdown.Option.Label>{option.label}</Dropdown.Option.Label>
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown.Root>
    </Field.Root>
  );
}
```