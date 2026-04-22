# Back Button

Special button for navigating to the previous section in Panels and Dialogs.

## Guidance

### General guidance

The Back Button is a special button that navigates back a level in panels or other content areas. It should always be used in a Toolbar.

### Content

No guidance.

### Accessibility

If a Back Button only has an Icon instead of a title, it must be given a name via alt text or through an ARIA label.

## Usage

### Anatomy

1. **Arrow Icon** — Icon that indicates travel direction with a special animation.
2. **Label** — "Back" by default, or the parent panel's title.

---

### Specs

The Back Button mimics the styling of a medium-sized, tertiary Button, but with a unique hover design. Note the Back Button has a negative space[1] left margin built in, so that the chevron icon aligns with the grid.

---

### Layout

Back Buttons should always be placed in a Toolbar that sits in a panel or other content area.

---

### Behavior

Selecting a Back Button should always take the user back one step, or up one level in the navigation tree. It should not jump them to another part of the product.
## Examples


### Default

```jsx
<BackButton onClick={() => {}} />
```

### Custom Label

```jsx
<BackButton
      label={'Background Styles'}
      onClick={() => {}}
    />
```

### I18n Word Wrap

```jsx
<BackButton
      label={'A very very very very very very very very very very very very long back button label'}
      onClick={() => {}}
    />
```

### With ACustom Icon

```jsx
(
  <BackButton icon={<ArrowLeft />} onClick={() => {}} />
)
```

### With ANeighboring Element

```jsx
(
  <Flex alignItems="center" gap={2}>
    <BackButton onClick={() => {}} />
    <Box bg="black" display="inline-block" size="sizes.125" />
  </Flex>
)
```

### With AMax Width

```jsx
<Flex>
      <Box>
        <BackButton
          label={
            <Box css={{ overflowX: 'hidden', textOverflow: 'ellipsis' }}>
              {'Commerce'}
            </Box>
          }
          onClick={() => {}}
          style={{ maxWidth: '100%' }}
        />
      </Box>
    </Flex>
```