# Checkbox

Checkboxes allow users to select one or more items from a list of options, or to mark something as complete.

Checkbox is the Rosetta implementation of the HTML `checkbox` input. The component allows submission of selected values (e.g., within a form) and can also display an indeterminate checkbox.

## Guidance

### General guidance

Checkboxes should be used when a user needs to select/deselect from a list of options. Ideally, the list of items should be aligned vertically, with a Checkbox and a label for each item.

**Do use Checkboxes for:**

- Multi-select lists.
- A single confirmation (such as agreeing to terms and conditions).
- Changing settings/statuses (not for an action).
- Adding friction before a user agrees to a destructive or impactful action.
- Enabling or applying a fixed setting to another input, like a Text Input.

**Don't use Checkboxes for:**

- Single-select lists — use Radio buttons instead.
- Switching settings from "On" to "Off" — use a Toggle instead.

### Content

- Use active words in the Checkbox label.
- Do not make a Checkbox a double negative.

**Do**

- Add clear and concise labels to Checkboxes.
- Use **active words** in the label if clicking the Checkbox changes the status; e.g., **Enable cookie banner**.

**Don't**

- Make a Checkbox a double negative (i.e., don't make a person check a Checkbox to make something NOT happen).
- Add punctuation to the label, even if it is a complete sentence.

It's possible to provide descriptions to help users understand options at both the Group and Control level.

### Accessibility

Checkboxes must always have an accessible name. A group of Checkboxes must also be wrapped in a `<fieldset>` element with a `<legend>` to help increase accessibility and avoid odd screen reader behavior.

Because Checkboxes are small, include the label and associated words as a click target so mouse and touch users can more easily access it. If a `<label>` element is correctly used to label the control, this behavior will happen automatically.

## Usage

> **Prerequisite**: Read [field.md](field.md) before using Checkbox. When using a Checkbox individually (outside a Fieldset group), wrap it in a `Field.Root` for accessibility. See field.md for details.

### Variants

#### Selection (Default)

The default appearance of Checkboxes is square. This style of Checkbox signifies selection. Use this Checkbox when a user is choosing from a set of options or selecting items to complete bulk actions on.

#### Completion (Round)

Round Checkboxes signify completion. Only use this checkbox when a user is marking a task or milestone complete.

#### Touchable Appearance

Touchable Checkboxes have increased interactive affordances, increasing the target size and adding a background behind the Checkbox on hover and activation. Use the Touchable variant of square or round Checkboxes when they appear without a visible direct label.

- Use Tooltips and ARIA labels to ensure the behavior of a Touchable Checkbox is clear.
- Do not use Checkbox variants to represent other actions for aesthetic purposes.
- Use text Buttons to mark selected items complete in a Table or list that also allows selection.
- Do not provide square selection Checkboxes and round completion Checkboxes on the same item at the same time.

### Checkbox group

Checkbox Groups can help batch related, multi-select options together under a single label and description.

### Table

When using Checkboxes inside Tables for row selection, use the Touchable option. The default Checkbox does not provide enough visual feedback to use as a stand-alone affordance.

### Modifying other inputs

Checkboxes can be used to modify another input, like applying a fixed value to a Text or Number Input. It can also be used to reveal other elements when selected.

### Selection inputs

Refer to the selection input reference table for comparisons between Checkbox, Radio, and Toggle components.
## Examples


### Basic Checkbox

```jsx
{
  const [value, setValue] = useState<boolean>(false);
  return (
    <Checkbox.Root>
      <Checkbox.Control
        autoFocus
        checked={value}
        name="checkbox-default"
        onChange={() => {
          setValue(!value);
        }}
        value={'basic checkbox'}
      />
      <Checkbox.Label m={0}>
        {'Yes, I am wonderful'}
      </Checkbox.Label>
    </Checkbox.Root>
  );
}
```

### Uncontrolled

```jsx
<Checkbox.Root>
      <Checkbox.Control
        defaultChecked={false}
        name="checkbox-uncontrolled"
        onChange={(event) => {
          console.log('Checkbox changed:', event.target.checked);
        }}
      />
      <Checkbox.Label m={0}>
        {'I am truly uncontrolled'}
      </Checkbox.Label>
    </Checkbox.Root>
```

### As Touchable

```jsx
<Flex flexDirection="column" gap={3}>
      <Checkbox.Root>
        <Checkbox.Control touchable value="as-touchable" />
        <Checkbox.Label m={0}>
          {'I am touchable'}
        </Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root>
        <Checkbox.Control
          appearance="round"
          touchable
          value="as-touchable-round"
        />
        <Checkbox.Label m={0}>
          {'I am touchable round'}
        </Checkbox.Label>
      </Checkbox.Root>
    </Flex>
```

### Indeterminate State

```jsx
{
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const options = useFruits();
  const selectedCount = selectedToppings.length;
  const totalCount = options.length;
  const allSelected = selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium">
        {'Select Toppings'}
      </Fieldset.Legend>

      <Checkbox.Root my={2}>
        <Checkbox.Control
          aria-label={'select all toppings'}
          checked={allSelected}
          indeterminate={someSelected}
          onChange={() =>
            setSelectedToppings(
              allSelected ? [] : options.map((fruit) => fruit.id)
            )
          }
          value="select-all"
        />
        <Checkbox.Label m={0}>
          {'Select All'}
        </Checkbox.Label>
      </Checkbox.Root>

      <Flex ml={3}>
        <Checkbox.Group
          name="toppings-selection"
          onValuesChange={setSelectedToppings}
          values={selectedToppings}
        >
          <Flex flexDirection="column" gap={2}>
            {options.map((fruit) => (
              <Checkbox.Root key={fruit.id}>
                <Checkbox.Control
                  aria-label={fruit.label}
                  name={fruit.id}
                  value={fruit.id}
                />
                <Checkbox.Label m={0}>{fruit.label}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Flex>
        </Checkbox.Group>
      </Flex>

      <Fieldset.Description mt={3}>
        {'Selected toppings'}:{' '}
        {selectedToppings.join(', ') ||
          'none'}
      </Fieldset.Description>
      <Fieldset.Description>
        {selectedCount} of {totalCount} toppings selected
      </Fieldset.Description>
    </Fieldset.Root>
  );
}
```

### With Interactive Element

```jsx
{
  const [value, setValue] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const [anchor, setAnchor] = useState();
  return (
    <>
      <Flex gap={2}>
        <Checkbox.Root>
          <Checkbox.Control
            checked={value}
            name="checkbox-default"
            onChange={() => {
              setValue(!value);
            }}
            value="with-interactive-element"
          />
          <Checkbox.Label m={0}>
            {'Yes, I am wonderful'}
          </Checkbox.Label>
        </Checkbox.Root>
        <Touchable.Element.Icon
          ref={setAnchor}
          aria-describedby={'tooltip'}
          aria-label={'More options'}
          onBlur={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onKeyDown={(e: KeyboardEvent) => {
            if (Keyboard.isEsc(e)) {
              e.preventDefault();
              e.stopPropagation();
              setIsHovering(false);
            }
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <InfoCircle />
        </Touchable.Element.Icon>
      </Flex>
      <Tooltip
        anchor={anchor}
        id="tooltip"
        isOpen={isHovering}
        position={'bottom'}
      >
        {'I am a tooltip that is not inside a label'}
      </Tooltip>
    </>
  );
}
```

### Disabled Checkbox

```jsx
{
  const [value, setValue] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  return (
    <Flex flexDirection="column" gap={3}>
      <Fieldset.Root>
        <Fieldset.Legend>Disabled - single option</Fieldset.Legend>
        <Checkbox.Group name="checkbox-example">
          <Checkbox.Root>
            <Checkbox.Control
              aria-label={'basic checkbox'}
              checked={value.option1 === true}
              disabled
              onChange={() => {}}
              value={'option1'}
            />
            <Checkbox.Label m={0}>I am disabled at Checkbox.Control</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.Control
              aria-label={'basic checkbox'}
              checked={value.option3 === true}
              onChange={() => {
                setValue({ ...value, option3: !value.option3 });
              }}
              value={'option3'}
            />
            <Checkbox.Label m={0}>I am not disabled</Checkbox.Label>
          </Checkbox.Root>
        </Checkbox.Group>
      </Fieldset.Root>

      <Fieldset.Root>
        <Fieldset.Legend>Checkbox.Group disabled</Fieldset.Legend>
        <Checkbox.Group disabled name="checkbox-example-two">
          <Checkbox.Root>
            <Checkbox.Control
              aria-label={'basic checkbox'}
              checked={true}
              onChange={() => {}}
              value={'yes'}
            />
            <Checkbox.Label m={0}>I am disabled and selected</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.Control
              aria-label={'basic checkbox'}
              checked={false}
              onChange={() => {}}
              value={'no'}
            />
            <Checkbox.Label m={0}>I am also disabled but not selected</Checkbox.Label>
          </Checkbox.Root>
        </Checkbox.Group>
      </Fieldset.Root>
    </Flex>
  );
}
```

### With Field Context

```jsx
{
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <Flex flexDirection="column" gap={4}>
      <Field.Root>
        <Field.Label>
          {'Terms and Conditions'}
        </Field.Label>
        <Checkbox.Root my={1}>
          <Checkbox.Control
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            value="accept-terms"
          />
          <Checkbox.Label m={0}>
            {'I accept the terms and conditions'}
          </Checkbox.Label>
        </Checkbox.Root>
        <Field.Description>
          {'Please read our terms and conditions carefully.'}
        </Field.Description>
      </Field.Root>

      <Field.Root disabled>
        <Field.Label>
          {'Newsletter (Disabled via Field)'}
        </Field.Label>
        <Checkbox.Root my={1}>
          <Checkbox.Control
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
            value="newsletter"
          />
          <Checkbox.Label m={0}>
            {'Subscribe to newsletter'}
          </Checkbox.Label>
        </Checkbox.Root>
        <Field.Description>
          {'This option is currently disabled.'}
        </Field.Description>
      </Field.Root>
    </Flex>
  );
}
```

### Controlled Checkbox Group

```jsx
{
  const [selectedFruits, setSelectedFruits] = useState<string[]>(['apple']);
  const options = useFruits();

  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium">
        {'Controlled Checkbox Group'}
      </Fieldset.Legend>

      <Checkbox.Group
        mt={2}
        name="fruits"
        onValuesChange={setSelectedFruits}
        values={selectedFruits}
      >
        <Flex flexDirection="column" gap={2}>
          {options.map((fruit) => {
            return (
              <Checkbox.Root key={fruit.id}>
                <Checkbox.Control value={fruit.id} />
                <Checkbox.Label m={0}>{fruit.label}</Checkbox.Label>
              </Checkbox.Root>
            );
          })}
        </Flex>
      </Checkbox.Group>

      <Flex flexDirection="column" gap={2} mt={3}>
        <Fieldset.Description>
          {'Selected fruits'}:{' '}
          {selectedFruits.length > 0
            ? selectedFruits.join(', ')
            : 'none'}
        </Fieldset.Description>

        <Flex gap={2}>
          <Button onClick={() => setSelectedFruits([])} size="small">
            {'Clear All'}
          </Button>

          <Button
            onClick={() => setSelectedFruits(options.map((f) => f.id))}
            size="small"
          >
            {'Select All'}
          </Button>
        </Flex>
      </Flex>
    </Fieldset.Root>
  );
}
```

### Uncontrolled Checkbox Group

```jsx
{
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const options = useFruits();

  const handleOnValuesChange = (values: string[]) => {
    const [value] = values;
    const currentValues = selectedFruits || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setSelectedFruits(newValues);
  };

  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium">
        {'Uncontrolled Checkbox Group'}
      </Fieldset.Legend>

      <Checkbox.Group
        mt={2}
        name="fruits"
        onValuesChange={handleOnValuesChange}
      >
        <Flex flexDirection="column" gap={2}>
          {options.map((fruit) => {
            return (
              <Checkbox.Root key={fruit.id}>
                <Checkbox.Control value={fruit.id} />
                <Checkbox.Label m={0}>{fruit.label}</Checkbox.Label>
              </Checkbox.Root>
            );
          })}
        </Flex>
      </Checkbox.Group>

      <Fieldset.Description mt={3}>
        {'Selected fruits'}:{' '}
        {selectedFruits.join(', ') ||
          'none'}
      </Fieldset.Description>
    </Fieldset.Root>
  );
}
```

### With Descriptions

```jsx
{
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([]);
  const options = useFruits();

  const handleOnValuesChange = (values: string[]) => {
    const [value] = values;
    const currentValues = selectedVegetables || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setSelectedVegetables(newValues);
  };

  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium">
        {'Checkbox Group With Descriptions'}
      </Fieldset.Legend>

      <Checkbox.Group
        mt={2}
        name="with-descriptions"
        onValuesChange={handleOnValuesChange}
      >
        {options.map((fruit) => {
          return (
            <Checkbox.Root key={fruit.id}>
              <Checkbox.Control value={fruit.id} />
              <Flex flexDirection="column">
                <Checkbox.Label m={0}>{fruit.label}</Checkbox.Label>
                <Checkbox.Description m={0}>{fruit.description}</Checkbox.Description>
              </Flex>
            </Checkbox.Root>
          );
        })}
      </Checkbox.Group>

      <Fieldset.Description mt={3}>
        {'Selected vegetables'}:{' '}
        {selectedVegetables.join(', ') ||
          'none'}
      </Fieldset.Description>
    </Fieldset.Root>
  );
}
```

### With Custom Indicator

```jsx
{
  const CustomHeartCheckbox = () => {
    return (
      <HeartFilled
        sx={{
          color: 'gray.800',
          padding: 1,
          transition: 'color 0.3s ease-in-out',
          cursor: 'pointer',
          // manually set checked and focus styles with the following selector
          '[data-checkbox-hidden-control]:focus ~ &': {
            borderRadius: '50%',
            outline: 2,
            outlineColor: 'border.strong',
            outlineOffset: '1px',
          },
          '[data-checkbox-hidden-control]:checked ~ &': {
            color: 'red.500',
          },
        }}
      />
    );
  };

  const CustomCheckbox = () => {
    const [checked, setChecked] = useState<boolean>(false);
    return (
      <Fieldset.Root>
        <Checkbox.Root flexDirection="column" gap={2}>
          <Checkbox.Label m={0}>
            {'Hidden Checkbox'}
          </Checkbox.Label>
          <Flex alignItems="center" justifyContent="center" position="relative">
            <Checkbox.HiddenControl
              aria-label={'hidden checkbox'}
              checked={checked}
              onChange={() => setChecked(!checked)}
              value="hidden"
            />
            <CustomHeartCheckbox />
          </Flex>
        </Checkbox.Root>
      </Fieldset.Root>
    );
  };

  return <CustomCheckbox />;
}
```

### With React Hook Form

```jsx
{
  const [submittedValue, setSubmittedValue] = useState<string[]>([]);
  const options = useFruits();
  const formSchema = z.object({
    value: z.array(z.string()).min(1, {
      message: 'Please select at least one fruit',
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { field } = useController({
    control,
    name: 'value',
    defaultValue: [],
  });

  const onSubmit = handleSubmit((data) => {
    setSubmittedValue(data.value);
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root invalid={!!errors.value}>
        <Fieldset.Legend fontWeight="medium" textStyle="body">
          {'Select a fruit (React Hook Form)'}
        </Fieldset.Legend>
        <Checkbox.Group
          my="2"
          name={field.name}
          onValuesChange={field.onChange}
          values={field.value}
        >
          {options.map((option) => (
            <Checkbox.Root key={option.id}>
              <Checkbox.Control value={option.id} />
              <Checkbox.Label m={0}>{option.label}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Checkbox.Group>
        <Flex flexDirection="row" gap={2} mb={2}>
          <Button.Primary type="submit">Submit</Button.Primary>
          <Button.Secondary onClick={() => reset()} type="button">
            Reset Form
          </Button.Secondary>
        </Flex>
        <Fieldset.Description>
          {'Selected values'}:{' '}
          {submittedValue.join(', ') ||
            'None'}
        </Fieldset.Description>
        <Fieldset.Error>{errors.value?.message}</Fieldset.Error>
      </Fieldset.Root>
    </form>
  );
}
```