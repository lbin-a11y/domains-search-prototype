# Combobox

Input that allows users to select from a list of options by typing to filter and search.

## Usage

### General guidance

Combobox is a solution for allowing users to make a selection with autocomplete and searchability within longer lists.

### Combobox vs. Dropdown

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

Combobox supports multi-select for use cases where users can select multiple options. This includes the Checkbox affordance inline with the option.

### Behavior

#### Adding custom values

Combobox also supports use cases in which:

1. There is a set list of options from which users can choose.
2. But it should also be possible to add a new option which doesn't currently exist in the list.

For this use case, users can type a string into the search field, select the Add Option action, and add that option to the list for selection.

#### Grouping

To create separation and hierarchy between groups of options, use the Combobox's option group component.

#### Scrolling

##### Desktop scrolling

Combobox doesn't have the same restrictions around long lists. By default, the dialog will cap space[4] from the edge of the viewport and scroll.

#### Overflow

Pay attention to the label length as it can expand drastically when translated. Interior labels should be kept as short as possible in all supported languages. Use an external label instead for long labels. Collaborate with the i18n team early to best design for localization.

When options inside the dialog require more space, the label will wrap. Note that for long single-word options, the label will break with hyphens.

### Accessibility

Every Combobox must have an accessible name and label. Use the Field.Label to ensure proper accessibility.

---
## Examples


### Default

```jsx
{
  const options = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];
  const [value, setValue] = useState<string | undefined>('');
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
const handleInputValueChange = (_inputValue: string) => {
    setInputValue(_inputValue);

    const _filteredOptions = options.filter((option) =>
      option.label?.toLowerCase().startsWith(_inputValue.toLowerCase())
    );

    setFilteredOptions(_filteredOptions);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setFilteredOptions(options);
  };

  const NoResults = () => (
    <Text.Body alignSelf="center" color="fg.muted" justifySelf="center" p={2}>
      {'No results'}
    </Text.Body>
  );

  return (
    <Field.Root>
      <Field.Label>
        {'Country'}
      </Field.Label>
      <Combobox.Root
        inputValue={inputValue}
        onInputValueChange={handleInputValueChange}
        onValueChange={handleValueChange}
        options={options}
        value={value}
      >
        <Combobox.Search my={1}>
          <Combobox.Search.Control
            placeholder={'Select'}
          />
          <Combobox.Search.Icon />
        </Combobox.Search>
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.List>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Combobox.Option key={option.value} option={option}>
                    <Combobox.Option.Label>
                      {option.label}
                    </Combobox.Option.Label>
                    <Combobox.Option.Icon />
                  </Combobox.Option>
                ))
              ) : (
                <NoResults />
              )}
            </Combobox.List>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field.Root>
  );
}
```

### Disabled

```jsx
{
  const options = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];
  const [value, setValue] = useState<string | undefined>('');
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
const handleInputValueChange = (_inputValue: string) => {
    setInputValue(_inputValue);

    const _filteredOptions = options.filter((option) =>
      option.label?.toLowerCase().startsWith(_inputValue.toLowerCase())
    );
    setFilteredOptions(_filteredOptions);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setFilteredOptions(options);
  };

  const NoResults = () => (
    <Text.Body alignSelf="center" color="fg.muted" justifySelf="center" p={2}>
      {'No results'}
    </Text.Body>
  );

  return (
    <Field.Root>
      <Field.Label>
        {'Country'}
      </Field.Label>
      <Combobox.Root
        disabled
        inputValue={inputValue}
        onInputValueChange={handleInputValueChange}
        onValueChange={handleValueChange}
        options={options}
        value={value}
      >
        <Combobox.Search my={1}>
          <Combobox.Search.Control
            placeholder={'Select'}
          />
          <Combobox.Search.Icon />
        </Combobox.Search>
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.List>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Combobox.Option key={option.value} option={option}>
                    <Combobox.Option.Label>
                      {option.label}
                    </Combobox.Option.Label>
                    <Combobox.Option.Icon />
                  </Combobox.Option>
                ))
              ) : (
                <NoResults />
              )}
            </Combobox.List>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field.Root>
  );
}
```

### Multi Select

```jsx
{
  const options = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
  ];
  const [value, setValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement | null>(null);
const handleInputValueChange = (_inputValue: string) => {
    setInputValue(_inputValue);

    const _filteredOptions = options.filter((option) =>
      option.label?.toLowerCase().startsWith(_inputValue.toLowerCase())
    );
    setFilteredOptions(_filteredOptions);
  };

  const handleValueChange = (newValue: string[]) => {
    setValue(newValue);
    setFilteredOptions(options);
  };

  const NoResults = () => (
    <Text.Body alignSelf="center" color="fg.muted" justifySelf="center" p={2}>
      {'No results'}
    </Text.Body>
  );

  return (
    <Field.Root>
      <Field.Label>
        {'Country'}
      </Field.Label>
      <Combobox.Root
        defaultValue={['Albania', 'Angola']}
        inputValue={inputValue}
        isMulti
        isOpen={isOpen}
        onInputValueChange={handleInputValueChange}
        onValueChange={handleValueChange}
        options={options}
        setIsOpen={setIsOpen}
        value={value}
      >
        <Combobox.Search.HiddenControl />
        <Combobox.Search.Trigger my={1}>
          <Combobox.Search.Value
            placeholder={'Select'}
          />
          <Combobox.Search.Icon />
        </Combobox.Search.Trigger>
        <Combobox.Portal>
          <Combobox.Overlay />
          <Combobox.Positioner focusManagerProps={{ initialFocus: inputRef }}>
            <Combobox.Search m={2}>
              <Search />
              <Combobox.Search.Control ref={inputRef} isTrigger={false} />
            </Combobox.Search>
            <Combobox.List>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    inputRef={inputRef}
                    option={option}
                  >
                    <Combobox.Option.Checkbox />
                    <Combobox.Option.Label>
                      {option.label}
                    </Combobox.Option.Label>
                  </Combobox.Option>
                ))
              ) : (
                <NoResults />
              )}
            </Combobox.List>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field.Root>
  );
}
```