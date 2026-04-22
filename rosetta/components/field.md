# Field

Field is a foundational form component that provides structure, accessibility, and state management for individual form inputs. It automatically handles ARIA relationships between labels, descriptions, error messages, and form controls, ensuring your forms are accessible by default.

## Guidance

### When to use Field

- **Individual form inputs**: Use Field to wrap any form input (TextInput, Dropdown, Textarea, etc.) that needs a label, description, or error message.
- **Accessibility requirements**: Field automatically manages ARIA attributes and ID relationships for screen readers.
- **Form validation**: Field provides consistent styling and structure for error states.
- **Consistent spacing**: Field ensures uniform spacing and layout across your form fields.

### Accessibility features

Field automatically provides:

- **ID management**: Generates unique IDs and properly links labels to inputs.
- **ARIA relationships**: Sets `aria-describedby` to connect descriptions and error messages to the input.
- **Error announcements**: Error messages are properly announced to screen readers when validation fails.
- **Disabled state propagation**: Disabled state cascades to all child components consistently.

### Best practices

**Do**

- Always wrap form inputs with Field.Root when they need labels or descriptions.
- Use Field.Label for all form input labels to ensure proper accessibility.
- Include Field.Description for complex inputs that need additional context.
- Use Field.Error for validation messages that appear conditionally.

**Don't**

- Use Field for purely decorative text near inputs (use regular Text components instead).
- Nest Field components inside each other.
- Skip Field.Label for inputs that need labels (use `aria-label` on the input as an alternative only when necessary).

### Validation patterns

Apply the `invalid` prop to Field.Root to control the display of error messages and error styling. Always provide a Field.Error message that communicates how to fix the issue.

### Field.Root is always required

Every form control (TextInput.Root, Dropdown, Textarea, Checkbox, etc.) **MUST** be a descendant of a `Field.Root` -- no exceptions. This applies even in dynamic lists where inputs are added/removed, and even when a visible label is not appropriate. Use `aria-label` on Field.Root in those cases.

### Integration with other components

Field works seamlessly with: TextInput, Dropdown, Textarea, Checkbox (when used individually), Radio (when used individually), and custom form controls that need labels and descriptions. Use Fieldset instead of Field when grouping multiple related controls like Radio button groups or Checkbox groups.

## Examples

### Basic

```jsx
{
	const [value, setValue] = useState("");
	return (
		<Field.Root name="exampleField">
			<Field.Label htmlFor="example-input">{"Example Label"}</Field.Label>
			<input
				id="example-input"
				onChange={(event) => setValue(event.target.value)}
				value={value}
			/>
			<Field.Description>{"Example Description"}</Field.Description>
			<Field.Error>{"Example Error"}</Field.Error>
		</Field.Root>
	);
}
```

### Invalid

```jsx
{
	const [value, setValue] = useState("");
	const [isInvalid, setIsInvalid] = useState(true);
	return (
		<Field.Root invalid={isInvalid} name="exampleField">
			<Field.Label htmlFor="example-input">{"Example Label"}</Field.Label>
			<input
				id="example-input"
				onChange={(event) => {
					setValue(event.target.value);
					setIsInvalid(event.target.value.length < 5);
				}}
				value={value}
			/>
			<Field.Error>
				{"The input must be at least 5 characters long."}
			</Field.Error>
			<Field.Description>
				{"Enter at least 5 characters to pass validation."}
			</Field.Description>
		</Field.Root>
	);
}
```

### Dynamic Field List

When rendering a dynamic list of inputs (e.g., adding/removing redirect URLs), each input still needs its own `Field.Root`. Use `aria-label` when a visible label would be redundant.

```jsx
{
	const [urls, setUrls] = useState([""]);

	const addUrl = () => setUrls([...urls, ""]);
	const updateUrl = (index, value) => {
		const next = [...urls];
		next[index] = value;
		setUrls(next);
	};
	const removeUrl = (index) => setUrls(urls.filter((_, i) => i !== index));

	return (
		<Flex flexDirection="column" gap={2}>
			<Text.Caption fontWeight="medium" color="fg.default">
				Redirect URLs
			</Text.Caption>
			{urls.map((url, index) => (
				<Field.Root key={index} aria-label={`Redirect URL ${index + 1}`}>
					<TextInput.Root my={1}>
						<Text.Body
							color="fg.muted"
							sx={{ flexShrink: 0, lineHeight: "inherit", m: 0 }}
						>
							https://
						</Text.Body>
						<TextInput.Control
							placeholder="example.com/callback"
							value={url}
							onChange={(e) => updateUrl(index, e.target.value)}
						/>
						<Touchable.Element.Icon
							onClick={() => removeUrl(index)}
							sx={{ visibility: urls.length > 1 ? "visible" : "hidden" }}
						>
							<CrossSmall sx={{ flexShrink: 0 }} />
						</Touchable.Element.Icon>
					</TextInput.Root>
				</Field.Root>
			))}
			<Button.Tertiary onClick={addUrl}>Add URL</Button.Tertiary>
		</Flex>
	);
}
```
