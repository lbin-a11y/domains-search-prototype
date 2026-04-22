# Text Input

TextInput allows users to enter and edit text. The component also accepts all HTML input props.

## Guidance

### General content guidelines

There are several elements to a TextInput. This is a high-level, generalized set of guidelines for accessible and usable TextInputs. For more details on each of these elements, see their linked sections.

| Element         | Required? | Notes                                             |
| --------------- | --------- | ------------------------------------------------- |
| **Field label** | Yes       | Always include labels for accessibility.          |
| **Error text**  | Yes       | Always provide context and resolution for errors. |
| **Placeholder** | -         | Only use to help with input formatting.           |
| **Helper**      | -         | Only use when more context is necessary.          |

### Field label

Labels are required as they are critical for assistive-technology users.

Use short, direct nouns to state the information users need to provide (for example, Address, Phone, Email).

Glyphs in the prefix slot can be used as labels in established and unambiguous patterns as long as they have appropriate alt text. Examples include a magnifying glass icon as a label for a search input.

#### Positioning

By default, the label appears above the input.

In specific contexts like the Editor where forms are constrained by a dense or narrow or short surface, display the label in-line with the input.

- Use vertical label layouts for wide or full page surfaces.
- Don't use horizontal label layout for wide or full page surfaces.

#### Required vs. optional fields

Forms should ideally only include required fields.

- If an optional field must be used, add "Optional" at the end of the label, using muted text.
- Don't use markings like asterisks on fields.

It's recommended to progressively disclose optional, additional, or contextual fields by revealing them with an "add X" pattern.

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

Error text should include why an input is invalid, supporting context, and resolution to the error.

Ensure that error text communicates how to fix the input error (e.g., "Enter a valid 5-digit zip code"). This text does not need a period at the end.

### Placeholder text

TextInputs do not require placeholder text. They do not always benefit from the presence of placeholder text.

Placeholders can be particularly useful in describing the recommended format of data. For example, displaying 16 numerical characters in a credit card input may help set expectations for the format of data for this specific input.

- Do use placeholders as examples for data format.
- Don't use unnecessary placeholders that duplicate label information, and don't use placeholders as labels.

#### Internationalization considerations for placeholder text

Match each international market's standard formatting and terminology for TextInputs.

Don't assume the format for country-specific inputs, such as phone numbers, postal codes, and dates. These input fields should be automatically formatted as the user types or have more guidance added using the helper text line.

Pay attention to the in-line label length as it can expand drastically when translated. Consider using a top label placement with the default appearance in such cases.

### Helper text

Helper text is located below the field label. This text is used to provide context or instructions, such as character count or required formatting.

It is also possible to include toggle-able helper text, using an in-line implementation of the Reveal with a trigger that indicates more information will be revealed (e.g. "Show more information.")

## Usage

> **Prerequisite**: Read [field.md](field.md) before using TextInput. Every `TextInput.Root` must be inside a `Field.Root` for accessibility. See field.md for dynamic list patterns and `aria-label` usage.

### General usage

TextInput can be used for managing data by specifying `type` as `text` (default), `email`, `URL`, `number`, and `password`. Use Rosetta's specialized components for `search`, `date`, and `color`. Specify `inputmode` for the appearance of virtual keyboards.

Aim to have an input field that can accept as many formats as possible and is resilient to common errors.

### Composition

#### Prefixes and suffixes

Prefixes and suffixes are generally used for actions or labels that only feature an Icon Button or Glyph.

Icon Buttons can provide small actions, like copy text, reveal password, or clear input.

Glyphs in the prefix slot can be used as labels in established and unambiguous patterns as long as they have appropriate alt text. Examples include a magnifying glass icon as a label for a search input.

#### Slots

Slots differ from prefixes and suffixes as they have a visible border dividing the rest of the input. These are particularly useful for components like Dropdown or Button.

The slot used in a telephone input can help create a denser control that is easier to understand for users while reducing formatting errors.

### Behavior

#### Validation and errors

Within forms, all inputs should be validated and errors clearly displayed to the user on submit.

#### Autocomplete

Wherever possible, use the appropriate `autocomplete` attribute when certain user data is collected, to make filling out forms easier. This attribute helps pre-populate fields for which users have already entered information.

