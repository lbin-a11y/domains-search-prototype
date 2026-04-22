# Button

Buttons are clickable elements used to perform an action. They are easily visible and the nature of their intended action should be immediately apparent.

## Guidance

### General guidance

Buttons should be used to start actions, and their labels should express what action will happen when the user interacts with it. However, Buttons should not be used to send a user away from the page they are on.

### Buttons vs. links

Buttons are primarily used for actions, such as "Add", "Close", "Cancel", or "Save". Tertiary Buttons, which look like links, are used for less important or less common actions, such as "Replace image." Links are primarily used for navigation, and usually appear within or directly following a sentence.

### Content

Be as specific as possible when creating Button labels. Consider what detail a user may need to take the next step in a flow, or how a button label can provide clarity when making a decision.

Use title case.

**Do**

- Use a **verb** for the label to describe the Button action; e.g., **Delete, Publish, Submit, Continue**.
- Use a **verb-phrase** for the label if the Button action acts on a single setting; e.g., **Select image**.
- Use **OK** for the label when the only user option is to acknowledge the dialog and close it.
- Use **Cancel** as the secondary CTA for most actions requiring a decision, e.g. "Delete page?"

**Don't**

- Label Buttons using "Now", e.g., "Purchase now", because Buttons typically perform an immediate action.
- Add articles (i.e., "a", "an", "the") in Button labels; without these articles Button labels are more consistent.

### Accessibility

All Buttons should have an accessible name that describes what the Button does. If a Button has an icon instead of a name, it must be given a name via alt text or through an ARIA label.

## Usage

### Overview

Buttons should be used to initialize actions, and their labels should express what action will occur when the user interacts with it.

Every Button will have both a **size** and a **variant**.

---

### Anatomy

1. **Label** — Names the action that will be performed on click or tap.
2. **Icon** — An optional Icon that relates to the Button's action.
3. **Container**

---

### Variants

Buttons are available in four variants: primary, secondary, tertiary, and danger. These variants allow us to express a hierarchy on the screen, helping the user to know which actions are more or less important.

#### Primary

Primary Buttons hold the highest emphasis and should be used to indicate the single most dominant action on a page. A primary Button should only appear once within a screen.

#### Secondary

Secondary Buttons should be used for calls-to-action of medium importance. They will often make sense alongside a primary Button, as an alternative option.

#### Tertiary

Tertiary Buttons are used for most regular actions throughout the product. They are the most commonly used Buttons throughout the product. You can have as many Tertiary Buttons as needed in any given screen. They can stack vertically, or be used inside cells. They can also stack horizontally next to Primary or Secondary Buttons.

#### Danger

Danger Buttons should be used sparsely for cautionary actions, such as "delete". They resemble Tertiary buttons and follow their layout and spacing specs.

---

### Sizes and specs

Buttons can be shown in two sizes, large and small; where large is the default. They can also be shown full-width in their container, if appropriate for the layout.

#### Large

Large Buttons should be used for main actions to allow for easy tap/clickability. Labels are recommended, but if appropriate, an Icon can be used as well or instead.

| Property | Value                                     |
| -------- | ----------------------------------------- |
| Width    | Set by label length, but minimum space[6] |
| Height   | sizes.300                                 |
| Padding  | space[4] left and right                   |
| Margin   | space[2] between the label and Icon       |

#### Medium

Medium Buttons should be used for main actions to allow for easy tap/clickability, and generally where the available space requires. It is not recommended to use an Icon in a medium Button.

| Property | Value                                      |
| -------- | ------------------------------------------ |
| Width    | Set by label length, but minimum sizes.250 |
| Height   | sizes.250                                  |
| Padding  | space[3] left and right                    |

#### Small

Small buttons should be used inside Cells, and generally where the available space requires. It is not recommended to use an Icon in a small Button.

| Property | Value                                                               |
| -------- | ------------------------------------------------------------------- |
| Width    | Set by label length, but minimum sizes.200                          |
| Height   | sizes.200                                                           |
| Padding  | space[2] left and right for Primary and Secondary, 0px for Tertiary |

#### Full-width Buttons

Buttons can be displayed full-width in their container.

#### Stacking

Buttons can be stacked horizontally or vertically. In general, ensure there is space[2] between any two Buttons. However, this spacing is not part of the component itself and may need to be adjusted for specific scenarios.

#### Buttons inside Cells

Tertiary Buttons can also be used inside Cells.
## Examples


