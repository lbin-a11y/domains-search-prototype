# Textarea

A text input that expands for multiple lines of text. Input can also be configured to display a character count.

## Guidance

### General content guidelines

There are several elements to a Textarea. This is a high-level, generalized set of guidelines for accessible and usable Textarea. For more details on each of these elements, see their linked sections.

Textareas should be used instead of standard Text Inputs when the expected content is longer than a few words.

| Element         | Required? | Notes                                             |
| --------------- | --------- | ------------------------------------------------- |
| **Field label** | Yes       | Always include labels for accessibility.          |
| **Error text**  | Yes       | Always provide context and resolution for errors. |
| **Placeholder** | -         | Only use to help with input formatting.           |
| **Helper**      | -         | Only use when more context is necessary.          |

### Field label

Textareas should always be accompanied by a label.

- Always include a field label in any Textarea.
- Never use placeholder text as labels.

### Error text

Textareas should display an error message once the character limit is reached, or if the input was incorrect.

### Placeholder text

Placeholder text is not required. Only use placeholder text if it helps cue users to the data format, or shows important information that helps users decide what to input.

- Don't repeat unnecessary or duplicate information like character counts when they're already present.
- Don't use ellipses in placeholders.
- Use placeholders to indicate formatting or critical information.

### Helper text

Helper text is located below the field label. This text is used to provide context or instructions, such as character count or required formatting.

It is also possible to include toggle-able helper text, using an in-line implementation of the Reveal with a trigger that indicates more information will be revealed (e.g. "Show more information.")

### Character count

Textareas can have a character limit. If so, a character count displays on the top right showing the remaining available characters. Once the limit is reached, display an error message.

---

## Behavior

### Sizing

The suggested default height is five lines of text.

### Overflow

Textareas scroll vertically when the length of the content exceeds the available space.

### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.
## Examples


### Default

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Field.Root maxWidth={400}>
      <Field.Label>
        {'Default Style'}
      </Field.Label>
      <Field.Description>
        {'Basic textarea'}
      </Field.Description>
      <Textarea.Root my={1}>
        <Textarea.Control
          aria-label={'default textarea'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Placeholder'}
          rows={4}
          value={value}
        />
      </Textarea.Root>
    </Field.Root>
  );
}
```

### Base

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Field.Root backgroundColor="bg.default" maxWidth={400} p={3}>
      <Field.Label>
        {'Base Style'}
      </Field.Label>
      <Field.Description>
        {'Basic textarea'}
      </Field.Description>
      <Textarea.Root my={1} variant="base">
        <Textarea.Control
          aria-label={'default textarea'}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Placeholder'}
          rows={4}
          value={value}
        />
      </Textarea.Root>
    </Field.Root>
  );
}
```

