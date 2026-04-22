# Modal (Deprecated)

> **Deprecated.** Do not use `Modal` from `@sqs/rosetta-elements` directly. Use the higher-level **Dialogs** compositions instead: **Dialog**, **BasicDialog**, or **Drawer** from `@sqs/rosetta-compositions`. See [Dialogs](dialogs.md) and [Drawer](drawer.md).

`Modal` is the low-level overlay primitive that powers the Dialogs system internally (`Dialog.Modal`, `Drawer.Modal`). It should not be used directly in application code — the compositions provide structured Header/Body/Footer patterns, built-in accessibility, and consistent sizing out of the box.

## Migration guide

| Previous Modal usage | Use instead | Guidelines |
| --- | --- | --- |
| `sizes.700` / Alert-like confirmations | **BasicDialog** | [Dialogs](dialogs.md) |
| `sizes.750` (small, low-complexity flows) | **Dialog** (`size="small"`) | [Dialogs](dialogs.md) |
| `sizes.900` (medium-complexity flows) | **Dialog** (`size="medium"`, or `TwoColumns` layout) | [Dialogs](dialogs.md) |
| Multi-step wizard in a modal | **Dialog** (multi-step) for simple flows, **Drawer w/Steps** for complex flows | [Dialogs](dialogs.md), [Drawer](drawer.md) |
| `sizes.Inset` (medium-to-high complexity) | **Drawer** | [Drawer](drawer.md) |
| `sizes.Fullwidth` (full-screen) | **Drawer** | [Drawer](drawer.md) |
| Side sheet modal | **Drawer SideSheet** | [Drawer](drawer.md) |

## Accessibility

These accessibility requirements apply to all dialog-type components (Dialog, BasicDialog, Drawer) and are inherited from the underlying Modal primitive.

### Keyboard navigation

When a dialog opens, focus must move from the window to the dialog and remain locked inside the dialog until it is closed. If possible, the focus inside the dialog should land on a logical area, or the least destructive element.

Dialogs must have a button or "Close" control available to allow users to dismiss them. Additionally, pressing the Esc key should always close the dialog — without triggering a destructive action (e.g., hitting Esc should not confirm a deletion).

When the dialog closes, focus should return to the element it was on before the dialog was opened or, if that element is no longer available, to a different element, to keep focus order logical.

### Semantics

The dialog must have an accessible name and an optional description. Consider using `aria-labelledby` or `aria-describedby` on the dialog to avoid content duplication. Additionally, set `aria-modal="true"` on the dialog element.
