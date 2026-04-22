# Number Input

Number Inputs allow users to enter and edit numbers.

## Guidance

### General content guidance

| Element              | Required? | Notes                                                      |
| -------------------- | --------- | ---------------------------------------------------------- |
| Field label          | Yes       | Always include labels for accessibility.                   |
| Error text           | Yes       | Always provide context and resolution for errors.          |
| Prefixes or suffixes | Yes       | Number Input includes increment and decrement as a suffix. |
| Placeholder          | Optional  | Only use to help with input formatting.                    |
| Helper               | Optional  | Only use when more context is necessary.                   |

### Field label

Labels are required as they are critical for assistive-technology users. Use short, direct nouns.

Glyphs in the prefix slot can be used as labels in established and unambiguous patterns as long as they have appropriate alt text.

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

Error text should include why an input is invalid, supporting context, and resolution to the error. Ensure that error text communicates how to fix the input error (e.g., "Enter a valid 5-digit zip code"). This text does not need a period at the end.

### Placeholder text

Number Inputs do not require placeholder text and do not always benefit from it.

The presence of units in the prefix or suffix can help cue input instead of relying on placeholders.

### Helper

Helper text is located below the field label. This text is used to provide context or instructions, such as character count or required formatting.

## Composition

### Prefixes and suffixes

Prefixes and suffixes in Number Inputs can be used for units. These can help users decide what data to enter and reduce data formatting issues.

### Increment and Decrement

The Number Input contains increment and decrement controls on the trailing end of the input.

Users can click the chevrons to increment/decrement the input in addition to the standard arrow key inputs.

## Behavior

### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.
## Examples


### Default

```jsx
<Field.Root>
      <Field.Label>
        {'Default Style'}
      </Field.Label>
      <Field.Description>
        {'Description'}
      </Field.Description>
      <NumberInput.Group my={1}>
        <NumberInput.Root>
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Column>
          <NumberInput.Increment />
          <NumberInput.Decrement />
        </NumberInput.Column>
      </NumberInput.Group>
    </Field.Root>
```

### Base

```jsx
<Field.Root backgroundColor="bg.default" p={2}>
      <Field.Label>
        {'Base Style'}
      </Field.Label>
      <Field.Description>
        {'Description'}
      </Field.Description>
      <NumberInput.Group my={1}>
        <NumberInput.Root variant="base">
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Column>
          <NumberInput.Increment />
          <NumberInput.Decrement />
        </NumberInput.Column>
      </NumberInput.Group>
    </Field.Root>
```

### Sizes

```jsx
<Flex flexDirection="column" gap={2}>
      <Field.Root p={2}>
        <Field.Label>
          {'Small Default'}
        </Field.Label>
        <Field.Description>
          {'Description'}
        </Field.Description>
        <NumberInput.Group my={1}>
          <NumberInput.Root size="small">
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
      </Field.Root>
      <Field.Root backgroundColor="bg.default" p={2}>
        <Field.Label>
          {'Small Base'}
        </Field.Label>
        <Field.Description>
          {'Description'}
        </Field.Description>
        <NumberInput.Group my={1}>
          <NumberInput.Root size="small" variant="base">
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
      </Field.Root>
      <Field.Root p={2}>
        <Field.Label>
          {'Medium Default'}
        </Field.Label>
        <Field.Description>
          {'Description'}
        </Field.Description>
        <NumberInput.Group my={1}>
          <NumberInput.Root size="medium">
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
      </Field.Root>
      <Field.Root backgroundColor="bg.default" p={2}>
        <Field.Label>
          {'Medium Base'}
        </Field.Label>
        <Field.Description>
          {'Description'}
        </Field.Description>
        <NumberInput.Group my={1}>
          <NumberInput.Root size="medium" variant="base">
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
      </Field.Root>
    </Flex>
```

### Invalid

```jsx
{
  const { parseNumberToString } = useParseNumber();

  const [value, setValue] = useState<string>('');
  const parsedValue = parseNumberToString(value);
  const isInvalid = typeof parsedValue === 'undefined';

  return (
    <Flex flexDirection="column" gap={2}>
      <Field.Root invalid={isInvalid} p={2}>
        <Field.Label>
          {'Invalid'}
        </Field.Label>
        <NumberInput.Group my={1} onValueChange={setValue} value={value}>
          <NumberInput.Root>
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
        {!isInvalid && (
          <Field.Description>
            {'The value is '}
            {parsedValue}
          </Field.Description>
        )}
        <Field.Error>
          {'Invalid number'}
        </Field.Error>
      </Field.Root>
    </Flex>
  );
}
```

### Disabled

```jsx
<Flex flexDirection="column" gap={2}>
      <Field.Root disabled p={2}>
        <Field.Label>
          {'Disabled'}
        </Field.Label>
        <Field.Description>
          {'This is a disabled number input'}
        </Field.Description>
        <NumberInput.Group my={1}>
          <NumberInput.Root>
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
      </Field.Root>
      <Field.Root backgroundColor="bg.default" disabled p={2}>
        <Field.Label>
          {'Disabled'}
        </Field.Label>
        <Field.Description>
          {'This is a disabled number input with base variant'}
        </Field.Description>
        <NumberInput.Group my={1}>
          <NumberInput.Root variant="base">
            <NumberInput.Control />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
      </Field.Root>
    </Flex>
```

### Min Max Step

