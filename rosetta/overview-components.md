## Components

IMPORTANT: Do not delete ANY Rosetta packages. They have dependencies on each other and all of them MUST be kept.

Always prefer components from Rosetta packages (imported from @sqs/rosetta) if they are available. Each component has a guidelines file that contains helpful examples and additional context for you to use. You must follow all relevant instructions.

Here are the guidelines files and additional guidelines for the Rosetta components:

| Component            | Overview                                                                                                                                                  | Guidelines file                                               | Package       | /next import? |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------- | ------------- |
| Box                  | Basic component of Rosetta design system often used to create cross-platform interfaces with minimal effort                                               | [box.md](components/box.md)                                   | Primitives    | No            |
| Button               | Buttons are clickable elements used to perform an action                                                                                                  | [button.md](components/button.md)                             | Primitives    | No            |
| Collapsible          | The collapsible component is used to put long sections of information under a block that users can expand or collapse.                                    | [collapsible.md](components/collapsible.md)                   | Primitives    | No            |
| Field                | Field is a foundational form component that provides structure, accessibility, and state management for individual form inputs                            | [field.md](components/field.md)                               | Primitives    | No            |
| Fieldset             | Fieldset is a foundational form component that groups related form inputs together with a semantic container                                              | [fieldset.md](components/fieldset.md)                         | Primitives    | No            |
| Flex                 | Extension of Rosetta Box. Sets display to "flex," providing all CSS flexbox properties.                                                                   | [flex.md](components/flex.md)                                 | Primitives    | No            |
| Radio                | Radio buttons allow users to select one option from a group of related options.                                                                           | [radio.md](components/radio.md)                               | Primitives    | Yes           |
| Text                 | Component that renders different text styles (e.g., body, caption etc.).                                                                                  | [text.md](components/text.md)                                 | Primitives    | No            |
| Touchable            | Container providing our common visual feedback for clickable elements.                                                                                    | [touchable.md](components/touchable.md)                       | Primitives    | No            |
| ActivityIndicator    | The Activity Indicator shows the progression of a system operation                                                                                        | [activityindicator.md](components/activityindicator)          | Elements      | No            |
| BackButton           | Special button for navigating to the previous section in Panels and Modals                                                                                | [backbutton.md](components/backbutton.md)                     | Elements      | No            |
| Badge                | Badge is a simple component for marking UI with status labels like 'New', 'Beta', or 'Recommended'                                                        | [badge.md](components/badge.md)                               | Elements      | No            |
| Card                 | A container that includes concise content, with a flexible design                                                                                         | [card.md](components/card.md)                                 | Elements      | No            |
| Cell                 | Cells provide a base for common layouts                                                                                                                   | [cell.md](components/cell.md)                                 | Elements      | No            |
| Checkbox             | Checkboxes allow users to select one or more items from a list of options, or to mark something as complete                                               | [checkbox.md](components/checkbox.md)                         | Elements      | Yes           |
| Chip                 | Chips are a button-like affordance that can be used to display or manage status or other information associated with a piece of content                   | [chip.md](components/chip.md)                                 | Elements      | No            |
| DateInput            | Date Inputs allow users to enter localized date data                                                                                                      | [dateinput.md](components/dateinput.md)                       | Elements      | No            |
| Divider              | A thin line that groups and separates content in lists and layouts                                                                                        | [divider.md](components/divider.md)                           | Elements      | No            |
| Grid                 | The Grid is a container-based system for organizing layout                                                                                                | [grid.md](components/grid.md)                                 | Elements      | No            |
| Image                | A placeholder for loading images                                                                                                                          | [image.md](components/image.md)                               | Elements      | No            |
| Modal                | **Deprecated.** Use Dialog, BasicDialog, or Drawer instead. See [Dialogs](components/dialogs.md) and [Drawer](components/drawer.md)                       | [modal.md](components/modal.md)                               | Elements      | No            |
| NumberInput          | Number Inputs allow users to enter and edit numbers                                                                                                       | [numberinput.md](components/numberinput.md)                   | Elements      | No            |
| OverflowBox          | A container with pagination that reveals or hides overflowing content                                                                                     | [overflowbox.md](components/overflowbox.md)                   | Elements      | No            |
| PopOver              | Small floating Modal that displays context information after user action (e.g. Button click). Modal can be anchored to a Button, Text, etc                | [popover.md](components/popover.md)                           | Elements      | No            |
| ProgressIndicator    | A track that shows the progression of a task. Progress Indicators are not interactive                                                                     | [progressindicator.md](components/progressindicator.md)       | Elements      | No            |
| Reveal               | Reveal is a generic, flexible component that expands or collapses content                                                                                 | [reveal.md](components/reveal.md)                             | Elements      | No            |
| SegmentedControl     | Segmented Control is a group of related buttons that acts as a switch; only one option can be selected at a time                                          | [segmentedcontrol.md](components/segmentedcontrol.md)         | Elements      | No            |
| Sheet                | Sheet — also known as Sliding Sheet — is a modal that is unique to mobile. It slides up from the bottom of the screen                                     | [sheet.md](components/sheet.md)                               | Elements      | No            |
| Skeleton             | Skeleton is a placeholder for content while a page loads                                                                                                  | [skeleton.md](components/skeleton.md)                         | Elements      | No            |
| Slider               | Sliders allow the user to select a value within a defined range                                                                                           | [slider.md](components/slider.md)                             | Elements      | Yes           |
| Stack                | A utility component that manages spacing behavior between a group of components                                                                           | [stack.md](components/stack.md)                               | Elements      | No            |
| StepIndicator        | The Step Indicator is designed to show progress through a series of steps                                                                                 | [stepindicator.md](components/stepindicator.md)               | Elements      | No            |
| Tabs                 | Tabs organize content across different panes. The component allows a user to navigate between different sets of content from one area                     | [tabs.md](components/tabs.md)                                 | Elements      | No            |
| TextInput            | Text Inputs allow users to enter and edit text. The component also accepts all HTML input props                                                           | [textinput.md](components/textinput.md)                       | Elements      | Yes           |
| TextLink             | Component that is activated by clicking or tapping on highlighted text, pointing the user to another location                                             | [textlink.md](components/textlink.md)                         | Elements      | No            |
| Textarea             | A text input that expands for multiple lines of text. Input can also be configured to display a character count                                           | [textarea.md](components/textarea.md)                         | Elements      | Yes           |
| TimeInput            | Time Inputs allow users to enter localized time data. Composed of focusable segments that support keyboard input                                          | [timeinput.md](components/timeinput.md)                       | Elements      | No            |
| TitleTransition      | Container that applies panel titles to header after a scroll transition                                                                                   | [titletransition.md](components/titletransition.md)           | Elements      | No            |
| Toast                | A temporary dialog that appears at the bottom of a viewport after a user takes an action                                                                  | [toast.md](components/toast.md)                               | Elements      | No            |
| Toggle               | A control that is used to quickly switch between two possible states                                                                                      | [toggle.md](components/toggle.md)                             | Elements      | Yes           |
| Tooltip              | Small dialogs that provide additional information upon hover or focus. The information should be contextual and useful                                    | [tooltip.md](components/tooltip.md)                           | Elements      | No            |
| Accordion            | An accordion expands or collapses a grouped list of items                                                                                                 | [accordion.md](components/accordion.md)                       | Compositions  | No            |
| ActionBar            | A bar that allows users to perform single or multiple actions on items. Often used with Tables for batch actions                                          | [actionbar.md](components/actionbar.md)                       | Compositions  | No            |
| ActionList           | An Action List displays a list of secondary actions to the user that are concealed either because of space constraints, or to limit distractions          | [actionlist.md](components/actionlist.md)                     | Compositions  | No            |
| AddressInput         | Input component that uses Google to search for addresses                                                                                                  | [addressinput.md](components/addressinput.md)                 | Compositions  | No            |
| AlertDialog          | A Modal that is used to request confirmation of the terms or consequences of a user-selected action                                                       | [alertdialog.md](components/alertdialog.md)                   | Compositions  | No            |
| AppCard              | A modal for mobile devices that prompts the user to install Squarespace apps                                                                              | [appcard.md](components/appcard.md)                           | Compositions  | No            |
| Banner               | Component that displays important messages with optional actions, available in multiple variants (default, info, success, error, caution)                 | [banner.md](components/banner.md)                             | Compositions  | No            |
| Breadcrumbs          | Breadcrumbs are links that represent an absolute path to the current page through the site navigation stack                                               | [breadcrumbs.md](components/breadcrumbs.md)                   | Compositions  | No            |
| ChipManager          | A combobox pattern that displays user-entered text as a highlighted chip. Custom composition — not a packaged Rosetta component                           | [chipmanager.md](components/chipmanager.md)                   | N/A (Pattern) | No            |
| Disclosure           | A Cell with a label and chevron that pushes into the next panel. Custom composition — not a packaged Rosetta component                                    | [disclosure.md](components/disclosure.md)                     | N/A (Pattern) | No            |
| CodeInput            | The Code Input uses the CodeMirror 6 library to allow users to type code with rich features, such as syntax highlighting                                  | [codeinput.md](components/codeinput.md)                       | Compositions  | No            |
| ColorPicker          | Color Picker allows users to select or input a color value                                                                                                | [colorpicker.md](components/colorpicker.md)                   | Compositions  | No            |
| Combobox             | Input that allows users to select from a list of options by typing to filter and search                                                                   | [combobox.md](components/combobox.md)                         | Compositions  | No            |
| DatePicker           | A calendar for single date or date range selection                                                                                                        | [datepicker.md](components/datepicker.md)                     | Compositions  | No            |
| Dialogs              | Dialogs are temporary UI windows that appear on top of the main interface to prompt users for input, provide information or require a decision to proceed | [dialogs.md](components/dialogs.md)                           | Compositions  | No            |
| DirectoryTree        | Interactive menu for navigating hierarchically nested content groupings                                                                                   | [directorytree.md](components/directorytree.md)               | Compositions  | No            |
| Dropdown             | Collapsible/expandable list for single selection by user                                                                                                  | [dropdown.md](components/dropdown.md)                         | Compositions  | Yes           |
| KeyFigures           | Key Figures are rows of cards that highlight the most relevant and actionable data within a product area, feature, or record                              | [keyfigures.md](components/keyfigures.md)                     | Compositions  | No            |
| NavDialog            | Modal with a navigation menu and a content panel, often used for settings                                                                                 | [navdialog.md](components/navdialog.md)                       | Compositions  | No            |
| NavMenu              | Menu used for navigation; often in left panel of the Squarespace CMS                                                                                      | [navmenu.md](components/navmenu.md)                           | Compositions  | No            |
| NavigationController | Creates navigation between panels and retains navigation history within the component                                                                     | [navigationcontroller.md](components/navigationcontroller.md) | Compositions  | No            |
| PageHeader           | Page Header is a composable structure for the tops of pages including page navigation, title, subtitle content, actions, and alert banner                 | [pageheader.md](components/pageheader.md)                     | Compositions  | No            |
| Search               | Search allows users to find relevant content by typing in keywords                                                                                        | [search.md](components/search.md)                             | Compositions  | No            |
| Table                | Tables display large amounts of data in rows and columns, and allow the user to quickly sort and compare the data                                         | [table.md](components/table.md)                               | Compositions  | No            |
| Toolbox              | A flexible quick action bar for contextual editing                                                                                                        | [toolbox.md](components/toolbox.md)                           | Compositions  | No            |
| Drawer               | A static, full screen window for focused workflows. Supports steps (wizard), side nav, side sheet, and guidance panel variants                            | [drawer.md](components/drawer.md)                             | Compositions  | No            |

