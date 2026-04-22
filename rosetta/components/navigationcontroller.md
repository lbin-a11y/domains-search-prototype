# Navigation Controller

Creates navigation between panels and retains navigation history within the component.

## Usage

Navigation Controller is a utility that creates the back and forth navigation in Squarespace's sidebar.

There isn't a visual representation that would make sense in Figma, so Navigation Controller is not present in the Rosetta Figma libraries.

## Examples

### Push and pop panels

```jsx
const Panel = ({ pop, push, index = 0 }) => (
  <div>
    <h1>Panel {index}</h1>
    <button disabled={index === 0} onClick={pop}>
      Pop Panel
    </button>
    <button
      onClick={() =>
        push({
          title: 'Panel ' + (index + 1),
          backTitle: 'Back to Panel ' + (index + 1),
          component: <Panel index={index + 1} />,
        })
      }
    >
      Push Panel
    </button>
  </div>
);

<NavigationController>
  <Panel />
</NavigationController>
```

### With scrollable content

```jsx
const Panel = ({ index = 0, pop, push }) => (
  <NavigationController.Content style={{ overflow: 'auto', height: 200 }}>
    <NavigationController.ContentTitle is="h1">
      Panel {index}
    </NavigationController.ContentTitle>
    <button disabled={index === 0} onClick={pop}>
      Pop Panel
    </button>
    <button
      onClick={() =>
        push({
          title: 'Panel ' + (index + 1),
          backTitle: 'Back to Panel ' + (index + 1),
          component: <Panel index={index + 1} />,
        })
      }
    >
      Push Panel
    </button>
    {Array.from(Array(5)).map((_, i) => (
      <div key={i} style={{ borderTop: '1px solid black', height: 100 }}>
        {i * 100}px
      </div>
    ))}
  </NavigationController.Content>
);

<NavigationController title="Panel 0">
  <Panel />
</NavigationController>
```

### Left and right bar buttons

```jsx
const Panel = ({ setLeftBarButton, setRightBarButton }) => (
  <div>
    <button onClick={() => setLeftBarButton(<Button label="Left button" />)}>
      Set left bar button
    </button>
    <button onClick={() => setRightBarButton(<Button label="Right button" />)}>
      Set right bar button
    </button>
  </div>
);

<NavigationController>
  <Panel />
</NavigationController>
```
