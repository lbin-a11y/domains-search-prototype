# Box

Basic component of the Rosetta design system often used to create cross-platform interfaces with minimal effort. On web, `Box` represents a DOM element; in React Native, it represents a `View`.

## Usage

A Box essentially creates a `div` that allows for easy application of Rosetta's color and sizing Tokens.

There isn't a visual representation that would make sense in Figma, so Box is not present in the Rosetta Figma libraries.
## Examples


### Using Sx Prop

```jsx
(
  <Box
    height={44}
    sx={{
      ':hover': { backgroundColor: 'gray.200' },
      backgroundColor: 'red.300',
      margin: 2,
      padding: 2,
    }}
    width={44}
  />
)
```

### Using All Colors

```jsx
{
  const flatten = (obj: object, res: string[] = [], keyPath: string[] = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value.length > 1) {
        if (typeof value === 'object') {
          return flatten(value, res, [...keyPath, key]);
        }

        if (keyPath.length) {
          res.push(keyPath.join('.') + '.' + key);
          return;
        }

        res.push(key);
      }
    });

    return res;
  };

  return (
    <Flex flexWrap="wrap" gap={2}>
      {flatten(rosetta.light.colors).map((color: string) => (
        <Flex key={color} alignItems="center" gap={3}>
          <Box
            bg={color}
            css={{ borderRadius: 2, transform: 'rotate(45deg)' }}
            height={66}
            m={2}
            width={66}
          />
          <Text.Body>{color}</Text.Body>
        </Flex>
      ))}
    </Flex>
  );
}
```

### Using Spacing Tokens

```jsx
[0, 1, 2, 3, 4, 5, 6, 7, 8, 200].map((spaceIdx: number) => (
    <Flex key={spaceIdx} alignItems="center" gap={3}>
      <Box bg="gray.100" height={44} ml={spaceIdx} width={44} />
      <Text.Body>{`ml={${spaceIdx}}`}</Text.Body>
    </Flex>
  ))
```

### Using Radii Tokens

```jsx
[0, 1, 2, 3, 4, 12, 22].map((radius: number) => (
    <Flex key={radius} alignItems="center" gap={2}>
      <Box bg="gray.100" borderRadius={radius} height={44} m={1} width={44} />
      <Text.Body>{`borderRadius={${radius}}`}</Text.Body>
    </Flex>
  ))
```

### Using Border Tokens

```jsx
[0, 1, 4].map((borderWidth: number) =>
    ['solid', 'dashed', 'dotted'].map((borderStyle: string) => (
      <Flex key={borderStyle} alignItems="center" gap={2}>
        <Box
          key={borderWidth + '-' + borderStyle}
          bg="gray.800"
          borderStyle={borderStyle}
          borderWidth={borderWidth}
          height={44}
          m={1}
          width={44}
        />
        <Text.Body>{`border={${borderWidth}} / borderStyle={${borderStyle}}`}</Text.Body>
      </Flex>
    ))
  )
```

### Using Shadow Tokens

```jsx
[0, 1, 2, 3].map((shadow: number) => (
    <Flex key={shadow} alignItems="center" gap={2}>
      <Box
        key={shadow}
        bg="gray.900"
        boxShadow={shadow}
        height={44}
        m={4}
        width={44}
      />
      <Text.Body>{`boxShadow={${shadow}}`}</Text.Body>
    </Flex>
  ))
```

### With No Theme

```jsx
(
  <>
    <Box
      bg="base"
      boxShadow={1}
      boxSizing="border-box"
      css={{
        '&:hover': {
          borderRadius: '15px',
        },
      }}
      height={44}
      margin={22}
      padding={11}
      width={44}
    />
    <ThemeContext.Provider theme={rosetta.light}>
      <Box
        bg="base"
        boxShadow={1}
        css={{
          '&:hover': {
            borderRadius: '15px',
          },
        }}
        height={44}
        margin={22}
        padding={11}
        width={44}
      />
    </ThemeContext.Provider>
  </>
)
```

### Using Transition Property

```jsx
{
  const [opacityIsOne, setOpacityIsOne] = useState(true);
  const [isPurple, setIsPurple] = useState(false);

  return (
    <>
      <Button.Primary
        backgroundColor="blue.300"
        onClick={() => {
          setOpacityIsOne(!opacityIsOne);
          setIsPurple(!isPurple);
        }}
      >
        {`animate opacity to ${+!opacityIsOne} and is purple to ${!isPurple}`}
      </Button.Primary>
      <Box
        bg="gray.100"
        height={44}
        m={1}
        opacity={opacityIsOne ? 1 : 0}
        transitionDuration={600}
        transitionProperty="opacity"
        transitionTimingFunction="product.entrance"
        width={44}
      />
      <Box
        bg={isPurple ? 'pink.500' : 'gray.100'}
        height={44}
        m={1}
        opacity={opacityIsOne ? 1 : 0}
        transitionDuration={550}
        transitionProperty="opacity"
        transitionTimingFunction="product.default"
        width={44}
      />
      <Box
        bg={isPurple ? 'pink.500' : 'gray.100'}
        height={44}
        m={1}
        opacity={opacityIsOne ? 1 : 0}
        transitionDuration={200}
        transitionProperty="background-color, opacity"
        transitionTimingFunction="product.default, product.entrance"
        width={44}
      />
    </>
  );
}
```

### Using Keyframes

```jsx
{
  const bounce = keyframes`
            from, 20%, 53%, 80%, to {
            transform: translate3d(0,0,0);
            }
        
            40%, 43% {
            transform: translate3d(0, -30px, 0);
            }
        
            70% {
            transform: translate3d(0, -15px, 0);
            }
        
            90% {
            transform: translate3d(0,-4px,0);
            }
        `;

  const animation = {
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: bounce,
    animationTimingFunction: 'ease',
  };

  return (
    <Box
      backgroundColor="red.500"
      css={animation}
      height="sizes.250"
      width="sizes.250"
    />
  );
}
```