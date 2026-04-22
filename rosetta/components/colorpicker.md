# Color Picker

Color Picker allows users to select or input a color value.

## Guidance

### General guidance

The Color Picker allows users to input a color value. It defaults to Hex format, but users can switch between RGB and HSL values as well.

---

### Anatomy

1. **Map** — Map for visually selecting the saturation and luminosity of a color.
2. **Handle** — User control across color map and sliders; indicates the selected value.
3. **Alpha slider** — User control to change transparency of the selected color.
4. **Hue slider** — User control to select hue.
5. **Format dropdown** — Allows the user to switch between Hex, RGB, and HSL formats.
6. **Value input** — Allows the user to type (and extract) a color value.
7. **Alpha input** — Allows the user to type an opacity value.
8. **Swatch** — Displays the selected color.

---

### Pieces

#### Map

The map is where the user can tweak the saturation and luminosity of their color.

Saturation is a color's degree of richness, intensity, purity, or grayness and is input on the horizontal axis of the map.

Luminosity is a measure of how bright or dark a hue is and is input on the vertical axis of the map.

#### Alpha slider

The alpha slider allows the user to change the transparency of their color selection, as indicated by the checkerboard background.

Only include the alpha slider if the color value can change transparency.

#### Hue slider

The hue slider is where the user selects from a more defined color range (red, orange, yellow, etc.), which they can then adjust with the map and alpha slider.

#### Input

If a user has a hex, RGB, or HSL value for a color on hand, the input offers a more direct way to enter it.

The user can switch between the three color formats — hex, RGB, and HSL — manually with a Dropdown, or they can paste their copied value into the input and it will automatically switch modes. For example, if a user pastes "rgb(255, 255, 255)" into the input while in hex mode, it will switch to RGB mode. If a user pastes "red," it will convert the named color to a hex code.

If alpha is enabled, display a text input so that the user can directly type in a number instead of using the slider.

#### Swatch

The color swatch is a simple circle that displays a color. It can be used as a static indicator in a Cell, or as an interactive selectable button (e.g. website palette).

---

### Layout

There are two ways to display a Color Picker: inline or in a Dropdown.

#### Inline

Color Pickers can be displayed inline in a panel or view. Include a swatch nearby to indicate the selected color.

#### Dropdown

If it makes more sense for the user to stay in the existing view while selecting a color — rather than navigating to a new one — you can display the Color Picker inside a Dropdown dialog. Include a swatch in the Cell to indicate the selected color.

---
## Examples


### Color Picker Default

```jsx
{
  const [value, setValue] = useState('#FF0000');
  // Other potential values:
  // #6D4B4B
  // rgb(255, 255, 255) | rgba(255, 255, 255, 0.5)
  // hsl(0, 26%, 30%) | hsla(0, 26%, 30%, 0.5)

  return (
    <Box m={3}>
      <ColorPicker onChange={setValue} value={value} />
    </Box>
  );
}
```

### Color Picker Composed

```jsx
{
  const [value, setValue] = useState('rgb(255, 255, 255)');

  return (
    <Box m={3}>
      <ColorPicker onChange={setValue} value={value}>
        <ColorPicker.Map />
        <ColorPicker.Alpha />
        <ColorPicker.Hue />
        <ColorPicker.Input />
      </ColorPicker>
    </Box>
  );
}
```

### Swatch

```jsx
(
  <Stack direction="row" m={3} space={2}>
    <ColorPicker.Swatch color="blue" />
    <ColorPicker.Swatch color="hsla(0, 26%, 30%, 0.5)" />
    <ColorPicker.Swatch color="rgba(150, 200, 0, 0.8)" />
    <ColorPicker.Swatch />
  </Stack>
)
```

### With Swatch

```jsx
{
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [colors, setColors] = useState<{ [key: number]: string }>({
    0: '#6D4B4B',
    1: 'hsl(0, 26%, 30%)',
    2: 'rgba(155, 100, 200, 0.5)',
    3: 'blue',
    4: 'rgb(0,0,0)',
  });
return (
    <Box m={3}>
      <Stack direction="row" space={2}>
        {Object.keys(colors).map((colorKey, index) => (
          <ColorPicker.Swatch.Selectable
            key={colorKey}
            aria-label={'Select swatch'}
            color={colors[index]}
            isSelected={selectedIndex === index}
            onChange={() => setSelectedIndex(index)}
          />
        ))}
      </Stack>

      <Box mt={3}>
        <ColorPicker
          onChange={(value) => setColors({ ...colors, [selectedIndex]: value })}
          value={colors[selectedIndex]}
        />
      </Box>
    </Box>
  );
}
```