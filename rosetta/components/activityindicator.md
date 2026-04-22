# Activity Indicator

The Activity Indicator shows the progression of a system operation such as downloading, uploading, or processing in a visual way.

## Guidance

### General guidance

The Activity Indicator is implemented when the user has to wait for a process to complete. It should be shown when performing slow computations, to help notify users that loading is underway. Use it when it's hard to predict how long an operation or task will take.

It's best to display the Activity Indicator for asynchronous actions (such as a network request or a local database operation). Delay displaying it on the screen by about one second to avoid flickering for users who may have the action complete in less than a second.

If you need an indicator for determinate progress (like a file conversion), or when you want to show progress using a line shape, use the Progress Indicator instead.

### Content

The Activity Indicator component does not include content. However, content added to a page and associated with an Activity Indicator can add value by being accurate, helpful, and succinct.

Consider adding content to the page to inform the user if progress is not happening, or if there are negative consequences if progress is stopped. If data will be lost if the user leaves the page, provide an option to confirm the cancellation or to continue the process.

### Accessibility

To make sure the Activity Indicator is accessible to users of assistive technologies (such as screen reader and voice-assistant users), implement it as an ARIA live region.

#### Motion

When selecting the Activity Indicator component, consider how many loading Indicators could be visible to the user at the same time. Having more than one may lead to extra on-screen motion, which may be disruptive to some users.

## Usage

### Variants

#### Size

##### Large

The default size of the Activity Indicator is Large. It should be used in larger UI spaces such as panels and large dialogs.

##### Small

The small Activity Indicator should be used in smaller spaces where the large size is not appropriate, such as inside a Button or an input.

#### Color

##### Dark

By default, the Activity Indicator is "dark" (gray.100) so it can be easily used on base or gray.900 backgrounds.

##### Light

The Activity Indicator is also available in "light" (white) so it can be used on gray.100 backgrounds.

---

### Specs

The Activity Indicator should always be placed horizontally and vertically centered in its parent space, regardless of the size.
## Examples


### Default

```jsx
<ActivityIndicator delay={0} />
```

### Small Size

```jsx
<ActivityIndicator delay={0} size={0} />
```

### White Color

```jsx
<ActivityIndicator color="light" delay={0} />
```