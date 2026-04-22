# Breadcrumbs

Breadcrumbs are links that represent an absolute path to the current page through the site navigation stack.

## Guidance

### General guidance

Breadcrumbs are links that show the path to the current page in the site navigation. They help users understand where they are, make a mental map of our product, and navigate through complex workflows.

Prefer using breadcrumbs on screens nested at least three levels (L1–L3) deep and displaying all pages above the current page in the site hierarchy.

### Content

#### Which pages to include

Include all the pages preceding the current page up to L1 on mobile and L2 on desktop. On desktop, also include the current page title.

Breadcrumb destinations may not be implemented as stand-alone pages. For example, Settings appears in a large dialog, but each Settings screen within the dialog feels like an independent place.

> **Only use hierarchical paths.** Do not generate breadcrumbs dynamically based on the user's path. This is technically difficult and prevents building a reliable mental model of where to find things in the future.

#### Labels

To make it easier to navigate, use the page titles as labels for your breadcrumb. The only exception is when you have content items like customer profiles or invoices in a data collection. In that case, use the singular version of the content type as the label, like _.../Profile_ or _.../Invoice_.

Breadcrumb labels should use title case, following platform capitalization guidelines for page titles and navigation.

### Accessibility

As a navigation item, accessibility is especially important to keep in mind when implementing breadcrumbs.

#### Target size

For accessibility, breadcrumb links must be large enough to be easily clicked or tapped by users with low vision or motor control issues. To ensure this, breadcrumb items and truncation triggers have been designed with a minimum 36×36 CSS pixel target and clear space between items. Do not adjust element size or spacing as it may reduce accessibility.

#### Assistive technology

When customizing menu item props, use semantic elements and labeling so they are handled properly by assistive technology.

#### Opening linked pages

Open breadcrumbs in the current window or tab. Opening internal links like breadcrumbs in a new tab or window is unconventional and potentially confusing to all users, but can be especially disorienting to screen reader users.

## Usage

### Anatomy

1. **L2 ancestor** — An "ancestor" is any page that precedes the current view in our navigation hierarchy. The L2 ancestor — or second-level ancestor — is the first page in this chain after top-level navigation items.
2. **Truncation trigger** — When there's not adequate space to show all steps in the navigation hierarchy, hide intermediary steps behind a touchable ellipses that reveals the pages that couldn't fit.
3. **Separator** — The separator is a decorative, non-interactive element that delineates breadcrumbs. It should be hidden from screen readers.
4. **Parent page** — The parent page is the screen immediately preceding the current page in the nested navigation hierarchy. A link to the current page's parent is always present in the breadcrumb menu.
5. **Current page** — The page the user is actively viewing. It's included in the breadcrumb menu on large screens to make the relationship between these links as clear as possible. The current page is not a link and has no interactive state. It should be skipped by keyboard focus and screen readers as it's redundant with the page title.
6. **Back link** — Action in the sidebar nav toolbar that brings the user up a level in the navigation hierarchy. This appears as part of the mobile page header, and is not a part of the breadcrumb pattern.
7. **L1 ancestor** — The L1 ancestor is the top level section of the main Config navigation under which the current screen sits ("Commerce," "Marketing," "Settings," etc.).
8. **Breadcrumb overflow menu** — Opened by the truncation trigger, this menu contains all pages between the first and last menu item that are not exposed by default.

---

### Composition

On desktop, breadcrumbs should be the first element on the screen, immediately before the page title. On mobile, they appear between the back link and page title.

The space around breadcrumbs is not built into the component as it may be affected by white space added to the page or header container.

| Margin     | Desktop   | Mobile    |
| ---------- | --------- | --------- |
| Top        | space[5]  | space[3]  |
| Left/right | space[6]  | space[3]  |
| Bottom     | 1.5rem    | space[1]  |

### Behavior

#### Truncation

##### Menu truncation

On large screens, truncate anything above three breadcrumbs to ensure the L2 ancestor, parent, and current page remain visible. On mobile, truncate everything between the L1 ancestor and parent, hiding the current page breadcrumb.

###### Displaying truncated items

Truncated items are revealed by the truncation trigger.

Only one truncation trigger is shown, no matter how many levels of navigation have been truncated, but behavior differs slightly when there's a single hidden page or multiple.

