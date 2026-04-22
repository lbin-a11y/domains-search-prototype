# Time Input

Time Inputs allow users to enter localized time data. Composed of focusable segments that support keyboard input.

## Guidance

### General content guidance

Time Input is composed of selectable segments, which support both arrow key and alphanumerical inputs. These segments support both 12-hour and 24-hour date formats, and supports granularity up to the second.

| Element           | Required? | Notes                                             |
| ----------------- | --------- | ------------------------------------------------- |
| **Field label**   | Yes       | Always include labels for accessibility.          |
| **Error text**    | Yes       | Always provide context and resolution for errors. |
| **Placeholder**   | Yes       | Time Input always includes placeholders.          |
| **Suffix**        | -         | Optional. Can be used to display timezone.        |
| **Helper**        | -         | Only use when more context is necessary.          |

### Field label

Labels are required as they are critical for assistive-technology users. Use short, direct nouns.

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

Error text should include why an input is invalid, supporting context, and resolution to the error. Ensure that error text communicates how to fix the input error (e.g., "End time cannot occur before the start time. Enter a valid time"). This text does not need a period at the end.

### Placeholder text

Time Input, by default, has placeholders for its time segments (e.g. hh:mm). It also supports both 12-hour and 24-hour time formats.

### Suffix

In certain cases, it can be useful to display timezones to users to reduce confusion. In these cases, use a suffix to display the user's localized timezone.

### Helper

Helper text is located below the field label. This text is used to provide context or instructions.

## Behavior

### Keyboard and input behavior

#### Looping numbers

After reaching the maximum value possible for that segment, numbers will loop from start. For example, if the current minute selected is 59 and the user attempts to click the up arrow again, it will loop back to 00.

#### Automatic segment focus

Focus will jump to following segments based on input. For example, if a user types `1` in the hour slot it will not jump focus because the user _could_ be typing a variety of possible hours. But if a user inputs `5`, focus will automatically jump to the minute segment.

### Timezones and formatting

The Time Input component includes a translation layer which should account for timezone conversions and locale-specific formatting.

### Validation and errors

All inputs should be validated and errors clearly displayed to the user on submit.

## Examples

### Basic use

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Text } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Field.Root width="100%">
        <Field.Label>Meeting Time</Field.Label>
        <Field.Description>
          TimeInput uses CLDRDate to preserve timezone information.
        </Field.Description>
        <TimeInput.Root my={1} onChange={setValue} value={value} width="100%">
          <TimeInput.Control />
        </TimeInput.Root>
      </Field.Root>
      <Text.Caption>
        Selected Time: {value ? value.toString() : 'None'}
      </Text.Caption>
    </>
  );
};
```

### With an initial value

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Text } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const [value, setValue] = useState(CLDRDate.now().set({ hour: 14, minute: 30, second: 0 }));

  return (
    <>
      <Field.Root width="100%">
        <Field.Label>Appointment Time</Field.Label>
        <Field.Description>TimeInput with an initial time of 2:30 PM.</Field.Description>
        <TimeInput.Root my={1} onChange={setValue} value={value} width="100%">
          <TimeInput.Control />
        </TimeInput.Root>
      </Field.Root>
      <Text.Caption>
        Selected Time: {value ? value.toString() : 'None'}
      </Text.Caption>
    </>
  );
};
```

### With seconds (granularity="second")

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const [value, setValue] = useState(CLDRDate.now().set({ hour: 9, minute: 15, second: 30 }));

  return (
    <Field.Root width="100%">
      <Field.Label>Precise Time</Field.Label>
      <Field.Description>Using granularity="second" to include seconds.</Field.Description>
      <TimeInput.Root granularity="second" my={1} onChange={setValue} value={value} width="100%">
        <TimeInput.Control />
      </TimeInput.Root>
    </Field.Root>
  );
};
```

### 12-hour and 24-hour formats

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const [value, setValue] = useState(CLDRDate.now().set({ hour: 14, minute: 30, second: 0 }));

  return (
    <>
      <Field.Root>
        <Field.Label>12-Hour Format</Field.Label>
        <Field.Description>Explicit 12-hour cycle with AM/PM.</Field.Description>
        <TimeInput.Root hourCycle={12} my={1} onChange={setValue} value={value}>
          <TimeInput.Control />
        </TimeInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>24-Hour Format</Field.Label>
        <Field.Description>Explicit 24-hour cycle without AM/PM.</Field.Description>
        <TimeInput.Root hourCycle={24} my={1} onChange={setValue} value={value}>
          <TimeInput.Control />
        </TimeInput.Root>
      </Field.Root>
    </>
  );
};
```

