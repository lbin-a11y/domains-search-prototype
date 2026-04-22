# Toolbox

A flexible quick action bar for contextual editing.

## Usage

### General guidance

The Toolbox is a flexible container for quick actions that can be used for contextual editing in Squarespace website and email editors. The goal of the Toolbox is to create a more flexible system that can be used for any actions.

---

### Anatomy

1. **Toolbox** — The outer container.
2. **Tool**
   - a. **Action** — A non-boolean state action button; can use an icon or a word.
   - b. **Toggleable** — A boolean state action button; can use an icon or a word.
   - c. **Dropdown** — A type of tool that allows for clearer text options.
   - d. **Label** — Non-interactive text that can be used to label the element being actioned.
   - e. **Divider** — Divider line to separate groups of actions.
3. **Drawer** — A popover that contains the options for applicable actions.

---

### Construction

Toolboxes can be constructed with any combination of actions — or Tools — appropriate to the use case.

#### Tools

##### Action / Toggleable

Action or Toggleable buttons are the most commonly used Tools, generally with an icon. The Toggleable button is used for boolean state actions while the Action button encompasses a wider range of actions. A word label can be used instead if there is no icon clear enough to represent the action. These buttons can be used for three types of actions:

- Booleans, like "bold," that can be turned on or off.
- Selections, like "text alignment," which opens a drawer with options.
- Triggers, like "replace image" or "delete," which open a dialog or other flow.

##### Dropdown

Dropdowns should be used similarly to "selection" action button Tools, allowing users to select between a handful of options. Opt for a dropdown when there aren't icons clear enough to explain the options, and the selected option should be displayed, such as for "text style" or "button variant."

##### Label

Labels can be used to add extra context to the Toolbox, such as for a block type label in a block editor. Labels are not interactive and purposely use a different type style to buttons.

##### Divider

Dividers should be used to separate groups of actions to create hierarchy and improve clarity.

#### Drawer

Drawers can be used in a few different ways to handle different types of controls.

##### Icons

The simplest and most common Drawers contain a series of icon button Tools as options to select.

##### Text

In cases where icons cannot be clearly understood, opt for text options.

##### Custom

Any form control can be put into a drawer, where appropriate.

---

### Layout

#### Orientation

A Toolbox can be horizontal ("row") or vertical ("column") on desktop. On mobile, a Toolbox is always horizontal.

#### Positioning

On desktop, Toolboxes can be anchored to any element. Use spacing appropriate to the scenario, but be sure to rely on Rosetta spacing tokens.

On mobile, a Toolbox is always fixed to the top or bottom of the viewport.

---

### Behavior

#### Mobile

##### Scrolling

The fixed-position Toolbox scrolls horizontally.

#### Drawers

Drawers open in place of the Toolbox.
## Examples


### Default

```jsx
{
  const [isBoldActive, setBoldActive] = useState(false);
  const [isItalicActive, setItalicActive] = useState(false);
  return (
    <Toolbox>
      <Tool.Toggleable
        icon={<Bold />}
        isActive={isBoldActive}
        label="Bold"
        onClick={() => setBoldActive(!isBoldActive)}
      />
      <Tool.Toggleable
        icon={<Italic />}
        isActive={isItalicActive}
        label="Italicize"
        onClick={() => setItalicActive(!isItalicActive)}
      />
    </Toolbox>
  );
}
```

### As Inline

