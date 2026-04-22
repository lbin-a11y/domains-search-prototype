# Touchable

Container providing our common visual feedback for clickable elements.

## Usage

Touchable is a wrapper component that allows other components to have consistent hover and focus styles and interaction.

There isn't a visual representation that would make sense in Figma, so Touchable is not present in the Rosetta Figma libraries.
## Examples


### Solid Interaction

```jsx
(
  <Touchable aria-label="Touchable with solid interaction">
    <Box
      border="1px solid"
      borderColor="gray.800"
      height="100px"
      width="100px"
    />
  </Touchable>
)
```

### Underline Interaction

```jsx
(
  <Touchable
    aria-label="Touchable with underline with text"
    as="span"
    interaction={Touchable.Underline}
  >
    <Text.Title>Design</Text.Title>
  </Touchable>
)
```

### Underline Button Interaction

```jsx
(
  <Button.Tertiary
    animationBackgroundColor="none"
    animationDirection="none"
    aria-label="Touchable with underline with Button"
    size="small"
  >
    <Touchable
      as="span"
      interaction={(props: any) => <Touchable.Underline {...props} />}
    >
      Design
    </Touchable>
  </Button.Tertiary>
)
```

### Solid Icon Interaction

```jsx
(
  <Touchable
    aria-label="Touchable with solid interaction and icon"
    hitSlop={11}
    interaction={(props: any) => (
      <Touchable.Solid
        sx={{
          width: 32,
          height: 32,
          borderRadius: 'circle',
          backgroundColor: props.focused ? 'gray.800' : 'transparent',
          '&:hover': {
            backgroundColor: props.disabled ? 'transparent' : 'gray.800',
          },
        }}
        {...props}
      />
    )}
  >
    <Box bg="gray.500" height="sizes.75" width="sizes.75" />
  </Touchable>
)
```

### Full Width Height

```jsx
(
  <Touchable
    aria-label="Touchable with full width and height"
    height="100px"
    interaction={(props: any) => (
      <Touchable.Solid height="100%" width="100%" {...props} />
    )}
    width="100px"
  >
    <Flex height="100%" justifyContent="space-between" width="100%">
      <Box>Text</Box>
      <Box>(icon)</Box>
    </Flex>
  </Touchable>
)
```

### Without Feedback

```jsx
(
  <Touchable interaction={Touchable.WithoutFeedback}>
    <Text.Title>Design</Text.Title>
  </Touchable>
)
```

### Touchable Element

```jsx
(
  <Touchable.Element.Icon>
    <Box bg="gray.500" height="sizes.100" width="sizes.100" />
  </Touchable.Element.Icon>
)
```

### Touchable Element Sizes

```jsx
(
  <Flex gap={10}>
    <Touchable.Element.Icon size="sizes.150">
      <Box bg="gray.500" height="sizes.75" width="sizes.75" />
    </Touchable.Element.Icon>
    <Touchable.Element.Icon size="sizes.250">
      <Box bg="gray.500" height="sizes.150" width="sizes.150" />
    </Touchable.Element.Icon>
    <Touchable.Element.Icon size="sizes.350">
      <Box bg="gray.500" height="sizes.150" width="sizes.150" />
    </Touchable.Element.Icon>
    <Touchable.Element.Icon size="sizes.450">
      <Box bg="gray.500" height="sizes.150" width="sizes.150" />
    </Touchable.Element.Icon>
  </Flex>
)
```