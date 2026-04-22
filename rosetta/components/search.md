# Search

Search allows users to find relevant content by typing in keywords.

## Usage

### General guidance

Search is a way for users to find content or navigate to where they want to go. Once a user types keywords into a search input, content is updated with relevant search results.

If Search is used multiple times across the same product area or flow, the placement should be consistent across these pages.

---

### Anatomy

#### Default

1. **Search icon**
2. **Text Input**
3. **Cell**
4. **Cross Icon**
5. **Search Input**
6. **Search dialog (desktop)** — Optional.

#### Compact Search (mobile)

1. **Search icon**

#### Mobile Search Dialog

1. **Sheet**
2. **Search input**
3. **Cancel Button**
4. **Cell**

---

### Variants

#### Default

Default Search has an exposed search input and can be used on either mobile or desktop.

#### Compact (mobile only)

Use compact Search on mobile only when search is not an important action and there is limited space on the screen. Compact Search hides the search input until a user taps on the Search icon.

---

### Specs

The construction of the Search input follows the specs of a Cell. In most circumstances, Search should use the floating style cell since it is a standalone input.

#### Default

| Property | Value         |
| -------- | ------------- |
| Position | Above content |
| Width    | Flexible      |
| Height   | sizes.250     |
| Padding  | space[2]      |

#### Compact (mobile only)

| Property   | Value               |
| ---------- | ------------------- |
| Position   | Above content       |
| Width      | Full width on mobile |
| Height     | sizes.250           |
| Top margin | space[3]            |

#### Search dialog (desktop)

The Search dialog on desktop follows the specs of the Dropdown dialog.

| Property   | Value                           |
| ---------- | ------------------------------- |
| Position   | Below search input              |
| Width      | Flexible                        |
| Height     | Flexible, determined by content |
| Top margin | space[1]                        |
| Padding    | space[1] top and bottom         |

#### Search dialog (mobile)

The construction of the Search dialog on mobile follows the specs of a Sheet with a Search input inside a fixed Toolbar. The list items are made of Cells that can be adapted for different needs.

##### Toolbar

The Search input and cancel Button sit vertically centered within a Toolbar fixed at the top of the Sheet.

| Property      | Value      |
| ------------- | ---------- |
| Width         | Full width |
| Height        | sizes.400  |
| Padding       | space[3]   |
| Bottom margin | space[1]   |

---

### Behavior

Search results can be loaded in two ways. Live search allows the search to run as each character is typed, returning results instantly to the user. Results can also be returned after the user hits enter on the keyboard. Do not use live search if it takes a long time to load results after each character is entered.

#### Auto-complete

The Search dialog can be used to show auto-complete results, which gives selectable suggestions based on what a user types.

#### Desktop

On desktop, the Search dialog appears below when the Search input is selected.

#### Mobile

When using compact Search without a dialog, the user taps the Search icon to expose the Search input.

##### With Search dialog

When using the Search dialog on mobile, the Sheet enters from the bottom once a user taps the Search icon or Search input. See Sheet for guidelines.

#### Clearing search

When a user starts typing, a Cross icon appears that allows the user to clear the search.

## Accessibility

### Icon tap target

The Search icon has a tap target of 44×44px, and should be spaced out appropriately so it does not overlap when placed next to other icons.

### Focus state

For keyboard users, a focus state should appear around the Cross icon when focused.

### Screen readers

Make sure that the placeholder text is labelled so that screen reader users understand what they are searching and what should be typed in the input.
## Examples


### Input Only

```jsx
{
const [query, setQuery] = useState('');
  const debouncedSearch = (value: string) => {
    // add search logic
    console.log({ value });
  };

  return (
    <Search.Input
      data-test="search-input"
      inputValue={query}
      onClear={() => setQuery('')}
      onInput={setQuery}
      onKeyDown={(e) => {
        if (Keyboard.isEnter(e)) {
          debouncedSearch(query);
        }
      }}
      placeholder={'Search'}
      variant="floating"
    />
  );
}
```

### Default

```jsx
{
const [query, setQuery] = useState();
  const [value, setValue] = useState(
    'wolves'
  );

  const results = [
    { value: "wolves", displayName: "Wolves" },
    { value: "ravens", displayName: "Ravens" },
  ].reduce(
    (collector: ReactNode[], option) => {
      const filter = query ?? value;

      if (option.value.toLowerCase().startsWith(filter.toLowerCase())) {
        collector.push(
          <Dropdown.Option value={option.value}>
            {option.displayName}
          </Dropdown.Option>
        );
      }
      return collector;
    },
    []
  );

  return (
    <Search
      aria-label={'Team'}
      data-test="search-input"
      inputValue={query}
      label={'Team'}
      onChange={(val: string) => {
        setQuery(undefined);
        setValue(val);
      }}
      onInput={setQuery}
      placeholder={'Search a team'}
      value={value}
      variant="floating"
    >
      {results.length ? (
        results
      ) : (
        <Text.Body color="gray.300" p={2}>
          {'No search results'}
        </Text.Body>
      )}
    </Search>
  );
}
```

### No Icon

```jsx
{
const [query, setQuery] = useState();
  const [value, setValue] = useState(
    'wolves'
  );

  const results = [
    { value: "wolves", displayName: "Wolves" },
    { value: "ravens", displayName: "Ravens" },
  ].reduce(
    (collector: ReactNode[], option) => {
      const filter = query ?? value;

      if (option.value.toLowerCase().startsWith(filter.toLowerCase())) {
        collector.push(
          <Dropdown.Option value={option.value}>
            {option.displayName}
          </Dropdown.Option>
        );
      }
      return collector;
    },
    []
  );

  return (
    <Search
      aria-label={'Team'}
      data-test="search-input"
      exteriorPre={null}
      inputValue={query}
      onChange={(val: string) => {
        setQuery(undefined);
        setValue(val);
      }}
      onInput={setQuery}
      placeholder={'Search a team'}
      value={value}
      variant="floating"
    >
      {results.length ? (
        results
      ) : (
        <Text.Body color="gray.300" p={2}>
          {'No search results'}
        </Text.Body>
      )}
    </Search>
  );
}
```