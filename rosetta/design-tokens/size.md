# Sizing design tokens

## Usage

To avoid confusion with the standard format for dimension values (e.g., `200` in React Native, `200px` in web),

add `sizes.` as a prefix to reference token values. For example:

```tsx
// Uses standard format; width is equal to 200px

<Box width="200px" />

// References Token value; width is equal to the value of 'sizes.200' i.e., 36px

<Box width="sizes.200" />
```
### When to use size tokens

As a general rule, all width and height measurements should use size tokens. However, consider these guidelines:

- Use size tokens for fixed dimensions of UI elements (buttons, icons, avatars, etc.)

- Use the Grid component for layout-based widths instead of hard-coded values

- Use space tokens for margins, padding, and positioning (top, right, bottom, left)

### Platform differences

Size tokens automatically transform for different platforms:

- Web: Values include the px unit (e.g., 36px)

- React Native: Values are plain numbers (e.g., 36)

## Tokens

| Token      | Web Value | Native Value | Use Case                             |
| ---------- | --------- | ------------ | ------------------------------------ |
| sizes.0    | 0px       | 0            | No size                              |
| sizes.25   | 1px       | 1            | Hairline elements                    |
| sizes.50   | 2px       | 2            | Very small elements                  |
| sizes.75   | 6px       | 6            | Extra small elements                 |
| sizes.100  | 11px      | 11           | Small elements                       |
| sizes.125  | 16px      | 16           | Small-medium elements                |
| sizes.150  | 22px      | 22           | Standard icon size, body line height |
| sizes.175  | 28px      | 28           | Medium elements                      |
| sizes.200  | 36px      | 36           | Medium-large elements                |
| sizes.250  | 44px      | 44           | Minimum touch target (iOS)           |
| sizes.300  | 55px      | 55           | Large elements                       |
| sizes.350  | 66px      | 66           | Extra large elements                 |
| sizes.400  | 77px      | 77           | Very large elements                  |
| sizes.450  | 88px      | 88           | Extra extra large elements           |
| sizes.700  | 342px     | 342          | Container widths                     |
| sizes.750  | 400px     | 400          | Medium container widths              |
| sizes.800  | 480px     | 480          | Large container widths               |
| sizes.900  | 900px     | 900          | Extra large container widths         |
| sizes.1000 | 1440px    | 1440         | Maximum container widths             |

### Special tokens

|Token|Value|Description|
|---|---|---|
|sizes.fullwidth|100vw|Full viewport width (web only)|

## Using with CSS

When using CSS custom properties, size tokens are flattened one level:

```css
.my-element {
  /* Theme token: sizes.sizes[250] */
  /* CSS variable: --sizes-250 */
  width: var(--sizes-250); /* 44px */
  height: var(--sizes-250);
}
```