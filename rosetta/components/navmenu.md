# Nav Menu

Menu used for sub-section navigation inside panels (e.g. settings, page configuration). **Not** for the global app navigation sidebar (Home, Website, Commerce, etc.) -- that is composed from Rosetta layout primitives (`Flex`, `Box`, `Touchable`).

## Usage

### General guidance

NavMenus are the primary form of navigation in most Squarespace products and are generally displayed in a Panel. Items within the Nav Menu's panel behave in two different ways:

- Pushes a new panel with items; leads the user to sub-sections of a product.
- Refreshes workspace; items in Panel remain unchanged.

If a panel is the last Panel in a navigation, NavMenu also provides a title and a description for additional context.

---

### Anatomy

1. **Nav item** — Menu items that lead the user further into app navigation; a panel pushes when item is clicked or the workspace is refreshed.
2. **Indicator** — Indicates selected nav item.
3. **Accessory** — Optional text to describe a nav item (e.g., "New").
4. **Panel title** — Main title for the panel.
5. **Panel description** — Short description of the product or feature.
6. **Label** — Label for a nav group.
7. **Nav group** — Group of navigation items that belong together.

---

### Variants

#### Root menu

This is the main menu in /config to lead customers into the core sections of the Squarespace product.

In /config, the root menu sits below the Squarespace logo and above the user's information.

#### Nested menu

Nested menus are used for navigation through each core Squarespace product. Items within a nested menu behave in two different ways:

- Pushes a new panel with items; leads the user to sub-sections of the product.
- Refreshes the user's workspace; items in panel remain unchanged (e.g., Analytics).

Nested menus should always be paired with a Toolbar containing a Back Button that navigates to the previous panel. The label of the Back Button should be the title of the parent panel.

#### Panel template

NavMenu also provides a title and a description for panels with inputs. Any controls can be used within the panel.

Panel templates should always be paired with a Toolbar containing a Back Button that navigates to the previous panel. The label of the Back Button should be the title of the parent panel.

#### NavDialog

The NavDialog utilizes the NavMenu in a Dialog. It is commonly used for settings, such as page settings or link settings.

---

### Specs

#### Mobile

| Nested component  | Property | Value                                                     |
| ----------------- | -------- | --------------------------------------------------------- |
| Panel             | Padding  | space[2] left and right (per Grid)                        |
| Toolbar           | Height   | sizes.300                                                 |
|                   | Margin   | space[2] bottom                                           |
| Panel title       | Padding  | space[1] top and bottom                                   |
|                   | Margin   | space[4] bottom, if no panel description                  |
| Panel description | Padding  | space[1] top                                              |
|                   | Margin   | space[2] bottom                                           |
| Nav item          | Padding  | space[1] top and bottom                                   |
|                   | Margin   | 0px                                                       |
| Nav group         | Padding  | 0px                                                       |
|                   | Margin   | space[4] bottom                                           |
| Label             | Padding  | space[2] top                                              |
|                   | Margin   | space[2] bottom                                           |

#### Desktop

| Nested component  | Property | Value                                                                              |
| ----------------- | -------- | ---------------------------------------------------------------------------------- |
| Panel             | Padding  | space[6] left and right (per Grid)                                                 |
|                   | Width    | Default: sizes.700 / NavDialog: 36% of Dialog width                               |
| Toolbar           | Height   | Default: sizes.450 / NavDialog: sizes.400                                          |
|                   | Margin   | 0px                                                                                |
| Panel title       | Padding  | space[1] top and bottom                                                            |
|                   | Margin   | space[4] bottom, if no panel description                                           |
| Panel description | Padding  | space[1] top and bottom                                                            |
|                   | Margin   | space[2] bottom                                                                    |
| Nav item          | Padding  | space[1] top and bottom                                                            |
|                   | Margin   | 0px                                                                                |
| Nav group         | Padding  | 0px                                                                                |
|                   | Margin   | space[4] bottom                                                                    |
| Label             | Padding  | space[2] top                                                                       |
|                   | Margin   | space[2] bottom                                                                    |
## Examples


### Text Overflow

```jsx
(
  <NavMenu style={{ backgroundColor: '#f3dbdb' }}>
    <NavItem>
      <NavText
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Label
      </NavText>
    </NavItem>
    <NavItem data-test="my test">
      <NavText
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Label
      </NavText>
      <NavItemAccessory
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Accessory
      </NavItemAccessory>
    </NavItem>
    <NavItem>
      <NavText
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Customer Accounts
      </NavText>
      <NavItemAccessory
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        New
      </NavItemAccessory>
    </NavItem>
    <NavItem>
      <NavText
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Search Engine Optimization
      </NavText>
      <NavItemAccessory
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Accessory
      </NavItemAccessory>
    </NavItem>
    <NavItem>
      <NavText
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Label
      </NavText>
      <NavItemAccessory
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Donec nulla non moo mo mu
      </NavItemAccessory>
    </NavItem>
    <NavItem>
      <NavText
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Search Engine Optimization
      </NavText>
      <NavItemAccessory
        style={{
          backgroundColor: '#f6f6f6',
        }}
        variant="title"
      >
        Egestras tres los quatros cinco ses
      </NavItemAccessory>
    </NavItem>
  </NavMenu>
)
```

### Multiple Accessories

```jsx
(
  <NavMenu>
    <NavItem>
      <NavText variant="title">Title Text</NavText>
      <NavItemAccessory variant="title">A</NavItemAccessory>
      <NavItemAccessory variant="subtitle">B</NavItemAccessory>
      <NavItemAccessory variant="label">C</NavItemAccessory>
      <NavItemAccessory variant="subtitle">D</NavItemAccessory>
      <NavItemAccessory variant="title">E</NavItemAccessory>
    </NavItem>
  </NavMenu>
)
```

### With Selected States

```jsx
(
  <NavMenu value="a">
    <NavItem value="a">Item A</NavItem>
    <NavItem value="b">Item B</NavItem>
    <NavGroup name="Works with groups, too">
      <NavItem value="c">Item C</NavItem>
      <NavItem value="d">Item D</NavItem>
    </NavGroup>
  </NavMenu>
)
```