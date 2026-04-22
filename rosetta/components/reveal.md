# Reveal

Reveal is a generic, flexible component that expands or collapses content.

## Guidance

### General guidance

Reveal expands or collapses relevant help text, additional text information, images, or components. Reveal should never hide critical content.

Reveal is a more flexible alternative to Accordion because it can be styled as needed and can contain any number or type of content. While Accordion has fixed styling and a divider at the bottom, Reveal accepts any styling for both the trigger and its collapsed content. As a result, Reveal can be used in many contexts including:

- By itself.
- Inline with text.
- Within other layouts or components.

Consider using Accordion if Cells are the primary hidden content.

#### By itself

Reveal can be used as a standalone expandable section.

#### Inline with text

Reveal can be used inline within a paragraph of text.

#### Within other layouts or components

Reveal can be nested within other layouts or compositions.

### Content

The trigger label should be succinct but indicate that there is help, information, or other content available.

If the label contains a specific action (e.g. "Show" or "Expand"), use a corresponding action in the expanded state (e.g. "Hide" or "Collapse").

Alternatively, the label can use general help language that remains persistent regardless of state (e.g. "What is this?").

### Accessibility

By default the component is styled with blue accent text, has an underline styling on hover, and a border around the entire trigger when focused.

When applying custom text styles, include clear visual differences on hover using color, text decorations like underlining, or changes in font weight.

---

## Usage

### Anatomy

1. **Trigger** — User selects this to reveal hidden content. The chevron is optional, and the label can use any text styling.
2. **Chevron (Optional)** — The chevron can be hidden when used within a paragraph, within other components, or in other cases when text should be visually left-aligned.
3. **Trigger Label** — Text element that indicates the reveal action.
4. **Content** — Text element or other content revealed on expand.

---

### Composition

Reveal can contain different types of content including Text, Images, or other encapsulated components.

### Variants

Although Reveal can be styled as needed, there are two pre-styled variants you can immediately use.

#### Default

The default variant includes the Chevron and content is indented to align with text.

#### Contained

The contained variant has no Chevron icon and content will have no indentation. Use this variant when Reveal is contained within a larger composition or another component, as it visually aligns the label, content, and surrounding or nearby text.

---

### Behavior

#### Tap area

The entire label is interactable and expands the inner content.

#### Expanding and collapsing

If the Chevron is present, expanding or collapsing causes the Chevron to change direction to indicate its state.
## Examples


### Default

```jsx
{
  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const revealLabel = isOpen
    ? 'Hide details'
    : 'Show more';

  return (
    <Reveal
      body={
        <Reveal.Body data-test="reveal-body" isOpen={isOpen}>
          {'Anim irure non culpa esse ipsum cillum eu ipsum Lorem ex reprehenderit proident Lorem nisi aliquip. Occaecat anim ad duis tempor officia in ipsum consequat.'}
        </Reveal.Body>
      }
      trigger={
        <Reveal.Trigger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
          {revealLabel}
        </Reveal.Trigger>
      }
    />
  );
}
```

### Contained

```jsx
{
  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const revealLabel = isOpen
    ? 'Hide details'
    : 'Show more';

  return (
    <Reveal
      body={
        <Reveal.Body data-test="reveal-body" isOpen={isOpen}>
          {'Anim irure non culpa esse ipsum cillum eu ipsum Lorem ex reprehenderit proident Lorem nisi aliquip. Occaecat anim ad duis tempor officia in ipsum consequat.'}
        </Reveal.Body>
      }
      trigger={
        <Reveal.Trigger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
          {revealLabel}
        </Reveal.Trigger>
      }
      variant="contained"
    />
  );
}
```

### Used Inline With Text

```jsx
{
  const [isOpen, setIsOpen] = React.useState(false);
  const revealLabel = isOpen
    ? 'Hide details'
    : 'Show more';

  return (
    <Text.Body>
      Click here to{' '}
      <Reveal
        body={
          <Reveal.Body isOpen={isOpen}>
            <>
              <Box>
                <Image
                  alt={'Photography'}
                  src="https://picsum.photos/400/300"
                />
              </Box>
              <Text.Body color="gray.300">
                {'Anim irure non culpa esse ipsum cillum eu ipsum Lorem ex reprehenderit proident Lorem nisi aliquip. Occaecat anim ad duis tempor officia in ipsum consequat.'}
              </Text.Body>
            </>
          </Reveal.Body>
        }
        trigger={
          <Reveal.Trigger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            {revealLabel}
          </Reveal.Trigger>
        }
        variant="contained"
      />
    </Text.Body>
  );
}
```