IMPORTANT: do not specify a className property on any Rosetta components, as this will break the component. You should avoid overriding styling. Where strictly necessary, use an sx prop.

### /next versioning

As we introduce new components and deprecate old ones, we introduce a versioning system using subpath exports. If a component has a /next import, you should always use the /next version.

A standard import may look like:

```jsx
import { Checkbox } from "@sqs/rosetta-elements";
```

But for /next versions, the import will look like:

```jsx
import { Checkbox } from "@sqs/rosetta-elements/checkbox/next";
```

## Organization and packages

Rosetta includes a number of packages and patterns with different purposes, that together comprise the design system.

The packages listed below are all part of the Rosetta design system, and are listed by their level of composition.

```json
{
	"@sqs/rosetta-compositions": "^12.0.0",
	"@sqs/rosetta-dashboard": "^12.0.0",
	"@sqs/rosetta-elements": "^12.0.0",
	"@sqs/rosetta-icons": "^12.0.0",
	"@sqs/rosetta-feature-gate": "^12.0.0",
	"@sqs/rosetta-glyphs": "^12.0.0",
	"@sqs/rosetta-payment-icons": "^12.0.0",
	"@sqs/rosetta-primitives": "^12.0.0",
	"@sqs/rosetta-styled": "^12.0.0",
	"@sqs/rosetta-themes": "^12.0.0",
	"@sqs/rosetta-utilities": "^12.0.0"
}
```

