# Progress Indicator

A track that shows the progression of a task. Progress Indicators are not interactive, though they often have a button for cancelling the corresponding task.

## Guidance

### General guidance

Progress Indicators come in two variants: determinate and indeterminate. Use the determinate version when displaying progress like file conversions or data uploads. Use the indeterminate version for asynchronous actions, or as an alternative to the Activity Indicator when a line shape is more desirable.

When possible, opt for a determinate Progress Indicator, as it can reduce cognitive load by helping the user estimate the remaining wait time.

### Content

The Progress Indicator component does not include content. But content added to a page and associated with the component can add value by being accurate, helpful, and succinct.

Consider adding content to the page to inform the user if progress is not happening, or if there are negative consequences to stopping ongoing progress. If data will be lost if a user leaves the page, provide an option to confirm the cancellation or to continue the process.

### Accessibility

To make sure the Progress Indicator is accessible to users of assistive technologies (such as screen reader and voice-assistant users), implement it as an ARIA live region.

## Usage

### Anatomy

1. **Track** — Displays the progress.
2. **Container**

---

### Variants

#### Determinate

Determinate Progress Indicators should be used when the process time is **known**. The length of the track shows progression of the process or task to the user.

#### Indeterminate

Use an indeterminate Progress Indicator when the process time is **not known**. The user will still be given an indication that the process is happening, but they will not be given an indication of how far along it is.

---

### Specs

| Property        | Value                                                              |
| --------------- | ------------------------------------------------------------------ |
| Width           | 100% of container                                                  |
| Height          | sizes.50, or sizes.25 if used as a Cell divider                    |
| Container color | gray.800                                                           |
| Track color     | gray.100                                                           |

---

### Layout

Progress Indicators are flexible and can be used alongside a number of other components.

#### Cards

Progress Indicators can be attached to a Card, for use cases like uploading an asset.

#### Cells

Progress Indicators can also be used as an alternative to Dividers between Cells. In this case, reduce the height to 1px for consistency with the Divider.
## Examples


### Default

```jsx
<ProgressIndicator
      aria-label={'Default progress indicator'}
      value={50}
    />
```

### Composed

```jsx
<ProgressIndicator.Container data-test="container">
      <ProgressIndicator.Track
        aria-label={'Composed progress indicator'}
        data-test="track"
        max={300}
        min={0}
        value={80}
      />
    </ProgressIndicator.Container>
```

### With Custom Styles

```jsx
(
  <ProgressIndicator.Container backgroundColor="blue.300" data-test="container">
    <ProgressIndicator.Track
      backgroundColor="red.300"
      data-test="track"
      value={50}
    />
  </ProgressIndicator.Container>
)
```

### Indeterminate

```jsx
<ProgressIndicator isIndeterminate={true} />
```

### Auto0To100

```jsx
{
  const [value, setValue] = useState(0);

  useInterval(() => {
    if (value < 100) {
      setValue((v: number) => v + 1);
    }
  }, 100);

  return <ProgressIndicator value={value} />;
}
```