# Address Input

Input component that uses Google to search for addresses.

## Usage

### General guidance

The Address Input is an implementation of Search that uses Google to search for addresses. Use the component whenever a user needs to enter an address.

---

### Anatomy

1. **Search** — Search input.
2. **Results** — Displayed in a dialog on desktop, in a Sheet on mobile.
3. **"Powered by Google" logo** — Indicates to the user where results are coming from; mandatory to include.

---

### Specs

The Address Input follows all of Search's specs.

---

### Behavior

The Address Input autocompletes address results from Google's data. See Google's documentation for more information on the Places API.

---
## Examples


### Default With Label

```jsx
{
const [query, setQuery] = useState<string | undefined>('');
  const [value, setValue] = useState<string | undefined>();

  return (
    <AddressInput
      aria-label="default address input"
      inputValue={value ?? query}
      label={'Enter Address'}
      onChange={(val) => {
        setQuery(undefined);
        setValue(val.description);
      }}
      onClear={() => {
        setQuery('');
        setValue(undefined);
      }}
      onInput={(val: string) => {
        setQuery(val);
        setValue(undefined);
      }}
      query={query ?? undefined}
      value={value}
    />
  );
}
```

### Default With Placeholder

```jsx
{
const [query, setQuery] = useState<string | undefined>('');
  const [value, setValue] = useState<string | undefined>();

  return (
    <AddressInput
      aria-label="default address input"
      inputValue={value ?? query}
      onChange={(val) => {
        setQuery(undefined);
        setValue(val.description);
      }}
      onClear={() => {
        setQuery('');
        setValue(undefined);
      }}
      onInput={(val: string) => {
        setQuery(val);
        setValue(undefined);
      }}
      placeholder={'Enter Address'}
      query={query}
      value={value}
    />
  );
}
```

### Floating Input

```jsx
{
const [query, setQuery] = useState<string | undefined>('');
  const [value, setValue] = useState<string | undefined>();

  return (
    <AddressInput
      aria-label="floating address input"
      inputValue={value ?? query}
      onChange={(val) => {
        setQuery(undefined);
        setValue(val.description);
      }}
      onClear={() => {
        setQuery('');
        setValue(undefined);
      }}
      onInput={(val: string) => {
        setQuery(val);
        setValue(undefined);
      }}
      placeholder={'Enter Address'}
      query={query}
      value={value}
      variant="floating"
    />
  );
}
```

### With Error

```jsx
{
const [query, setQuery] = useState<string | undefined>('');
  const [value, setValue] = useState<string | undefined>();

  return (
    <AddressInput
      aria-label="address input with error"
      error={
        new Error(
          'Invalid address'
        )
      }
      inputValue={value ?? query}
      onChange={(val) => {
        setQuery(undefined);
        setValue(val.description);
      }}
      onClear={() => {
        setQuery('');
        setValue(undefined);
      }}
      onInput={(val: string) => {
        setQuery(val);
        setValue(undefined);
      }}
      placeholder={'Enter Address'}
      query={query}
      value={value}
    />
  );
}
```