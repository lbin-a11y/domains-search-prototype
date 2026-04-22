# Code Input

The Code Input uses the CodeMirror 6 library to allow users to type code with rich features, such as syntax highlighting.

## Usage

### General guidance

The Code Input is a special input in a Cell that allows the user to input code with rich features, such as syntax highlighting.

Code Inputs should be used where customers enter custom code for their website.

---

### Anatomy

1. **Line number** — Optional.
2. **Line of code**
3. **Focus indicator** — Highlighted background to show the user which line they're editing.
4. **Cell**

---

### Specs

Code Inputs are always displayed in a floating Cell.

#### Label

As with any input, Code Inputs should always have a label.

#### Size

Rosetta does not enforce a minimum or maximum width or height of the Code Input, but code editing often requires more space than a standard Textarea. Consider adding additional height to a Code Input, or even an "expand" option to view the Code Input in a larger window.

---

### Behavior

#### Language

The Code Input can be rendered with a pre-defined language or with a language selector, depending on the use case. A predefined language is useful for cases like the Custom CSS panel, while a language selector is useful for the Code Block editor.

##### Supported languages

See CodeMirror's documentation for the full list of supported languages.

---
## Examples


### Basic

```jsx
{
const [value, setValue] = useState(Text.of(['']));
  const [language, setLanguage] = useState([]);
  const [displaySource, setDisplaySource] = useState(false);
  const extensions = useMemo(
    () => (language ? [basicSetup, language] : [basicSetup]),
    [language]
  );

  return (
    <Grid.Container>
      <Grid.Item columns={12} mb={2}>
        <RosettaText.Label>
          Page Header Code Injection
        </RosettaText.Label>
      </Grid.Item>
      <Grid.Item columns={12}>
        <CodeInput
          contentAttributes={{
            'aria-label': 'code editor',
          }}
          extensions={extensions}
          isDisabled={false}
          onBlur={() => console.log('blur')}
          onChange={setValue}
          onFocus={() => console.log('focus')}
          placeholder={'Enter your code'}
          value={value}
        />
      </Grid.Item>
      <Grid.Item columns={[12, 6]}>
        <Dropdown
          aria-label={'Language'}
          onChange={setLanguage}
          value={language}
        >
          {languages.map(({ label, value: v }) => (
            <Dropdown.Option key={label} value={v}>
              {label}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </Grid.Item>
      <Grid.Item columns={[12, 6]}>
        <FocusManagedCell
          as="label"
          interiorAccessory={
            <Toggle
              checked={displaySource}
              onChange={setDisplaySource}
              value={displaySource.toString()}
            />
          }
          label={'Display source'}
        />
      </Grid.Item>
      <Grid.Item columns={12}>
        <RosettaText.Caption>
          
            Odio faucibus ut pretium vulputate. At sed venenatis mauris libero
            varius ut fringilla et sed. Lacus egestas urna montes, vehicula
            volutpat.
          
        </RosettaText.Caption>
      </Grid.Item>
    </Grid.Container>
  );
}
```

### With Theme Switching

```jsx
{
  const [value, setValue] = useState(() =>
    Text.of(['const foo = () => {', '  bar();', '};'])
  );
  const extensions = useMemo(() => [basicSetup, javascript()], []);
  const [theme, setTheme] = useState(rosetta.light);
return (
    <ThemeContext.Provider theme={theme}>
      <Dropdown
        bg="base"
        label={'Theme'}
        onChange={setTheme}
        value={theme}
      >
        <Dropdown.Option value={rosetta.light}>
          {'White'}
        </Dropdown.Option>
        <Dropdown.Option value={rosetta.dark}>
          {'Darkest'}
        </Dropdown.Option>
      </Dropdown>
      <CodeInput
        contentAttributes={{
          'aria-label': 'Code Editor',
        }}
        extensions={extensions}
        onChange={setValue}
        placeholder={'Enter your code'}
        value={value}
      />
    </ThemeContext.Provider>
  );
}
```