### No Variant

```jsx
(
  <Button mx={4} variant="primary">
    Generic Button
  </Button>
)
```

### Long Text

```jsx
(
  <Button variant="primary">
    Primary Button with a really long title that breaks onto multiple lines
    feugiat laoreet elit ut mollis interdum enim Aenean pharetra bibendum ex at
    dictum`, null
  </Button>
);

export const AnimationProp = () => (
  <Flex flexDirection="column">
    <Button variant="primary">default</Button>
    <Button animationDirection="left" variant="primary">
      direction override
    </Button>
    <Button animationBackgroundColor="blue.300" variant="primary">
      color override
    </Button>
    <Button animationDirection="none" variant="primary">
      no animation
    </Button>
  </Flex>
);

export const VariantProp = () =>
  Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => (
      <Button
        key={variant}
        css={{ ':hover': { color: 'orange' } }}
        mr={1}
        size={2}
        variant={variant}
      >
        {variant}
      </Button>
    ));

export const VariantComponent = () =>
  Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => {
      const buttonVariant = (variant[0].toUpperCase() +
        variant.slice(1)) as keyof ButtonVariant;
      const Comp = Button[buttonVariant] as ButtonVariant;
      return (
        <Comp key={variant} mr={1}>
          {variant}
        </Comp>
      );
    });

export const PseudoOverrides = () =>
  Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => {
      const buttonVariant = (variant[0].toUpperCase() +
        variant.slice(1)) as keyof ButtonVariant;
      const Comp = Button[buttonVariant] as ButtonVariant;
      return (
        <Comp
          key={variant}
          mr={1}
          pseudo={{
            hover: {
              backgroundColor: 'orange',
            },
            focus: {
              color: 'blue',
            },
          }}
          size={2}
        >
          {variant}
        </Comp>
      );
    });

export const Disabled = () =>
  Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => {
      const buttonVariant = (variant[0].toUpperCase() +
        variant.slice(1)) as keyof ButtonVariant;
      const Comp = Button[buttonVariant] as ButtonVariant;
      return (
        <Comp key={variant} disabled={true} mr={1}>
          {variant}
        </Comp>
      );
    });

export const UsingSxProp = () => (
  <Button.Tertiary
    sx={{
      backgroundColor: 'red.700',
      '&:hover': { backgroundColor: 'gray.200' },
    }}
  >
    Using sx prop
  </Button.Tertiary>
);

export const UsingChildren = () => (
  <Button.Tertiary size={2}>
    <Flex alignItems="center" flexDirection="row">
      <Text.Subtitle textTransform="lowercase">HI</Text.Subtitle>
      <Box border="1px solid" borderColor="red.300" color="red.300">
        Boxy Box
      </Box>
    </Flex>
  </Button.Tertiary>
);

export const UsingSizesProp = () => {
  type ButtonSize = keyof ButtonSizes;

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      {(rosetta.light.buttonSizes as ButtonSize[]).map(
        (size: ButtonSize, idx: number) => (
          <Flex
            key={size}
            alignItems="flex-start"
            flexDirection="row"
            justifyContent="center"
          >
            <Button.Primary mr="2px" size={idx}>
              Button Size: {idx}
            </Button.Primary>
            <Button.Primary key={size} mb={2} size={size}>
              Button Size: {size}
            </Button.Primary>
          </Flex>
        )
      )}
      <Button.Primary key="small" mb={2} size="small">
        Button Size: small
      </Button.Primary>
      <Button.Primary key="medium" mb={2} size="medium">
        Button Size: medium
      </Button.Primary>
      <Button.Primary key="large" mb={2} size="large">
        Button Size: large
      </Button.Primary>
    </Flex>
  );
};

export const WithCustomBorder = () => (
  <Flex flexDirection="column" gap={1}>
    <Button.Tertiary
      borderColor="green.500"
      borderStyle="solid"
      borderWidth={1}
      size="large"
    >
      Add a Green border on Tertiary
    </Button.Tertiary>

    <Button.Secondary borderColor="blue.500" size="large">
      Custom border color
    </Button.Secondary>
    <Button.Secondary borderStyle="dashed" size="medium">
      Custom border style
    </Button.Secondary>
    <Button.Secondary borderWidth={4} size="medium">
      Custom border width
    </Button.Secondary>
    <Button.Secondary
      borderColor="transparent"
      borderStyle="none"
      borderWidth={0}
      size="medium"
    >
      hidden border
    </Button.Secondary>
  </Flex>
);