### Components

Components are the building blocks of the Rosetta design system. Each component is designed and coded for a specific user interface, whether a simple button, or a complex table that includes search and filters. The Rosetta component packages below have a peer dependency on the Styled package.

1. To load default styles for Rosetta components
2. To load the [feature](https://design-platform.squarespace.net/docs/develop/tool-packages/styled) that allows you to reset default styles of a component

#### Primitives

Primitives are the simplest components in the Rosetta design system because as stand-alone components, they don't compose other components. For example, a simple [Button](https://design-platform.squarespace.net/docs/components/primitives/Button).

#### Elements

The components in Elements are the first in Rosetta to compose other components. Specifically, Elements only compose Primitives and/or native elements like an HTML div. Most components within the Rosetta design system are Elements.

#### Compositions

Compositions are the most complex components exported by Rosetta since they compose many Primitives and/or Elements to provide functionality in a **single** component.

### Styling

Style packages define the visual styles for the Rosetta design system.

#### Tokens

In order to maintain a scalable and consistent visual system for UI development, Rosetta Tokens provide constant values for CSS props. For example hex values for `color` or pixel values for `space`. Tokens work in tandem with Rosetta Themes.

(Using Rosetta Tokens directly in an app is not recommended. Doing so may result in unexpected styles. Please refer to Rosetta Themes variables instead.)

### Themes

Themes let you switch the look of your app while being aligned with Squarespace branding. This is because every Rosetta Theme provides a *subset* of [Rosetta Tokens](https://design-platform.squarespace.net/docs/develop/style-packages/tokens#usage) for a certain visual style; for example, "Light" or "Dark".

In addition, Rosetta's React JS components use Themes to apply styles during runtime.

### Tools

Tool packages provide features that assist the Rosetta design system, but they can also be used independently. In other words, an application that doesn’t use Rosetta can use these packages. Packages don't compose anything.

#### Styled

Rosetta Styled provides a consistent API to create CSS-in-JS powered React components across web and native platforms.

Specifically, Styled is an abstraction package that hides details of underlying CSS-in-JS libraries.

#### Utilities

The Rosetta Utilities package is a collection of components and functions that provide no visual representation, but they inform visual patterns. In many cases, these patterns are thought to be simple in a design tool, when in fact they require specific engineering in an interactive environment.

Some commonly used Utilities include [Breakpoint](https://design-platform.squarespace.net/docs/components/utilities/Breakpoint), and [Portal](https://design-platform.squarespace.net/docs/components/utilities/Portal).

## General Component Usage and Best Practices

### Styled system

[Styled System](https://web.archive.org/web/20230604024621/https://styled-system.com) provides a set of [utilities](https://web.archive.org/web/20230604024621/https://styled-system.com/api/#space) that perform one simple task: take prop inputs and a theme, then return a CSS compatible style object. The utilities can almost be thought of as theme resolver functions; however, they perform the additional task of performing shorthand prop transformations.

Though Rosetta uses other features of Styled System, an understanding of these utilities lends to more intuitive development when using [Rosetta Primitives](https://design-platform.squarespace.net/docs/develop/component-packages/primitives). These components are the only components that have direct access — via Styled System utilities — to the themes defined in the Themes package that they're built upon.

### Prefer Rosetta components over raw HTML

Never use raw HTML interactive elements when a Rosetta equivalent exists. Using raw HTML bypasses Rosetta's built-in accessibility, theming, and styling.

| HTML element               | Rosetta equivalent                                                        | Package               |
| -------------------------- | ------------------------------------------------------------------------- | --------------------- |
| `<button>`                 | `Button.Primary`, `Button.Secondary`, `Button.Tertiary`, or `Touchable.*` | Primitives            |
| `<a>`                      | `TextLink`                                                                | Elements              |
| `<input>`                  | `TextInput`, `NumberInput`, `Checkbox`, `Radio`, `Toggle`, etc.           | Elements              |
| `<textarea>`               | `Textarea`                                                                | Elements              |
| `<select>`                 | `Dropdown`                                                                | Compositions          |
| `<nav>` (vertical sidebar) | `NavMenu` (sub-section navigation only, not the global app nav)           | Compositions          |
| `<div>` with layout styles | `Box`, `Flex`, or `Grid`                                                  | Primitives / Elements |

`NavMenu` is for sub-section navigation inside panels (e.g. settings, page configuration) -- not for the global app sidebar (Home, Website, Commerce, etc.). For the global sidebar or any horizontal top navigation, compose from `Flex` or `Box` with `as="nav"` using Rosetta layout primitives.