###### Single truncated menu item

When there is only one truncated navigation level, the truncation trigger acts as a link to that item. Hover or keyboard focus reveals a tooltip with that page's title. Click or hitting enter while focused navigates the user to that page.

###### Multiple truncated menu items

When there are multiple truncated navigation levels, the truncation trigger opens a dropdown menu on hover or keyboard focus.

##### Menu item truncation

To prevent wrapping, breadcrumb labels may be truncated as well. Menu item truncation is based on the width of the component, available screen width, and number of breadcrumbs.

On desktop, truncated links are also accompanied by a tooltip that displays the full label on hover for clarity.

#### Responsive

##### Content

On mobile, the breadcrumb menu starts with the L1 ancestor instead of L2. That's because on desktop, the L1 will remain visible in the fixed global navigation.

Also, the current page is hidden from the Breadcrumb Menu in favor of showing the Parent page, which gives users an easy way to jump up one level in the navigation.

##### Mobile truncation

On mobile, regardless of truncated navigation items, the truncation trigger opens a dropdown to avoid sending users to an unexpected page.

The sizing and alignment of the menu also changes to better fit the space.

---

### Mapping hierarchy levels to `crumbs`

The `crumbs` array should include **all ancestor pages from L1 through the parent page**. `currentPage` is always the currently viewed page and is passed separately.

On desktop, the component automatically hides the first crumb (the L1 ancestor) because it is assumed visible in the global navigation. This means:

- `crumbs` must have **at least 2 items** for any ancestor link to appear on desktop.
- A single-crumb array will render with no visible ancestor links on desktop — only `currentPage` text will show.

For a page at path **Commerce > Orders > Order #12345**:

```jsx
<Breadcrumbs
  aria-label="Navigation"
  crumbs={[
    { children: "Commerce", href: "#" },  // L1 — auto-hidden on desktop
    { children: "Orders", href: "#" },     // parent — visible
  ]}
  currentPage={{ children: "Order #12345" }}
/>
```

For a page at path **Developer Apps > Name of a Very Cool App** (only 2 levels), include the site-level L1 ancestor so the parent link stays visible:

```jsx
<Breadcrumbs
  aria-label="Navigation"
  crumbs={[
    { children: "Home", href: "#" },            // L1 — auto-hidden on desktop
    { children: "Developer Apps", href: "#" },   // parent — visible
  ]}
  currentPage={{ children: "Name of a Very Cool App" }}
/>
```

---
## Examples


### With Two Crumbs

```jsx
{
return (
    <Box p={6}>
      <Breadcrumbs
        aria-label={'With two crumbs'}
        crumbs={[...[
    { children: "First", href: "#", onClick: () => {} },
    { children: "Second", href: "#", onClick: () => {} },
    { children: "Third", href: "#", onClick: () => {} },
    { children: "Fourth", href: "#", onClick: () => {} },
    { children: "Fifth", href: "#", onClick: () => {} },
  ].slice(0, 2)]}
        currentPage={{ children: "Current Page" }}
      />
    </Box>
  );
}
```

### With Three Crumbs

```jsx
{
return (
    <Box p={6}>
      <Breadcrumbs
        aria-label={'With three crumbs'}
        crumbs={[...[
    { children: "First", href: "#", onClick: () => {} },
    { children: "Second", href: "#", onClick: () => {} },
    { children: "Third", href: "#", onClick: () => {} },
    { children: "Fourth", href: "#", onClick: () => {} },
    { children: "Fifth", href: "#", onClick: () => {} },
  ].slice(0, 3)]}
        currentPage={{ children: "Current Page" }}
      />
    </Box>
  );
}
```

### With Five Crumbs

```jsx
{
return (
    <Box p={6}>
      <Breadcrumbs
        aria-label={'With five crumbs'}
        crumbs={[...[
    { children: "First", href: "#", onClick: () => {} },
    { children: "Second", href: "#", onClick: () => {} },
    { children: "Third", href: "#", onClick: () => {} },
    { children: "Fourth", href: "#", onClick: () => {} },
    { children: "Fifth", href: "#", onClick: () => {} },
  ].slice(0, 5)]}
        currentPage={{ children: "Current Page" }}
      />
    </Box>
  );
}
```