# Date Input

Date Inputs allow users to enter localized date data. Composed of focusable segments that support keyboard input.

## Guidance

### General content guidance

Date Input is composed of selectable segments which support both arrow key and alphanumerical inputs. These segments automatically format and localize dates based on locale.

| Element          | Required? | Notes                                             |
| ---------------- | --------- | ------------------------------------------------- |
| Field label      | Yes       | Always include labels for accessibility.          |
| Error text       | Yes       | Always provide context and resolution for errors. |
| Placeholder      | Yes       | Date Input always includes placeholders.          |
| Suffix           | Optional  | Can be used to display timezone.                  |
| Helper           | Optional  | Only use when more context is necessary.          |

### Field label

Labels are required as they are critical for assistive-technology users. Use short, direct nouns.

### Error text

Error text should be attached to the field and pushes helper text below the field down when a form is submitted incorrectly.

Error text should include why an input is invalid, supporting context, and resolution to the error. Ensure that error text communicates how to fix the input error (e.g., "End date cannot occur before the start date. Enter a valid date"). This text does not need a period at the end.

### Placeholder text

Date Input automatically includes locale-specific date placeholders (e.g. `mm/dd/yyyy` for US, `dd/mm/yyyy` for Europe, `yyyy/mm/dd` for East Asia) for each date segment to reduce confusion about date formatting.

### Suffix

It could be useful to display timezones to users to reduce confusion. In these cases, use the suffix to display the user's localized timezone.

### Helper

Helper text is located below the field label. This text is used to provide context or instructions, such as a valid date range.

## Behavior

### Keyboard and input behavior

#### Increment from current date

Date Input increments from the user's local date by default. When a user selects the current month segment and hits the up arrow, it will set the month to the user's current month.

#### Looping numbers

After reaching the maximum value possible for that segment, numbers will loop from start. For example, if the current month selected is 12 and the user attempts to click the up arrow again, it will loop back to 01.

#### Automatic segment focus

Focus will jump to following segments based on input. For example, if a user types `1` in the month slot it will not jump focus because the user could be typing `01`, `10`, `11`, or `12`. But if a user inputs `5`, focus will automatically jump to the date segment.

### Timezones and formatting

The Date Input component includes a translation layer which accounts for timezone conversions and locale-specific formatting.

### Validation and errors

Date Input should only allow for "real" dates. Despite this, all inputs should be validated and errors clearly displayed to the user on submit.

## Examples

### Basic use

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Text } from '@sqs/rosetta-primitives';
// import { Events } from '@sqs/rosetta-icons';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Field.Root width="100%">
        <Field.Label>Date of Birth</Field.Label>
        <Field.Description>
          DateInput uses CLDRDate from @sqs/i18n-date.
        </Field.Description>
        <DateInput.Root
          my={1}
          onChange={setValue}
          sx={{ justifyContent: 'space-between' }}
          value={value}
          width="100%"
        >
          <DateInput.Control />
          <Events />
        </DateInput.Root>
      </Field.Root>
      <Text.Caption>
        Selected Date: {value ? value.toString() : 'None'}
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
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const initialDate = CLDRDate.now().set({ year: 2024, month: 3, day: 15, hour: 0, minute: 0, second: 0 });
  const [value, setValue] = useState(initialDate);

  return (
    <>
      <Field.Root width="100%">
        <Field.Label>Selected Field</Field.Label>
        <Field.Description>DateInput with an initial CLDRDate value.</Field.Description>
        <DateInput.Root my={1} onChange={setValue} sx={{ width: '100%' }} value={value}>
          <DateInput.Control />
        </DateInput.Root>
      </Field.Root>
      <Text.Caption>
        Selected Date: {value ? value.toString() : 'None'}
      </Text.Caption>
    </>
  );
};
```

### With min/max constraints

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const [value, setValue] = useState(null);
  const todayDate = CLDRDate.now();
  const nextWeek = todayDate.add({ week: 1 });

  const isInvalid = value
    ? value.compare(todayDate) < 0 || value.compare(nextWeek) > 0
    : false;

  return (
    <Field.Root invalid={isInvalid}>
      <Field.Label>Select Date</Field.Label>
      <Field.Description>
        Choose a date between today and one week from now.
      </Field.Description>
      <DateInput.Root
        maxValue={nextWeek}
        minValue={todayDate}
        my={1}
        onChange={setValue}
        value={value}
      >
        <DateInput.Control />
      </DateInput.Root>
      <Field.Error>Date must be in allowed range</Field.Error>
    </Field.Root>
  );
};
```

