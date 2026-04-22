# Cell

Cells provide a base for common layouts across the Squarespace UI. They often include input controls as well as other components.

A Cell is essentially a container that can compose other components in six distinct "slots". Each of the examples displays a Cell with different slot combinations.

## Guidance

### General guidance

Follow individual best practices for each component included in a Cell.

### Content

No guidance.

### Accessibility

No guidance.

## Usage

### Overview

Cells, which were initially inspired by the iOS layout system, are one of the principal building blocks that comprise Rosetta. They are effectively containers that compose other components in different areas. Thus, Cells are flexible, which allows them to provide many functions and uses.

A Cell can be composed with a bottom border, or a Divider line.

Stack Cells vertically with no space between adjacent Cells. Each Cell should also stretch the full width of their container.

---

### Anatomy

A Cell is essentially a container that can compose other components in six distinct "slots". The shell section provides five areas of composition, whereas the post section composes anything passed to it.

1. **Container**
2. **Shell** — Wrapper for the pre, body and accessory slots.
3. **Exterior pre** — Outer slot for a component to the left of the body, such as an Icon, an Image or a Toggle.
4. **Interior pre** — Inner slot for a component to the left of the body, such as an Icon or an Image.
5. **Body** — Main content area, generally for holding a label and/or a subtitle.
6. **Exterior accessory** — Inner slot for a component to the right of the body, such as a Toggle, a Chevron or a Text Input.
7. **Interior accessory** — Outer slot for a component to the right of the body, such as a Toggle, a Chevron or a Text Input.
8. **Post** — Lower slot, most commonly used for error messages.
9. **Divider** — Optional divider line to visually separate stacked Cells.

---

### Composition

Below are some examples of how components can be composed in a Cell's slots. Note how each slot grows, shrinks, or disappears as needed.

- Cell with an Icon, label and subtitle.
- Cell with a label, detail and chevron (a.k.a. Disclosure).
- Cell with an Icon, label, subtitle and error.
- Cell with a label and Stepper.

---

### Specs

Cells should always be stacked vertically with no space between adjacent Cells.

#### Width

Cells should always be aligned to the Grid. Within a panel, they should take the full width. In wider spaces there may be cases where two Cells stacked horizontally makes more sense, for example, first and last name inputs. When a Cell is placed inside a container that already has padding (e.g., a sidebar panel), the Cell sits within the content flow — do not use negative margins to force full-bleed. Use `px={0}` on the Cell to remove its default internal padding if the label text needs to align with surrounding content.

#### Height

The height of a Cell is calculated by the components inside, plus top and bottom padding of space[2], most commonly resulting in a height of sizes.250.

#### Internal spacing

While the different slots are flexible and optional, fixed spacing gutters ensure consistent alignment. Horizontal gutters in the shell section are space[2] wide, and the vertical space between the shell and the post is space[6].

The widths of all slots inside the shell are flexible, and grow and shrink as needed (like Flexbox). No slot in either the shell or post section requires a component; the slot can remain empty.

#### Overflow

Label, subtitle, and detail copy inside Cells should be kept as short as possible in all supported languages.

When content inside a Cell does require more space, copy will wrap and the Cell will grow in height. Note that label and subtitle copy should wrap, but detail text should be truncated. This is because label and subtitle text is generally more under control and unlikely to be long, whereas detail text is less predictable. The space[2] gutter between the two sides should remain for readability.

---

### Common uses

#### Default

The most basic use of the Cell is with Text elements and Icons.

#### Text Input

It's recommended to use Text Inputs inside Cells, stacked in a form.

#### Textarea

It's recommended to use Textareas inside Cells, stacked in a form.

#### Selectable

Cells with an Icon and Label can be used as a Selectable — similar to a checklist. Clicking/tapping anywhere in the whole Cell should trigger the change from "on" to "off".

#### Slider

It is recommended to use Sliders inside Cells, stacked in a form.

#### Stepper

It is recommended to use Steppers inside Cells, stacked in a form.

#### Toggle

Toggles can be used in stackable Cells with a label. Note that when a Toggle is used in a Cell, the entire Cell should act as the tap zone.

#### Radio

Radio Buttons can be used in stackable Cells with a label. Note that when a Radio Button is used in a Cell, the entire Cell should act as the tap zone.

#### Checkbox

Checkboxes can be used in stackable Cells with a label. Note that when a Checkbox is used in a Cell, the entire Cell should act as the tap zone.

#### Disclosure

