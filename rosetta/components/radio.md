# Radio

Radio buttons allow users to select one option from a group of related options.

## Guidance

### General guidance

Radio buttons should be used when a user needs to make a single selection from a short list of **mutually exclusive** options. Always include clear, concise labels.

Clicking a Radio button deselects a previously selected Radio button in the list of options. Consider having a pre-selected option to suggest preferred choices.

- Don't create a list with more than five Radio options. Consider using a Dropdown instead.
- Display all options to the user, up to five options.
- Don't force users to leave a Radio group empty. Users may be unable to de-select a selected Radio option.
- Offer a "None" option when the user doesn't need to select an option.

### Content

Don't use periods at the end of a Radio button label, even if the label is a complete sentence.

Present options in a logical list (simple to complex, numerical/alphabetical order, etc.).

The Radio Group can contain a description. Individual Radio Options can include their own descriptions as well.

### Accessibility

Radio buttons must always have an accessible name. A group of Radio buttons must also be wrapped in a `<Fieldset>` element with a `<Fieldset.Legend>` to help increase accessibility and avoid odd screen reader behavior.

Because Radio buttons are small, include the aria-label and associated words as a click target so mouse and touch users can more easily access it.

## Usage

> **Prerequisite**: Read [field.md](field.md) before using Radio. When using a Radio individually (outside a Fieldset group), wrap it in a `Field.Root` for accessibility. See field.md for details.

### Selection inputs

Refer to the selection input reference table for comparisons between Checkbox, Radio, Toggle, Dropdown, and Combobox.
## Examples


### Use Pricing Plans

```jsx
{
  return [
    {
      id: 'Basic',
      label: 'Basic Plan - $9/month',
      description: 'Create your own custom website and get discovered online.',
    },
    {
      id: 'Pro',
      label: 'Core Plan - $19/month',
      description: 'Unlock our full array of business features as you grow your business.',
    },
    {
      id: 'Plus',
      label: 'Plus Plan - $29/month',
      description: 'Get all the features of the Pro plan plus priority support.',
    },
    {
      id: 'Advanced',
      label: 'Advanced Plan - $49/month',
      description: 'Get all the features of the Pro plan plus priority support and advanced analytics.',
    },
  ];
}
```

### Basic Radio

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('');
  const [isInvalid, setIsInvalid] = useState(false);
  const options = usePricingPlans();
  const handleValidate = (radioValue: RadioAllowedValue) => {
    setValue(radioValue);

    if (!radioValue || radioValue === 'Lion') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <Fieldset.Root invalid={isInvalid}>
      <Fieldset.Legend fontWeight="medium" textStyle="body">
        {'Select a pricing plan (Required)'}
      </Fieldset.Legend>
      <Radio.Group
        my="2"
        name="radio-validation"
        onValueChange={handleValidate}
        required
        value={value}
      >
        {options.map((option) => (
          <Radio.Root key={option.id}>
            <Radio.Control value={option.id} />
            <Radio.Label m={0}>{option.label}</Radio.Label>
          </Radio.Root>
        ))}
      </Radio.Group>
      <Fieldset.Description>
        {'Selected value'}:{' '}
        {value || 'None'}
      </Fieldset.Description>
      <Fieldset.Error>
        {'Please select a pricing plan'}
      </Fieldset.Error>
    </Fieldset.Root>
  );
}
```

### Basic Radio Horizontal

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('');
  const [isInvalid, setIsInvalid] = useState(false);
  const options = usePricingPlans();
  const handleValidate = (radioValue: RadioAllowedValue) => {
    setValue(radioValue);

    if (!radioValue || radioValue === 'Lion') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <Fieldset.Root invalid={isInvalid}>
      <Fieldset.Legend fontWeight="medium" textStyle="body">
        {'Select a pricing plan (Required)'}
      </Fieldset.Legend>
      <Radio.Group
        flexDirection="row"
        my="2"
        name="radio-validation"
        onValueChange={handleValidate}
        required
        value={value}
      >
        {options.map((option) => (
          <Radio.Root key={option.id}>
            <Radio.Control value={option.id} />
            <Radio.Label m={0}>{option.label}</Radio.Label>
          </Radio.Root>
        ))}
      </Radio.Group>
      <Fieldset.Description>
        {'Selected value'}:{' '}
        {value || 'None'}
      </Fieldset.Description>
      <Fieldset.Error>
        {'Please select a pricing plan'}
      </Fieldset.Error>
    </Fieldset.Root>
  );
}
```

