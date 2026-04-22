# Sheet

Sheet — also known as Sliding Sheet — is an overlay that is unique to mobile. It slides up from the bottom of the screen and appears above all other content.

## Guidance

### General guidance

Sheets are the way Dialogs, Drawers, Dropdowns, and any other PopOvers are displayed on mobile. They enable a consistent experience for the user and allow for an optimized experience for any of these overlay components.

Sheets come in two variants: blocking and non-blocking. Blocking Sheets open with an overlay and block the content underneath (Dialogs, Dropdowns). Non-blocking Sheets allow the user to continue to interact with content underneath (PopOvers).

Sheets can contain several components. Follow content and accessibility guidelines for respective components inside the Sheet: Cards, Cells, Tabs.

### Content

Sheets can contain several CTAs and options for users to act on. Be sure to make the content clear, short, and use verbs for any actions that can be taken.

When Sheets interrupt a task, avoid adding links that go outside the flow that the user is in.

### Accessibility

Blocking Sheets should close when the user presses the Esc key. Non-blocking Sheets should close when the focus is inside the Sheet and the user presses the Esc key.

## Usage

### Anatomy

1. **Container**
2. **Toolbar** — Flexible space that can hold a collapsed title and other actionable Buttons.
3. **Overlay** — Covers and blocks all the content under the sheet; only used in Blocking Sheet.
4. **Handle** — A visual affordance to indicate the Sheet is draggable.

---

### Variants

#### Non-blocking

By default, the Sheet displays on top of all content without an overlay. When open, the user can still interact with the content underneath.

#### Blocking

Sheets can also open with an overlay, blocking the content underneath. The user must interact with or dismiss the Sheet in order to close it and "unblock" the content underneath. Use this option in components like Action Lists and Dropdowns.

---

### Composition

Any component can go inside a Sheet; they are purposely flexible in order to accommodate any use case.

#### Cells

Cells can be composed inside a Sheet.

#### Cards

Cards can be composed inside a Sheet.

#### Tabs

A Sheet can have multiple content sections, split into Tabs. Because the Toolbar and Tabs combined take a large amount of space, consider whether the content sections can be split into multiple Sheets with separate triggers.

#### Dropdowns

- Don't place a Dropdown inside a Sheet, as it will result in one Sheet on top of another.
- Opt for a Disclosure instead of a Dropdown within a Sheet, which will push the user into a panel within the Sheet.

---

### Specs

| Property  | Value                                                              |
| --------- | ------------------------------------------------------------------ |
| Position  | Anchored to the bottom of the screen                               |
| Width     | 100%                                                               |
| Height    | Determined by the height of the inner content, max. 50% on display |
| Elevation | shadows[300]                                                       |
| Margin    | space[2] below the Toolbar                                         |
| Padding   | space[3] left and right, per the Grid                              |

---

### Behavior

#### Display

The Sheet enters from the bottom and is anchored to the edge of the screen. The initial height of the sheet cannot exceed 50% of the viewport height.

There are three possible scenarios for the initial height of the Sheet:

##### Minimal

The Toolbar is the only visible part of the sheet.

##### Flexible

The height of the content within the Sheet sets the height of the sheet.

##### Capped at 50%

The height of the content within the Sheet is more than 50% of the viewport height, but the Sheet caps at 50% and scrolls within.

#### Scrolling

If the content of a Sheet exceeds 50% of the viewport, the user can scroll through content. A Sheet can also be pulled up by the header to the top of the viewport. If scrolling is required, the Sheet's Toolbar remains sticky at the top.

#### Transitions

When a non-blocking Sheet is pulled up to full screen by the Toolbar, the dark overlay fades in, matching the speed of the Sheet transition. The overlay transitions from 0% opacity to 40% opacity. The same in reverse applies when the sheet is pulled down.

#### Dismissal

A sheet can be dismissed in multiple ways:

- Swiping the Sheet down.
- Using a close affordance within the Sheet's Toolbar, such as a "Close" button.
- Tapping the overlay (blocking variant only).
- Tapping an action within the Sheet (blocking variant only).

#### Sheet and the native keyboard

The system keyboard doesn't slide on top of the sheet.

When users select any text in the section, the keyboard slides up first. To edit the styles of that section, users can dismiss the keyboard. After dismissing the keyboard, the Sheet slides up.

If a section is already selected and the user taps on text to edit, the overlay slides down and the keyboard slides up.
## Examples


### Default Usage

