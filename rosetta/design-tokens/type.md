# Typography design tokens

## Overview

Typography in Rosetta combines multiple token properties (font size, line height, font weight, letter spacing, and text transformation) into semantic **variants** that represent default text styles. These variants are accessed through the [Text](../components/text.md) component and ensure consistency across platforms and experiences.

## Usage

### Using Text variants (Recommended)

The recommended approach is to use the pre-defined Text variants through the Text component:

```tsx
import { Text } from '@sqs/rosetta-primitives';

// Use semantic variants
<Text.Title>Page Title</Text.Title>
<Text.Body>This is body text</Text.Body>
<Text.Caption>Helper text or image caption</Text.Caption>
```
### Using individual tokens (Only specific use cases)

For custom components, you can access individual typography tokens:

```tsx
import { fontSizes, fontWeights, lineHeights, fonts } from '@sqs/rosetta-tokens';

<MyComponent
  style={{
    fontFamily: fonts.ui,
    fontSize: fontSizes[4],
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights[2],
  }}
/>
```

To alter the style of a Rosetta component, use theme variables instead of Rosetta Tokens. Rosetta components resolve styles from a Theme, not directly from tokens. See the Themes usage guide.

## Text Variants

Variants combine multiple typography tokens into semantic, ready-to-use text styles. Each variant is responsive and optimized for both mobile and desktop.

### Figure

Used to highlight key data in Key Figure Cards on dashboard landing pages. Visually stronger than other styles to call attention to data.

Usage: Only within Key Figure Cards to preserve page hierarchy

```tsx
<Text.Figure>1000</Text.Figure>
```

| Property        | Mobile         | Desktop        |
| --------------- | -------------- | -------------- |
| Font Size       | 40px (index 9) | 40px (index 9) |
| Line Height     | 44px (index 6) | 44px (index 6) |
| Font Weight     | book (400)     | book (400)     |
| Font Family     | ui (Clarkson)  | ui (Clarkson)  |
| Default Element | <p>            | <p>            |

---

### DisplayTitle

Used for page titles on top- and second-level landing pages (main navigation and immediate children). Should only appear once at the top of the page.

Usage: Primary page title on major landing pages

```tsx
<Text.DisplayTitle>A website makes it real</Text.DisplayTitle>
```

|Property|Mobile|Desktop|
|---|---|---|
|Font Size|28px (index 7)|28px (index 7)|
|Line Height|32px (index 5)|32px (index 5)|
|Font Weight|medium (500)|medium (500)|
|Letter Spacing|-0.01em|-0.01em|
|Font Family|ui (Clarkson)|ui (Clarkson)|
|Default Element|<span>|<span>|

Note: On mobile, DisplayTitle and Title variants look the same.

---

### Title

Used for titles of panels, views, or objects. Also used for page titles three or more levels deep in navigation. Should only be used once in any given context.

Usage: Panel titles, dialog titles, deep page titles

```tsx
<Text.Title>Panel Title</Text.Title>
```

|Property|Mobile|Desktop|
|---|---|---|
|Font Size|28px (index 7)|22px (index 6)|
|Line Height|32px (index 5)|28px (index 4)|
|Font Weight|semibold (600)|semibold (600)|
|Font Family|ui (Clarkson)|ui (Clarkson)|
|Default Element|<h1>|<h1>|

---

### Subtitle

Used for titling smaller objects or sections within a view (in semibold), or as a descriptor following Title (in medium weight).

Usage: Section headings, descriptive text under titles

```tsx
// As a heading

<Text.Subtitle fontWeight="semibold">Section Heading</Text.Subtitle>

// Paired with Title

<Text.Title>Make it real</Text.Title>

<Text.Subtitle color="gray.300">Look like an expert</Text.Subtitle>
```

| Property        | Mobile         | Desktop        |
| --------------- | -------------- | -------------- |
| Font Size       | 18px (index 5) | 16px (index 4) |
| Line Height     | 24px (index 3) | 22px (index 2) |
| Font Weight     | medium (500)   | medium (500)   |
| Font Family     | ui (Clarkson)  | ui (Clarkson)  |
| Default Element | <p>            | <p>            |

---

### Body

The default text size for most content. Optimized for readability on both mobile and desktop. Sometimes used in semibold weight as a heading in dense layouts.

Usage: Paragraphs, descriptions, most text content

```tsx
<Text.Body>

  Trusted by the world's best, Squarespace empowers people with creative ideas to succeed.

</Text.Body>

// As a heading in dense layouts

<Text.Body fontWeight="semibold">Section Title</Text.Body>
```

| Property        | Mobile         | Desktop        |
| --------------- | -------------- | -------------- |
| Font Size       | 16px (index 4) | 14px (index 3) |
| Line Height     | 22px (index 2) | 22px (index 2) |
| Font Weight     | book (400)     | book (400)     |
| Font Family     | ui (Clarkson)  | ui (Clarkson)  |
| Default Element | <p>            | <p>            |

---

### Caption

Smaller text for descriptors, notes, image captions, or helper text under inputs.

Usage: Helper text, image captions, supplementary information

```tsx
<Text.Caption>

  Start with any website template and customize it to fit your needs.

</Text.Caption>
```

|Property|Mobile|Desktop|
|---|---|---|
|Font Size|12px (index 2)|12px (index 2)|
|Line Height|16px (index 1)|16px (index 1)|
|Font Weight|book (400)|book (400)|
|Font Family|ui (Clarkson)|ui (Clarkson)|
|Default Color|gray.300|gray.300|
|Default Element|<span>|<span>|

---

### Label

