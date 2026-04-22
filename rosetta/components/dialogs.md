# Dialogs

Dialogs (the generic term to describe a grouping of UI known by other names such as "Overlays," "Sheets," and "Modals") are temporary UI windows that appear on top of the main interface to prompt users for input, provide information, or require a decision to proceed.

## FAQ

### What distinguishes the components within Dialogs?

| Type              | Primary Actions | Size | Sequential                    |
| ----------------- | --------------- | ---- | ----------------------------- |
| Basic Dialog      | One             | XS   | No, seeking quick input       |
| Dialog            | Few             | S, M | No, seeking quick input       |
| Multi-step Dialog | Some            | S, M | Yes, flow must be sequential  |
| Side Drawer       | Many            | L    | No, action done in any order  |
| Drawer w/Steps    | Many            | XL   | Yes, flow must be sequential  |
| Drawer w/Nav      | Many            | XL   | No, actions done in any order |
| Drawer            | Many            | XL   | No, actions done in any order |

### How are Dialogs structured?

All Dialogs use a Header, Body, and Footer.

## Best Practices

### When to use:

- Grabbing a user's attention and requiring focused interaction before they are able to continue using the product.
- Interrupting the user's flow by notifying them of a warning or a response to their actions.
- Confirming a user's decision by describing the action being confirmed and explaining any potential consequences.

### When not to use:

- Showing error states, loading screens, or success states.
- Educating users about product areas or promoting a new feature or product; use FeaturePromo or Card instead.
- Presenting responsive information that doesn't require an action; use Toast instead.
- Communicating a persistent state on page or form; use Banner instead.
- Sending the user out of the page if the task requires concentration or if data could be lost if the user abandons the task.
- During navigation change, page load, or other cases where the user has not explicitly initiated an action.

## Content

- Actions should be one or two words:
  - Don't use articles like "an" or "the".
  - No more than 3 actions or 4 icon buttons.
    - **Exception: Basic Dialog has a maximum of 2 actions.**
  - Destructive actions always shown on the left.
  - Forward actions always shown on the right.

## Multi-step Dialog

Multi-step Dialogs present sequential, easily digestible steps that use concise text and visuals to guide users through a process. They are suitable for low-to-medium complexity flows such as two-factor authentication setup, simple onboarding wizards, or short creation flows.

### When to use

- The flow must be sequential — steps build on each other.
- Each step is concise: a brief title, optional description, and a small number of inputs or choices.
- Total steps are few (typically 2-5).

### When to use Drawer w/Steps instead

If you find yourself wanting to use a Multi-step Dialog but have too much content, use a **Drawer w/Steps** instead. See [Drawer](drawer.md) for the wizard variant with steps, side navigation, and guidance panel options.

### Key patterns

- **`Dialog.Header.WithBar`** — persistent header with title bar across all steps. This is a variant of `Dialog.Header` and satisfies the header requirement for Dialog structure.
- **`Dialog.Footer.Grid`** — footer layout for Back, StepIndicator, and Next/Done buttons. This is a variant of `Dialog.Footer` and satisfies the footer requirement for Dialog structure.
- **`StepIndicator.Horizontal`** — shows step progress dots in the footer.
- Back/Next buttons navigate between steps; the final step uses "Done" (or a completion verb) to close the dialog.

### Header and Footer variants

All `Dialog.Header` variants (`Dialog.Header`, `Dialog.Header.Large`, `Dialog.Header.WithBar`) satisfy the Dialog header structural requirement. Similarly, `Dialog.Footer` and `Dialog.Footer.Grid` both satisfy the footer requirement. Choose the variant that fits your use case:

| Variant                 | Use case                                                  |
| ----------------------- | --------------------------------------------------------- |
| `Dialog.Header`         | Standard dialogs with an integrated title                 |
| `Dialog.Header.Large`   | When you need a larger title treatment                    |
| `Dialog.Header.WithBar` | Multi-step dialogs; persistent title bar across steps     |
| `Dialog.Footer`         | Standard footer with action buttons                       |
| `Dialog.Footer.Grid`    | Multi-step footer with Back, StepIndicator, and Next/Done |

### Header alignment

Dialog header sub-components render as block elements with browser margins:

- `Dialog.Header.Title` = `Text.Subtitle as="h1"`
- `Dialog.Header.Title.Large` = `Text.Title as="h1"`
- `Dialog.Header.Description` = `Text.Body` (`<p>`)

Per the universal `m={0}` rule, always add `m={0}` to these. Without it, browser margins push the title down relative to `Dialog.CloseButton` inside the flex header.

### Content rules

