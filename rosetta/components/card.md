# Card

A container that includes concise content, with a flexible design. Cards often provide a preview to linked information and allow users to browse a collection of related content and actions.

## Guidance

### General guidance

Cards are used to group sets of information. Their use and design is very flexible, and can be used in a number of different ways including educational, support, and promotional purposes.

### Content

The content in a Card can be used to help educate users, direct users to relevant resources, or prompt users to complete a task. If the information in a Card isn't critical, allow the user to dismiss the Card.

The text in a Card title will wrap if the text overflows. Keep titles concise, and check the copy in supported languages and viewport sizes. If there is more than one Card on a given page, organize them in a logical manner (e.g., highest to lowest, alphabetical/numerical order) to reduce cognitive load. Follow guidelines for all components (Text, Button, Image, Divider, Radio, etc.) included in the Card.

### Accessibility

When Cards contain several components or are grouped together:

- Ensure all semantic elements are present.
- Ensure all heading levels are correct.
- Ensure the Images and Icons have alt text and are accurately represented.

#### Card focus

Whenever possible, explicitly specify the focus order for elements inside the Card. Sometimes focus may need to move to a non-interactive element to guide a user's attention or to ensure that focus is not lost.

#### Card navigation

Keyboard users should make as few Tab presses as possible to get to any interactive element.

## Usage

### Composition

Rather than predefining designs for a Card, Rosetta Cards are flexible in that they can include any combination of the components below, and in any order.

#### Text

##### Card title

The most important copy in the Card; should be short and concise. Not every Card needs to have a title, some may have just body or caption copy.

| Property     | Value                 |
| ------------ | --------------------- |
| Margin       | space[1] bottom       |
| Text variant | `subtitle` or `body`  |
| Font weight  | fontWeights[semibold] |

##### Card body

The main copy in the Card.

| Property     | Value           |
| ------------ | --------------- |
| Margin       | space[1] bottom |
| Text variant | `body`          |

##### Caption

Additional copy that's more discreet.

| Property     | Value           |
| ------------ | --------------- |
| Color        | gray.300        |
| Margin       | space[1] bottom |
| Text variant | `body`          |

#### Button

Cards can include one or two Buttons. Each Button can be any variant and size, though if space allows, opt for medium or large buttons for a larger tap zone. Buttons can be aligned horizontally or be full-width and stack vertically.

#### Image

A Card can have one image in it. The image container should sit edge-to-edge in the card, whether the card is horizontal or vertical. The container can be any height (in a vertical Card) or width (in a horizontal Card).

The image inside the container can either cover or be contained in the space, but it should always be centered.

#### Icon

Any icon from the Rosetta Icons library.

#### Action List

Triggered by an Ellipsis Icon, a Card can include an ActionList for multiple user actions.

#### Divider

A line. It divides things.

#### Close control

If the Card is dismissible, it should have a Cross Large Icon in the top-right corner that the user can click/tap to dismiss the Card. This Icon should generally be placed inline with a subtitle, and putting it on top of an image should be avoided.

#### Checkbox

If the Card is being used in a group as a multi-select list, including a Checkbox can help improve clarity that the Card is selectable.

#### Radio

If the Card is being used in a group as a single-select list, including a Radio button can help improve clarity that the Card is selectable.

---

### Variants

#### Dismissible

If the information in a Card isn't critical, allow the user to dismiss the Card.

#### Style

Cards can either be default or quiet style.

##### Default

Default style Cards have a border of gray.100, and generally have horizontal padding of space[4] and vertical padding of space[3].

##### Quiet

Quiet style is defined by having no border and smaller padding in the text container, and is reserved for very simple Cards with little content. Quiet cards should always have an image.

---

### Behavior

#### Interaction

Cards should generally have some form of interaction such as viewing, editing, purchasing, etc. Some actions are exposed in Buttons, and others by simply clicking the Card.

If a Card only has the ability to be opened or viewed in more detail, do not include a Button. Clicking anywhere on the Card should perform that action.

