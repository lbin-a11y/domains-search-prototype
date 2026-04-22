# Title Transition

Container that applies panel titles to header after a scroll transition.

## Usage

Title Transition is a utility that helps a title animate from the main content area to the Toolbar above it as the user scrolls.

There isn't a visual representation that would make sense in Figma, so Title Transition is not present in the Rosetta Figma libraries.

## Examples

### Basic use

`TitleTransition` uses a `Provider`/`Header`/`Content` pattern. The header title appears in the header once the content title scrolls out of view.

```jsx
// import { TitleTransition } from '@sqs/rosetta-elements/titletransition';
// import { Toggle } from '@sqs/rosetta-elements/toggle/next';
// import { Field, Flex } from '@sqs/rosetta-primitives';

() => {
  const [isActive, setActive] = useState(true);

  return (
    <>
      <Toggle.Root>
        <Toggle.Control
          checked={isActive}
          onChange={() => setActive(!isActive)}
          value="toggle"
        />
        <Toggle.Label>TitleTransition active</Toggle.Label>
      </Toggle.Root>

      <TitleTransition.Provider isActive={isActive} threshold={0.5}>
        <TitleTransition.Header>Header Title</TitleTransition.Header>
        <TitleTransition.Content>
          <TitleTransition.ContentTitle>Content Title</TitleTransition.ContentTitle>
        </TitleTransition.Content>
      </TitleTransition.Provider>
    </>
  );
};
```

### Switching between pages

When navigating between pages, the header title and content title update accordingly.

```jsx
// import { TitleTransition } from '@sqs/rosetta-elements/titletransition';
// import { Button, Flex } from '@sqs/rosetta-primitives';

() => {
  const PAGES = [
    { headerTitle: 'Page 1', contentTitle: 'First Page' },
    { headerTitle: 'Page 2' },
    { headerTitle: 'Page 3', contentTitle: 'Third Page' },
  ];
  const [page, setPage] = useState(0);
  const { headerTitle, contentTitle } = PAGES[page];

  return (
    <TitleTransition.Provider>
      <TitleTransition.Header>{headerTitle}</TitleTransition.Header>
      <TitleTransition.Content>
        <Flex gap={2}>
          <Button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            ← Go back
          </Button>
          <Button
            disabled={page === PAGES.length - 1}
            onClick={() => setPage(page + 1)}
          >
            Go forward →
          </Button>
        </Flex>
        {contentTitle && (
          <TitleTransition.ContentTitle>{contentTitle}</TitleTransition.ContentTitle>
        )}
      </TitleTransition.Content>
    </TitleTransition.Provider>
  );
};
```