- The Dialog title should give overall context for the entire flow (e.g. "Two-Factor Authentication").
- Each step title should be a verb phrase directing the action the user should take (e.g. "Enter phone number", "Confirm authentication code").
- Body content should be brief, giving the user just enough context to complete the task.
- CTAs should relate to the step title unless it is "Continue" or "Next".

## Content sizing inside dialogs

`Dialog.Content` renders as a `Flex` with default `flexDirection="row"`. This means **direct children do not automatically fill the dialog width** -- they shrink to their content size. Always add `width="100%"` to any direct child of `Dialog.Content` (e.g., a wrapper `Flex`, `Field.Root`, or `Box`).

When sizing child elements, also be aware of the difference between styled-system props and CSS:

- **Rosetta components:** Use `width="100%"` as a styled-system prop. This respects the content area and will not overflow.
- **Custom CSS elements:** Do NOT use `width: 100%` in CSS on elements inside a dialog. CSS `width: 100%` calculates against the parent's padding box, which causes horizontal overflow and unwanted scrollbars. Instead use `max-width: 100%`, or wrap custom elements in a Rosetta `Box` or `Flex` component and use styled-system props.
- **File upload areas and custom inputs:** Always wrap in `Field.Root` or a Rosetta layout primitive (`Box`, `Flex`) rather than using raw divs with CSS widths.

```jsx
{/* Correct: direct child of Dialog.Content has width="100%" */}
<Dialog.Content>
	<Flex flexDirection="column" gap={3} width="100%">
		<Field.Root width="100%">
			<Field.Label>Name</Field.Label>
			<TextInput.Root my={1}>
				<TextInput.Control />
			</TextInput.Root>
		</Field.Root>
	</Flex>
</Dialog.Content>

{/* Incorrect: no width on direct child -- content won't fill dialog */}
<Dialog.Content>
	<Flex flexDirection="column" gap={3}>
		<Field.Root width="100%">
			{/* Field.Root is 100% of the Flex, but the Flex itself is not 100% */}
		</Field.Root>
	</Flex>
</Dialog.Content>
```

## Text margins inside dialogs

Text variants rendering as block elements (`<p>`, `<h1>`) have browser default margins. Per the universal `m={0}` rule (see rosetta-design-system.md), these should already be zeroed out. If you see double-spacing between dialog content elements, verify `m={0}` is applied.

## Examples

### Small

```jsx
{
	const [show, setShow] = useState(false);
	const close = () => setShow(false);
	const autofocusRef = useRef(null);

	return (
		<>
			<Dialog.Transition>
				{show && (
					<Dialog.Modal onRequestClose={() => setShow(false)}>
						<Dialog.Overlay />
						<Dialog size="small">
							<Dialog.Header>
								<Dialog.Header.Title m={0}>
									Name mailing list
								</Dialog.Header.Title>
								<Dialog.CloseButton onClick={close} />
							</Dialog.Header>
							<Dialog.Content>
								<Field.Root width="100%">
									<Field.Label>Name</Field.Label>
									<TextInput.Root my={1}>
										<TextInput.Control ref={autofocusRef} />
									</TextInput.Root>
									<Field.Description>
										By default, this name does not appear to subscribers.
									</Field.Description>
								</Field.Root>
							</Dialog.Content>
							<Dialog.Footer justifyContent="end">
								<Button.Primary onClick={close}>Save</Button.Primary>
							</Dialog.Footer>
						</Dialog>
					</Dialog.Modal>
				)}
			</Dialog.Transition>
			<Button.Primary onClick={() => setShow(true)}>{"Open"}</Button.Primary>
		</>
	);
}
```

### Small With Top Image

```jsx
{
	const [show, setShow] = useState(false);
	const close = () => setShow(false);

	return (
		<>
			<Dialog.Transition>
				{show && (
					<Dialog.Modal onRequestClose={() => setShow(false)}>
						<Dialog.Overlay />
						<Dialog size="small">
							<Dialog.Header>
								<Box>
									<Dialog.Header.Title m={0}>
										Modal title required
									</Dialog.Header.Title>
									<Dialog.Header.Description m={0}>
										Optional description
									</Dialog.Header.Description>
								</Box>
								<Dialog.CloseButton onClick={close} />
							</Dialog.Header>
							<Dialog.ImageSpacer />
							<img
								alt={"A rugged, mountainous landscape"}
								height={270}
								src={mountains}
								style={{
									aspectRatio: "16/9",
									objectFit: "cover",
									width: "100%",
									height: "auto",
								}}
								width={480}
							/>
							<Dialog.Content>Content</Dialog.Content>
							<Dialog.Footer justifyContent="end">
								<Button.Primary onClick={close}>Save</Button.Primary>
							</Dialog.Footer>
						</Dialog>
					</Dialog.Modal>
				)}
			</Dialog.Transition>
			<Button.Primary onClick={() => setShow(true)}>{"Open"}</Button.Primary>
		</>
	);
}
```

