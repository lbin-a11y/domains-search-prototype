# Skeleton

Skeleton is a placeholder for content while a page loads.

## Guidance

### General guidance

Skeleton is designed to serve as a placeholder for content while a page is loading. It provides users with a basic framework of the page layout, helping to improve the perceived load time and overall user experience.

**Do use Skeleton for:**

1. Dynamic content that requires asynchronous loading.
2. Data that needs to be fetched from an API or database.
3. Content that is generated or calculated based on user input or activity.

**Do not use Skeleton for:**

1. Static content that loads immediately with the page.
2. Fixed elements such as labels, headers, or navigation menus.
3. Content that is always present and does not depend on external data sources.

### Usage within components

Skeleton can and should be used within other components that contain fetched data.

Avoid replacing entire components, patterns, or compositions with a giant Skeleton, as it doesn't help preserve page layout. Instead, selectively replace content within the component with an appropriate Skeleton.

### Usage patterns

**Key Figures** — Selectively use Skeleton to replace the dynamic content within the Key Figure component. Static content like Title, Subtitle, and Tooltips is kept as-is.

**Table** — The individual cell content is replaced with Skeletons. The structure and layout of the table, including its table headers, is preserved.
## Examples


### Default

```jsx
<Skeleton height="400px" width="400px" />
```

### With Inline Children

```jsx
(
  <Box width="300px">
    <Text.Body>
      <Skeleton inline>
        This is an example sentence. This is an example sentence. This is an
        example sentence. This is an example sentence.This is an example
        sentence.This is an example sentence.
      </Skeleton>
    </Text.Body>
  </Box>
)
```

### With Block Children

```jsx
(
  <Skeleton>
    <Box bg="blue.600" height="250px" width="400px" />
  </Skeleton>
)
```

### Multiple Skeletons

```jsx
(
  <Flex flexDirection="column" gap={2}>
    <Skeleton width="sizes.700" />
    <Skeleton>
      <Box bg="blue.600" height="250px" width="400px" />
    </Skeleton>
    <Text.Title>
      <Skeleton inline>Squarespace</Skeleton>
    </Text.Title>
    <Text.Body>
      <Skeleton inline>
        This is an example sentence. This is an example sentence. This is an
        example sentence. This is an example sentence. This is an example
        sentence. This is an example sentence. This is an example sentence. This
        is an example sentence. This is an example sentence. This is an example
        sentence. This is an example sentence. This is an example sentence.
      </Skeleton>
    </Text.Body>
  </Flex>
)
```

### Not Loading

```jsx
{
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  }, [loading]);

  return (
    <Flex flexDirection="column" gap={4}>
      <Button.Primary onClick={() => setLoading(true)} width="fit-content">
        Restart loading
      </Button.Primary>
      <Flex flexDirection="column" gap={2}>
        <Skeleton loading={loading} width="sizes.700" />
        <Skeleton loading={loading}>
          <Box bg="blue.600" height="250px" width="400px" />
        </Skeleton>
        <Text.Title>
          <Skeleton inline loading={loading}>
            Squarespace
          </Skeleton>
        </Text.Title>
        <Text.Body>
          <Skeleton inline loading={loading}>
            This is an example sentence. This is an example sentence. This is an
            example sentence. This is an example sentence. This is an example
            sentence. This is an example sentence. This is an example sentence.
            This is an example sentence. This is an example sentence. This is an
            example sentence. This is an example sentence. This is an example
            sentence.
          </Skeleton>
        </Text.Body>
      </Flex>
    </Flex>
  );
}
```