# Color design tokens

## General usage

To alter the style of a Rosetta component, use theme variables instead of Rosetta Tokens. This is because Rosetta components **do not** use Rosetta Tokens directly, they always resolve styles from a Theme.

Use semantic tokens whenever possible.

Rosetta is based on a primarily monochromatic color system. Whenever possible, use the gray scale.

Use other colors sparingly and only for semantic use cases (e.g. using `danger` for specific error states or `success` for confirmation messages.)

Usage may look like:

```jsx
<Flex bg={bg.default} />
```

## Semantic token naming pattern

Rosetta uses semantic color tokens following this pattern: `--{category}.{role}.{prominence}.

`{role}` is optional if you want to use our default/primary scale. For example, `bg.strong` 

The default For example, `bg.accent.strong`.

## Semantic tokens

These tokens reference the Atomic tokens listed below. As stated by the `{category}`, background tokens should only be used on surfaces or backgrounds, border tokens should only be used on borders, and foreground tokens should only be used on text or icons.

**Background layer hierarchy:**

- `bg.base` (white) -- outermost page background
- `bg.default` (light gray) -- elevated surfaces on top of the base (cards, panels, input fields)
- `bg.inset` (off-white) -- recessed areas within surfaces
- `bg.strong` (near-black) -- high-contrast surfaces

Common mistake: `bg.default` sounds like the "default" page background, but it is for elevated surfaces. The page shell uses `bg.base`.

```tsx
const backgroundAliases = {
  accent: {
    default: colors.blue['900'],
    strong: colors.blue['400'],
  },
  base: colors.white,
  danger: {
    default: colors.red['900'],
    strong: colors.red['400'],
  },
  default: colors.gray['900'],
  inset: colors.gray['950'],
  strong: colors.gray['100'],
  success: {
    default: colors.green['900'],
    strong: colors.green['400'],
  },
  warning: {
    default: colors.yellow['900'],
    strong: colors.yellow['400'],
  },
};

const borderAliases = {
  accent: colors.blue['400'],
  danger: colors.red['400'],
  default: colors.gray['800'],
  strong: colors.gray['100'],
  success: colors.green['400'],
  warning: colors.yellow['400'],
};

