# Chip

Chips are a button-like affordance that can be used to display or manage status or other information associated with a piece of content.

## Usage

Chips have several uses in Rosetta. They can be used interactively to make selections or manage tags, or used as non-interactive badges.

### Anatomy

1. **Container**
2. **Label** — Use concise nouns or status labels.
3. **Leading Glyph** — Conveys contextual meaning — not functionality — of the chip, appearing before the Label.
4. **Accessory Glyph** — Conveys contextual meaning — not functionality — of the chip, appearing after the Label.
5. **Chevron Button** — Indicates the Chip controls a PopOver, appearing in the accessory slot.
6. **Close Button** — Indicates the Chip is dismissible, appearing in the accessory slot.

---

### Variants

#### Info Chips

Info Chips add, display, or remove information about the UI element they are attached to. For example, Info Chips can be used to add and remove tags from a project card or display filters currently applied to a table. They can be a static display or interactive.

| Can trigger dropdown | Can be dismissible | Can use Glyph | Can be themed |
| -------------------- | ------------------ | ------------- | ------------- |
| No                   | Yes                | Yes           | Yes           |

#### Compact Info Chips

Info Chips are also available in a smaller, Compact size (formerly known as Badge). Compact Info Chips are not interactive. However, if they are wrapped in a touchable element like a card or table cell, their styling should reflect the container element's state. For example, if a touchable card is hovered, the Badge should transition to Chip hover styling.

| Can trigger dropdown | Can be dismissible | Can use Glyph | Can be themed |
| -------------------- | ------------------ | ------------- | ------------- |
| No                   | No                 | Yes           | Yes           |

#### Choice Chips

Choice Chips represent a selection the user can or has made. They are always interactive and are stateful, showing whether the selection is active or not. Choice Chips can function as single or multiple select choices, or they can trigger a popover to enable a multiple choice selection.

| Can trigger dropdown | Can be dismissible | Can use Glyph | Can be themed |
| -------------------- | ------------------ | ------------- | ------------- |
| Yes                  | No                 | No            | No            |

- Use Choice Chips when a moderate amount of options need to be presented in a row.
- Don't use Choice Chips to hide and display content when tabs would be more appropriate.

---

### Status theming

Chips can be themed using color and Glyphs to:

- Display success, warning, and error messages.
- Communicate status.
- Color code information.

Themes should not be used to provide visual emphasis to Chips not performing these functions.

#### Default themes

| Status  | Color  | Usage                                                                             | Recommended Glyph         |
| ------- | ------ | --------------------------------------------------------------------------------- | ------------------------- |
| Default | Gray   | Neutral or default information and selections                                     | None, Chevron Down, Cross |
| Accent  | Blue   | To differentiate Chips conveying special information from Default Chips           | Info Circle               |
| Success | Green  | Success, completion of a desired outcome                                          | Checkmark Circle          |
| Warning | Yellow | Caution about potential or non-blocking issues, such as an approaching expiration | Exclamation Point Circle  |
| Danger  | Red    | An error or blocking issue, like payment failure                                  | Cross, Octagon            |

#### Changing status

By default, display statuses in static Info Chips (standard or compact sizing). However, if a user can change the status of an item, use an interactive Info Chip to trigger a popover, not a Choice Chip.

- Use Info Chips over Choice Chips when the action is changing the status displayed by the Chip.
- Don't make Chips that communicate status dismissible.

---

### Behavior

#### Overflow

When a set of Chips exceed their container's width, you can enable overflow on the container. Allow Chips to overflow when they are secondary to a UI's main content (for example, filters applied to a table).

#### Wrapping

Chips can stack when they exceed their container's width. When stacked, the tappable clear space built into interactive chips creates a 16px visual margin. Additional margins between rows of interactive Chips are not necessary. When stacking non-interactive Chips, add 16px between rows of Info Chips and 6px between rows of Badges.

#### Truncation

By avoiding long Chip labels, you can avoid needing to truncate Chip text. However, for very long labels — like displaying an applied filter with several selections — you may need to set a max character length. If truncating chip text, use trailing ellipses, keep any icons visible, and display the full chip value in a tooltip on hover or focus.

