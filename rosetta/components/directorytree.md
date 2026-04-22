# Directory Tree

Interactive menu for navigating hierarchically nested content groupings.

## Usage

### Anatomy

1. **Tab** — Top-level directories can be displayed as mutually exclusive (only one can be opened at a time) tabs. This can help users maintain focus when the top-level directories represent meaningfully different content or workflows.
2. **Glyph (Optional)** — Glyphs can be used to differentiate Directory Tree children. They can reflect the child's label or content type.
3. **Folder** — Folders contain nested subdirectories and assets. Folders are not mutually exclusive, meaning a user can have multiple folders open at the same time. Guidance for folders applies whether or not they use the Folder Glyph or are referred to as "folders" in the customer interface.
4. **Folder Arrow** — An affordance that signifies that a folder has nested subdirectories or assets.
5. **Label** — The name of the Directory Tree children. Labels can be determined by the Platform or customer as appropriate.
6. **Tree Item** — A document, asset, or other destination to which users can navigate through the Directory Tree.
7. **Accessory (Optional)** — A slot for static elements like Text or Chips, to display the number of items in a directory, status, file extension, or other supporting information.
8. **Nested Item** — A folder or tree item that has been organized under a folder or tab higher in the Directory Tree hierarchy.
9. **Unnested Item** — A tree item organized under the current folder or tab with no other nesting.

---

### Behavior

#### Interaction

##### Selecting and displaying content

The Directory Tree lets users navigate and view hierarchical data and content sets without leaving their current location in the product. Users can select a Directory Tree subdirectory or item to view by clicking, tapping, or keyboard shortcut.

##### Expanding and collapsing directories

When a user selects a tab or folder with nested children, it will both select the subdirectory as the current view and expand/collapse its children.

##### Indicating selected content

The selected child in the Directory Tree should stay in sync with the content currently visible in the workspace, even when users are navigating through links in the data or content set itself.

- Update content visible in the workspace based on Directory Tree selections.
- Do not change anything outside of the Directory Tree or workspace — such as Page Headers — based on selections.

#### Text Overflow

Labels that exceed the available space in the Directory Tree should be truncated to preserve scannability of the menu. The full value of truncated labels can be made visible in a tooltip on hover or focus, or as the title of the workspace view when selected.

- Keep accessory content visible.
- Avoid displaying so many levels of nesting in a Directory Tree that labels stop being useful for distinguishing content.

#### Scrolling

Directory Trees may extend as far down vertically as needed. They can also be put inside a container with a set height and vertical overflow scrolling.

- When both the Directory Tree and workspace have vertical overflow, scroll workspace content with the page and make the Directory Tree scrollable when hovered or focused.
- Avoid horizontal scrolling. Accessibility guidelines discourage scrolling along two axes within a single element. Instead, consider limiting the depth of the Directory Tree or using an alternative navigation pattern.

---

## Guidance

### General Guidance

Directory Trees allow easy navigation across potentially large data or content sets. Even when users can navigate through links in the content itself, Directory Trees can be a helpful alternative — letting them see more of the available pathways with less interaction.

---

### Composition

#### Layout

Directory Trees should appear to the left of the workspace where the selected content is displayed. Set a fixed width for the Directory Tree and keep workspace content fluid.

Internal spacing is handled by the component. Spacing around the Directory Tree should be set based on adjacent UI — ensuring adequate white space and strong visual alignment across the screen.

#### Workspace

The Directory Tree component provides the navigational structure only. The workspace in which selected content is displayed needs to be designed separately, based on the content and desired user experience.

- Use Rosetta guidelines and components as much as possible when designing the workspace.
- Consider including Breadcrumbs and Titles in the workspace for even greater navigability.
- Maintain a strong visual relationship between the Directory Tree and workspace.
- Signal when an action in the workspace will take users out of the Directory Tree structure.

#### Nesting

The folder arrow signals the presence of nested content. Only hide the arrow on directories that do not have nested content that can be expanded in the Directory Tree. Nested content is indented to distinguish between levels in the Directory Tree's hierarchy. Increase the indentation for each successive level in the Tree.

If adjusting default indentation for visual alignment, follow these guidelines:

- Align directory children's Glyphs to the start of their parent's text label.
- Align empty directories and unsorted items to the glyph of sibling directories, not the folder arrow.
- If a nested level does not use Glyphs, ensure the child text label is indented space[4] from the start of its parent's text label.

- Only hide the folder arrow on empty directory folders.
- Don't create custom nesting affordances.

#### Mobile