const foregroundAliases = {
  accent: colors.blue['300'],
  danger: colors.red['300'],
  default: colors.gray['100'],
  disabled: colors.gray['600'],
  muted: colors.gray['300'],
  onStrong: colors.white,
  success: colors.green['300'],
  warning: colors.yellow['300'],
};
```

## Atomic tokens

Below is a list of all tokens. Gray is the default/primary color scale.

Use these only for when you cannot find a fitting semantic use case.

For the gray ramp:
- `100` represents the primary text color or strong background
- `200` represents the hovered state of a strong background
- `300` represents the secondary text color (muted)
- `400` represents placeholder text colors
- `600` represents the disabled color
- `800` represents a hovered background
- `900` represents a standard background
- `950` represents the navigation sidebar specifically

```json
{
  black: '#313131',
  white: '#ffffff',
  blue: {
    '100': '#113267',
    '200': '#154D9D',
    '300': '#0862D1',
    '400': '#0072F0',
    '500': '#4894FF',
    '600': '#6CA4F4',
    '700': '#B9D5FE',
    '800': '#D8E8FE',
    '900': '#F4F5FD',
  },
  green: {
    '100': '#123B28',
    '200': '#175A3D',
    '300': '#1B754F',
    '400': '#15865B',
    '500': '#45A57A',
    '600': '#67B28D',
    '700': '#AEDCC2',
    '800': '#CDEDDB',
    '900': '#EDF8F2',
  },
  red: {
    '100': '#651218',
    '200': '#96232B',
    '300': '#C32D38',
    '400': '#DB3642',
    '500': '#F36567',
    '600': '#EF8280',
    '700': '#FEC6C4',
    '800': '#FEE0DE',
    '900': '#FEF3F2',
  },
  pink: {
    '100': '#581C4D',
    '200': '#822D71',
    '300': '#AB3796',
    '400': '#C63BB0',
    '500': '#E067C9',
    '600': '#DF82CB',
    '700': '#F4C6E9',
    '800': '#F8E0F2',
    '900': '#FCF1F9',
  },
  orange: {
    '100': '#5E2507',
    '200': '#873809',
    '300': '#AE4906',
    '400': '#C05703',
    '500': '#DA7B3C',
    '600': '#DF8E5C',
    '700': '#FFC8A8',
    '800': '#FCE2D3',
    '900': '#FEF2EC',
  },
  gray: {
    '100': '#0E0E0E',
    '200': '#454545',
    '300': '#666666',
    '400': '#767676',
    '500': '#949494',
    '600': '#B7B7B7',
    '700': '#D3D3D3',
    '800': '#E7E7E7',
    '900': '#F2F2F2',
    '950': '#F9F9F9',
  },
  yellow: {
    '100': '#433214',
    '200': '#6B4811',
    '300': '#925B20',
    '400': '#AB6500',
    '500': '#C48900',
    '600': '#D19800',
    '700': '#F2D173',
    '800': '#FDE696',
    '900': '#FEF5D3',
  },
  lime: {
    '100': '#243C08',
    '200': '#37590D',
    '300': '#477114',
    '400': '#57822a',
    '500': '#72A159',
    '600': '#85AD73',
    '700': '#BADDAC',
    '800': '#D9EAD2',
    '900': '#F1F7EE',
  },
  teal: {
    '100': '#033D3C',
    '200': '#145858',
    '300': '#0B7374',
    '400': '#038480',
    '500': '#32A49E',
    '600': '#55B2AC',
    '700': '#A8DDD8',
    '800': '#D0EDEA',
    '900': '#E5F9F6',
  },
  cyan: {
    '100': '#0F374B',
    '200': '#1B5672',
    '300': '#136F96',
    '400': '#0C7EAB',
    '500': '#389DCC',
    '600': '#5FACD3',
    '700': '#B0DAF1',
    '800': '#D6EAF4',
    '900': '#EFF7FC',
  },
  purple: {
    '100': '#352A64',
    '200': '#543DA4',
    '300': '#6d4cd7',
    '400': '#785EF2',
    '500': '#9284FB',
    '600': '#9F97F3',
    '700': '#D0CFFB',
    '800': '#E3E4FE',
    '900': '#F4F3FE',
  },
};
```

## Using with CSS

When writing custom CSS (e.g., in `.css` files), use CSS custom properties instead of hardcoded hex values. Color tokens are available as CSS variables following this naming convention:

CSS custom properties are kebab-case versions of the equivalent theme tokens, prefixed with `colors`. They are not aware of React ThemeContext and will not change when the theme changes at runtime — prefer styled-system props on Rosetta primitives when possible.

**Semantic tokens:** `var(--colors-{category}-{role})`

| Styled-system prop | CSS custom property | Resolved value |
|---|---|---|
| `bg.default` | `var(--colors-bg-default)` | #F2F2F2 |
| `bg.base` | `var(--colors-bg-base)` | #FFFFFF |
| `bg.strong` | `var(--colors-bg-strong)` | #0E0E0E |
| `bg.inset` | `var(--colors-bg-inset)` | #F9F9F9 |
| `bg.accent.default` | `var(--colors-bg-accent-default)` | #F4F5FD |
| `bg.accent.strong` | `var(--colors-bg-accent-strong)` | #0072F0 |
| `bg.danger.default` | `var(--colors-bg-danger-default)` | #FEF3F2 |
| `bg.danger.strong` | `var(--colors-bg-danger-strong)` | #DB3642 |
| `bg.success.default` | `var(--colors-bg-success-default)` | #EDF8F2 |
| `bg.success.strong` | `var(--colors-bg-success-strong)` | #15865B |
| `bg.warning.default` | `var(--colors-bg-warning-default)` | #FEF5D3 |
| `bg.warning.strong` | `var(--colors-bg-warning-strong)` | #AB6500 |
| `border.default` | `var(--colors-border-default)` | #E7E7E7 |
| `border.strong` | `var(--colors-border-strong)` | #0E0E0E |
| `border.accent` | `var(--colors-border-accent)` | #0072F0 |
| `border.danger` | `var(--colors-border-danger)` | #DB3642 |
| `border.success` | `var(--colors-border-success)` | #15865B |
| `border.warning` | `var(--colors-border-warning)` | #AB6500 |
| `fg.default` | `var(--colors-fg-default)` | #0E0E0E |
| `fg.muted` | `var(--colors-fg-muted)` | #666666 |
| `fg.disabled` | `var(--colors-fg-disabled)` | #B7B7B7 |
| `fg.onStrong` | `var(--colors-fg-on-strong)` | #FFFFFF |
| `fg.accent` | `var(--colors-fg-accent)` | #0862D1 |
| `fg.danger` | `var(--colors-fg-danger)` | #C32D38 |
| `fg.success` | `var(--colors-fg-success)` | #1B754F |
| `fg.warning` | `var(--colors-fg-warning)` | #925B20 |

**Atomic tokens:** `var(--colors-{hue}-{shade})`

| Token | CSS custom property | Value |
|---|---|---|
| `gray.100` | `var(--colors-gray-100)` | #0E0E0E |
| `gray.300` | `var(--colors-gray-300)` | #666666 |
| `gray.600` | `var(--colors-gray-600)` | #B7B7B7 |
| `gray.800` | `var(--colors-gray-800)` | #E7E7E7 |
| `gray.900` | `var(--colors-gray-900)` | #F2F2F2 |

Example usage in a `.css` file:

```css
.my-element {
  color: var(--colors-fg-default);
  background-color: var(--colors-bg-default);
  border: 1px solid var(--colors-border-default);
}

.my-muted-text {
  color: var(--colors-fg-muted);
}
```