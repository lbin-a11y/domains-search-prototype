# Text

Component that renders different text styles (e.g., body, caption, etc.).

On web, Text represents a text DOM element (e.g., `h1`, `p`); in React Native, it represents Text. The component leverages Styled System `variant` utility to connect the component with text styles as defined in Rosetta Themes. By default, the Text component is unstyled.

## Guidance

### General guidance

No guidance.

### Content

Content should be written to be clear and simple. When possible, aim for a reading level of 8th grade or below. Avoid jargon and use short, common words and sentences to help with readability.

#### Casing and punctuation

Our UI copy uses a variety of casing conventions.

#### Sentence case

- Use for headlines with long phrases.
- Use for headlines in a primary content area; e.g., main page.
- Use for headlines in dialogs.
- Use for body copy.

#### Title case

- Use on surfaces that only offer room for concise labels or headlines.
- Use on copy that lives in the sidebar, navigation, or setting labels.

#### All caps

- Use for label or action.
- Do not use for titles.

#### Punctuation

- Periods can be used normally in any complete sentence except for alt tags, checkbox labels, radio button labels, and UI titles.

### Accessibility

Identify the semantic structure of each page. Semantic structure is important for readability, those using assistive technologies, and those relying on keyboard navigation.

**Do:**

- Programmatically define the essential semantic structure of a page by clearly marking page regions; e.g., `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>`.
- Have only one `<title>` region and one `<main>` per page.
- Have only one `<h1>` per page.
- Use meaningful headings that give the user a clear understanding of what the section is about.

**Don't:**

- Skip heading levels (e.g., going from `<h2>` to `<h5>` on a page).

## Variant selection quick-reference

Pick the closest variant for your use case. You can customize `fontWeight`, `fontSize`, `lineHeight`, and other props on any variant to match the design.

| You need...                                          | Use this variant                                             |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| Large page title (top-level pages)                   | `Text.DisplayTitle`                                          |
| Panel/dialog title, deep page title                  | `Text.Title`                                                 |
| Section heading (semibold)                           | `Text.Subtitle fontWeight="semibold"` or `Text.SectionTitle` |
| Descriptor under a title (medium weight)             | `Text.Subtitle`                                              |
| Default body text                                    | `Text.Body`                                                  |
| Dense heading in cards/alerts (body-size, bold)      | `Text.Body fontWeight="semibold"`                            |
| Small helper text, image captions, metadata          | `Text.Caption`                                               |
| Form control label (small, uppercase, medium weight) | `Text.Label` or `Field.Label`                                |
| Button/action text (uppercase, medium weight)        | `Text.Action`                                                |
| Key data figure                                      | `Text.Figure`                                                |
| Aligned numeric columns                              | `Text.Tabular`                                               |

## Default HTML elements

Each Text variant renders as a specific HTML element by default. Block elements (`<p>`, `<h1>`) have browser default margins -- always use `m={0}` (see Text margin reset rule in rosetta-design-system.md).

| Variant                   | Default element | Has browser margin? |
| ------------------------- | --------------- | ------------------- |
| `Text.Body`               | `<p>`           | Yes                 |
| `Text.SectionTitle`       | `<p>`           | Yes                 |
| `Text.SectionTitle.Small` | `<p>`           | Yes                 |
| `Text.Subtitle`           | `<p>`           | Yes                 |
| `Text.Figure`             | `<p>`           | Yes                 |
| `Text.Title`              | `<h1>`          | Yes                 |
| `Text.Caption`            | `<span>`        | No                  |
| `Text.DisplayTitle`       | `<span>`        | No                  |
| `Text.Label`              | `<label>`       | No                  |
| `Text.Action`             | `<span>`        | No                  |
| `Text.Tabular`            | `<span>`        | No                  |

Use `as="span"` to override the default element when you need inline behavior without margins.

## Usage

### Overview

The Text component renders text. It is an abstraction over the native text elements of our different platforms, like `<p>` or `<h2>` on the web or `<Text>` on native. In Figma, `Text` is represented as styles found in the right-hand sidebar.

### Behavior

The `Text` component comes with _variants_ that encapsulate Rosetta's default typographic styles. These variants combine properties found in Rosetta Tokens — like size, line-height, font-weight, letter spacing, text-transformation, and responsive resizing — into easy-to-use single values.

The variants are:

- Figure
- DisplayTitle
- Title
- Subtitle
- Body
- Caption
- Label
- Action

In addition to the variant, individual properties can be modified — for example, using tabular numbers to align columns of data — if your specific use case dictates a different style.

In code, variants are accessed by using dot notation or the `variant` prop.

### Variants

#### DisplayTitle

Display Title should be used for the page title on top- and second-level landing pages (pages that appear in the main navigation and their immediate children). It should only be used once at the top of the page. On mobile, the Display Title and Title variants look the same.

**Do:**

- Use Display Title for pages that appear in the app's main navigation and their immediate children (for example, Marketing and Email Campaigns).

**Don't:**

- Don't use Display Title for pages that appear three levels or deeper in the navigation.
- Don't use Display Title to title anything but pages.
- Don't use Display Title's larger desktop styles on mobile.