### Right Side Image

```jsx
{
	const [show, setShow] = useState(false);
	const close = () => setShow(false);
	const autofocusRef = useRef(null);
	const size = "medium";

	const [smallWidthQuery, mediumWidthQuery] = Dialog.useSizeMediaQuery();
	const hideOnWide = {
		sx: {
			[mediumWidthQuery]: {
				display: "none",
			},
		},
	};
	const hideOnNarrow = {
		sx: {
			[smallWidthQuery]: {
				display: "none",
			},
		},
	};

	return (
		<>
			<Dialog.Transition>
				{show && (
					<Dialog.Modal onRequestClose={() => setShow(false)}>
						<Dialog.Overlay />
						<Dialog
							flexDirection="column"
							size={size}
							sx={{
								[mediumWidthQuery]: {
									flexDirection: "row",
								},
							}}
						>
							<Flex
								flexDirection="column"
								flexGrow={1}
								flexShrink={1}
								sx={{ overflowY: "hidden" }}
							>
								<Dialog.Header>
									<Box>
										<Dialog.Header.Title m={0}>
											Name your course
										</Dialog.Header.Title>
										<Dialog.Header.Description m={0}>
											You can always change this later.
										</Dialog.Header.Description>
									</Box>
									<Dialog.CloseButton onClick={close} {...hideOnWide} />
								</Dialog.Header>
								<Dialog.ImageSpacer {...hideOnWide} />
								<Box flexGrow={1} flexShrink={1} sx={{ overflowY: "auto" }}>
									<Box {...hideOnWide}>
										<img
											alt={"A variety of art supplies"}
											height={270}
											src={creationWizardBanner}
											style={{
												aspectRatio: "16/9",
												objectFit: "cover",
												objectPosition: "center top",
												width: "100%",
												height: "auto",
											}}
											width={480}
										/>
									</Box>
									<Dialog.Content>
										<TextField
											inputProps={{ ref: autofocusRef }}
											label={"Course Title"}
											width="100%"
										/>
									</Dialog.Content>
								</Box>
								<Dialog.Footer justifyContent="end">
									<Button.Primary onClick={close}>Continue</Button.Primary>
								</Dialog.Footer>
							</Flex>
							<Box {...hideOnNarrow} position="relative">
								<img
									alt={"A variety of art supplies"}
									height={600}
									src={creationWizardBanner}
									style={{
										aspectRatio: "7/10",
										objectFit: "cover",
										width: "420px",
										height: "auto",
									}}
									width={420}
								/>
								<Dialog.ImageCloseButton onClick={() => setShow(false)} />
							</Box>
						</Dialog>
					</Dialog.Modal>
				)}
			</Dialog.Transition>
			<Button.Primary onClick={() => setShow(true)}>{"Open"}</Button.Primary>
		</>
	);
}
```

### Two Columns

```jsx
{
	const [show, setShow] = useState(false);
	const close = () => setShow(false);
	const autofocusRef = useRef(null);
	const size = "medium";
	const [, mediumWidthQuery] = Dialog.useSizeMediaQuery();

	return (
		<>
			<Dialog.Transition>
				{show && (
					<Dialog.Modal onRequestClose={() => setShow(false)}>
						<Dialog.Overlay />
						<Dialog size={size}>
							<Dialog.Header>
								<Box>
									<Dialog.Header.Title m={0}>
										Modal title required
									</Dialog.Header.Title>
									<Dialog.Header.Description m={0}>
										Optional description
									</Dialog.Header.Description>
								</Box>
								<Dialog.CloseButton onClick={close} />
							</Dialog.Header>
							<Dialog.Content
								display="grid"
								gap={{ [mediumWidthQuery]: 6, _: 4 }}
								sx={{
									gridTemplateColumns: "1fr",
									[mediumWidthQuery]: { gridTemplateColumns: "1fr 1fr" },
								}}
							>
								<Box>Content</Box>
								<Flex flexDirection="column" gap={4}>
									<TextField
										inputProps={{ ref: autofocusRef }}
										label={"Field 1"}
									/>
									<TextField label={"Field 2"} />
									<TextField label={"Field 3"} />
								</Flex>
							</Dialog.Content>
							<Dialog.Footer justifyContent="end">
								<Button.Primary onClick={close}>Continue</Button.Primary>
							</Dialog.Footer>
						</Dialog>
					</Dialog.Modal>
				)}
			</Dialog.Transition>
			<Button.Primary onClick={() => setShow(true)}>{"Open"}</Button.Primary>
		</>
	);
}
```