If a Card has more than one action, or the action is more specific than "open" or "view" — such as "edit" — include a Button.

Groups of cards can also act like checkboxes (multi-select) or radio buttons (single-select). In this case, there should be no Buttons or other interactive elements in the Card.

#### Text overflow

Copy inside cards wraps, so avoid having long titles. Also be sure to check the copy in every supported language.

---

### Specs

#### Padding

Because Cards are so flexible and can be used in so many different scenarios, it's hard to have a definitive answer for internal spacing. Using the space tokens, adjust the design to what feels right in the context.

##### Standard

Maintain padding of space[5] space[6] in the text container.

##### Compact

Maintain padding of space[3] space[4] in the text container.

---

### Layout

See layout guidelines for using Cards with other components on the Grid.

#### Card content

Cards can either have a vertical or horizontal layout. In either case, Card widths are fluid.

##### Horizontal

Cards with a horizontal layout place content side by side.

##### Vertical

Cards with a vertical layout stack content top to bottom.

#### Groups of Cards

##### Tiled

The default option. Cards can be stacked in a single column, or wrapped.

##### Horizontal masonry

Horizontal masonry grids can vary in width. Rows of cards may vary in height, but the cards within a row are consistent in height. It is preferred to use the quiet style Cards in a horizontal masonry grid.

##### Vertical masonry

Vertical masonry grids can vary in height but have a consistent width.
## Examples


### Basic Use