```jsx
<Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          renderBody={({ yPosition }) => (
            <>
              <Text.Body>
                {'This is body content'}
              </Text.Body>
              <Text.Body>Y Position: {yPosition}</Text.Body>
            </>
          )}
          renderHeader={({ yPosition }) => (
            <Box borderBottom="solid 1px #EEE" height={50}>
              <Text.Body m="0px">
                {'This is header content.'}
                {Math.round(yPosition)}px
              </Text.Body>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
```

### With Custom Dock Locations

```jsx
<Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          docks={[50, window.innerHeight / 2, window.innerHeight - 80]}
          renderBody={({ yPosition }) => (
            <>
              <Text.Body>
                {'This is body content'}
              </Text.Body>
              <Text.Body>Y Position: {yPosition}</Text.Body>
            </>
          )}
          renderHeader={({ currentDockIndex }) => (
            <Box height={50}>
              <Text.Body gap={1} m="0px">
                {'This is header dock index: '}
                {currentDockIndex}
              </Text.Body>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
```

### With AForced Dock Index

```jsx
<Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          currentDockIndex={1}
          renderBody={({ yPosition }) => (
            <>
              <Text.Body>
                {'This is body content'}
              </Text.Body>
              <Text.Body>Y Position: {yPosition}</Text.Body>
            </>
          )}
          renderHeader={({ yPosition }) => (
            <Box borderBottom="solid 1px #EEE" height={50}>
              <Text.Body m="0px">
                {'This is header content.'}
                {Math.round(yPosition)}px
              </Text.Body>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
```

### Not Draggable

```jsx
<Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          currentDockIndex={1}
          draggable={false}
          renderBody={({ yPosition }) => (
            <>
              <Text.Body>
                {'This is body content'}
              </Text.Body>
              <Text.Body>Y Position: {yPosition}</Text.Body>
            </>
          )}
          renderHeader={({ yPosition }) => (
            <Box borderBottom="solid 1px #EEE" height={50}>
              <Text.Body m="0px">
                {'This is header content.'}
                {Math.round(yPosition)}px
              </Text.Body>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
```

### With Overflow Content

```jsx
{
  const generateRows = (rowCount: number) =>
    [...new Array(rowCount)].map((_, index: number) => (
      <Text.Body key={`row-${index}`}>
        {'Row'} {index}
      </Text.Body>
    ));

  return (
    <Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          docks={[50, window.innerHeight / 2, window.innerHeight - 80]}
          renderBody={() => <>{generateRows(50)}</>}
          renderHeader={({ yPosition }) => (
            <Box borderBottom="solid 1px #EEE" height={50}>
              <Text.Body m="0px">
                {'This is header content.'}
                {Math.round(yPosition)}px
              </Text.Body>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
  );
}
```

### With Less Overflow Content

```jsx
{
  const generateRows = (rowCount: number) =>
    [...new Array(rowCount)].map((_, index: number) => (
      <Text.Body key={`row-${index}`}>
        {'Row'} {index}
      </Text.Body>
    ));

  return (
    <Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          docks={[50, window.innerHeight / 2, window.innerHeight - 80]}
          renderBody={() => <>{generateRows(10)}</>}
          renderHeader={({ yPosition }) => (
            <Box borderBottom="solid 1px #EEE" height={50}>
              <Text.Body m="0px">
                {'This is header content.'}
                {Math.round(yPosition)}px
              </Text.Body>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
  );
}
```

### With Variable Header Height

```jsx
{
  const [headerHeight, setHeaderHeight] = useState<number>(50);
  return (
    <Sheet.Portal>
      <Sheet.Container>
        <Sheet.Drawer
          docks={[
            headerHeight,
            window.innerHeight / 2,
            window.innerHeight - 80,
          ]}
          onHeaderResize={(contentRect) => setHeaderHeight(contentRect.height)}
          renderBody={({ yPosition }) => (
            <>
              <Text.Body>
                {'This is body content'}
              </Text.Body>
              <Text.Body>Y Position: {yPosition}</Text.Body>
            </>
          )}
          renderHeader={({ yPosition }) => (
            <Box borderBottom="solid 1px #EEE" minHeight={50}>
              <Text m="0px">
                
                  This is header content with long labels so will wrap on resize
                  - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vitae congue purus..
                
                {Math.round(yPosition)}px
              </Text>
            </Box>
          )}
        />
      </Sheet.Container>
    </Sheet.Portal>
  );
}
```