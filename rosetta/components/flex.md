# Flex

Extension of Rosetta Box. Sets display to "flex," providing all CSS flexbox properties.

## Usage

Flex is an extension of the Box primitive from Rosetta with Flexbox applied.

There isn't a visual representation that would make sense in Figma, so Flex is not present in the Rosetta Figma libraries.
## Examples


### Default

```jsx
(
  <Flex alignItems="center" flexDirection="row" height={44} width="100%">
    {[0, 1, 2, 3, 4, 5, 6].map((space) => (
      <Box key={space} height={22} width={22}>
        <Text.Body>{space}</Text.Body>
      </Box>
    ))}
  </Flex>
)
```

### Using Gap Space Token

```jsx
(
  <Flex gap={3}>
    <Square />
    <Square />
    <Square />
  </Flex>
)
```

### Using Gap Shorthand

```jsx
(
  <Flex flexWrap="wrap" gap="20px 5px" width="sizes.300">
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
  </Flex>
)
```

### Using Row Gap And Column Gap

```jsx
(
  <Flex columnGap={1} flexWrap="wrap" rowGap={3} width="sizes.300">
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
  </Flex>
)
```