```jsx
{
  const shipStation = 'Squarespace has partnered with ShipStation to save you time shipping your orders. You can print shipping labels for all major carriers in batch and automatically send shipment notifications to your customers with tracking numbers. ShipStation is a subscription service with plans starting at $9 per month.';

  return (
    <Card width="sizes.700">
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body>
        <Stack space={1}>
          <Text.Subtitle>
            {'Connect to ShipStation'}
          </Text.Subtitle>
          <Text.Body>{shipStation}</Text.Body>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### As AButton

```jsx
{
  const shipStation = 'Squarespace has partnered with ShipStation to save you time shipping your orders. You can print shipping labels for all major carriers in batch and automatically send shipment notifications to your customers with tracking numbers. ShipStation is a subscription service with plans starting at $9 per month.';

  return (
    <Card as={Touchable.Element.Solid} width="sizes.700">
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body>
        <Stack space={1}>
          <Text.Subtitle>
            {'Connect to ShipStation'}
          </Text.Subtitle>
          <Text.Body>{shipStation}</Text.Body>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### As ALink

```jsx
{
  const shipStation = 'Squarespace has partnered with ShipStation to save you time shipping your orders. You can print shipping labels for all major carriers in batch and automatically send shipment notifications to your customers with tracking numbers. ShipStation is a subscription service with plans starting at $9 per month.';

  return (
    <Card
      as={(props) => (
        <Touchable.Element.Solid as="a" {...props} href="http://example.com" />
      )}
      width="sizes.700"
    >
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body>
        <Stack space={1}>
          <Text.Subtitle>
            {'Connect to ShipStation'}
          </Text.Subtitle>
          <Text.Body>{shipStation}</Text.Body>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### Quiet Use

```jsx
{
  const shipStation = 'Squarespace has partnered with ShipStation to save you time shipping your orders. You can print shipping labels for all major carriers in batch and automatically send shipment notifications to your customers with tracking numbers. ShipStation is a subscription service with plans starting at $9 per month.';

  return (
    <Card variant="quiet" width="sizes.700">
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body variant="quiet">
        <Stack space={1}>
          <Text.Subtitle>
            {'Connect to ShipStation'}
          </Text.Subtitle>
          <Text.Body>{shipStation}</Text.Body>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### With Call To Action

```jsx
{
  const lorem = 'Porttitor ipsum nullam justo, lacus, nunc cras. Donec lacus, condimentum eu enim viverra.';

  return (
    <Card width="sizes.700">
      <Card.Body sx={{ pb: 1 }}>
        <Stack space={1}>
          <Text.Subtitle>
            {'Lorem Ipsum'}
          </Text.Subtitle>
          <Text.Body>{lorem}</Text.Body>
          <Button.Tertiary>
            {'Button'}
          </Button.Tertiary>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### With Image And Call To Action

```jsx
{
  const lorem = 'Porttitor ipsum nullam justo, lacus, nunc cras. Donec lacus, condimentum eu enim viverra.';

  return (
    <Card width="sizes.700">
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body>
        <Stack space={3}>
          <Text.Subtitle>
            {'Lorem Ipsum'}
          </Text.Subtitle>
          <Text.Body>{lorem}</Text.Body>
          <Button.Primary size={2} width="100%">
            {'Button'}
          </Button.Primary>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### With Image And Double Call To Action

```jsx
{
  const lorem = 'Porttitor ipsum nullam justo, lacus, nunc cras. Donec lacus, condimentum eu enim viverra.';

  return (
    <Card width="sizes.700">
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body pb={4}>
        <Stack space={1}>
          <Text.Subtitle>
            {'Lorem Ipsum'}
          </Text.Subtitle>
          <Text.Body>{lorem}</Text.Body>
          <Stack direction="row" justifyContent="flex-end" space={3}>
            <Button.Tertiary size={2} width="100%">
              {'Button'}
            </Button.Tertiary>
            <Button.Primary size={2} width="100%">
              {'Button'}
            </Button.Primary>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### With Typographic Hierarchy

```jsx
{
  const lorem = 'Porttitor ipsum nullam justo, lacus, nunc cras. Donec lacus, condimentum eu enim viverra.';

  return (
    <Card width="sizes.700">
      <Card.Body>
        <Stack space={1}>
          <Text.Subtitle>
            {'Lorem Ipsum'}
          </Text.Subtitle>
          <Text.Body>{lorem}</Text.Body>
          <Text.Caption>
            {'Morbi tempus blandit feugiat eu, diam tempor tincidunt eget.'}
          </Text.Caption>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### Selectable Use

```jsx
{
  const [isActive, setIsActive] = React.useState(false);
  const shipStation = 'Squarespace has partnered with ShipStation to save you time shipping your orders. You can print shipping labels for all major carriers in batch and automatically send shipment notifications to your customers with tracking numbers. ShipStation is a subscription service with plans starting at $9 per month.';

  return (
    <Card
      isActive={isActive}
      isSelectable
      onChange={(_, e) => {
        setIsActive(!isActive);
        console.log('The card is active:', e.target.checked);
      }}
      width="sizes.700"
    >
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body>
        <Stack space={1}>
          <Text.Subtitle>
            {'Connect to ShipStation'}
          </Text.Subtitle>
          <Text.Body>{shipStation}</Text.Body>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### Quiet Selectable Use

```jsx
{
  const [isActive, setIsActive] = React.useState(false);
  const shipStation = 'Squarespace has partnered with ShipStation to save you time shipping your orders. You can print shipping labels for all major carriers in batch and automatically send shipment notifications to your customers with tracking numbers. ShipStation is a subscription service with plans starting at $9 per month.';

  return (
    <Card
      isActive={isActive}
      isSelectable
      onChange={setIsActive}
      variant="quiet"
      width="sizes.700"
    >
      <img alt="A cup of coffee" height={200} width={340} src="https://picsum.photos/340/200" />
      <Card.Body>
        <Stack space={1}>
          <Text.Subtitle>
            {'Connect to ShipStation'}
          </Text.Subtitle>
          <Text.Body>{shipStation}</Text.Body>
        </Stack>
      </Card.Body>
    </Card>
  );
}
```

### With ATitle And Description

```jsx
<Card isHoverable px={4} py={3} width="100%">
      <Text.Subtitle>
        {'Card title'}
      </Text.Subtitle>
      <Text.Body color="gray.300">
        {'Card description'}
      </Text.Body>
    </Card>
```