### Basic Radio With Interactive Element

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('credit-card');
  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium" textStyle="body">
        {'Select payment method'}
      </Fieldset.Legend>
      <Radio.Group
        my="2"
        name="payment-method"
        onValueChange={setValue}
        value={value}
      >
        <Flex alignItems="center" gap={2}>
          <Radio.Root>
            <Radio.Control value="credit-card" />
            <Radio.Label m={0} textStyle="body">
              {'Credit or Debit Card'}
            </Radio.Label>
          </Radio.Root>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" style={{ fontSize: '14px', marginLeft: '8px' }}>
            {'Add new card'}
          </a>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Radio.Root>
            <Radio.Control value="paypal" />
            <Radio.Label m={0} textStyle="body">
              {'PayPal'}
            </Radio.Label>
          </Radio.Root>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" style={{ fontSize: '14px', marginLeft: '8px' }}>
            {'Link PayPal account'}
          </a>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Radio.Root>
            <Radio.Control value="bank-transfer" />
            <Radio.Label m={0} textStyle="body">
              {'Bank Transfer (ACH)'}
            </Radio.Label>
          </Radio.Root>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" style={{ fontSize: '14px', marginLeft: '8px' }}>
            {'Processing time info'}
          </a>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Radio.Root>
            <Radio.Control value="buy-now-pay-later" />
            <Radio.Label m={0} textStyle="body">
              {'Buy Now, Pay Later'}
            </Radio.Label>
          </Radio.Root>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" style={{ fontSize: '14px', marginLeft: '8px' }}>
            {'Check eligibility'}
          </a>
        </Flex>
      </Radio.Group>
      <Fieldset.Description>
        {'Selected payment method'}:{' '}
        {value || 'None'}
      </Fieldset.Description>
    </Fieldset.Root>
  );
}
```

### Disabled Radio

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>(0);
  const [valueTwo, setValueTwo] = useState<RadioAllowedValue>(1);
  return (
    <Flex flexDirection="column" gap={4}>
      <Fieldset.Root>
        <Fieldset.Legend fontWeight="medium" textStyle="body">
          {'Disabled single option'}
        </Fieldset.Legend>
        <Radio.Group name="radio-example">
          <Radio.Root>
            <Radio.Control
              checked={value === 2}
              disabled
              onChange={() => setValue(2)}
              value={2}
            />
            <Radio.Label m={0}>
              {'I am disabled at Radio.Control'}
            </Radio.Label>
          </Radio.Root>
          <Radio.Root>
            <Radio.Control
              checked={value === 3}
              onChange={() => setValue(3)}
              value={3}
            />
            <Radio.Label m={0}>
              {'I am not disabled'}
            </Radio.Label>
          </Radio.Root>
        </Radio.Group>
      </Fieldset.Root>

      <Fieldset.Root>
        <Fieldset.Legend fontWeight="medium" textStyle="body">
          {'Radio.group disabled'}
        </Fieldset.Legend>
        <Radio.Group disabled name="radio-exampl-two">
          <Radio.Root>
            <Radio.Control
              checked={valueTwo === 1}
              onChange={() => setValueTwo(3)}
              value={3}
            />
            <Radio.Label m={0}>
              {'I am disabled and selected'}
            </Radio.Label>
          </Radio.Root>
          <Radio.Root>
            <Radio.Control
              checked={valueTwo === 2}
              onChange={() => setValueTwo(4)}
              value={4}
            />
            <Radio.Label m={0}>
              {'I am also disabled but not selected'}
            </Radio.Label>
          </Radio.Root>
        </Radio.Group>
      </Fieldset.Root>
    </Flex>
  );
}
```

