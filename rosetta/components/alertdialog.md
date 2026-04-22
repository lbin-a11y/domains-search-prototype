# Alert Dialog

> **Deprecated:** This component has been deprecated. Please use the new, redesigned **BasicDialog** component. See [Dialogs](dialogs.md).

A dialog that is used to request confirmation of the terms or consequences of a user-selected action.

## Usage

### General guidance

An Alert Dialog is a type of dialog that confirms a user-selected action. They are purposefully disruptive and use an overlay to block the content behind until an action is selected.

---

### Anatomy

1. **Title** — Short phrase requesting confirmation or acknowledgement of user-selected action.
2. **Description** — Brief text explaining the effects or consequences of the action.
3. **Button Container** — Up to two Buttons; the primary action should be the rightmost Button.
4. **Checkbox** — An additional confirmation step used for agreements.

---

### Variants

#### Warning

The most common use of an Alert Dialog is to provide a warning when a user has selected an action that is irreversible (e.g. deleting changes).

Use a red danger Button to communicate that the primary action is irreversible or destructive. Pair it with a second Button that allows the user to cancel the action. This teaches the user how the system works (e.g. no automatic saving) and gives them a chance to go back and save, if desired.

#### Additional action

A Checkbox may be used in the Alert Dialog when it is convenient to combine relative actions.

#### Follow up

Using an Alert Dialog if an action is not permanent or reversible. Context around how to reverse an action should be provided in the previous screen. In rare cases, the follow up variant may be used to help provide additional context.

---

### Specs

| Property | Value                                                                       |
| -------- | --------------------------------------------------------------------------- |
| Width    | sizes.700, including space[6] left/right padding                            |
| Height   | Set by inner content, plus space[5] top padding and space[3] bottom padding |

---

### Behavior

#### Position

Alert Dialog should load in the center of the screen, with an overlay behind it to block access to the content behind.

#### Buttons

In the Button container, the hierarchy moves from right to left — the primary action Button goes on the far right. If the primary action is destructive, use a red danger Button. The cancel button, or secondary action, should be positioned on the left.

Alert Dialog should use a maximum of two Buttons. A "Learn more" Button or link should be provided on previous screens in order to avoid taking the user outside of the dialog action. Work with Content Design to resolve any other possible edge cases.

#### Overflow

Content in Alert Dialogs should be kept as concise as possible in all supported languages. If Button labels wrap, work with Content Design to reduce the number of words.

In cases where there is no solve for length, all content will wrap and the height of the dialog will grow. The Button container will also wrap, keeping the primary action in the bottom rightmost position.

#### With a Dialog

In cases where a confirmation is needed for a change in a Dialog or Drawer, it is acceptable to display a BasicDialog on top of it. Use a second overlay.

---

### Content guidance

- The action in the Alert Dialog title should correspond with the primary Button label.
- Warning variant should always be formatted as a question, i.e. "Discard changes?"
- Warning variant description should clearly state how the action cannot be undone or will result in lost content.
- The follow up variant should only be used in cases in which context cannot be provided on prior screen.

---

## Examples

### Basic use

`AlertDialog` is rendered inside a `Modal`. Pass `title`, `message`, and an array of `buttons` to configure the dialog.

```jsx
import { useState } from 'react';
// import { Button } from '@sqs/rosetta-primitives';
// import { Modal } from '@sqs/rosetta-elements';
// import { AlertDialog } from '@sqs/rosetta-compositions/alertdialog';

() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button.Primary onClick={() => setIsOpen(true)}>Delete item</Button.Primary>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <AlertDialog
          buttons={[
            (props) => (
              <AlertDialog.Button {...props} onClick={() => setIsOpen(false)}>
                Cancel
              </AlertDialog.Button>
            ),
            (props) => (
              <AlertDialog.Button
                {...props}
                color="warning"
                onClick={() => setIsOpen(false)}
              >
                Delete
              </AlertDialog.Button>
            ),
          ]}
          message="Are you sure you want to delete this item? This action cannot be undone."
          title="Delete Item?"
        />
      </Modal>
    </>
  );
};
```

### Three-button variant

```jsx
import { useState } from 'react';
// import { Button } from '@sqs/rosetta-primitives';
// import { Modal } from '@sqs/rosetta-elements';
// import { AlertDialog } from '@sqs/rosetta-compositions/alertdialog';

() => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button.Primary onClick={() => setIsOpen(true)}>Open dialog</Button.Primary>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <AlertDialog
          buttons={[
            (props) => (
              <AlertDialog.Button {...props} onClick={() => setIsOpen(false)}>
                Cancel
              </AlertDialog.Button>
            ),
            (props) => (
              <AlertDialog.Button {...props} onClick={() => setIsOpen(false)}>
                Discard
              </AlertDialog.Button>
            ),
            (props) => (
              <AlertDialog.Button
                {...props}
                color="warning"
                onClick={() => setIsOpen(false)}
              >
                Delete
              </AlertDialog.Button>
            ),
          ]}
          message="Are you sure you want to do that?"
          title="Delete Item?"
        />
      </Modal>
    </>
  );
};
```

### With custom children

Provide a render function as `children` for full control over the dialog content.

```jsx
import { useState } from 'react';
// import { Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Checkbox, Modal } from '@sqs/rosetta-elements';
// import { AlertDialog } from '@sqs/rosetta-compositions/alertdialog';

() => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      <Button.Primary onClick={() => setIsOpen(true)}>Open dialog</Button.Primary>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <AlertDialog buttons={[]}>
          {({ onRequestClose, titleId, descriptionId }) => (
            <>
              <Text.Subtitle as="h3" fontWeight="medium" id={titleId} m={0} mb={2} width="100%">
                Custom Header
              </Text.Subtitle>
              <Text.Body id={descriptionId} m={0} width="100%">
                Custom Body
              </Text.Body>
              <Text.Body as="label" css={{ display: 'inline-flex' }} mt={2}>
                <Checkbox
                  checked={confirmed}
                  mr={2}
                  onChange={() => setConfirmed(!confirmed)}
                  value="confirm"
                />
                I understand
              </Text.Body>
              <Flex flexWrap="wrap" justifyContent="flex-end" marginTop={2}>
                <Button
                  disabled={!confirmed}
                  onClick={() => onRequestClose?.()}
                  variant="tertiary"
                >
                  Confirm
                </Button>
              </Flex>
            </>
          )}
        </AlertDialog>
      </Modal>
    </>
  );
};
```