Used to label individual form controls or small groups of related controls. Always uppercase.

Usage: Form field labels, control labels

```tsx
<Text.Label>Email Address</Text.Label>
```

|Property|Mobile|Desktop|
|---|---|---|
|Font Size|11px (index 1)|9.75px (index 0)|
|Line Height|16px (index 1)|16px (index 1)|
|Font Weight|medium (500)|medium (500)|
|Letter Spacing|0.5px|0.75px|
|Text Transform|uppercase|uppercase|
|Font Family|ui (Clarkson)|ui (Clarkson)|
|Default Color|gray.300|gray.300|
|Default Element|<label>|<label>|

---

### Action

Used for interactive actions, most commonly in Buttons. Rarely used directly as it's incorporated into components. Always uppercase.

Usage: Button text, action labels (usually automatic)

```tsx
<Text.Action>Get Started</Text.Action>
```

|Property|Mobile|Desktop|
|---|---|---|
|Font Size|14px (index 3)|12px (index 2)|
|Line Height|22px (index 2)|22px (index 2)|
|Font Weight|medium (500)|medium (500)|
|Letter Spacing|0.25px|0.5px|
|Text Transform|uppercase|uppercase|
|Font Family|ui (Clarkson)|ui (Clarkson)|
|Default Element|<span>|<span>|

---

### Tabular

Special variant for displaying numbers in tabular format with consistent width digits.

Usage: Data tables, aligned numeric columns

```tsx
<Text.Tabular>1,234.56</Text.Tabular>
```

|Property|Value|
|---|---|
|Font Variant Numeric|tabular-nums|
|Default Element|<span>|

---

### SectionTitle (Internal)

Used internally for section titles

```tsx
<Text.SectionTitle>Section Title</Text.SectionTitle>

<Text.SectionTitle.Small>Smaller Section</Text.SectionTitle.Small>
```

|Variant|Font Size|Line Height|Font Weight|Letter Spacing|
|---|---|---|---|---|
|SectionTitle|20px|27px|semibold (600)|-0.01em|
|SectionTitle.Small|18px|27px|semibold (600)|-0.01em|

## Individual Typography Tokens

### Font Family

| Token      | Value                                                             | Usage                   |
| ---------- | ----------------------------------------------------------------- | ----------------------- |
| fonts.ui   | Clarkson, "Helvetica Neue", Helvetica, Arial, sans-serif          | All UI text (default)   |
| fonts.mono | "SF Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace | Code, technical content |

### Font Sizes

Font size tokens are defined as an array. Reference by index:

|Index|Web Value|Native Value|Common Usage|
|---|---|---|---|
|fontSizes[0]|9.75px|9.75|Label (desktop)|
|fontSizes[1]|11px|11|Label (mobile)|
|fontSizes[2]|12px|12|Caption, Action (desktop)|
|fontSizes[3]|14px|14|Body (desktop), Action (mobile)|
|fontSizes[4]|16px|16|Body (mobile), Subtitle (desktop)|
|fontSizes[5]|18px|18|Subtitle (mobile)|
|fontSizes[6]|22px|22|Title (desktop)|
|fontSizes[7]|28px|28|Title (mobile), DisplayTitle|
|fontSizes[8]|32px|32|Large displays|
|fontSizes[9]|40px|40|Figure|

### Font Weights

|Token|Value|Usage|
|---|---|---|
|fontWeights.book|400|Body, Caption, Figure (regular text)|
|fontWeights.medium|500|DisplayTitle, Subtitle, Label, Action (emphasis)|
|fontWeights.semibold|600|Title, section headings (strong emphasis)|

### Line Heights

Line height tokens are defined as an array. Reference by index:

|Index|Web Value|Native Value|Common Usage|
|---|---|---|---|
|lineHeights[0]|11px|11|Tight spacing|
|lineHeights[1]|16px|16|Caption, Label|
|lineHeights[2]|22px|22|Body, Action, Subtitle (desktop)|
|lineHeights[3]|24px|24|Subtitle (mobile)|
|lineHeights[4]|28px|28|Title (desktop)|
|lineHeights[5]|32px|32|Title (mobile), DisplayTitle|
|lineHeights[6]|44px|44|Figure|

## Customizing Variants

All Text variants accept typography props to override default styles:

```tsx
// Override font weight

<Text.Subtitle fontWeight="semibold">Bold Subtitle</Text.Subtitle>

// Override color

<Text.Caption color="red.500">Error message</Text.Caption>

// Override multiple properties

<Text.Body 
  fontSize={5} 
  fontWeight="semibold"
  textTransform="uppercase"
>
  Custom styled text
</Text.Body>

// Change semantic HTML element

<Text.Title as="h2">Secondary Heading</Text.Title>
```

## Platform Differences

Typography tokens automatically transform for different platforms:

Web:

- Font sizes include px unit (e.g., 14px)

- Line heights include px unit (e.g., 22px)

- Font weights are strings (e.g., '400')

React Native:

- Font sizes are numbers (e.g., 14)

- Line heights are numbers (e.g., 22)

- Font weights are numbers (e.g., 400)

## Best Practices

1. Use variants first: Always prefer Text variants over individual tokens for consistency

2. Respect hierarchy: Use variants according to their intended purpose (e.g., one Title per context)

3. Maintain readability: Don't override font sizes arbitrarily; use the next variant up or down instead

4. Consider responsive: Variants automatically adjust between mobile and desktop

5. Semantic HTML: Use the as prop to ensure proper HTML semantics (e.g., <Text.Title as="h2">)

6. Accessibility: Uppercase variants (Label, Action) are automatically transformed; don't manually uppercase text