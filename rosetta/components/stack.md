# Stack

A utility component that manages spacing behavior between a group of components.

Stack renders child components as a `ul`, where each child is wrapped in an `li`.

## Usage

A Stack is an extension of the Flex component that allows control of the gaps between the child elements. The direction can either be column (vertical) or row (horizontal).

There isn't a visual representation that would make sense in Figma, so Stack is not present in the Rosetta Figma libraries.
## Examples


### Basic Use

```jsx
<Stack space={2}>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
    </Stack>
```

### With Divider

```jsx
<Stack divider={<Divider />} space={2}>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
    </Stack>
```

### With Row Direction

```jsx
<Stack direction="row" space={2}>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
    </Stack>
```

### With Row Direction And Vertical Divider

```jsx
<Stack direction="row" divider={<Divider.Vertical my={1} />} space={2}>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
    </Stack>
```

### With Functional Divider

```jsx
<Stack
      divider={({ index }: { index: number }) => <Divider height={index * 2} />}
      space={2}
    >
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
    </Stack>
```

### Single Item With Divider

```jsx
<Stack divider={<Divider />} space={10}>
      <Button.Tertiary>
        {'Button'}
      </Button.Tertiary>
    </Stack>
```

### Fragment As Children

```jsx
<Stack divider={<Divider />} space={4}>
      <>
        <Button.Tertiary>
          {'Button 1'}
        </Button.Tertiary>
        <Button.Tertiary>
          {'Button 2'}
        </Button.Tertiary>
        <Button.Tertiary>
          {'Button 3'}
        </Button.Tertiary>
      </>
      <Button.Tertiary>
        {'Button 4'}
      </Button.Tertiary>
    </Stack>
```