At mobile breakpoints, the Directory Tree label font size and spacing increases based on Rosetta's default text styling.

On mobile, Directory Trees can be displayed as the main content, hidden, or collapsed in a Sheet — depending on what's best for the user's experience.

---

### Content

Content items and folders should only appear in one location within the Directory Tree.

- Don't use Directory Trees to represent non-hierarchical content, like tags.
- Use filters when content is being found or browsed by non-hierarchical criteria.

---

### Accessibility

#### Interaction

Accessibility best practices discourage nesting interactive elements within larger interactive elements. Because each Directory Tree child acts as a single interactive element, avoid using the accessory slot for interactive buttons.

- Use static accessory components to convey valuable information not provided by the label.
- Don't nest interactive components inside Directory Tree children.

#### Keyboard Operation

Keyboard operability is built into the Directory Tree component. Users who navigate by keyboard can use the Tab, arrow, and space keys to use the Directory Tree.

#### Screen Readers

The component uses semantic elements, ARIA labels, and live descriptors to make the Directory Tree accessible to customers using screen readers. Glyphs in Directory Tree children are hidden from screen readers by default. Ensure any information communicated visually by the Glyph is also available in the adjacent label or accessory text.

- Don't use Directory Tree child Glyphs to convey information not conveyed in text labels or accessories.
- Make sure visual elements inside accessory components follow alt text requirements.

#### Visual Contrast

The default styling of the Directory Tree achieves accessible contrast between text, graphics, and their containers. Be mindful to maintain that contrast when customizing styles or accessory content.

- Use default styling for Directory children and accessory content whenever possible.
- Do not apply disabled styling to closed tabs or folders unless they are truly inoperable.

## Examples

### Basic use

`DirectoryTree` accepts a `treeData` object, `treeProps` (including a `treeId` and `rootItem`), and a `viewState` for controlling expanded items.

```jsx
// import { DirectoryTree } from '@sqs/rosetta-compositions/directorytree';

const treeData = {
  root: { data: { label: 'Root', glyph: null }, index: 'root', children: ['child1', 'child2'] },
  child1: { data: { label: 'Folder 1', glyph: null }, index: 'child1', children: ['leaf1', 'leaf2'] },
  child2: { data: { label: 'Folder 2', glyph: null }, index: 'child2', children: [] },
  leaf1: { data: { label: 'Item A', glyph: null }, index: 'leaf1' },
  leaf2: { data: { label: 'Item B', glyph: null }, index: 'leaf2' },
};

<DirectoryTree
  treeData={treeData}
  treeProps={{ treeId: 'tree-1', rootItem: 'root' }}
  viewState={{ 'tree-1': { expandedItems: ['child1'] } }}
/>
```

### Add and remove items dynamically

Use `DirectoryTree.StaticTreeDataProvider` and its `onDidChangeTreeDataEmitter` to reactively update the tree.

```jsx
import { useState } from 'react';
// import { Button, Flex } from '@sqs/rosetta-primitives';
// import { DirectoryTree } from '@sqs/rosetta-compositions/directorytree';

() => {
  const initialData = {
    root: { data: { label: 'Root', glyph: null }, index: 'root', children: ['child1', 'child2'] },
    child1: { data: { label: 'Item 1', glyph: null }, index: 'child1' },
    child2: { data: { label: 'Item 2', glyph: null }, index: 'child2' },
  };

  const dataProvider = new DirectoryTree.StaticTreeDataProvider(initialData);
  const [index, setIndex] = useState(3);

  const addItem = () => {
    const newKey = `child${index}`;
    initialData[newKey] = { data: { label: `Item ${index}`, glyph: null }, index: newKey };
    initialData.root.children.push(newKey);
    setIndex(index + 1);
    dataProvider.onDidChangeTreeDataEmitter.emit(['root']);
  };

  const removeItem = () => {
    if (initialData.root.children.length === 0) return;
    const removed = initialData.root.children.pop();
    delete initialData[removed];
    setIndex(index - 1);
    dataProvider.onDidChangeTreeDataEmitter.emit(['root']);
  };

  return (
    <>
      <Flex gap={2} mb={3}>
        <Button.Primary onClick={addItem}>Add Item</Button.Primary>
        <Button.Primary onClick={removeItem}>Remove Item</Button.Primary>
      </Flex>
      <DirectoryTree
        treeData={dataProvider}
        treeProps={{ treeId: 'tree-1', rootItem: 'root' }}
        viewState={{ 'tree-1': { expandedItems: ['child1', 'child2'] } }}
      />
    </>
  );
};
```