```jsx
{
  const [value, setValue] = useState<string>('');

  return (
    <Field.Root>
      <Field.Label>
        {'Min Max Step'}
      </Field.Label>
      <Field.Description>
        {'This is a number input with a min of 0 and max of 100. The step is 10.'}
      </Field.Description>
      <NumberInput.Group
        max={100}
        min={0}
        my={1}
        onValueChange={setValue}
        step={10}
        value={value}
      >
        <NumberInput.Root>
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Column>
          <NumberInput.Increment />
          <NumberInput.Decrement />
        </NumberInput.Column>
      </NumberInput.Group>
      <Field.Description>
        {'The value is '}
        {value}
      </Field.Description>
    </Field.Root>
  );
}
```

### Manual On Click Handlers

```jsx
{
  const [value, setValue] = useState<string>('25');

  return (
    <Field.Root>
      <Field.Label>
        {'Manual onClick Handlers'}
      </Field.Label>
      <Field.Description>
        {'Manual onClick handlers on the increment and decrement buttons.'}
      </Field.Description>
      <NumberInput.Group
        max={100}
        min={0}
        my={1}
        onValueChange={setValue}
        step={5}
        value={value}
      >
        <NumberInput.Root>
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Column>
          <NumberInput.Increment
            onClick={() =>
              setValue((prevValue) =>
                Math.min(Number(prevValue) + 5, 100).toString()
              )
            }
          />
          <NumberInput.Decrement
            onClick={() =>
              setValue((prevValue) =>
                Math.max(Number(prevValue) - 5, 0).toString()
              )
            }
          />
        </NumberInput.Column>
      </NumberInput.Group>
    </Field.Root>
  );
}
```

### With Custom Input Ref

```jsx
{
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Field.Root>
      <Field.Label>
        {'With Custom Input Ref'}
      </Field.Label>
      <NumberInput.Group max={100} min={0} my={1} step={10}>
        <NumberInput.Root>
          <NumberInput.Control ref={inputRef} />
        </NumberInput.Root>
        <NumberInput.Column>
          <NumberInput.Increment />
          <NumberInput.Decrement />
        </NumberInput.Column>
      </NumberInput.Group>
    </Field.Root>
  );
}
```

### With React Hook Form

```jsx
{
  const [submittedValue, setSubmittedValue] = useState<string>('');
  const formSchema = z.object({
    value: z.string({ message: 'This field is required.' }),
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

  const onSubmit = handleSubmit((data) => {
    setSubmittedValue(data.value);
  });

  return (
    <form onSubmit={onSubmit}>
      <Field.Root invalid={!!errors.value}>
        <Field.Label fontWeight="medium" textStyle="body">
          {'Number Input (React Hook Form)'}
        </Field.Label>
        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <NumberInput.Group
              max={100}
              min={0}
              my={1}
              onValueChange={field.onChange}
              step={10}
              value={field.value}
            >
              <NumberInput.Root>
                <NumberInput.Control />
              </NumberInput.Root>
              <NumberInput.Column>
                <NumberInput.Increment />
                <NumberInput.Decrement />
              </NumberInput.Column>
            </NumberInput.Group>
          )}
        />
        <Flex flexDirection="row" gap={2} mb={2}>
          <Button.Primary type="submit">
            {'Submit'}
          </Button.Primary>
          <Button.Secondary onClick={() => reset()} type="button">
            {'Reset Form'}
          </Button.Secondary>
        </Flex>
        <Field.Description>
          {'Entered value'}:{' '}
          {submittedValue || 'None'}
        </Field.Description>
        <Field.Error>{errors.value?.message}</Field.Error>
      </Field.Root>
    </form>
  );
}
```

### Money Input

```jsx
{
  const [value, setValue] = useState<UseCurrencyFormatProps['value']>({
    amount: 0,
    currency: 'EUR',
  });
  const [ref, setRef] = React.useState<HTMLInputElement | null>(null);
  const { formatCurrency, getCurrencySymbol, getNumberSystemMetadata } =
    useFormatters();
  const { inputProps, formatValue } = useCurrencyFormat(
    value,
    setValue,
    ref,
    getNumberSystemMetadata().symbols,
    formatCurrency
  );

  return (
    <Fieldset.Root gap={2}>
      <Field.Root>
        <Field.Label>
          {'Currency'}
        </Field.Label>
        <Field.Description>
          {'Enter amount in EUR'}
        </Field.Description>

        <NumberInput.Group
          my={1}
          onValueChange={(inputValue) => setValue(formatValue(inputValue))}
          value={value?.amount?.toString()}
        >
          <NumberInput.Root>
            <Text.Body color="fg.muted" fontWeight="book">
              {value?.currency ? getCurrencySymbol(value.currency) : ''}
            </Text.Body>
            <NumberInput.Control ref={setRef} placeholder="0.00" />
          </NumberInput.Root>
          <NumberInput.Column>
            <NumberInput.Increment />
            <NumberInput.Decrement />
          </NumberInput.Column>
        </NumberInput.Group>
        <Field.Description>
          {'Amount entered: '}{' '}
          {inputProps.value}
        </Field.Description>
      </Field.Root>
    </Fieldset.Root>
  );
}
```

### With Prefix Suffix

```jsx
<Field.Root>
      <Field.Label>
        {'Vertical Padding'}
      </Field.Label>
      <Field.Description>
        {'Description'}
      </Field.Description>
      <NumberInput.Group my={1}>
        <NumberInput.Root>
          <PaddingCenterVertical />
          <NumberInput.Control textAlign="right" />
          <Text.Body color="fg.muted">px</Text.Body>
        </NumberInput.Root>
        <NumberInput.Column>
          <NumberInput.Increment />
          <NumberInput.Decrement />
        </NumberInput.Column>
      </NumberInput.Group>
    </Field.Root>
```