### Disabled

```jsx
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

const value = CLDRDate.now().set({ year: 2024, month: 3, day: 15, hour: 0, minute: 0, second: 0 });

<Field.Root>
  <Field.Label>Disabled Date Field</Field.Label>
  <Field.Description>This field is disabled.</Field.Description>
  <DateInput.Root disabled my={1} onChange={() => {}} value={value}>
    <DateInput.Control />
  </DateInput.Root>
</Field.Root>
```

### With date and time (granularity="minute")

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Flex, Text } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const [value, setValue] = useState(
    CLDRDate.now('America/New_York').set({ hour: 14, minute: 30, second: 0 })
  );

  return (
    <Field.Root>
      <Field.Label>Appointment Date & Time</Field.Label>
      <Field.Description>Select a date and time for your appointment.</Field.Description>
      <DateInput.Root granularity="minute" my={1} onChange={setValue} value={value}>
        <Flex gap={2} justifyContent="space-between" width="100%">
          <DateInput.Control />
          <DateInput.TimeZone />
        </Flex>
      </DateInput.Root>
    </Field.Root>
  );
};
```

### Locale-aware segment ordering

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Flex, Text } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const initialDate = CLDRDate.now().set({ year: 2024, month: 3, day: 15, hour: 0, minute: 0, second: 0 });
  const [usValue, setUsValue] = useState(initialDate);
  const [deValue, setDeValue] = useState(initialDate);
  const [jpValue, setJpValue] = useState(initialDate);

  return (
    <Flex flexDirection="column" gap={6}>
      <Text.Subtitle>Locale-aware Date Input Formats</Text.Subtitle>
      <Text.Caption mb={3}>
        DateInput.Control automatically orders segments based on locale.
      </Text.Caption>
      <Field.Root>
        <Field.Label>English (US) — MM/DD/YYYY</Field.Label>
        <DateInput.Root locale="en-US" my={1} onChange={setUsValue} value={usValue}>
          <DateInput.Control />
        </DateInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>German (DE) — DD.MM.YYYY</Field.Label>
        <DateInput.Root locale="de-DE" my={1} onChange={setDeValue} value={deValue}>
          <DateInput.Control />
        </DateInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Japanese (JP) — YYYY/MM/DD</Field.Label>
        <DateInput.Root locale="ja-JP" my={1} onChange={setJpValue} value={jpValue}>
          <DateInput.Control />
        </DateInput.Root>
      </Field.Root>
    </Flex>
  );
};
```

### Read only

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

const initialDate = CLDRDate.now().set({ year: 2024, month: 3, day: 15, hour: 0, minute: 0, second: 0 });

() => {
  const [value, setValue] = useState(initialDate);

  return (
    <Field.Root>
      <Field.Label>Birth Date (Read Only)</Field.Label>
      <Field.Description>This field is read-only.</Field.Description>
      <DateInput.Root my={1} onChange={setValue} readOnly value={value}>
        <DateInput.Control />
      </DateInput.Root>
    </Field.Root>
  );
};
```

### Interactive locale selector

The `locale` prop on `DateInput.Root` controls segment ordering and separators. Change locale at runtime to see segments reorder automatically.

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Flex, Text } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const initialDate = CLDRDate.now().set({ year: 2024, month: 3, day: 15, hour: 0, minute: 0, second: 0 });
  const [value, setValue] = useState(initialDate);
  const [locale, setLocale] = useState('en-US');

  const locales = [
    { code: 'en-US', name: 'English (US)', format: 'MM/DD/YYYY' },
    { code: 'en-GB', name: 'English (UK)', format: 'DD/MM/YYYY' },
    { code: 'de-DE', name: 'German', format: 'DD.MM.YYYY' },
    { code: 'fr-FR', name: 'French', format: 'DD/MM/YYYY' },
    { code: 'ja-JP', name: 'Japanese', format: 'YYYY/MM/DD' },
    { code: 'zh-CN', name: 'Chinese', format: 'YYYY/MM/DD' },
  ];

  return (
    <Field.Root>
      <Field.Label>
        <Text.Body fontWeight="medium">Interactive Locale Selection</Text.Body>
      </Field.Label>
      <Field.Description>
        Segments and separators automatically reorder based on locale conventions.
      </Field.Description>
      <Flex align="center" gap={2} my={2}>
        <Text.Body>Locale:</Text.Body>
        <select onChange={(e) => setLocale(e.target.value)} value={locale}>
          {locales.map((loc) => (
            <option key={loc.code} value={loc.code}>
              {loc.name} ({loc.format})
            </option>
          ))}
        </select>
      </Flex>
      <DateInput.Root locale={locale} my={1} onChange={setValue} value={value}>
        <DateInput.Control />
      </DateInput.Root>
      <Text.Caption mt={2}>
        Current value:{' '}
        {value ? new Date(value.unixEpoch()).toLocaleDateString(locale) : 'None'}
      </Text.Caption>
    </Field.Root>
  );
};
```

