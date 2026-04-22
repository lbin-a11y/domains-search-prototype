# Grid

The Grid is a container-based system for organizing layout. It has 12 columns that scale responsively, with pre-defined paddings and margins. All layouts should rely on the Grid.

## Usage

### General guidance

Rosetta's Grid is an important way to ensure layout consistency throughout Squarespace's product suite. Rosetta's responsive grid is applied to containers, not entire views. This is because of the side panel often featured in Squarespace UIs — both the left-side panel and the right-side workspace have their own grid.

---

### Glossary

**Columns**
There are 12 columns in the responsive grid. Column widths change with the size of the grid.

**Gutters**
Gutters are the gaps between the columns. They are fixed values based on the container width.

**Margins**
Grid margins are the outer margins of the grid. They are fixed values based on the device.

**Column span**
The area of the layout that contains content, which spans over a number of columns.

**Offset**
The number of columns the column span is pushed over by.

---

### Specs

The grid always takes the full width of the container. It has fixed gutters and margins and percentage-based column widths. The grid has a maximum width of 1680px and should be centered within its container beyond that point.

| Device  | Container size | Columns | Gutter   | Margin   |
| ------- | -------------- | ------- | -------- | -------- |
| Mobile  | Any            | 12      | space[3] | space[3] |
| Desktop | 320–879px      | 12      | space[3] | space[6] |
| Desktop | 880–1680px     | 12      | space[6] | space[6] |

---

### Designing with the Grid

#### Alignment

Do not align every element to the grid. The responsive grid is for creating layouts that adapt or change to accommodate various viewport sizes. Layout regions are the only aspect of your design that should align to the responsive grid. If you try to align and implement individual elements to the responsive grid, you will compromise the design of the elements and their behavior.

- Align elements with each other where it makes more sense.
- Don't align every single element to the Grid if it compromises the design.

#### Gutters

The grid gutters are there to create spacing between your content. Do not extend your content into the gutters; each content area should span from the outer edges of the columns they cover.

- Don't align elements to the Grid gutters.
## Examples


### Default

```jsx
(
  <Grid.Container>
    <Grid.Item>
      <Box backgroundColor="gray.800" height="sizes.700">
        <Text>1</Text>
      </Box>
    </Grid.Item>
    <Grid.Item>
      <Box backgroundColor="gray.800" height="sizes.750">
        <Text>2</Text>
      </Box>
    </Grid.Item>
    <Grid.Item>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>3</Text>
      </Box>
    </Grid.Item>
  </Grid.Container>
)
```

### With Custom Bounding Box

```jsx
{
  const CustomBoundingBox = forwardRef(function CustomBoundingBox(props, ref) {
    return <Box ref={ref} data-custom {...props} />;
  });

  return (
    <Grid.Container as={CustomBoundingBox}>
      <Grid.Item columns={12}>
        <Box backgroundColor="gray.800" height="sizes.700">
          <Text>1</Text>
        </Box>
      </Grid.Item>
      <Grid.Item columns={[12, 6]}>
        <Box backgroundColor="gray.800" height="sizes.750">
          <Text>2</Text>
        </Box>
      </Grid.Item>
      <Grid.Item columns={[12, 6]}>
        <Box backgroundColor="gray.800" height="sizes.400">
          <Text>3</Text>
        </Box>
      </Grid.Item>
    </Grid.Container>
  );
}
```

### With Falsy Child

```jsx
(
  <Grid.Container>
    <Grid.Item columns={6}>
      <Box backgroundColor="gray.800" height="sizes.700">
        <Text>1</Text>
      </Box>
    </Grid.Item>
    {null}
    <Grid.Item columns={6}>
      <Box backgroundColor="gray.800" height="sizes.700">
        <Text>2</Text>
      </Box>
    </Grid.Item>
    <Grid.Item>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>3</Text>
      </Box>
    </Grid.Item>
  </Grid.Container>
)
```

### With Configuration

```jsx
(
  <Grid.Container>
    <Grid.Item columns={[12, 0, 0]}>
      <Text.Title>Small only</Text.Title>
    </Grid.Item>
    <Grid.Item columns={[0, 12, 0]}>
      <Text.Title>Medium only</Text.Title>
    </Grid.Item>
    <Grid.Item columns={[0, 0, 12]}>
      <Text.Title>Large only</Text.Title>
    </Grid.Item>
    <Grid.Item columns={12}>
      <Box backgroundColor="gray.800" height="sizes.700">
        <Text>Span 12</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[12, 6]}>
      <Box backgroundColor="gray.800" height="sizes.750">
        <Text>Span [12, 6]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[12, 6]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [12, 6]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[12, 6, 3]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [12, 6, 3]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[12, 6, 3]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [12, 6, 3]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[12, 6, 3]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [12, 6, 3]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[12, 6, 3]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [12, 6, 3]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[6, 4]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [6, 4]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[0, 4]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [0, 4]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={[6, 4]}>
      <Box backgroundColor="gray.800" height="sizes.400">
        <Text>Span [6, 4]</Text>
      </Box>
    </Grid.Item>
    <Grid.Item columns={12}>
      <Box backgroundColor="gray.800" height="sizes.700">
        <Text>Span 12</Text>
      </Box>
    </Grid.Item>
  </Grid.Container>
)
```

### With Overrides

```jsx
(
  <Grid.Container gridConstraint={[12]} gutter={0} margin={0}>
    <Grid.Item backgroundColor="gray.800" columns={4}>
      <Grid.Container>
        <Grid.Item columns={12}>
          <Text>Nav Items 12</Text>
        </Grid.Item>
      </Grid.Container>
    </Grid.Item>
    <Grid.Item backgroundColor="red.700" columns={8}>
      <Grid.Container>
        <Grid.Item columns={12}>
          <Text>Content</Text>
        </Grid.Item>
      </Grid.Container>
    </Grid.Item>
  </Grid.Container>
)
```