- Use stacking when Chips represent the primary focus of the UI (for example, the list of applied tags in a tag management dialog).
- If truncation is unavoidable, display the full label value in a tooltip upon hover or focus.
- Make sure that the Chip has enough horizontal space, wrapping to the next line if necessary.
- Don't allow Chips to truncate or wrap within their container if possible.

---

## Guidance

### Content

The content inside a Chip should be as brief and direct as possible.

**Do**

- Use a concise and direct noun.
- Wrap longer content to the next line instead of truncating it if needed.

**Don't**

- Phrase the Chip as a question.
- Rely on long, descriptive phrases.

- Use direct noun labels to refer to a category or data set.
- Don't create descriptive labels that are difficult to scan in a sequence.

### Accessibility

#### Tap target

Default Chips have a tap target of at least 44×44px on mobile devices, requiring a horizontal margin of 11px and vertical margin of 16px so they do not overlap.

#### Focus indicators

Focus order should move from left to right. Dismissible chips that are focused can be removed with keyboard backspace.

#### Screen readers

Make sure that Chip labels are sufficient for screen reader users to understand the meaning of the Chip.

When Chips are dismissible, the screen reader should announce the Chip text first, then the "Remove" button.

Announce choice Chips like the input element they behave like: checkbox, radio, or dropdown.

Hide Glyphs that are redundant to the Chip label from screen readers. Only provide alt text for Glyphs used in Chips when they provide information on top of the text.

#### Color Theming

Chips support semantic color theming, but using color alone to convey information can make that information inaccessible to color blind and low vision users. Always pair color-coded information with text, icon, or other affordances at an accessible contrast level.
## Examples


### Default

```jsx
<Stack space={2}>
      <Chip label={'chip'} mr={1} />
      <Chip.Container>
        <Chip.Label>
          {'composed chip'}
        </Chip.Label>
      </Chip.Container>
      <Chip
        label={'badge'}
        usage="badge"
      />
    </Stack>
```

### Selectable

```jsx
{
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const selected = 'selected';
  const deselected = 'deselected';

  return (
    <Chip
      isSelected={isSelected}
      label={isSelected ? selected : deselected}
      onClick={() => {
        setIsSelected((s) => !s);
      }}
    />
  );
}
```

### All Statuses And Styles

```jsx
{
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useEffect(() => {
    if (!isOpen) {
      const reopenTimeout = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => {
        clearTimeout(reopenTimeout);
      };
    }
  }, [isOpen]);

  return (
    <Stack space={2} width="max-content">
      {(['default', 'info', 'success', 'warning', 'error'] as const).map(
        (status) => (
          <Flex key={status} alignItems="flex-start" gap={2}>
            <Chip
              label={'{status}'}
              status={status}
            />
            <Chip
              glyph={<InfoCircle />}
              label={'with glyph'}
              status={status}
            />
            <Chip
              accessory={isActive ? <Chip.ChevronUp /> : <Chip.ChevronDown />}
              label={'with chevron'}
              onClick={() => setIsActive(!isActive)}
              status={status}
            />
            {isOpen && (
              <Chip
                accessory={
                  <Chip.CloseButton
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                }
                label={'dismissable'}
                status={status}
              />
            )}
            <Chip
              accessory={<Chip.ChevronDown />}
              isSelected
              label={'selected'}
              onClick={() => {}}
              status={status}
            />
            <Chip
              accessory={<Chip.CloseButton isDisabled onClick={() => {}} />}
              isDisabled
              label={'disabled'}
              status={status}
            />
          </Flex>
        )
      )}
    </Stack>
  );
}
```

### Filter