Consider specifying `spellcheck` and `autocapitalize` to ensure intended behavior, with or without spellcheck and autocapitalization present.

Consider leaving out autocorrect for certain inputs (e.g., "name" or "address") to help improve the user experience.

#### Overflow

Horizontal scroll is enabled when the length of the content exceeds the width of the TextInput. Content doesn't wrap in TextInput and the component won't grow in height.

#### Character limit

If a TextInput has a max character limit, include a text counter within the field.

## Dimensions

TextInput.Root renders at a fixed height depending on the `size` prop:

| Size                 | Height |
| -------------------- | ------ |
| `"medium"` (default) | 44px   |
| `"small"`            | 36px   |

### Children layout

TextInput.Root renders as a flex container with `alignItems: 'center'`. It has **no fixed height** -- it sizes via vertical padding (`py`). The container height is determined by its **tallest child**. Only place these children inside TextInput.Root:

- `TextInput.Control` (required)
- Icons or Glyphs with `sx={{ flexShrink: 0 }}`
- Any Text variant for prefix/suffix text, **with reset margin and constrained line-height**: `sx={{ flexShrink: 0, lineHeight: 'inherit', m: 0 }}`
- `Touchable.Element.Icon` for inline actions

The `m: 0` resets browser default margins (see Text margin reset rule in rosetta-design-system.md). The `lineHeight: 'inherit'` ensures the text inherits the container's constrained line-height.

### Anti-patterns

**Do not conditionally render children inside TextInput.Root.** This causes visible layout shifts (the container height or width changes when children appear/disappear). Always render prefix/suffix elements unconditionally. If you need to hide a prefix, use `sx={{ visibility: 'hidden' }}` instead of conditional rendering.

**Do not place arbitrary components inside TextInput.Root.** Only the children listed above are safe. Placing other components (e.g., `Flex`, `Box`, custom divs) can break the height constraint or cause overflow.

## Examples

### Default

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Field.Root>
			<Field.Label>{"Default Style"}</Field.Label>
			<Field.Description>{"Description"}</Field.Description>
			<TextInput.Root my={1}>
				<TextInput.Control
					onChange={(event) => setValue(event.target.value)}
					placeholder={"Placeholder"}
					value={value}
				/>
			</TextInput.Root>
		</Field.Root>
	);
}
```

### Base

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Field.Root backgroundColor="bg.default" padding={3}>
			<Field.Label>{"Base Style"}</Field.Label>
			<Field.Description>{"Description"}</Field.Description>
			<TextInput.Root my={1} variant="base">
				<TextInput.Control
					onChange={(event) => setValue(event.target.value)}
					placeholder={"Placeholder"}
					value={value}
				/>
			</TextInput.Root>
		</Field.Root>
	);
}
```

### Sizes

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<>
			<Field.Root>
				<Field.Label>{"Small Default"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} size="small">
					<TextInput.Control
						onChange={(event) => setValue(event.target.value)}
						placeholder={"Placeholder"}
						value={value}
					/>
				</TextInput.Root>
			</Field.Root>
			<Field.Root>
				<Field.Label>{"Small Base"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} size="small" variant="base">
					<TextInput.Control
						onChange={(event) => setValue(event.target.value)}
						placeholder={"Placeholder"}
						value={value}
					/>
				</TextInput.Root>
			</Field.Root>
			<Field.Root>
				<Field.Label>{"Medium Default"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} size="medium">
					<TextInput.Control
						onChange={(event) => setValue(event.target.value)}
						placeholder={"Placeholder"}
						value={value}
					/>
				</TextInput.Root>
			</Field.Root>
			<Field.Root>
				<Field.Label>{"Medium Base"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} size="medium" variant="base">
					<TextInput.Control
						onChange={(event) => setValue(event.target.value)}
						placeholder={"Placeholder"}
						value={value}
					/>
				</TextInput.Root>
			</Field.Root>
		</>
	);
}
```

### Closed Component

```jsx
{
  const [value, setValue] = useState<string>('');
  type ClosedComponentTextInputProps = TextInputControlProps & {
    description: string;
    label: string;
  };

  const ClosedComponentTextInput = forwardRef<
    HTMLInputElement,
    ClosedComponentTextInputProps
  >((props, ref) => {
    return (
      <Field.Root>
        <Field.Label>
          {'Default'}
        </Field.Label>
        <Field.Description>
          {'Description'}
        </Field.Description>
        <TextInput.Root my={1}>
          <TextInput.Control ref={ref} {...props} />
        </TextInput.Root>
      </Field.Root>
    );
  });

  ClosedComponentTextInput.displayName = 'TextInput';

  return (
    <ClosedComponentTextInput
      description="Description"
      label="Default"
      onChange={(event) => setValue(event.target.value)}
      placeholder={'Placeholder'}
      value={value}
    />
  );
}
```

### Bare Text Input

> **Warning**: This bare pattern is for internal/unstyled usage only. In production forms, always wrap TextInput in a `Field.Root`. See [field.md](field.md).

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Flex flexDirection="column" gap={2}>
			<TextInput.Control
				onChange={(event) => setValue(event.target.value)}
				placeholder={"Placeholder"}
				value={value}
			/>
		</Flex>
	);
}
```

