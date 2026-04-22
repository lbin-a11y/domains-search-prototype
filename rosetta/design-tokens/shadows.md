# Shadow design tokens

## Tokens

| Level          | Blur | Use Cases         | Components                 |
| -------------- | ---- | ----------------- | -------------------------- |
| `shadows[100]` | 8px  | Lowest elevation  | Section Card, Site preview |
| `shadows[200]` | 16px | Low elevation     | Dropdown, Action List      |
| `shadows[300]` | 24px | Medium elevation  | RTE, Sheet                 |
| `shadows[400]` | 32px | High elevation    | Toast, Tooltip             |
| `shadows[500]` | 64px | Highest elevation | Dialog, Drawer             |

## Usage

IMPORTANT: Avoid elevation if it's not necessary. Elevation should really only be used for overlays or dialogs, not components that sit flush on any surface.

### Shadow 500 (Highest)

**Use for:** Elements at the top of the stacking order that require maximum visual separation.

```tsx
<Dialog boxShadow="500">Dialog content</Dialog>
```

**Components:** Dialog, Drawer

### Shadow 400

**Use for:** Temporary overlays and notifications that appear above most content.

```tsx
<Toast boxShadow="400">Notification</Toast>
<Tooltip boxShadow="400">Tooltip text</Tooltip>
```

**Components:** Toast, Tooltip

### Shadow 300

**Use for:** Panels and sheets that float above the main content.

```tsx
<Sheet boxShadow="300">Sheet content</Sheet>
```

**Components:** RTE, Sheet

### Shadow 200

**Use for:** Dropdowns and menus that appear over content.

```tsx
<Dropdown boxShadow="200">Menu items</Dropdown>
<ActionList boxShadow="200">Actions</ActionList>
```

**Components:** Dropdown, Action List

### Shadow 100 (Lowest)

IMPORTANT: Do not use this unless explicitly asked. Rosetta tries to avoid using shadows whenever possible.

**Use for:** Cards and containers with subtle elevation.

```tsx
<Card boxShadow="100">Card content</Card>
```

**Components:** Section Card, Site preview

## Theme Variations

Shadows automatically adapt to the current theme:

### Light Theme

- Uses subtle black shadows with low opacity (12%)
- Includes a hairline border for definition

```css
/* Example: shadows[200] in light theme */
box-shadow: 
  0px 4px 16px 0px rgba(0, 0, 0, 0.12),
  0px 0px 1px 0px rgba(0, 0, 0, 0.08);
```

### Dark Theme

- Uses stronger black shadows with high opacity (88%)
- Includes an inset white border for separation from dark backgrounds

```css
/* Example: shadows[200] in dark theme */
box-shadow: 
  0px 4px 16px 0px rgba(0, 0, 0, 0.88),
  inset 0px 0px 0px 1px rgba(255, 255, 255, 0.05);
```

## CSS Custom Properties

CSS custom properties are not aware of React ThemeContext and will not change when the theme changes at runtime — prefer styled-system props on Rosetta primitives when possible.

```css
.my-element {
  box-shadow: var(--shadows-100);
  box-shadow: var(--shadows-200);
  box-shadow: var(--shadows-300);
  box-shadow: var(--shadows-400);
  box-shadow: var(--shadows-500);
}
```

## Platform Support

**Web:** Full support with CSS box-shadow

**React Native:** Limited support; use platform-specific shadow properties