export const AsA = () =>
  Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => (
      <>
        <Button
          key={variant}
          as="a"
          href="http://example.com"
          mr={1}
          variant={variant}
        >
          {variant}
        </Button>
        <Button
          key={variant + '_medium'}
          as="a"
          href="http://example.com"
          mr={1}
          size={2}
          variant={variant}
        >
          {variant}
        </Button>
      </>
    ));
```

### Animation Prop

```jsx
(
  <Flex flexDirection="column">
    <Button variant="primary">default</Button>
    <Button animationDirection="left" variant="primary">
      direction override
    </Button>
    <Button animationBackgroundColor="blue.300" variant="primary">
      color override
    </Button>
    <Button animationDirection="none" variant="primary">
      no animation
    </Button>
  </Flex>
)
```

### Variant Prop

```jsx
Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => (
      <Button
        key={variant}
        css={{ ':hover': { color: 'orange' } }}
        mr={1}
        size={2}
        variant={variant}
      >
        {variant}
      </Button>
    ))
```

### Variant Component

```jsx
Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => {
      const buttonVariant = (variant[0].toUpperCase() +
        variant.slice(1)) as keyof ButtonVariant
```

### Pseudo Overrides

```jsx
Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => {
      const buttonVariant = (variant[0].toUpperCase() +
        variant.slice(1)) as keyof ButtonVariant
```

### Disabled

```jsx
Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => {
      const buttonVariant = (variant[0].toUpperCase() +
        variant.slice(1)) as keyof ButtonVariant
```

### Using Sx Prop

```jsx
(
  <Button.Tertiary
    sx={{
      backgroundColor: 'red.700',
      '&:hover': { backgroundColor: 'gray.200' },
    }}
  >
    Using sx prop
  </Button.Tertiary>
)
```

### Using Children

```jsx
(
  <Button.Tertiary size={2}>
    <Flex alignItems="center" flexDirection="row">
      <Text.Subtitle textTransform="lowercase">HI</Text.Subtitle>
      <Box border="1px solid" borderColor="red.300" color="red.300">
        Boxy Box
      </Box>
    </Flex>
  </Button.Tertiary>
)
```

### Using Sizes Prop

```jsx
{
  type ButtonSize = keyof ButtonSizes;

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      {(rosetta.light.buttonSizes as ButtonSize[]).map(
        (size: ButtonSize, idx: number) => (
          <Flex
            key={size}
            alignItems="flex-start"
            flexDirection="row"
            justifyContent="center"
          >
            <Button.Primary mr="2px" size={idx}>
              Button Size: {idx}
            </Button.Primary>
            <Button.Primary key={size} mb={2} size={size}>
              Button Size: {size}
            </Button.Primary>
          </Flex>
        )
      )}
      <Button.Primary key="small" mb={2} size="small">
        Button Size: small
      </Button.Primary>
      <Button.Primary key="medium" mb={2} size="medium">
        Button Size: medium
      </Button.Primary>
      <Button.Primary key="large" mb={2} size="large">
        Button Size: large
      </Button.Primary>
    </Flex>
  );
}
```

### With Custom Border

```jsx
(
  <Flex flexDirection="column" gap={1}>
    <Button.Tertiary
      borderColor="green.500"
      borderStyle="solid"
      borderWidth={1}
      size="large"
    >
      Add a Green border on Tertiary
    </Button.Tertiary>

    <Button.Secondary borderColor="blue.500" size="large">
      Custom border color
    </Button.Secondary>
    <Button.Secondary borderStyle="dashed" size="medium">
      Custom border style
    </Button.Secondary>
    <Button.Secondary borderWidth={4} size="medium">
      Custom border width
    </Button.Secondary>
    <Button.Secondary
      borderColor="transparent"
      borderStyle="none"
      borderWidth={0}
      size="medium"
    >
      hidden border
    </Button.Secondary>
  </Flex>
)
```

### As A

```jsx
Object.keys(rosetta.light.buttons)
    .sort()
    .map((variant: string) => (
      <>
        <Button
          key={variant}
          as="a"
          href="http://example.com"
          mr={1}
          variant={variant}
        >
          {variant}
        </Button>
        <Button
          key={variant + '_medium'}
          as="a"
          href="http://example.com"
          mr={1}
          size={2}
          variant={variant}
        >
          {variant}
        </Button>
      </>
    ))
```