A Cell with a label, optional detail text, and a `ChevronSmallRight` icon wrapped in `Touchable.Element.WithoutFeedback`. Used for pushing into a sub-panel to reveal options. See [disclosure.md](disclosure.md) for full guidance and examples.

---

### Behavior

#### Interaction states

##### Focus

When a Cell holds an input that requires a focus state — such as a Text Input or a Toggle — the Divider line transitions from gray.800 to gray.100 to help with accessibility and keyboard navigation.

#### Selected

Cells should not be used as navigational items in the left-side navigation to control what view is shown in the workspace area.
## Examples


### Basic Use

```jsx
<Cell
      as="label"
      description={'Subtitle'}
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={<Toggle.Control checked={false} />}
      interiorPre={'pre'}
      label={'Cell Title'}
    />
```

### As Button

```jsx
<Touchable.Element.WithoutFeedback>
      <Cell
        as="label"
        description={'Subtitle'}
        exteriorAccessory={<ChevronLargeRight />}
        interiorPre={'pre'}
        label={'Cell Title'}
        px={2}
      />
    </Touchable.Element.WithoutFeedback>
```

### Disclosure

A Cell configured as a Disclosure — label with a chevron that pushes to the next panel. See [disclosure.md](disclosure.md) for full guidance.

```jsx
<Touchable.Element.WithoutFeedback onClick={() => {}}>
  <Cell
    label="Label"
    description="Subtitle"
    interiorPre={<Box size="sizes.250" bg="gray.900" />}
    exteriorAccessory={<ChevronSmallRight color="gray.300" />}
  />
</Touchable.Element.WithoutFeedback>
```

### Disabled

```jsx
<Cell
      as="label"
      description={'Subtitle'}
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={<Toggle.Control checked={false} disabled />}
      interiorPre={'pre'}
      isDisabled
      label={'Cell Title'}
    />
```

### With Title

```jsx
<Cell
      description="Subtitle"
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={<Toggle.Control checked={false} id="withTitle" />}
      interiorPre={'pre'}
      label={
        <Text.Body
          as="label"
          css={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          htmlFor="withTitle"
          m={0}
        >
          {'Cell Title is really long and extremely long and longest'}
        </Text.Body>
      }
    />
```

### With Title And Description

```jsx
<Cell
      description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla nibh, facilisis pellentesque semper eget, ullamcorper vel elit. Fusce semper sapien sit amet mi dapibus, ut pharetra est aliquam'}
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={
        <Toggle.Control checked={false} id="withTitleAndDescription" />
      }
      interiorPre={'pre'}
      label={
        <Text.Body
          as="label"
          css={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          htmlFor="withTitleAndDescription"
          m={0}
        >
          {'Cell Title is really long and extremely long and longest'}
        </Text.Body>
      }
    />
```

### With Title Subtitle And Detail Text

```jsx
<Cell
      description={'Subtitle'}
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={
        <Text.Body color="gray.300" m={0}>
          {'Detail content'}
        </Text.Body>
      }
      interiorPre={'pre'}
      label={'Cell Title'}
    />
```

### With Message For User

```jsx
<Cell
      as="label"
      description={'Subtitle'}
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={<Toggle.Control checked={false} />}
      interiorPre={'pre'}
      label={'Cell Title'}
      post={'An error message'}
    />
```

### With Text Input

```jsx
<Cell
      as="label"
      body={<TextInput onChange={() => {}} />}
      exteriorPre={'My label'}
    />
```

### With Text Input And Clear Action

```jsx
{
  const [value, setValue] = useState<string>('');
  return (
    <Cell
      as="label"
      body={<TextInput onChange={setValue} type="text" value={value} />}
      exteriorAccessory={
        !!value && (
          <Touchable
            height="sizes.150"
            interaction={(interactionProps: TouchableProps) => (
              <Touchable.Solid
                sx={{
                  size: 'sizes.150',
                  borderRadius: 'circle',
                }}
                {...interactionProps}
              />
            )}
            onClick={() => {
              setValue('');
            }}
            sx={{
              '&:disabled': {
                color: 'gray.600',
              },
            }}
            width="sizes.150"
          >
            <CrossSmall
              alt={'Clear text'}
            />
          </Touchable>
        )
      }
      exteriorPre={'My label'}
    />
  );
}
```

### With Text Input And Copy Action