```jsx
{
  const [isActive1, toggleIsActive1] = useState<boolean>(false);
  const [isActive2, toggleIsActive2] = useState<boolean>(false);
  const [isActive3, toggleIsActive3] = useState<boolean>(false);
  const [isActive4, toggleIsActive4] = useState<boolean>(false);
  return (
    <Stack space={2}>
      <Chip
        accessory={isActive1 ? <Chip.ChevronUp /> : <Chip.ChevronDown />}
        label={'filter'}
        onClick={() => toggleIsActive1(!isActive1)}
      />
      <Chip.Container onClick={() => toggleIsActive2(!isActive2)} pr={1}>
        <Chip.Label>
          {'composed filter'}
        </Chip.Label>
        {isActive2 ? <Chip.ChevronUp /> : <Chip.ChevronDown />}
      </Chip.Container>
      <Chip
        accessory={isActive3 ? <Chip.ChevronUp /> : <Chip.ChevronDown />}
        isSelected
        label={'applied filter · 3'}
        onClick={() => toggleIsActive3(!isActive3)}
      />
      <Chip.Container
        isSelected
        onClick={() => toggleIsActive4(!isActive4)}
        pr={1}
      >
        <Chip.Label>
          {'composed applied filter · 3'}
        </Chip.Label>
        {isActive4 ? <Chip.ChevronUp /> : <Chip.ChevronDown />}
      </Chip.Container>
    </Stack>
  );
}
```

### Dismissable

```jsx
{
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  useEffect(() => {
    if (!isOpen1) {
      const reopenTimeout = setTimeout(() => {
        setIsOpen1(true);
      }, 3000);

      return () => {
        clearTimeout(reopenTimeout);
      };
    } else if (!isOpen2) {
      const reopenTimeout = setTimeout(() => {
        setIsOpen2(true);
      }, 3000);

      return () => {
        clearTimeout(reopenTimeout);
      };
    }
  }, [isOpen1, isOpen2]);

  return (
    <Stack space={2}>
      {isOpen1 && (
        <Chip
          accessory={
            <Chip.CloseButton
              onClick={() => {
                setIsOpen1(false);
              }}
            />
          }
          label={'dismissable 1'}
        />
      )}
      {isOpen2 && (
        <Chip.Container pr={1}>
          <Chip.Label>
            {'dismissable 2'}
          </Chip.Label>
          <Chip.CloseButton
            onClick={() => {
              setIsOpen2(false);
            }}
          />
        </Chip.Container>
      )}
    </Stack>
  );
}
```

### Disabled

```jsx
<Stack space={2}>
      <Chip
        glyph={<InfoCircle isDisabled />}
        isDisabled
        label={'disabled with glyph'}
        onClick={() => {}}
      />
      <Chip
        accessory={<Chip.ChevronDown isDisabled />}
        isDisabled
        label={'disabled with chevron'}
        onClick={() => {}}
      />
      <Chip
        accessory={<Chip.CloseButton isDisabled onClick={() => {}} />}
        isDisabled
        label={'disabled with close button'}
        onClose={() => {}}
      />
      <Chip.Container isDisabled onClick={() => {}} pr={1}>
        <Chip.Label>
          {'composed disabled with chevron'}
        </Chip.Label>
        <Chip.ChevronDown isDisabled />
      </Chip.Container>
      <Chip.Container isDisabled pr={1}>
        <Chip.Label>
          {'composed disabled with close button'}
        </Chip.Label>
        <Chip.CloseButton isDisabled onClick={() => {}} />
      </Chip.Container>
    </Stack>
```

### With Overflow Text

```jsx
<Chip
      accessory={<Chip.ChevronDown />}
      label={'Way too much text. '.repeat(40)}
    />
```

### With Glyph

```jsx
<Stack space={2}>
      <Chip
        glyph={<InfoCircle />}
        label={'default'}
      />
      <Chip.Container>
        <Chip.Glyph>
          <InfoCircle aria-label="info" />
        </Chip.Glyph>
        <Chip.Label>
          {'composed chip w/ glyph'}
        </Chip.Label>
      </Chip.Container>
      <Chip
        glyph={<InfoCircle />}
        label={'badge w/ glyph'}
        usage="badge"
      />
      <Chip
        glyph={
          <InfoCircle
            aria-label="custom"
            sx={{ color: 'pink.500', marginLeft: 3 }}
          />
        }
        label={'with custom styling'}
      />
    </Stack>
```