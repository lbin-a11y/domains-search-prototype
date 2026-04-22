# Date Picker

A calendar for single date or date range selection.

## Usage

### General guidance

The Date Picker allows a user to select a single date or date range.

It's best suited for scheduling purposes when a user needs context for a date within a week, or when there's limited availability on the calendar.

---

### Anatomy

1. **Current month and year**
2. **Month navigation**
3. **Date grid**
4. **Selected date**
5. **Selected range**
6. **Today**
7. **Unavailable date**

---

### Specs

The calendar fills the space of its container.

| Property | Value                                      |
| -------- | ------------------------------------------ |
| Width    | 100% of parent container                   |
| Height   | Determined by number of weeks in the month |

### Layout

#### Inline

The Date Picker can be placed inline when the user needs to quickly reference dates in context.

#### Editable Dropdown

A Date Picker can be placed inside an Editable Dropdown's dialog, allowing the user to either type in their date or select it on the calendar. This option is particularly useful for selecting a known date, like a birthday, where typing in a date is easier than selecting on a calendar.

- Using the editable dropdown to type in a known date.
- Using the calendar action to open the calendar.

---

### Behavior

#### Navigation

The user can use their mouse or keyboard to move between months and select a single date.

### Range selection

Add two Editable Dropdowns to create date range inputs. The first date selected is the start date, and the second date selected is the end date.

#### Unavailable dates

Dates can be marked unavailable. For example, dates may be marked unavailable to align with a user's business hours or when all appointment slots have been booked.

---
## Examples


### Default

```jsx
{
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <DatePicker
      mode={DatePicker.MODE.DATE}
      onChange={setSelectedDate}
      value={selectedDate}
      valueType={DatePicker.VALUE_TYPE.ISO_8601}
    />
  );
}
```

### Basic Range

```jsx
{
  const [selectedDate, setSelectedDate] = useState<UnixRange>([
    jan042020,
    jan062020,
  ]);

  return (
    <DatePicker
      displayYearsDropdown
      mode={DatePicker.MODE.RANGE}
      // @ts-expect-error the union type here is not working properly unfortunately
      onChange={setSelectedDate}
      timeZone="America/Los_Angeles"
      value={selectedDate}
      valueType={DatePicker.VALUE_TYPE.UNIX_TIMESTAMP}
    />
  );
}
```

### Boundary Message

```jsx
{
  const [selectedDate, setSelectedDate] = useState<number>(
    getUnixTime('2018-01-09')
  );

  return (
    <DatePicker
      boundaryMessages={{
        before:
          'Accounting data is only available from January 1, 2018 and onwards.',
      }}
      fromMonth="2018-01"
      mode={DatePicker.MODE.DATE}
      onChange={setSelectedDate}
      timeZone="Etc/UTC"
      toMonth="2022-12"
      value={selectedDate}
      valueType={DatePicker.VALUE_TYPE.UNIX_TIMESTAMP}
    />
  );
}
```

### Disable Months

```jsx
{
  const [selectedDate, setSelectedDate] = useState<number>(
    getUnixTime('2018-09-09')
  );

  return (
    <DatePicker
      disable={{ byMonth: [7, 8, 10] }}
      mode={DatePicker.MODE.DATE}
      onChange={setSelectedDate}
      timeZone="Etc/UTC"
      value={selectedDate}
      valueType={DatePicker.VALUE_TYPE.UNIX_TIMESTAMP}
    />
  );
}
```