### Validation with unavailable dates

Use `isDateUnavailable` to mark specific dates as unavailable (e.g. weekends), and `minValue`/`maxValue` for a valid range. Drive `Field.Root invalid` from custom validation logic and display errors in `Field.Error`.

```jsx
import { useState } from 'react';
// import { CLDRDate } from '@sqs/i18n-date';
// import { Field, Text } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

() => {
  const [value, setValue] = useState(null);
  const [errors, setErrors] = useState([]);

  const todayDate = CLDRDate.now();
  const maxDate = todayDate.add({ year: 1 });

  const handleChange = (date) => {
    if (!date) { setValue(null); setErrors([]); return; }
    setValue(date);
    const newErrors = [];
    if (date.compare(todayDate) < 0) newErrors.push('Date cannot be in the past');
    if (date.compare(maxDate) > 0) newErrors.push('Date cannot be more than 1 year in the future');
    // CLDRDate.dayOfWeek(): 1=Sunday, 7=Saturday
    const dow = date.dayOfWeek();
    if (dow === 1 || dow === 7) newErrors.push('Weekends are not allowed');
    setErrors(newErrors);
  };

  const isDateUnavailable = (date) => {
    const dow = date.dayOfWeek();
    return dow === 1 || dow === 7;
  };

  return (
    <Field.Root invalid={errors.length > 0}>
      <Field.Label>
        <Text.Body fontWeight="medium">Validation and Constraints</Text.Body>
      </Field.Label>
      <Field.Description>
        Date must be between today and 1 year from now. Weekends are disabled.
      </Field.Description>
      <DateInput.Root
        isDateUnavailable={isDateUnavailable}
        maxValue={maxDate}
        minValue={todayDate}
        my={1}
        onChange={handleChange}
        value={value}
      >
        <DateInput.Control />
      </DateInput.Root>
      <Field.Error>
        {errors.map((error, i) => <div key={i}>{error}</div>)}
      </Field.Error>
    </Field.Root>
  );
};
```

### Custom segments and separators

Use `DateInput.useContext()` inside a child component to access the raw `segments` array and render each segment with custom styling via `DateInput.Segment` and `DateInput.Separator`.

```jsx
// import { CLDRDate } from '@sqs/i18n-date';
// import { Flex, Text } from '@sqs/rosetta-primitives';
// import { DateInput } from '@sqs/rosetta-elements/dateinput';

const CustomSegments = () => {
  const { state } = DateInput.useContext();
  if (!state?.segments) return null;

  return (
    <>
      {state.segments.map((segment, index) => {
        if (segment.type === 'literal') {
          return (
            <DateInput.Separator key={`literal-${index}`}>❤️</DateInput.Separator>
          );
        }
        return (
          <DateInput.Segment
            key={`${segment.type}-${index}`}
            segment={segment}
            sx={{
              ...(segment.type === 'year' && { color: 'purple.300' }),
              ...(segment.type === 'month' && { color: 'blue.600' }),
              ...(segment.type === 'day' && { color: 'green.600' }),
            }}
          />
        );
      })}
    </>
  );
};

() => {
  const initialDate = CLDRDate.now().set({ year: 2024, month: 12, day: 25, hour: 0, minute: 0, second: 0 });
  const [value, setValue] = useState(initialDate);

  return (
    <Flex flexDirection="column">
      <Text.Subtitle>Custom Segment Styling</Text.Subtitle>
      <Text.Caption mb={2}>
        Use DateInput.useContext() to access segments and render with custom styling.
      </Text.Caption>
      <DateInput.Root onChange={setValue} value={value}>
        <CustomSegments />
      </DateInput.Root>
      <Text.Caption mt={2}>
        Selected Date: {value ? value.toString() : 'None'}
      </Text.Caption>
    </Flex>
  );
};
```