### Right Aligned

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Field.Root>
			<Field.Label>{"Default"}</Field.Label>
			<Field.Description>{"Description"}</Field.Description>
			<TextInput.Root my={1}>
				<TextInput.Control
					onChange={(event) => setValue(event.target.value)}
					placeholder={"Placeholder"}
					textAlign="right"
					value={value}
				/>
			</TextInput.Root>
		</Field.Root>
	);
}
```

### Disabled

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Field.Root disabled>
			<Field.Label>{"Disabled"}</Field.Label>
			<Field.Description>{"Description"}</Field.Description>
			<TextInput.Root my={1}>
				<TextInput.Control
					onChange={(event) => setValue(event.target.value)}
					placeholder={"Placeholder"}
					value={value}
				/>
			</TextInput.Root>
		</Field.Root>
	);
}
```

### Disabled With Value

```jsx
{
	const [value, setValue] = useState < string > "value";
	return (
		<Field.Root disabled>
			<Field.Label>{"Disabled"}</Field.Label>
			<Field.Description>{"Description"}</Field.Description>
			<TextInput.Root my={1}>
				<TextInput.Control
					onChange={(event) => setValue(event.target.value)}
					placeholder={"Placeholder"}
					value={value}
				/>
			</TextInput.Root>
		</Field.Root>
	);
}
```

### Invalid

```jsx
{
	const [value, setValue] = useState < string > "";
	const [isInvalid, setIsInvalid] = useState < boolean > false;
	return (
		<Field.Root invalid={isInvalid}>
			<Field.Label>{"Invalid"}</Field.Label>
			<Field.Description>
				{"Enter at least 5 characters to pass validation."}
			</Field.Description>
			<TextInput.Root my={1}>
				<TextInput.Control
					onChange={(event) => {
						setValue(event.target.value);
						setIsInvalid(event.target.value.length < 5);
					}}
					placeholder={"Placeholder"}
					value={value}
				/>
			</TextInput.Root>
			<Field.Error>
				{"The input must be at least 5 characters long."}
			</Field.Error>
		</Field.Root>
	);
}
```

