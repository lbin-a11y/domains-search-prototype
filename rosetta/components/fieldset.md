# Fieldset

Fieldset is a foundational form component that groups related form inputs together with a semantic container. It provides structure, accessibility, and state management for groups of form controls like radio buttons, checkboxes, or related inputs. It automatically handles ARIA relationships between legends, descriptions, error messages, and grouped form controls, ensuring your forms are accessible by default.

## Guidance

### When to use Fieldset

- **Radio button groups**: Use Fieldset to group related radio buttons with a shared legend.
- **Checkbox groups**: Group related checkboxes that share a common purpose or category.
- **Related form sections**: Group logically related form inputs that belong together conceptually.
- **Complex form organization**: Break large forms into logical sections with clear boundaries.
- **Accessibility requirements**: Fieldset provides semantic grouping that screen readers understand.

### Accessibility features

Fieldset automatically provides:

- **Semantic grouping**: Uses the native `<fieldset>` element to create logical groups of form controls.
- **Legend association**: Fieldset.Legend provides the accessible name for the entire group using the `<legend>` element.
- **ARIA relationships**: Sets `aria-labelledby` and `aria-describedby` to connect legends and descriptions to the fieldset.
- **Disabled state management**: Disabled state cascades to all child form controls within the fieldset.
- **Screen reader navigation**: Screen readers announce the fieldset boundary and legend when entering/exiting the group.

### Best practices

**Do**

- Use Fieldset for radio button groups that represent a single choice from multiple options.
- Use Fieldset for checkbox groups that represent related options.
- Provide clear, descriptive legends that explain the purpose of the grouped controls.
- Use Fieldset.Description for complex groups that need additional context.
- Apply disabled state to the entire fieldset when all controls should be disabled together.

**Don't**

- Use Fieldset for single form inputs (use Field instead).
- Nest Fieldset components inside each other.
- Use Fieldset purely for visual grouping without semantic meaning.
- Skip Fieldset.Legend for groups that need accessible names.
- Use Fieldset when inputs are unrelated or serve different purposes.

### Validation patterns

Apply validation states to the entire fieldset when the group selection is required. The `invalid` prop controls the display of error messages and applies error styling to the fieldset.

### Integration with other components

Fieldset works seamlessly with: Radio Groups (for single-choice selections), Checkbox Groups (for multiple selections from related options), individual Field components grouped within a Fieldset for complex form sections, Toggle Groups, and custom grouped form inputs that need semantic association.
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

### Basic

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

### Disabled

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('');
  const [disabled, setDisabled] = useState(true);
  const options = usePricingPlans();
  return (
    <>
      <Fieldset.Root disabled={disabled}>
        <Fieldset.Legend fontWeight="medium" textStyle="body">
          {'Select a pricing plan'}
        </Fieldset.Legend>
        <Radio.Group
          flexDirection="column"
          my="2"
          name="radio-example"
          onValueChange={setValue}
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
      </Fieldset.Root>
      <Button.Primary mt="2" onClick={() => setDisabled(!disabled)}>
        {disabled
          ? 'Enable'
          : 'Disable'}
      </Button.Primary>
    </>
  );
}
```

### With Validation

```jsx
{
  const [value, setValue] = useState<RadioAllowedValue>('');
  const [isInvalid, setIsInvalid] = useState(true);
  const options = usePricingPlans();
  const handleValidate = (radioValue: RadioAllowedValue) => {
    setValue(radioValue);

    if (!radioValue || radioValue === 'Lion') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  const handleSubmit = () => {
    if (!value) {
      setIsInvalid(true);
    }
  };

  return (
    <div>
      <Fieldset.Root invalid={isInvalid} mb="3">
        <Fieldset.Legend mb="2">
          <Text.Body fontWeight="medium">
            {'Choose your subscription plan'}
          </Text.Body>
        </Fieldset.Legend>
        <Fieldset.Description mb="3">
          {'Select the plan that best fits your needs'}
        </Fieldset.Description>
        <Radio.Group
          my="2"
          name="subscription-plan"
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
        <Fieldset.Error>
          {'Please select a subscription plan'}
        </Fieldset.Error>
      </Fieldset.Root>
      <Button.Primary mt="2" onClick={handleSubmit}>
        {'Continue'}
      </Button.Primary>
    </div>
  );
}
```