```jsx
{
  const [value, setValue] = useState<string>('');
  const [isCopied, setCopied] = useClipboard(value, {
    successDuration: 2000,
  });
  return (
    <Cell
      as="label"
      body={<TextInput onChange={setValue} type="text" value={value} />}
      exteriorAccessory={
        value && (
          <Button.Tertiary
            key={isCopied ? 'copied' : 'copy'}
            disabled={isCopied}
            onClick={setCopied}
          >
            {isCopied
              ? 'Copied'
              : 'Copy'}
          </Button.Tertiary>
        )
      }
      exteriorPre={'My label'}
    />
  );
}
```

### Composed

```jsx
(
  <Cell.Container>
    <Cell.Shell>
      <Cell.ExteriorPre>
        <Box bg="blue.500" size="sizes.250" />
      </Cell.ExteriorPre>
      <Cell.InteriorPre>
        <Box bg="blue.500" size="sizes.250" />
      </Cell.InteriorPre>
      <Cell.Body>
        <Box bg="blue.500" height="sizes.250" size={'100%'} />
      </Cell.Body>
      <Cell.InteriorAccessory>
        <Box bg="blue.500" size="sizes.250" />
      </Cell.InteriorAccessory>
      <Cell.ExteriorAccessory>
        <Box bg="blue.500" size="sizes.250" />
      </Cell.ExteriorAccessory>
    </Cell.Shell>
    <Cell.Post>
      <Box bg="blue.500" height="5px" width={'100%'} />
    </Cell.Post>
  </Cell.Container>
)
```

### Composed With Styles

```jsx
<Cell.Container>
      <Cell.Shell>
        <Cell.ExteriorPre>
          <Box bg="blue.500" height="sizes.250" width={10} />
        </Cell.ExteriorPre>
        <Cell.InteriorPre>
          <Box bg="blue.500" size="sizes.250" />
        </Cell.InteriorPre>
        <Cell.Body>
          <Text.Body as="label" htmlFor="composedWithStyles" m={0}>
            {'Title'}
          </Text.Body>
          <Text.Caption m={0}>
            {'Subtitle'}
          </Text.Caption>
        </Cell.Body>
        <Cell.InteriorAccessory>
          <Toggle.Control checked={false} id="composedWithStyles" />
        </Cell.InteriorAccessory>
        <Cell.ExteriorAccessory>
          <ChevronLargeRight />
        </Cell.ExteriorAccessory>
      </Cell.Shell>
      <Cell.Post>
        <Text.Caption color="red.300" display="block" m={0}>
          {'Some error text'}
        </Text.Caption>
      </Cell.Post>
    </Cell.Container>
```

### With Text Input And Cascading Styles

```jsx
<Box
      css={{
        ':focus-within': {
          '.divider': {
            '.divider': {
              width: '100%',
            },
          },
        },
      }}
    >
      <Cell.Container>
        <Cell.Shell as="label">
          <Cell.InteriorPre>
            <Text.Body m={0}>
              {'Input label'}
            </Text.Body>
          </Cell.InteriorPre>
          <Cell.Body>
            <TextInput width="100%" />
          </Cell.Body>
        </Cell.Shell>
      </Cell.Container>
      <Divider className="divider" />
    </Box>
```

### With Multiple Cells And AFocus Helper

