# Nav Dialog

Dialog with a navigation menu and a content panel, often used for settings.

> **Note:** NavDialog currently uses the low-level `Modal` API internally. For new implementations, prefer using **Dialog** or **Drawer** with a NavMenu. See [Dialogs](dialogs.md) and [Drawer](drawer.md).

## Usage

### General guidance

Nav Dialog is a dialog that includes a Nav Menu to the left controlling a content area to the right. The component uses a medium-sized dialog to better display complex UI or account settings.

To consolidate the number of nav items, keep the following in mind:

- Break items into groups with section labels to aid in better information architecture.
- Prioritize items in long menus, where less important items are only visible to the user after scrolling.

---

### Anatomy

1. **Dialog**
2. **Overlay**
3. **Panel Toolbar** — Toolbar that holds the "Close" or "Save"/"Cancel" Buttons.
4. **Nav Menu** — Side navigation for the dialog.
5. **Panel title** — Title for the active section.
6. **Panel description** — Optional description for the active section.
7. **Content area** — Holds any components.

---

### Specs

See Dialogs and Nav Menu for specs on the dialog and menu used by Nav Dialog.

#### Mobile

To allow an optimal experience on smaller screens, the navigation and content panel are separated into separate views on mobile devices.

#### Desktop

On desktop, the Nav Menu and content area sit side-by-side. The width of the Nav Menu is 36% of the dialog.

---

### Behavior

#### Scrolling and overflow

Content can be longer than the height of the dialog itself. When this happens, the title should remain visible inside the Toolbar by using TitleTransition.

#### Responsiveness

Display dialogs in a Sheet on mobile devices.

#### Saving

By default, Nav Dialogs have a "Close" Button in the navigation Toolbar which is replaced by "Save" and "Cancel" Buttons once the user makes a change. These Buttons respond to changes in any content area.

If more granular save controls are needed, display a "Save" button in the content area Toolbar. This can be helpful to make form validation more prominent.

## Examples

### Basic use

`NavDialog` uses a `Provider` + `Body` + `Menu` + `Content` composition pattern. The menu panel drives navigation, and `Content` renders the active section.

```jsx
import { useState } from 'react';
// import { NavDialog } from '@sqs/rosetta-compositions/navdialog';
// import { Modal } from '@sqs/rosetta-elements';
// import { Button } from '@sqs/rosetta-primitives';

() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button.Primary onClick={() => setIsOpen(true)}>Open Nav Dialog</Button.Primary>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <NavDialog.Provider>
          <NavDialog.Body>
            <NavDialog.Menu>
              <NavDialog.MenuItem id="general">General</NavDialog.MenuItem>
              <NavDialog.MenuItem id="advanced">Advanced</NavDialog.MenuItem>
            </NavDialog.Menu>
            <NavDialog.Content id="general">
              General settings content here.
            </NavDialog.Content>
            <NavDialog.Content id="advanced">
              Advanced settings content here.
            </NavDialog.Content>
          </NavDialog.Body>
        </NavDialog.Provider>
      </Modal>
    </>
  );
};
```

### Hide back button

Pass `showBackButton={false}` to the `Provider` when back navigation is not needed.

```jsx
import { useState } from 'react';
// import { NavDialog } from '@sqs/rosetta-compositions/navdialog';
// import { Modal } from '@sqs/rosetta-elements';
// import { Button } from '@sqs/rosetta-primitives';

() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button.Primary onClick={() => setIsOpen(true)}>Open settings</Button.Primary>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <NavDialog.Provider showBackButton={false}>
          <NavDialog.Body>
            <NavDialog.Menu>
              <NavDialog.MenuItem id="profile">Profile</NavDialog.MenuItem>
              <NavDialog.MenuItem id="billing">Billing</NavDialog.MenuItem>
            </NavDialog.Menu>
            <NavDialog.Content id="profile">Profile content.</NavDialog.Content>
            <NavDialog.Content id="billing">Billing content.</NavDialog.Content>
          </NavDialog.Body>
        </NavDialog.Provider>
      </Modal>
    </>
  );
};
```
