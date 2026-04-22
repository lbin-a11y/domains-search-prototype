# Step Indicator

The Step Indicator is designed to show progress through a series of steps. It highlights the current step, marks completed steps, and gives a sense of how many are remaining.

## General Guidance

The component is decorative and not clickable or interactive. It should be placed between "Back" and "Next" call-to-action buttons to visually reinforce pagination.

### Anatomy

1. **Active step** — The extended black pill shape represents the step that the user is currently viewing.
2. **Completed step** — The black outlined white circle represents the step(s) that the user has already seen or completed.
3. **Future step** — The filled gray circle represents the step(s) that the user has not yet seen or completed.

### Do use Step Indicator for

- Decorative pagination between steps.
- Setting user expectations for how many steps are ahead.

### Do not use Step Indicator for

- Replacing forward or back actions.
## Examples


### Horizontal

```jsx
{
  const [stepIndex, setStepIndex] = useState(0);
  const steps: StepIndicatorHorizontalProps['steps'] = [
    { key: 1, ariaLabel: 'Step 1' },
    { key: 2, ariaLabel: 'Step 2' },
    { key: 3, ariaLabel: 'Step 3' },
    { key: 4, ariaLabel: 'Step 4' },
    { key: 5, ariaLabel: 'Step 5' },
    { key: 6, ariaLabel: 'Step 6' },
  ];

  return (
    <Box
      display="grid"
      sx={{
        placeItems: 'center',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 4,
      }}
    >
      <Button.Secondary
        disabled={stepIndex === 0}
        onClick={() => setStepIndex((_step) => Math.max(_step - 1, 0))}
      >
        Previous
      </Button.Secondary>
      <StepIndicator.Horizontal stepIndex={stepIndex} steps={steps} />
      <Button.Primary
        disabled={stepIndex === steps.length - 1}
        onClick={() => {
          setStepIndex((_step) => Math.min(_step + 1, steps.length - 1));
        }}
      >
        Next
      </Button.Primary>
    </Box>
  );
}
```

### Vertical

```jsx
{
  const [stepIndex, setStepIndex] = useState(0);
  const steps: StepIndicatorVerticalProps['steps'] = [
    { key: 1, text: 'Step 1' },
    { key: 2, text: 'Step 2' },
    { key: 3, text: 'Step 3' },
    { key: 4, text: 'Step 4' },
    { key: 5, text: 'Step 5' },
    { key: 6, text: 'Step 6' },
  ];

  return (
    <Flex flexDirection="column" gap={6}>
      <StepIndicator.Vertical
        setStepIndex={setStepIndex}
        stepIndex={stepIndex}
        steps={steps}
      />

      <Flex justifyContent="space-between">
        <Button.Secondary
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((_step) => Math.max(_step - 1, 0))}
        >
          Previous
        </Button.Secondary>
        <Button.Primary
          disabled={stepIndex === steps.length - 1}
          onClick={() =>
            setStepIndex((_step) => Math.min(_step + 1, steps.length - 1))
          }
        >
          Next
        </Button.Primary>
      </Flex>
    </Flex>
  );
}
```