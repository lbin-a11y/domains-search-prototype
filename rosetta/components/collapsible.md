# Collapsible

The Collapsible component is used to put long sections of information under a block that users can expand or collapse.

## Usage

### General guidance

Collapsible expands or collapses an item.

**Do**

- Use Collapsible to collapse a large amount of content when there's limited space.
- Use Collapsible to allow users to expand or collapse content that's relevant to them.

**Don't**

- Don't use Collapsible when content is important and needs to be displayed for the user.
- Don't use Collapsible for a single labeled section of content.

There isn't a visual representation that would make sense in Figma, so Collapsible is not present in the Rosetta Figma libraries.
## Examples


### Use Body

```jsx
{
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}
```

### Default

```jsx
{
  const [isOpen, setIsOpen] = useState(false);
  const headerId = useId();
  const bodyId = useId();

  return (
    <>
      <Button.Base
        aria-controls={bodyId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text.Body as="label" id={headerId} sx={{ cursor: 'pointer' }}>
          {'Click to toggle open'}
        </Text.Body>
      </Button.Base>
      <Collapsible isOpen={isOpen}>
        <Box
          aria-hidden={isOpen ? 'false' : 'true'}
          aria-labelledby={headerId}
          id={bodyId}
          ml={6}
          role="region"
        >
          <Text.Body>{useBody()}</Text.Body>
        </Box>
      </Collapsible>
    </>
  );
}
```

### Custom Transitions

```jsx
{
  const [isOpen, setIsOpen] = useState(false);
  const headerId = useId();
  const bodyId = useId();

  return (
    <>
      <Button.Base
        aria-controls={bodyId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text.Body as="label" id={headerId} sx={{ cursor: 'pointer' }}>
          {'Click to toggle open'}
        </Text.Body>
      </Button.Base>
      <Collapsible
        enterTransitionDuration="1000ms"
        enterTransitionTimingFunction="ease-in-out"
        exitTransitionDuration="1000ms"
        exitTransitionTimingFunction="ease-in-out"
        isOpen={isOpen}
      >
        <Box
          aria-hidden={isOpen ? 'false' : 'true'}
          aria-labelledby={headerId}
          id={bodyId}
          ml={6}
          role="region"
        >
          <Text.Body>{useBody()}</Text.Body>
        </Box>
      </Collapsible>
    </>
  );
}
```