```jsx
{
  const [isBoldActive, setBoldActive] = useState(false);
  const [isItalicActive, setItalicActive] = useState(false);
  const [isUnderlineActive, setUnderlineActive] = useState(false);
return (
    <>
      <Textarea placeholder="The toolbox is inline" rows={2} />
      <Toolbox inline={true}>
        <Tool.Toggleable
          icon={<Bold />}
          isActive={isBoldActive}
          label="Bold"
          onClick={() => setBoldActive(!isBoldActive)}
        />
        <Tool.Toggleable
          icon={<Italic />}
          isActive={isItalicActive}
          label="Italicize"
          onClick={() => setItalicActive(!isItalicActive)}
        />
        <Tool.Toggleable
          icon={<Underline />}
          isActive={isUnderlineActive}
          label={'Underline'}
          onClick={() => setUnderlineActive(!isUnderlineActive)}
        />
        <Tool.Action
          icon={<ClearFormatting />}
          label={'Clear Formatting'}
          onClick={() => console.log('Clear Formatting!')}
        />
      </Toolbox>
      <Textarea placeholder="The toolbox is not inline" rows={2} />
      <Toolbox inline={false}>
        <Tool.Toggleable
          icon={<Bold />}
          isActive={isBoldActive}
          label="Bold"
          onClick={() => setBoldActive(!isBoldActive)}
        />
        <Tool.Toggleable
          icon={<Italic />}
          isActive={isItalicActive}
          label="Italicize"
          onClick={() => setItalicActive(!isItalicActive)}
        />
        <Tool.Toggleable
          icon={<Underline />}
          isActive={isUnderlineActive}
          label={'Underline'}
          onClick={() => setUnderlineActive(!isUnderlineActive)}
        />
        <Tool.Action
          icon={<ClearFormatting />}
          label={'Clear Formatting'}
          onClick={() => console.log('Clear Formatting!')}
        />
      </Toolbox>
    </>
  );
}
```

### Vertical Use

```jsx
{
  const [isBoldActive, setBoldActive] = useState(false);
  const [isItalicActive, setItalicActive] = useState(false);

  return (
    <Toolbox flexDirection="column">
      <Tool.Toggleable
        icon={<Bold />}
        isActive={isBoldActive}
        label="Bold"
        onClick={() => setBoldActive(!isBoldActive)}
      />
      <Tool.Toggleable
        icon={<Italic />}
        isActive={isItalicActive}
        label="Italicize"
        onClick={() => setItalicActive(!isItalicActive)}
      />
    </Toolbox>
  );
}
```

### With A Drawer

```jsx
{
  const [isBoldActive, setBoldActive] = useState(false);
  const [isItalicActive, setItalicActive] = useState(false);
  const [selectedAlignIcon, setAlignIcon] = useState(<TextAlignLeft />);
  const textStyles = [
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'Paragraph 1',
    'Paragraph 2',
  ];
  const [selectedTextStyle, setTextStyle] = useState(textStyles[0]);

  return (
    <Toolbox>
      <Tool.Drawer
        flexDirection="column"
        renderTrigger={(props: ToolDrawerRenderTriggerProps) => (
          <Tool.Drawer.Trigger {...props} label="Text Style">
            <Tool.Dropdown label={selectedTextStyle} />
          </Tool.Drawer.Trigger>
        )}
      >
        {textStyles.map((style: string) => (
          <TextOption
            key={style}
            checked={selectedTextStyle === style}
            onChange={setTextStyle}
            value={style}
          />
        ))}
      </Tool.Drawer>
      <Tool.Toggleable
        icon={<Bold />}
        isActive={isBoldActive}
        label="Bold"
        onClick={() => setBoldActive(!isBoldActive)}
      />
      <Tool.Drawer
        gap="4px"
        renderTrigger={(props: ToolDrawerRenderTriggerProps) => (
          <Tool.Drawer.Trigger {...props} label="Text Alignment">
            {selectedAlignIcon}
          </Tool.Drawer.Trigger>
        )}
      >
        <Tool.Action
          icon={<TextAlignLeft />}
          label="Left align"
          onClick={() => setAlignIcon(<TextAlignLeft />)}
        />
        <Tool.Action
          icon={<TextAlignCenter />}
          label="Center align"
          onClick={() => setAlignIcon(<TextAlignCenter />)}
        />
        <Tool.Action
          icon={<TextAlignRight />}
          label="Right align"
          onClick={() => setAlignIcon(<TextAlignRight />)}
        />
      </Tool.Drawer>
      <Tool.Toggleable
        icon={<Italic />}
        isActive={isItalicActive}
        label="Italicize"
        onClick={() => setItalicActive(!isItalicActive)}
      />
    </Toolbox>
  );
}
```