### Headers

```jsx
{
	return (
		<Flex bg="bg.default" flexDirection="column" gap={3} p={3}>
			<Dialog.Header bg="bg.base">
				<Dialog.Header.Title m={0}>Integrated Title</Dialog.Header.Title>
				<Dialog.CloseButton />
			</Dialog.Header>

			<Dialog.Header bg="bg.base">
				<Box>
					<Dialog.Header.Title m={0}>
						Integrated Title and Description
					</Dialog.Header.Title>
					<Dialog.Header.Description m={0}>
						Optional description
					</Dialog.Header.Description>
				</Box>
				<Dialog.CloseButton />
			</Dialog.Header>

			<Dialog.Header.Large bg="bg.base">
				<Dialog.Header.Title.Large m={0}>
					Large Integrated Title
				</Dialog.Header.Title.Large>
				<Dialog.CloseButton />
			</Dialog.Header.Large>

			<Dialog.Header.WithBar bg="bg.base">
				<Dialog.Header.Title m={0}>Title with Bar</Dialog.Header.Title>
				<Dialog.CloseButton />
			</Dialog.Header.WithBar>

			<Dialog.Header.WithBar bg="bg.base">
				<Box>
					<Dialog.Header.Title m={0}>
						Title and Description with Bar
					</Dialog.Header.Title>
					<Dialog.Header.Description m={0}>
						Optional description
					</Dialog.Header.Description>
				</Box>
				<Dialog.CloseButton />
			</Dialog.Header.WithBar>
		</Flex>
	);
}
```

### Image Close Buttons

```jsx
<>
	<Box bg="gray.200" p={3} position="relative" width="fit-content">
		<Dialog.ImageCloseButton
			right="unset"
			sx={{ position: "relative" }}
			top="unset"
			variant="light"
		/>
	</Box>
	<Box bg="gray.800" p={3} position="relative" width="fit-content">
		<Dialog.ImageCloseButton
			right="unset"
			sx={{ position: "relative" }}
			top="unset"
			variant="dark"
		/>
	</Box>
</>
```

### Basic Usage

```jsx
{
	const [isOpen, setIsOpen] = useState < boolean > false;
	const { title, description, cancel, exit } = useStrings();
	return (
		<>
			<Modal.Transition>
				{isOpen && (
					<Modal onRequestClose={() => setIsOpen(false)}>
						<Modal.Overlay />
						<Modal.Position position="center">
							<BasicDialog>
								<BasicDialog.Content>
									<BasicDialog.Title>{title}</BasicDialog.Title>
									<BasicDialog.Description>
										{description}
									</BasicDialog.Description>
								</BasicDialog.Content>
								<BasicDialog.Actions>
									<BasicDialog.Button onClick={() => setIsOpen(false)}>
										{cancel}
									</BasicDialog.Button>
									<BasicDialog.Button.Danger onClick={() => setIsOpen(false)}>
										{exit}
									</BasicDialog.Button.Danger>
								</BasicDialog.Actions>
							</BasicDialog>
						</Modal.Position>
					</Modal>
				)}
			</Modal.Transition>
			<Button.Primary onClick={() => setIsOpen(true)}>{"Open"}</Button.Primary>
		</>
	);
}
```

### Multi Step