| Property    | Value                                                     |
| ----------- | --------------------------------------------------------- |
| Font        | fonts.ui                                                  |
| Font weight | Mobile: fontWeights.medium, desktop: fontWeights.semibold |
| Font size   | Mobile and desktop: fontSizes[7]                          |
| Line height | Mobile and desktop: lineHeights[5]                        |
| Color       | gray.100                                                  |

#### Title

Title should be used for the title of a given panel, view, or object. Title is used for the titles of pages three or more levels deep in the navigation. It should only be used once in any given context.

**Do:**

- Use titles for major sections and objects in the current view.
- Keep titles to a reasonable character length.
- Remember to set an appropriate heading level using the `as` prop.

**Don't:**

- Don't use the Title variant when a smaller font size would be more appropriate for smaller objects like dialogs and cards.

| Property    | Value                                           |
| ----------- | ----------------------------------------------- |
| Font        | fonts.ui                                        |
| Font weight | fontWeights.semibold                            |
| Font size   | Mobile: fontSizes[7], desktop: fontSizes[6]     |
| Line height | Mobile: lineHeights[5], desktop: lineHeights[4] |
| Color       | gray.100                                        |

#### Subtitle

The Subtitle style in `semibold` is used for titling smaller objects or sections within a view. In the `medium` weight it is also used directly following a title element, as an added descriptor of the screen, panel, or view.

**Do:**

- Use subtitle in the `semibold` weight for sub sections and smaller objects in the current view.
- Use subtitle in the `medium` weight directly after a Text.Title to add additional context.
- When used as a heading, remember to set an appropriate heading level using the `as` prop.

**Don't:**

- Don't use subtitle for long blocks of copy.

| Property    | Value                                                         |
| ----------- | ------------------------------------------------------------- |
| Font        | fonts.ui                                                      |
| Font weight | fontWeights.medium                                            |
| Font size   | Mobile: fontSizes[5], desktop: fontSizes[4]                   |
| Line height | Mobile: lineHeights[3], desktop: lineHeights[2]               |
| Color       | gray.300 when used as a panel description, otherwise gray.100 |

#### Body

Body is the default text size that should be used for most content. As with all of the type styles, it is optimized to be an ideal size for both mobile and desktop.

In the `semibold` weight it is used as a heading in dense layouts and small objects like Alerts and Cards.

In the `medium` weight it is used occasionally for subtle emphasis within a component like a cell.

**Do:**

- Use font-variant-numeric when rendering numbers.
- Use the `semibold` weight to create headings for detailed sections of views or small objects.
- When used as a heading, remember to set an appropriate heading level using the `as` prop.

| Property    | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Font        | fonts.ui                                                     |
| Font weight | fontWeights.book                                             |
| Font size   | Mobile: fontSizes[4], desktop: fontSizes[3]                  |
| Line height | lineHeights[2]                                               |
| Color       | Generally gray.100, or gray.300 where deemphasis is required |

#### Caption

The caption style should be used in cases where a smaller descriptor or note is needed, such as an image caption or helper text under inputs.

**Do:**

- Use as helper and error copy for form controls.
- Use for labelling images and data visualizations.
- Use for metadata.

**Don't:**

- Don't use for large blocks of copy.
- Don't use for labels or headings.

| Property    | Value            |
| ----------- | ---------------- |
| Font        | fonts.ui         |
| Font weight | fontWeights.book |
| Font size   | fontSizes[2]     |
| Line height | lineHeights[1]   |
| Color       | gray.300         |

#### Label

The label style is used to label individual form controls or a small group of related controls.

**Do:**

- Make sure inputs and groups of related inputs have a visible label.
- Make sure the label is associated with its corresponding input in HTML.

**Don't:**

- Don't use Label as a heading for a large chunk of UI or group of unrelated controls. Instead use Body or Subtitle in the semibold weight.
- Don't make labels too long.

| Property       | Value                                       |
| -------------- | ------------------------------------------- |
| Font           | fonts.ui                                    |
| Font weight    | fontWeights.medium                          |
| Font size      | Mobile: fontSizes[1], desktop: fontSizes[0] |
| Line height    | lineHeights[0]                              |
| Letter spacing | Mobile: 0.5px, desktop: 0.75px              |
| Color          | gray.300                                    |

#### Action

The Action style is for interactive actions, most commonly used in Buttons.

**Do:**

- Use for any action copy, generally in a Button.
- Use clear, concise language that explains the action to the user, preferably no more than two words.

**Don't:**

- Don't use action text for style alone. Prefer Label for labelling controls or a heading using Body or Subtitle.

| Property       | Value                                       |
| -------------- | ------------------------------------------- |
| Font           | fonts.ui                                    |
| Font weight    | fontWeights.medium                          |
| Font size      | Mobile: fontSizes[3], desktop: fontSizes[2] |
| Line height    | lineHeights[2]                              |
| Letter spacing | Mobile: 0.25px, desktop: 0.5px              |
| Color          | gray.100                                    |

#### Figure

