This project has access to a custom Design System called Rosetta that's installed via a private npm package. Files in the guidelines directory show how to use Rosetta.

Always read:

- All files with a name that starts overview-
- All files in the design-tokens folder

Read the files in the guidelines/components directory when you want to use the component with that name. For example, if you want to use Toast, read guidelines/components/toast.md. Additional context can be found by reading the code for the corresponding component in /node_modules/.

## Component Usage Guidelines - READ THIS FIRST

IMPORTANT: Do not delete ANY Rosetta packages. They have dependencies on each other and all of them MUST be kept.

IMPORTANT: Always prefer to use components from Rosetta if they exist. For example, prefer to use a Button component from Rosetta, rather than regular button components.

IMPORTANT: Follow these steps IN ORDER before writing any code:

Step 1: Read Overview Files (REQUIRED)  
Read ALL files with a name that starts with "overview-" in the guidelines directory:  
overview-setup.md  
overview-components.md  
overview-icons.md  
(And any other overview-\*.md files)

Step 2: Read Design Tokens (REQUIRED)  
Read ALL files in the design-tokens/ folder. Do NOT skip this step.

Step 3: Plan what components you need to use (REQUIRED)  
Scan the design for semantic patterns -- tabular data with column headers, modals/overlays, navigation breadcrumbs, tab bars, form fields -- and check overview-components.md for matching Rosetta components before building anything with raw Flex/Box. Figma designs often implement these patterns using raw frames and auto-layout rather than named component instances. Do not translate Figma frames literally; reason at the pattern level.

Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)  
BEFORE using ANY component, you MUST read its guidelines file first:  
Using Button? → Read guidelines/components/button.md FIRST  
Using Toast? → Read guidelines/components/toast.md FIRST  
Using Input? → Read guidelines/components/input.md FIRST

Step 5: Plan what icons you need to use (REQUIRED)  
Before using ANY icon, you must check to see if that icon exists in the Rosetta package. If it doesn't, pick a different icon and verify the new icon.

DO NOT write code using a component until you have read its specific guidelines.

### Text margin reset

Always add `m={0}` to every Text variant. Variants like `Text.Body`, `Text.Subtitle`, `Text.SectionTitle`, `Text.Figure`, and `Text.Title` render as block HTML elements (`<p>` or `<h1>`) with browser default margins that Rosetta does not reset. These margins cause layout bugs inside flex containers. Adding `m={0}` universally prevents all of these issues. This also applies to compound component labels that render as block-level Text internally: `Radio.Label`, `Checkbox.Label`, and `Checkbox.Description`.

```jsx
<Text.Body m={0}>Always zero out margin</Text.Body>
<Text.SectionTitle m={0}>Section heading</Text.SectionTitle>
<Radio.Label m={0}>Option label</Radio.Label>
<Checkbox.Label m={0}>Checkbox label</Checkbox.Label>
<Checkbox.Description m={0}>Help text</Checkbox.Description>
```

### Page layout

The page content area should be constrained to `maxWidth={1440}` and centered with `mx="auto"`. Choose the layout pattern based on what the Figma design shows. When the Figma design includes a navigation bar or app shell, implement it -- do not treat it as out-of-scope chrome.

**Pattern A -- Top navigation:** Nav bar spans full width above the content. The content area below gets the max-width constraint.

```jsx
<Box bg="bg.base" minHeight="100vh"> {/* bg.base = white page background. bg.default = gray elevated surface -- do NOT use for the page shell */}
	{/* Navigation bar -- full width */}
	<Flex as="nav" alignItems="center" px={6} height={77}>
		{/* ... nav items ... */}
	</Flex>

	{/* Content area -- constrained and centered */}
	<Box maxWidth={1440} mx="auto" px={6}>
		<PageHeader>
			<PageHeader.Body>
				<PageHeader.Title title="Page Title" />
			</PageHeader.Body>
		</PageHeader>
		{/* ... page content ... */}
	</Box>
</Box>
```

**Pattern B -- Sidebar navigation:** When the Figma design shows a left sidebar/panel nav, the sidebar has a fixed width and sits outside the constrained area. The content area beside it fills the remaining space, and `maxWidth={1440}` + `mx="auto"` goes inside that content area.

```jsx
<Flex minHeight="100vh">
	{/* Sidebar nav -- fixed width, vertical stack */}
	<Flex as="nav" flexDirection="column" width={256} flexShrink={0} bg="bg.base">
		{/* ... nav items ... */}
	</Flex>

	{/* Content area -- fills remaining space */}
	<Box flex={1} minWidth={0} bg="bg.base">
		<Box maxWidth={1440} mx="auto" px={6}>
			{/* ... page content ... */}
		</Box>
	</Box>
</Flex>
```

### Styling with tokens

- **Styled-system props are the primary styling mechanism.** Use `bg="bg.base"`, `borderColor="border.default"`, `gap={4}`, etc. on Rosetta primitives (Box, Flex, Text). These resolve through ThemeContext and respond to runtime theme changes.
- **Use `sx` for one-off overrides** on Rosetta components when shorthand props aren't sufficient.
- **When custom CSS is needed** (e.g., for non-Rosetta elements), use the CSS custom properties documented in the design-tokens files. These are available on `:root` via the theme CSS import. Note: CSS custom properties are not aware of React ThemeContext and will not change when the theme changes at runtime — use them only when ThemeContext is not an option.

### Visual verification checklist

After implementing, verify:

- **Input heights**: TextInput should render at 44px (medium) or 36px (small). If taller, check that Text children have `lineHeight: 'inherit'` in their sx.
- **Fixed-dimension elements**: Circles, avatars, and icon containers with equal width/height should maintain their aspect ratio. Add `flexShrink: 0` on fixed-dimension elements inside flex containers.
- **Dialog header alignment**: Verify `Dialog.Header.Title` and `Dialog.Header.Description` include `m={0}`.
- **Dialog spacing**: Check that dialog content elements don't have unexpected vertical gaps.
- **Dialog content overflow**: Elements inside Dialog.Content should not cause horizontal scrollbars.
- **Flex content areas beside fixed sidebars**: Add `minWidth={0}` to any `flex={1}` content area next to a fixed-width sidebar -- without it, content won't shrink below its intrinsic width on narrow viewports.
