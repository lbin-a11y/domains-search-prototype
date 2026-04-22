# Toast

A temporary dialog that appears at the bottom of a viewport after a user takes an action.

## Guidance

### General guidance

A Toast is a localized pop up that can help users get real-time, relevant, and contextual information. It is best used to provide feedback on an action a user has taken. Use semantic variants wherever possible.

Toast should never contain a critical message as in some instances, it can be easily missed or quickly dismissed with no way for a user to retrieve that information. For important messages, opt to use a BasicDialog or Dialog instead.

**Do:**

- Use Toasts for non-disruptive feedback or confirmation of an action.
- Display one Toast at a time.
- Ensure all actions contained in a Toast are available elsewhere in the product.
- Opt for a Toast variant that can be dismissed by the user.
- Use semantic variants for their specific uses.

**Don't:**

- Display a Toast and open a Dialog simultaneously.
- Have multiple actions in a Toast; limit them to a maximum of two.
- Include an action Button for dismissing the Toast — rely on the default close button instead.

### Content

Keep the content concise while clearly calling out the affected UI elements.

Toasts should be written in present tense to aid with readability. If there are any actions, keep them short, preferably one verb. Don't include a period at the end of the content in the Toast.

Avoid possessive pronouns ("yours," "ours," etc.) to account for multiple user types/permissions, as the pronouns selected may not match the permission types of the user.

### Accessibility

Avoid using Toasts that disappear on their own after a certain amount of time — especially if they contain an action, as they can cause accessibility concerns for:

- Users with limited mobility who may not be able to navigate to the Toast fast enough to act.
- Those using screen magnification software who may miss the appearance of a Toast.

All Toasts containing a button must have consistent alt text that mentions the action.

## Usage

### Anatomy

1. **Message** — Short and clear message to the user.
2. **Close control** — Cross Large Icon; allows the user to manually dismiss the Toast.
3. **Action Button (optional)** — Only use for contextual user actions. Button should not disrupt or take the user out of the flow.

---

### Variants

#### Default

By default, Toasts appear for 4 seconds. The close control allows the user to manually remove Toasts from view.

#### Semantic

Toasts also have three semantic variants: success, error, and warning. Success messages communicate positive feedback or completion. Error messages indicate failures. Warnings indicate further attention or action.

#### Action

Toasts can include an action Button when appropriate. Only include an action in the Toast if the same action is available elsewhere in the product and is not critical. Keep the action label short, preferably one verb.

Avoid using multiple actions in a Toast, with a maximum of two. Do not include an action Button for dismissing the Toast — rely on the default close button instead.

Consider extending the display duration for a Toast containing an action.

---

### Specs

#### Mobile

| Property | Value                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Margin   | space[6] bottom, space[3] left and right                                                                           |
| Padding  | space[3] top and bottom, space[4] left and right                                                                   |
| Width    | 100% of viewport                                                                                                   |
| Height   | Set by message plus top and bottom padding of space[3]; height accounts for message text wrapping                  |

#### Desktop

| Property | Value                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Margin   | space[6] bottom, space[3] left and right                                                                                        |
| Padding  | space[3] top and bottom, space[4] left and right                                                                                |
| Width    | Set by message plus left and right padding of space[4], maximum of sizes.800                                                    |
| Height   | Set by message plus top and bottom padding of space[3]; height accounts for message text wrapping                               |

---

### Behavior

#### Display

Toasts appear at the bottom of the viewport, centered. They pop up and then sink back down after four seconds, by default.

---

## Content Design

Toasts must include text to communicate a message. The text should be written as concisely as possible while still being clear about what has happened or is happening. It's acceptable to use short phrases for Toasts that are communicating confirmation and error messages, but informative Toasts should use complete sentences.
## Examples


### Show Toast

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Foo Bar',
            'data-test': 'toast',
          })
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### Show Custom Toast

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show(({ remove }) => (
            <Toast key="hello" id={1} onClose={remove}>
              <Button onClick={() => remove(1)}>
                {'Custom escape hatch'}
              </Button>
            </Toast>
          ))
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### Show Toast With Long Text

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Knock! Knock! Whos there? Says. Says who? Says me, thats who!',
          })
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### Show Dismiss Update Toast

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  const ID = 'someRandomId';

  return (
    <>
      <Stack>
        <Button.Tertiary
          onClick={() =>
            toastRef?.show({
              id: ID,
              content: (
                <Text.Body data-test="toast-text">
                  {'Foo Bar'}
                </Text.Body>
              ),
              'data-test': 'toast',
            })
          }
        >
          {'Display Toast'}
        </Button.Tertiary>
        <Button.Tertiary
          onClick={() =>
            toastRef?.show({
              id: ID,
              content: (
                <Text.Body data-test="toast-text">
                  {'Foo Bar Updated'}
                </Text.Body>
              ),
            })
          }
        >
          {'Modify Toast'}
        </Button.Tertiary>
        <Button.Tertiary onClick={() => toastRef?.remove(ID)}>
          {'Remove Toast'}
        </Button.Tertiary>
      </Stack>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### No Duration

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Foo Bar',
            duration: null,
          })
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### With Custom React Content

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: <LogoSquarespace />,
            'data-test': 'toast',
          })
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### With Button Action

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Foo Bar',
            'data-test': 'toast',
            action: ({ remove }) => (
              <Button.Tertiary onClick={remove}>Undo</Button.Tertiary>
            ),
          })
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### Trigger Toast From Another Toast

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'On close, render another toast',
            'data-test': 'toast-1',
            onClose: (id) =>
              toastRef?.show({
                content: `new toast with id: ${id} `,
                'data-test': 'toast-2',
              }),
            action: ({ remove }) => (
              <Button.Tertiary
                data-test="toast-trigger-another-one"
                onClick={remove}
              >
                {'Another one - dj khaled'}
              </Button.Tertiary>
            ),
          })
        }
      >
        {'Display Toast'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```

### With Status Variants

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <Stack>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Default message',
            variant: 'default',
          })
        }
      >
        {'Display Default'}
      </Button.Tertiary>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Success message',
            variant: 'success',
          })
        }
      >
        {'Display Success'}
      </Button.Tertiary>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Warning message',
            variant: 'warning',
          })
        }
      >
        {'Display Warning'}
      </Button.Tertiary>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'Error Message',
            variant: 'error',
          })
        }
      >
        {'Display Error'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </Stack>
  );
}
```

### With Custom Icons

```jsx
{
  const [toastRef, setToastRef] = useState<ToastContainer | null>();
  return (
    <>
      <Button.Tertiary
        onClick={() =>
          toastRef?.show({
            content: 'This toast has a question mark circle icon',
            glyph: <QuestionMarkCircle />,
          })
        }
      >
        {'Display Toast with icon'}
      </Button.Tertiary>
      <Toast.Container ref={setToastRef} />
    </>
  );
}
```