Figure is used to highlight key data in the Key Figure Cards on dashboard landing pages.

**Do:**

- Use for Key Figure Cards regardless of data type (for example, percentage, number, or text).

**Don't:**

- Don't use the Figure variant for page titles inside of the app.
- Don't link the Figure variant's text; instead use slots in Key Figure Cards designated for links.

| Property    | Value                                |
| ----------- | ------------------------------------ |
| Font        | fonts.ui                             |
| Font weight | Mobile and desktop: fontWeights.book |
| Font size   | Mobile and desktop: fontSizes[9]     |
| Line height | Mobile and desktop: lineHeights[6]   |
| Color       | gray.100                             |

## Examples

### Plain Text

```jsx
<Text>No props</Text>
```

### Override Theme Styles

```jsx
(
  <Text fontSize="12px" textStyle="title">
    Overriding a style defined in the theme. You probably shouldn't do this.
  </Text>
);

export const UsingTextStyleVariant = () =>
  Object.keys(rosetta.light.textStyles).map((variant: string) => (
    <Text key={variant} m={1} textStyle={variant as TextStyle}>
      {variant}
    </Text>
  ));

export const UsingPredefinedVariants = () => (
  <Flex flexDirection="column" gap={2}>
    <Text.Figure m={0}>Text.Figure</Text.Figure>
    <Text.DisplayTitle m={0}>Text.DisplayTitle</Text.DisplayTitle>
    <Text.Title m={0}>Text.Title</Text.Title>
    <Text.SectionTitle m={0}>Text.SectionTitle</Text.SectionTitle>
    <Text.SectionTitle.Small m={0}>
      Text.SectionTitle.Small
    </Text.SectionTitle.Small>
    <Text.Subtitle m={0}>Text.Subtitle</Text.Subtitle>
    <Text.Body m={0}>Text.Body</Text.Body>
    <Text.Caption m={0}>Text.Caption</Text.Caption>
    <Text.Label m={0}>Text.Label</Text.Label>
    <Text.Action m={0}>Text.Action</Text.Action>
    <Text.Tabular m={0}>Text.Tabular</Text.Tabular>
  </Flex>
);

export const FontSizes = () =>
  fontSizes.map((fontSize: string, idx: number) => (
    <Text key={fontSize} fontSize={idx} m={1}>
      fontSize={fontSize}
    </Text>
  ));

export const FontWeights = () =>
  Object.keys(fontWeights).map((fontWeight: string) => (
    <Text key={fontWeight} fontSize={4} fontWeight={fontWeight} m={1}>
      fontWeight={fontWeight}
    </Text>
  ));

export const LineHeights = () =>
  lineHeights.map((lineHeight: string, idx: number) => (
    <Text key={lineHeight} bg="gray.100" color="white" lineHeight={idx} m={1}>
      lineHeight={idx}
    </Text>
  ));

export const UsingSxProp = () => (
  <Text sx={{ fontSize: 4, ':hover': { backgroundColor: 'gray.200' } }}>
    No props
  </Text>
);
```

### Using Text Style Variant

```jsx
Object.keys(rosetta.light.textStyles).map((variant: string) => (
    <Text key={variant} m={1} textStyle={variant as TextStyle}>
      {variant}
    </Text>
  ))
```

### Using Predefined Variants

```jsx
<Flex flexDirection="column" gap={2}>
	<Text.Figure m={0}>Text.Figure</Text.Figure>
	<Text.DisplayTitle m={0}>Text.DisplayTitle</Text.DisplayTitle>
	<Text.Title m={0}>Text.Title</Text.Title>
	<Text.SectionTitle m={0}>Text.SectionTitle</Text.SectionTitle>
	<Text.SectionTitle.Small m={0}>
		Text.SectionTitle.Small
	</Text.SectionTitle.Small>
	<Text.Subtitle m={0}>Text.Subtitle</Text.Subtitle>
	<Text.Body m={0}>Text.Body</Text.Body>
	<Text.Caption m={0}>Text.Caption</Text.Caption>
	<Text.Label m={0}>Text.Label</Text.Label>
	<Text.Action m={0}>Text.Action</Text.Action>
	<Text.Tabular m={0}>Text.Tabular</Text.Tabular>
</Flex>
```

### Font Sizes

```jsx
fontSizes.map((fontSize: string, idx: number) => (
    <Text key={fontSize} fontSize={idx} m={1}>
      fontSize={fontSize}
    </Text>
  ))
```

### Font Weights

```jsx
Object.keys(fontWeights).map((fontWeight: string) => (
    <Text key={fontWeight} fontSize={4} fontWeight={fontWeight} m={1}>
      fontWeight={fontWeight}
    </Text>
  ))
```

### Line Heights

```jsx
lineHeights.map((lineHeight: string, idx: number) => (
    <Text key={lineHeight} bg="gray.100" color="white" lineHeight={idx} m={1}>
      lineHeight={idx}
    </Text>
  ))
```

### Using Sx Prop

```jsx
<Text sx={{ fontSize: 4, ":hover": { backgroundColor: "gray.200" } }}>
	No props
</Text>
```
