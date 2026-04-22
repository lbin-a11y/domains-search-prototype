# Spacing design tokens

## Context

Rosetta’s spacing system is an important way to ensure visual consistency.

Rosetta is fundamentally based on an 11px—or 22px—spacing system, which was initially created for the now defunct Blog app. It was derived from the 44pt minimum recommended touch area for iOS. 22px is used as Rosetta's body text line height, icon size, and the spacing between most UI elements.

To alter the style of a Rosetta component, use theme variables instead of Rosetta Tokens. This is because Rosetta components **do not** use Rosetta Tokens directly, they always resolve styles from a Theme.

## Tokens

```json
{
	"0": "0px",
	"1": "6px",
	"2": "11px",
	"3": "16px",
	"4": "22px",
	"5": "27px",
	"6": "33px",
	"7": "38px",
	"8": "44px",
	"9": "49px",
	"10": "55px"
}
```

## Usage

In a Rosetta component you can use spacing tokens like:

```jsx
<Flex gap={1} my={2}>
```

Alternatively for a custom component you can also style components like:

```jsx
import { borders, colors, space, radii } from "@sqs/rosetta-tokens";

<MyComponent
	style={{
		padding: space[3],
	}}
/>;
```

## Using with CSS

When writing custom CSS, spacing tokens are available as CSS custom properties. CSS custom properties are not aware of React ThemeContext and will not change when the theme changes at runtime — prefer styled-system props on Rosetta primitives when possible.

```css
.my-element {
	padding: var(--space-2); /* 11px */
	margin-bottom: var(--space-4); /* 22px */
	gap: var(--space-1); /* 6px */
}
```

| Token | CSS custom property | Value |
| ----- | ------------------- | ----- |
| `0`   | `var(--space-0)`    | 0px   |
| `1`   | `var(--space-1)`    | 6px   |
| `2`   | `var(--space-2)`    | 11px  |
| `3`   | `var(--space-3)`    | 16px  |
| `4`   | `var(--space-4)`    | 22px  |
| `5`   | `var(--space-5)`    | 27px  |
| `6`   | `var(--space-6)`    | 33px  |
| `7`   | `var(--space-7)`    | 38px  |
| `8`   | `var(--space-8)`    | 44px  |
| `9`   | `var(--space-9)`    | 49px  |
| `10`  | `var(--space-10)`   | 55px  |