```jsx
{
  const FocusManagedCell = withFocusManagedDivider(Cell, Divider);

  const {
    Container,
    Shell,
    InteriorPre,
    ExteriorPre,
    Body,
    Post,
    InteriorAccessory,
    ExteriorAccessory,
  } = FocusManagedCell;

  return (
    <>
      <Container as="label">
        <Shell>
          <InteriorPre width="sizes.450">
            <Text.Body m={0}>
              {'Input label'}
            </Text.Body>
          </InteriorPre>
          <Body>
            <TextInput width="100%" />
          </Body>
          <ExteriorAccessory>
            <Settings />
          </ExteriorAccessory>
        </Shell>
      </Container>

      <Container>
        <Shell>
          <InteriorPre width="sizes.450">
            <Text.Body as="label" htmlFor="multipleCellsToggle1" m={0}>
              {'Toggle input'}
            </Text.Body>
          </InteriorPre>
          <ExteriorAccessory>
            <Toggle.Control checked={false} id="multipleCellsToggle1" />
          </ExteriorAccessory>
        </Shell>
      </Container>

      <Container>
        <Shell as="label">
          <Body width="sizes.450">
            <Text.Body m={0}>
              {'Toggle input (shell as label)'}
            </Text.Body>
          </Body>
          <ExteriorAccessory>
            <Toggle.Control checked={false} />
          </ExteriorAccessory>
        </Shell>
      </Container>

      <Container>
        <Shell>
          <ExteriorPre>
            <Toggle.Control checked={false} id="multipleCellsToggle2" />
          </ExteriorPre>
          <InteriorPre width="sizes.450">
            <Text.Body as="label" htmlFor="multipleCellsToggle2" m={0}>
              {'V8 style'}
            </Text.Body>
          </InteriorPre>
          <Body />
        </Shell>
        <Post>
          <Text.Caption color="red.300" display="block">
            {'This is an error message'}
          </Text.Caption>
        </Post>
      </Container>

      <Text.Caption>
        {'Lorem ipsum dolor sit amet this is a description that wraps over multiple lines of content'}
      </Text.Caption>

      <Container>
        <Shell>
          <InteriorPre width="sizes.450">
            <Text.Body as="label" htmlFor="multipleCellsToggle3" m={0}>
              {'Toggle input'}
            </Text.Body>
          </InteriorPre>
          <Body />
          <InteriorAccessory>
            <Text.Body color="gray.300" m={0}>
              {'Some detail'}
            </Text.Body>
          </InteriorAccessory>
          <ExteriorAccessory>
            <Toggle.Control checked={false} id="multipleCellsToggle3" />
          </ExteriorAccessory>
        </Shell>
      </Container>

      <Container>
        <Shell>
          <InteriorPre width="sizes.450">
            <Text.Body as="label" htmlFor="multipleCellsText" m={0}>
              {'Other input'}
            </Text.Body>
          </InteriorPre>
          <Body>
            <TextInput id="multipleCellsText" width="100%" />
          </Body>
        </Shell>
      </Container>
    </>
  );
}
```

### With Multiple Cells And Focus Helper Not Composed

```jsx
{
  const FocusManagedCell = withFocusManagedDivider(Cell, Divider);

  return (
    <FocusManagedCell
      as="label"
      description={'Subtitle'}
      exteriorAccessory={<ChevronLargeRight />}
      interiorAccessory={<Toggle.Control checked={false} />}
      interiorPre={'pre'}
      label={'Cell Title'}
    />
  );
}
```

### Within ACard

```jsx
{
  const CardExamples = (props: CellProps) => (
    <>
      <Card px={4} py={3}>
        <Cell
          {...props}
          description={
            <Text.Body>
              {'Porttitor ipsum nullam justo, lacus, nunc cras. Donec lacus, condimentum eu enim viverra.'}
            </Text.Body>
          }
          exteriorAccessory={<ArrowRight />}
          exteriorPre={
            <Box
              alt="Porttitor ipsum nullam justo"
              as="img"
              size="sizes.400"
              src="https://picsum.photos/400/300"
            />
          }
          label={
            <Text.Subtitle>
              {'Lorem Ipsum'}
            </Text.Subtitle>
          }
        />
      </Card>
      <Card px={4} py={3}>
        <Cell
          {...props}
          description={
            <Text.Body>
              {'Porttitor ipsum nullam justo, lacus, nunc cras. Donec lacus, condimentum eu enim viverra.'}
            </Text.Body>
          }
          exteriorAccessory={
            <Box
              alt="Porttitor ipsum nullam justo"
              as="img"
              borderRadius="circle"
              size="sizes.400"
              src="https://picsum.photos/400/300"
            />
          }
          label={
            <Text.Subtitle>
              {'Lorem Ipsum'}
            </Text.Subtitle>
          }
        />
      </Card>
    </>
  );
  return (
    <>
      <CardExamples />
      <Text.Caption mt={5}>
        {'With space override'}
      </Text.Caption>
      <CardExamples space={4} />
    </>
  );
}
```

### Hyphenation

```jsx
(
  <Cell
    css={{ width: 300 }}
    description={<span>Ab&shy;rech&shy;nungs&shy;ein&shy;stel&shy;lungen</span>}
    exteriorAccessory={
      <span>Ab&shy;rech&shy;nungs&shy;ein&shy;stel&shy;lungen</span>
    }
    interiorAccessory={
      <span>Ab&shy;rech&shy;nungs&shy;ein&shy;stel&shy;lungen</span>
    }
    interiorPre={<span>Ab&shy;rech&shy;nungs&shy;ein&shy;stel&shy;lungen</span>}
    label={<span>Ab&shy;rech&shy;nungs&shy;ein&shy;stel&shy;lungen</span>}
    lang="de"
  />
)
```