```jsx
import { useState } from "react";
// import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Field, StepIndicator } from '@sqs/rosetta-elements';
// import { TextInput } from '@sqs/rosetta-elements/textinput/next';
// import { Dropdown } from '@sqs/rosetta-compositions/dropdown/next';
// import { Dialog } from '@sqs/rosetta-compositions';
// import { ChevronLargeLeft, ChevronLargeRight } from '@sqs/rosetta-icons';

() => {
	const [show, setShow] = useState(false);
	const [stepIndex, setStepIndex] = useState(0);
	const steps = [{ key: 1 }, { key: 2 }, { key: 3 }];
	const isFirstStep = stepIndex === 0;
	const isLastStep = stepIndex === steps.length - 1;

	const close = () => {
		setStepIndex(0);
		setShow(false);
	};

	return (
		<>
			<Dialog.Transition>
				{show && (
					<Dialog.Modal onRequestClose={close}>
						<Dialog.Overlay />
						<Dialog size="small">
							<Dialog.Header.WithBar>
								<Dialog.Header.Title m={0}>
									Two-Factor Authentication
								</Dialog.Header.Title>
								<Dialog.CloseButton onClick={close} />
							</Dialog.Header.WithBar>

							<Dialog.Content>
								{/* Step 1: Enter phone number */}
								{isFirstStep && (
									<Flex flexDirection="column" gap={4} width="100%">
										<Flex flexDirection="column" gap={1}>
											<Text.SectionTitle>Enter phone number</Text.SectionTitle>
											<Text.Body color="fg.muted" sx={{ textWrap: "pretty" }}>
												Whenever you log in, we'll text this number an
												authentication code. Message and data rates may apply.
											</Text.Body>
										</Flex>
										<Flex flexDirection="column" gap={2}>
											<Dropdown
												aria-label="Country code"
												onChange={() => {}}
												value="USA"
											>
												<Dropdown.Option value="USA">
													United States (+1)
												</Dropdown.Option>
											</Dropdown>
											<Field.Root>
												<Field.Label>Phone number</Field.Label>
												<TextInput.Root my={1}>
													<TextInput.Control placeholder="(123) 456-7890" />
												</TextInput.Root>
											</Field.Root>
										</Flex>
									</Flex>
								)}

								{/* Step 2: Confirm authentication code */}
								{stepIndex === 1 && (
									<Flex flexDirection="column" gap={6} width="100%">
										<Flex flexDirection="column" gap={1}>
											<Text.SectionTitle>
												Confirm authentication code
											</Text.SectionTitle>
											<Text.Body color="fg.muted" sx={{ textWrap: "pretty" }}>
												Enter the authentication code that we sent by text
												message.
											</Text.Body>
										</Flex>
										<Flex flexDirection="row" gap={5} justifyContent="center">
											<Flex flexDirection="row" gap={2}>
												<Box
													bg="gray.900"
													borderRadius={6}
													height="sizes.300"
													width="sizes.250"
												/>
												<Box
													bg="gray.900"
													borderRadius={6}
													height="sizes.300"
													width="sizes.250"
												/>
												<Box
													bg="gray.900"
													borderRadius={6}
													height="sizes.300"
													width="sizes.250"
												/>
											</Flex>
											<Flex flexDirection="row" gap={2}>
												<Box
													bg="gray.900"
													borderRadius={6}
													height="sizes.300"
													width="sizes.250"
												/>
												<Box
													bg="gray.900"
													borderRadius={6}
													height="sizes.300"
													width="sizes.250"
												/>
												<Box
													bg="gray.900"
													borderRadius={6}
													height="sizes.300"
													width="sizes.250"
												/>
											</Flex>
										</Flex>
										<Button.Tertiary>Resend code</Button.Tertiary>
									</Flex>
								)}

								{/* Step 3: Save backup codes */}
								{isLastStep && (
									<Flex flexDirection="column" gap={4} width="100%">
										<Flex flexDirection="column" gap={1}>
											<Text.SectionTitle>Save backup codes</Text.SectionTitle>
											<Text.Body color="fg.muted" sx={{ textWrap: "pretty" }}>
												Use these codes to log in if you lose your device. Keep
												them in a secure place to protect the account.
											</Text.Body>
										</Flex>
										<Box
											display="grid"
											sx={{
												alignItems: "center",
												justifyContent: "center",
												gap: 6,
												gridTemplateColumns: "1fr 1fr",
											}}
										>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
											<Text.Tabular>123456</Text.Tabular>
										</Box>
									</Flex>
								)}
							</Dialog.Content>

							<Dialog.Footer.Grid>
								<Button.Secondary
									disabled={isFirstStep}
									onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
									sx={{
										visibility: isFirstStep ? "hidden" : "visible",
										justifySelf: "start",
									}}
								>
									<Flex gap={1}>
										<ChevronLargeLeft
											color={isFirstStep ? "fg.disabled" : "fg.default"}
										/>
										Back
									</Flex>
								</Button.Secondary>

								<StepIndicator.Horizontal stepIndex={stepIndex} steps={steps} />

								<Button.Primary
									onClick={() => {
										if (isLastStep) {
											close();
										} else {
											setStepIndex((s) => Math.min(steps.length - 1, s + 1));
										}
									}}
									sx={{ justifySelf: "end" }}
								>
									<Flex gap={1}>
										{isLastStep ? (
											"Done"
										) : (
											<>
												Continue
												<ChevronLargeRight color="fg.onStrong" />
											</>
										)}
									</Flex>
								</Button.Primary>
							</Dialog.Footer.Grid>
						</Dialog>
					</Dialog.Modal>
				)}
			</Dialog.Transition>
			<Button.Primary onClick={() => setShow(true)}>Open</Button.Primary>
		</>
	);
};
```