### Disabled

```jsx
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

const value = CLDRDate.now().set({ hour: 10, minute: 0, second: 0 });

<Field.Root>
  <Field.Label>Disabled Time Field</Field.Label>
  <Field.Description>This field is disabled.</Field.Description>
  <TimeInput.Root disabled my={1} onChange={() => {}} value={value}>
    <TimeInput.Control />
  </TimeInput.Root>
</Field.Root>
```

### With min/max values and validation

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const minTime = CLDRDate.now().set({ hour: 9, minute: 0, second: 0 });
  const maxTime = CLDRDate.now().set({ hour: 17, minute: 0, second: 0 });
  const [value, setValue] = useState(CLDRDate.now().set({ hour: 12, minute: 0, second: 0 }));

  const isInvalid =
    value && (value.compare(minTime) < 0 || value.compare(maxTime) > 0);

  return (
    <Field.Root invalid={isInvalid ?? false}>
      <Field.Label>Business Hours Only</Field.Label>
      <Field.Description>Time is constrained between 9:00 AM and 5:00 PM.</Field.Description>
      <TimeInput.Root
        maxValue={maxTime}
        minValue={minTime}
        my={1}
        onChange={setValue}
        value={value}
      >
        <TimeInput.Control />
      </TimeInput.Root>
      <Field.Error>Time must be between 9:00 AM and 5:00 PM</Field.Error>
    </Field.Root>
  );
};
```

### With timezone display

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Flex } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const [value, setValue] = useState(
    CLDRDate.now('America/New_York').set({ hour: 9, minute: 0, second: 0 })
  );

  return (
    <Field.Root>
      <Field.Label>Time</Field.Label>
      <Field.Description>
        The timezone abbreviation is displayed using TimeInput.TimeZone.
      </Field.Description>
      <TimeInput.Root my={1} onChange={setValue} value={value}>
        <Flex align="center" gap={2} justifyContent="space-between" width="100%">
          <TimeInput.Control />
          <TimeInput.TimeZone />
        </Flex>
      </TimeInput.Root>
    </Field.Root>
  );
};
```

### Connected timezone inputs

Show the same moment in time across multiple timezones.

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Flex, Text } from '@sqs/rosetta-primitives';
// import { TimeInput } from '@sqs/rosetta-elements/timeinput';

() => {
  const [shared, setShared] = useState(
    CLDRDate.now('America/New_York').set({ hour: 9, minute: 0, second: 0 })
  );

  const toZone = (zoneId) =>
    shared
      ? new CLDRDate({ date: new Date(shared.unixEpoch()), zoneId })
      : null;

  return (
    <Flex flexDirection="column" gap={6} width="280px">
      <Text.Subtitle>Connected Timezone Inputs</Text.Subtitle>
      {[
        { label: 'New York', zoneId: 'America/New_York' },
        { label: 'London', zoneId: 'Europe/London' },
        { label: 'Tokyo', zoneId: 'Asia/Tokyo' },
      ].map(({ label, zoneId }) => (
        <Field.Root key={zoneId}>
          <Field.Label>{label}</Field.Label>
          <TimeInput.Root my={1} onChange={setShared} value={toZone(zoneId)}>
            <Flex align="center" gap={2} justifyContent="space-between" width="100%">
              <TimeInput.Control />
              <TimeInput.TimeZone />
            </Flex>
          </TimeInput.Root>
        </Field.Root>
      ))}
    </Flex>
  );
};
```