### Bare Textarea

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Flex flexDirection="column" gap={3}>
      <Textarea.Control
        aria-label="default textarea"
        onChange={(e) => setValue(e.target.value)}
        placeholder={'Placeholder'}
        rows={4}
        value={value}
      />
      <Textarea.Control
        aria-label="disabled textarea"
        disabled
        placeholder={'Placeholder'}
        rows={4}
      />
    </Flex>
  );
}
```

### Sizes

```jsx
<Flex flexDirection="column" gap={3} maxWidth={500} padding={3}>
      <Field.Root maxWidth={400}>
        <Field.Label>
          {'Small Default'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with different sizes.'}
        </Field.Description>
        <Textarea.Root my={1} size="small">
          <Textarea.Control
            aria-label={'small textarea'}
            placeholder={'Placeholder'}
            rows={4}
          />
        </Textarea.Root>
      </Field.Root>
      <Field.Root maxWidth={400}>
        <Field.Label>
          {'Small Base'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with different sizes.'}
        </Field.Description>
        <Textarea.Root my={1} size="small" variant="base">
          <Textarea.Control
            aria-label={'small textarea'}
            placeholder={'Placeholder'}
            rows={4}
          />
        </Textarea.Root>
      </Field.Root>
      <Field.Root maxWidth={400}>
        <Field.Label>
          {'Medium Default'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with different sizes.'}
        </Field.Description>
        <Textarea.Root my={1} size="medium">
          <Textarea.Control
            aria-label={'medium textarea'}
            placeholder={'Placeholder'}
            rows={4}
          />
        </Textarea.Root>
      </Field.Root>

      <Field.Root maxWidth={400}>
        <Field.Label>
          {'Medium Base'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with different sizes.'}
        </Field.Description>
        <Textarea.Root my={1} size="medium" variant="base">
          <Textarea.Control
            aria-label={'medium textarea'}
            placeholder={'Placeholder'}
            rows={4}
          />
        </Textarea.Root>
      </Field.Root>
    </Flex>
```

### With Resize

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Field.Root maxWidth={400}>
      <Field.Label>
        {'Example Label'}
      </Field.Label>
      <Field.Description>
        {'Basic textarea.'}
      </Field.Description>
      <Textarea.Root my={1}>
        <Textarea.Control
          aria-label={'default textarea'}
          autoResize={false}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Placeholder'}
          rows={4}
          sx={{ resize: 'both' }}
          value={value}
        />
      </Textarea.Root>
    </Field.Root>
  );
}
```

### With Max Height

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Field.Root maxWidth={400}>
      <Field.Label>
        {'Example Label'}
      </Field.Label>
      <Field.Description>
        {'Textarea with maxHeight of 100.'}
      </Field.Description>
      <Textarea.Root my={1}>
        <Textarea.Control
          aria-label={'textarea with max height'}
          maxHeight={100}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Placeholder'}
          value={value}
        />
      </Textarea.Root>
    </Field.Root>
  );
}
```

### Composed Default Textareas

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Flex flexDirection="column" gap={3}>
      <Field.Root maxWidth={400}>
        <Field.Label>
          {'Example Label'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with related fields (maxHeight of 100).'}
        </Field.Description>
        <Textarea.Root my={1}>
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            placeholder={'Placeholder'}
            rows={2}
          />
        </Textarea.Root>
      </Field.Root>
      <Field.Root disabled maxWidth={400}>
        <Field.Label>
          {'Disabled Example'}
        </Field.Label>
        <Field.Description>
          {'Disabled example with related fields.'}
        </Field.Description>
        <Textarea.Root my={1}>
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            placeholder={'Placeholder'}
            rows={2}
          />
        </Textarea.Root>
      </Field.Root>
      <Field.Root invalid maxWidth={400}>
        <Field.Label>
          {'Invalid'}
        </Field.Label>
        <Field.Description>
          {'Invalid example with related fields.'}
        </Field.Description>
        <Textarea.Root my={1}>
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            placeholder={'Placeholder'}
            rows={2}
          />
        </Textarea.Root>
        <Field.Error>This is an error message</Field.Error>
      </Field.Root>
      <Field.Root maxWidth={400}>
        <Field.Label>
          {'Character Count'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with character count.'}
        </Field.Description>
        <Textarea.Root my={1}>
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            maxLength={100}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Placeholder'}
            rows={2}
            value={value}
          />
          <Text.Caption alignSelf="flex-end">{value.length} / 100</Text.Caption>
        </Textarea.Root>
      </Field.Root>
    </Flex>
  );
}
```

### Composed Base Textareas

```jsx
{
  const [value, setValue] = React.useState('');
  return (
    <Flex
      backgroundColor="bg.default"
      flexDirection="column"
      gap={3}
      maxWidth={450}
      padding={3}
    >
      <Field.Root>
        <Field.Label>
          {'Example Label'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with related fields (maxHeight of 100).'}
        </Field.Description>
        <Textarea.Root my={1} variant="base">
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            placeholder={'Placeholder'}
            rows={2}
          />
        </Textarea.Root>
      </Field.Root>
      <Field.Root disabled>
        <Field.Label>
          {'Disabled Example'}
        </Field.Label>
        <Field.Description>
          {'Disabled example with related fields.'}
        </Field.Description>
        <Textarea.Root my={1} variant="base">
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            placeholder={'Placeholder'}
            rows={2}
          />
        </Textarea.Root>
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>
          {'Invalid'}
        </Field.Label>
        <Field.Description>
          {'Invalid example with related fields.'}
        </Field.Description>
        <Textarea.Root my={1} variant="base">
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            placeholder={'Placeholder'}
            rows={2}
          />
        </Textarea.Root>
        <Field.Error>This is an error message</Field.Error>
      </Field.Root>
      <Field.Root>
        <Field.Label>
          {'Character Count'}
        </Field.Label>
        <Field.Description>
          {'Textarea example with character count.'}
        </Field.Description>
        <Textarea.Root my={1} variant="base">
          <Textarea.Control
            aria-label={'textarea with related fields'}
            maxHeight={100}
            maxLength={100}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Placeholder'}
            rows={2}
            value={value}
          />
          <Text.Caption alignSelf="flex-end">{value.length} / 100</Text.Caption>
        </Textarea.Root>
      </Field.Root>
    </Flex>
  );
}
```

### With React Hook Form

```jsx
{
  const [submittedValue, setSubmittedValue] = useState<string>('');
  const formSchema = z.object({
    value: z.string({ message: 'This field is required.' }).min(5, {
      message: 'This field must be at least 5 characters long.',
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

  const onSubmit = handleSubmit((data) => {
    setSubmittedValue(data.value);
  });

  return (
    <form onSubmit={onSubmit}>
      <Field.Root invalid={!!errors.value}>
        <Field.Label fontWeight="medium" textStyle="body">
          {'Textarea (React Hook Form)'}
        </Field.Label>
        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <Textarea.Root my="2">
              <Textarea.Control
                onChange={field.onChange}
                rows={4}
                value={field.value}
              />
            </Textarea.Root>
          )}
        />
        <Flex flexDirection="row" gap={2} mb={2}>
          <Button.Primary type="submit">Submit</Button.Primary>
          <Button.Secondary onClick={() => reset()} type="button">
            Reset Form
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