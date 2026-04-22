# Accordion

An accordion expands or collapses a grouped list of items.

## Usage

### General guidance

Accordions expand or collapse a grouped list of items.

**Do**

- Use Accordions to collapse a large amount of content when there's limited space.
- Use Accordions to allow users to expand or collapse content that's relevant to them.

**Don't**

- Don't use Accordions when content is important and needs to be displayed for the user.
- Don't use an Accordion for a single labeled section of content.

---

### Anatomy

1. **Chevron Icon** — Arrow direction indicates whether an Accordion is expanded or collapsed.
2. **Label** — Title of the Accordion section that quickly communicates what a user can expect to find if they expand it. Keep labels concise to avoid overflow.
3. **Divider** — Line that separates each Accordion section.
4. **Content**

---

### Deciding between Accordions, Tabs, and Disclosures

Before using Accordions, consider whether it's better to reduce the content, split it among multiple pages, use headers and links to separate the content, or use a different component. Use Accordions when the content is simple, when the user may want to view multiple sections at once, and if there are many sections of content.

#### Disclosures

If individual sections have long form content, use Disclosures instead. When an Accordion is expanded, the Accordion label may move out of view when users scroll down, making it difficult to collapse or navigate to another section. Additionally, Disclosures allow the user to focus on one section at a time.

#### Tabs

Consider using Tabs if the user needs to easily switch sections and for content that has fewer sections, as the Tab labels stay fixed. Tab labels usually stay visible and also require less clicks to navigate compared to Accordions and Disclosures.

---

### Composition

Accordions are designed to be flexible and can contain different types of content, such as Cells, Text, and Images.

- Align content to Accordion labels.
- Don't indent content.
- Don't use Dividers to separate items in an Accordion when it's expanded. Doing so prevents clear definition of sections within the Accordion.

#### Cells

- Avoid placing Cells that have a focus state inside an Accordion. Doing so creates a darker Divider that overlaps with the Accordion's Divider on the last nested Cell.
- Use Cells without a Divider to easily define different Accordion groups.

### Nested Accordions

Nested Accordions should only be used to show a list of items with multiple levels of hierarchy. The child Accordion should be aligned to the parent Accordion's label.

- Place Checkboxes on the right if Accordions are nested to prevent misaligned Checkboxes.

---

### Specs

#### Accordion Cell (collapsed)

| Property                               | Value                                                               |
| -------------------------------------- | ------------------------------------------------------------------- |
| Width                                  | Flexible, aligned to the Grid, usually 100% within parent container |
| Height                                 | sizes.250                                                           |
| Top and bottom padding                 | space[2]                                                            |
| Spacing between Chevron icon and label | space[2]                                                            |
| Margin                                 | 0px                                                                 |

#### Accordion content (expanded)

Since Accordions can contain different components, the top and bottom padding that surrounds the content within the Accordion may be adjusted for context. For example, if Cells are nested within an Accordion, less padding is required because Cells include spacing. The same is true for an Accordion that includes nested Accordions.

Follow the guidelines below as a starting point, but adjust using space Tokens for appropriate padding if needed.

| Property                          | Value                                                               |
| --------------------------------- | ------------------------------------------------------------------- |
| Width                             | Flexible, aligned to the Grid, usually 100% within parent container |
| Height                            | Determined by content                                               |
| Top padding                       | space[2]                                                            |
| Bottom padding                    | space[4] (adjustable)                                               |
| Spacing between label and content | space[4] (adjustable, minimum space[2])                             |
| Spacing left of content           | space[6]                                                            |

#### Accordion label

Regular or medium weight text can be used for the Accordion label. Use medium weight to create more hierarchy within a section, but consider using regular weight to maintain consistency if there are other Cell components that use regular weight on the page.

#### Overflow

While best to avoid, the Accordion label can wrap to two lines if necessary.

#### States

##### Collapsed