### Composed Default Inputs

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Flex flexDirection="column" gap={3} maxWidth={500}>
			<Field.Root disabled>
				<Field.Label>{"Disabled"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1}>
					<TextInput.Control onChange={() => {}} value="value" />
				</TextInput.Root>
			</Field.Root>

			<Field.Root invalid>
				<Field.Label>{"Invalid"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1}>
					<TextInput.Control onChange={() => {}} />
				</TextInput.Root>
				<Field.Error>This is an error</Field.Error>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With Prefixes"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1}>
					<Person sx={{ flexShrink: 0, fill: "fg.muted" }} />
					<TextInput.Control onChange={() => {}} />
				</TextInput.Root>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With Suffix"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1}>
					<TextInput.Control onChange={() => {}} />
					<Search sx={{ flexShrink: 0, fill: "fg.muted" }} />
				</TextInput.Root>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With Prefix and Suffix"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1}>
					<Text.Body
						color="fg.muted"
						sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
					>
						{" "}
						www.
					</Text.Body>
					<TextInput.Control onChange={() => {}} />
					<Text.Body
						color="fg.muted"
						sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
					>
						{" "}
						.com
					</Text.Body>
				</TextInput.Root>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With inner interactive button"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1}>
					<Text.Body
						color="fg.muted"
						sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
					>
						{" "}
						www.
					</Text.Body>
					<TextInput.Control
						onChange={(event) => setValue(event.target.value)}
						value={value}
					/>
					<Touchable.Element.Icon onClick={() => setValue("")}>
						<CrossLarge
							sx={{
								flexShrink: 0,
							}}
						/>
					</Touchable.Element.Icon>
				</TextInput.Root>
			</Field.Root>
		</Flex>
	);
}
```

### Composed Base Inputs

```jsx
{
	const [value, setValue] = useState < string > "";
	return (
		<Flex
			backgroundColor="bg.default"
			flexDirection="column"
			gap={3}
			maxWidth={500}
			padding={3}
		>
			<Field.Root disabled>
				<Field.Label>{"Disabled"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} variant="base">
					<TextInput.Control onChange={() => {}} value="value" />
				</TextInput.Root>
			</Field.Root>

			<Field.Root invalid>
				<Field.Label>{"Invalid"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} variant="base">
					<TextInput.Control onChange={() => {}} />
				</TextInput.Root>
				<Field.Error>This is an error</Field.Error>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With Prefixes"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} variant="base">
					<Person sx={{ flexShrink: 0, fill: "fg.muted" }} />
					<TextInput.Control onChange={() => {}} />
				</TextInput.Root>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With Suffix"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} variant="base">
					<TextInput.Control onChange={() => {}} />
					<Search sx={{ flexShrink: 0, fill: "fg.muted" }} />
				</TextInput.Root>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With Prefix and Suffix"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} variant="base">
					<Text.Body
						color="fg.muted"
						sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
					>
						{" "}
						www.
					</Text.Body>
					<TextInput.Control onChange={() => {}} />
					<Text.Body
						color="fg.muted"
						sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
					>
						{" "}
						.com
					</Text.Body>
				</TextInput.Root>
			</Field.Root>

			<Field.Root>
				<Field.Label>{"With inner interactive button"}</Field.Label>
				<Field.Description>{"Description"}</Field.Description>
				<TextInput.Root my={1} variant="base">
					<Text.Body
						color="fg.muted"
						sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
					>
						{" "}
						www.
					</Text.Body>
					<TextInput.Control
						onChange={(event) => setValue(event.target.value)}
						value={value}
					/>
					<Touchable.Element.Icon onClick={() => setValue("")}>
						<CrossLarge
							sx={{
								flexShrink: 0,
							}}
						/>
					</Touchable.Element.Icon>
				</TextInput.Root>
			</Field.Root>
		</Flex>
	);
}
```

### Basic Address Form

```jsx
{
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postal: '',
  });

  const handleAddressChange = (field: string, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Fieldset.Root>
      <Fieldset.Legend fontWeight="medium">
        {'Shipping Address'}
      </Fieldset.Legend>
      <Flex gap="2" w="100%">
        <Field.Root mb="3">
          <Field.Label>
            {'Street Address'}
          </Field.Label>
          <TextInput.Root my={1}>
            <TextInput.Control
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder={'123 Main St'}
              value={address.street}
            />
          </TextInput.Root>
        </Field.Root>
        <Field.Root mb="3">
          <Field.Label>
            {'City'}
          </Field.Label>
          <TextInput.Root my={1}>
            <TextInput.Control
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder={'New York'}
              value={address.city}
            />
          </TextInput.Root>
        </Field.Root>
        <Field.Root>
          <Field.Label>
            {'Postal Code'}
          </Field.Label>
          <TextInput.Root my={1}>
            <TextInput.Control
              onChange={(e) => handleAddressChange('postal', e.target.value)}
              placeholder={'10001'}
              value={address.postal}
            />
          </TextInput.Root>
        </Field.Root>
      </Flex>
    </Fieldset.Root>
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
          {'Name'}
        </Field.Label>
        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <TextInput.Root my={2}>
              <TextInput.Control
                onChange={field.onChange}
                value={field.value}
              />
            </TextInput.Root>
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
