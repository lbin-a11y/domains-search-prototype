# Badge

Badge is a simple component for marking UI with status labels like 'New', 'Beta', or 'Recommended'. It provides a consistent way to highlight features or content with small, styled text labels.

## Guidance

### When to use Badge

Use Badge to mark UI elements with status or descriptive information.

- **New features** — Use `appearance="blue"` specifically for "New" labels.
- **Beta features** — Use `appearance="default"` for "Beta" or other general status.
- **Recommendations** — Use `appearance="default"` for recommendations.
- **Pro features** — Use `appearance="default"` for "Pro" or premium indicators.

### Appearance variants

Badge provides two appearance variants optimized for different use cases:

| Variant   | Use Case              | Border Color | Text Color |
| --------- | --------------------- | ------------ | ---------- |
| `blue`    | "New" labels only     | blue.300     | blue.300   |
| `default` | General purpose badges | gray.100    | gray.100   |

Use the `color` prop to pass a custom color.

### Placement

Badge should be positioned to clearly associate with the content it's describing:

1. **Next to titles** — Place alongside and center aligned with headings with proper spacing.
2. **Above content** — Position above the content when inline placement doesn't work.
3. **Corner placement** — Use as a last resort when other placements don't make sense.

### Badge Timing Requirements

Badges should follow these timing requirements:

- **When Beta**: Remove when not beta.
- **When New**: Must have scheduled removal in a timely manner.
- **When Recommended**: Must be based on user data or context.
## Examples


### Basic Use

```jsx
<Flex gap={2} p={4} sx={{ flexDirection: 'column' }}>
      <Flex alignItems="center" gap={2}>
        <Text.Subtitle>New Feature</Text.Subtitle>
        <Badge appearance="blue">
          {'New'}
        </Badge>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Text.Subtitle>Default Example</Text.Subtitle>
        <Badge appearance="default">
          {'Beta'}
        </Badge>
      </Flex>
    </Flex>
```

### On Strong

```jsx
<ThemeContext.Provider theme={rosetta.dark}>
      <Flex alignItems="center" bg="bg.base" gap={2} p={4}>
        <Text.Subtitle>Dark Theme</Text.Subtitle>
        <Badge>{'Pro'}</Badge>
      </Flex>
    </ThemeContext.Provider>
```