### With Custom Indicator

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const options = usePricingPlans();
  const handleValidate = (radioValue: RadioAllowedValue) => {
    setValue(radioValue);

    if (!radioValue || radioValue === 'Lion') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  const CustomCard = ({
    children,
    selected,
  }: {
    children: ReactNode;
    selected: boolean;
  }) => {
    return (
      <Flex
        bg={selected ? 'gray.800' : 'gray.950'}
        borderRadius={6}
        height="150px"
        justifyContent="center"
        outline={selected ? 2 : 1}
        outlineColor="fg.strong"
        outlineOffset="2px"
        p={3}
        width="100px"
      >
        {children}
      </Flex>
    );
  };

  const sharedKeyboardFocusStyles = {
    sx: {
      '> input:focus-visible + div': {
        outline: 2,
        outlineColor: 'fg.strong',
        outlineOffset: '2px',
      },
    },
  };

  return (
    <Fieldset.Root invalid={isInvalid}>
      <Fieldset.Legend textStyle="body">
        {'Select a pricing plan'}
      </Fieldset.Legend>
      <Radio.Group
        flexDirection="row"
        gap={2}
        my="2"
        name="radio-example"
        onValueChange={handleValidate}
      >
        {options.map((option) => (
          <Radio.Root key={option.id} p={0} {...sharedKeyboardFocusStyles}>
            <Radio.HiddenControl value={option.id} />
            <CustomCard selected={value === option.id}>
              {option.label}
            </CustomCard>
          </Radio.Root>
        ))}
      </Radio.Group>
      <Fieldset.Description>
        {'Selected value'}:{' '}
        {value || 'None'}
      </Fieldset.Description>
      <Fieldset.Error>
        {'Please select a pricing plan'}
      </Fieldset.Error>
    </Fieldset.Root>
  );
}
```

### Basic Radio With Descriptions

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('');
  const options = usePricingPlans();
  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium" textStyle="body">
        {'Select a pricing plan'}
      </Fieldset.Legend>
      <Radio.Group flexDirection="column" my="2" name="radio-example">
        {options.map((option) => (
          <Radio.Root key={option.id}>
            <Radio.Control
              onChange={() => setValue(option.id)}
              value={option.id}
            />
            <Flex flexDirection="column">
              <Radio.Label m={0}>{option.label}</Radio.Label>
              <Radio.Description m={0}>{option.description}</Radio.Description>
            </Flex>
          </Radio.Root>
        ))}
      </Radio.Group>
      <Fieldset.Description>
        {'Selected value'}:{' '}
        {value || 'None'}
      </Fieldset.Description>
    </Fieldset.Root>
  );
}
```

### With Centralized Value Management

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('');
  const [isInvalid, setIsInvalid] = useState(false);
  const options = usePricingPlans();
  const handleValidate = (radioValue: RadioAllowedValue) => {
    setValue(radioValue);

    if (!radioValue || radioValue === 'Lion') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <Fieldset.Root invalid={isInvalid}>
      <Fieldset.Legend fontWeight="medium" textStyle="body">
        {'Select a pricing plan (Centralized State)'}
      </Fieldset.Legend>
      <Radio.Group
        my="2"
        name="radio-centralized"
        onValueChange={handleValidate}
        required
        value={value}
      >
        {options.map((option) => (
          <Radio.Root key={option.id}>
            <Radio.Control value={option.id} />
            <Radio.Label m={0}>{option.label}</Radio.Label>
          </Radio.Root>
        ))}
      </Radio.Group>
      <Fieldset.Description>
        {'Selected value'}:{' '}
        {value || 'None'}
      </Fieldset.Description>
      <Fieldset.Error>
        {'Please select a pricing plan'}
      </Fieldset.Error>
    </Fieldset.Root>
  );
}
```

### With React Hook Form

```jsx
{
  const [submittedValue, setSubmittedValue] = useState<RadioAllowedValue>('');
  const options = usePricingPlans();
  const formSchema = z.object({
    value: z.string({ message: 'Please select a pricing plan' }),
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
      <Fieldset.Root invalid={!!errors.value}>
        <Fieldset.Legend fontWeight="medium" textStyle="body">
          {'Select a pricing plan (Centralized State)'}
        </Fieldset.Legend>
        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <Radio.Group
              my="2"
              onValueChange={field.onChange}
              required
              value={field.value}
            >
              {options.map((option) => (
                <Radio.Root key={option.id}>
                  <Radio.Control value={option.id} />
                  <Radio.Label m={0}>{option.label}</Radio.Label>
                </Radio.Root>
              ))}
            </Radio.Group>
          )}
        />
        <Flex flexDirection="row" gap={2} mb={2}>
          <Button.Primary type="submit">Submit</Button.Primary>
          <Button.Secondary onClick={() => reset()} type="button">
            Reset Form
          </Button.Secondary>
        </Flex>
        <Fieldset.Description>
          {'Selected value'}:{' '}
          {submittedValue || 'None'}
        </Fieldset.Description>
        <Fieldset.Error>{errors.value?.message}</Fieldset.Error>
      </Fieldset.Root>
    </form>
  );
}
```