The Accordion header is visible with a chevron pointing in the collapsed direction.

##### Expanded

The Accordion header is visible with a chevron pointing in the expanded direction, and the content area is revealed below.

---

### Behavior

#### Tap area

The horizontal space containing the label is tappable for expanding and collapsing an Accordion.

#### Expanding and collapsing

When expanding or collapsing the Accordion, the Chevron icon changes direction to indicate the expanded state, and the Divider moves down or up to reveal and hide the content.

---
## Examples


### Basic Use

```jsx
{
return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header
          data-test="accordion-header-1"
          label={'Accordion label'}
        />
        <Accordion.Body data-test="accordion-body-1">
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header
          data-test="accordion-header-2"
          label={'Accordion label'}
        />
        <Accordion.Body data-test="accordion-body-2">
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
```

### Allow Multiple Items Open

```jsx
{
return (
    <Accordion allowMultipleItemsOpen>
      <Accordion.Item>
        <Accordion.Header
          data-test="accordion-header-1"
          label={'Accordion label 1'}
        />

        <Accordion.Body data-test="accordion-body-1">
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header
          data-test="accordion-header-2"
          label={'Accordion label 2'}
        />

        <Accordion.Body data-test="accordion-body-2">
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header
          data-test="accordion-header-3"
          label={'Accordion label 3'}
        />

        <Accordion.Body data-test="accordion-body-3">
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
```

### With Nested Cells As Items

```jsx
{
  const [v1, setV1] = React.useState(false);
  const [v2, setV2] = React.useState(false);
  const [v3, setV3] = React.useState(false);
  const [v4, setV4] = React.useState(false);
return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header
          data-test="accordion-header-1"
          label={'Accordion label'}
        />

        <Accordion.Body data-test="accordion-body-1">
          <Cell
            interiorAccessory={
              <Checkbox checked={v1} id="check1" onChange={setV1} />
            }
            label={
              <Text.Body as="label" htmlFor="check1">
                {'Cell 1 Title'}
              </Text.Body>
            }
          />
          <Cell
            interiorAccessory={
              <Checkbox checked={v2} id="check2" onChange={setV2} />
            }
            label={
              <Text.Body as="label" htmlFor="check2">
                {'Cell 2 Title'}
              </Text.Body>
            }
          />
          <Cell
            interiorAccessory={
              <Checkbox checked={v3} id="check3" onChange={setV3} />
            }
            label={
              <Text.Body as="label" htmlFor="check3">
                {'Cell 3 Title'}
              </Text.Body>
            }
          />
          <Cell
            interiorAccessory={
              <Checkbox checked={v4} id="check4" onChange={setV4} />
            }
            label={
              <Text.Body as="label" htmlFor="check4">
                {'Cell 4 Title'}
              </Text.Body>
            }
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
```

### With A Checkbox

```jsx
{
  const [value, setValue] = React.useState(false);
return (
    <Accordion>
      <Accordion.Item>
        <Flex alignItems="center">
          <Accordion.Header
            data-test="accordion-header-1"
            label={'Accordion label'}
          />
          <Checkbox
            aria-label="Activate"
            checked={value}
            data-test="accordion-checkbox-1"
            ml={3}
            onChange={setValue}
            touchable
            value="accordion-checkbox-1"
          />
        </Flex>
        <Accordion.Body data-test="accordion-body-1">
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
```

### With A Large Chevron Icon In The Header

```jsx
{
return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header
          // The \`exteriorAccessory\` prop specifies the position of the chevron.
          exteriorAccessory={
            <Accordion.Chevron>
              <ChevronLargeRight />
            </Accordion.Chevron>
          }
          interiorAccessory={<Text>0/2</Text>}
          interiorPre={<Box bg="gray.900" size="sizes.150" />}
          label={'Header with the chevron on the right'}
        />

        <Accordion.Body>
          <Text mb={2} mt={2}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </Text>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
```