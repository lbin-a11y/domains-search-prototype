# Page Header

Page Header is a composable structure for the tops of pages including page navigation, title, subtitle content, actions, and alert banner.

## Usage

### Variants

Page Header design varies depending on two factors:

- Position in the platform hierarchy — or page level.
- The purpose of the page in the user experience — or page type.

#### Page level

Page level refers to how deep the page is nested within the site hierarchy. Level numbering begins at Home (level zero).

##### Level 1 (L1)

L1 pages appear in the primary navigation. Example: Website, Marketing, and Contacts.

##### Level 2 (L2)

L2 pages are nested under L1 pages. Example: Email Campaigns is an L2 under Marketing. Usually, L2s appear in the main navigation after their parent L1 has been visited.

##### Level 3 and beyond (L3+)

L3+ pages appear under L2 pages or deeper. Example: an L3 settings page may have an L4 page nested under it.

---

#### Page type Variants

##### Dashboard

Dashboard pages are landing pages that summarize data or activity. Dashboards generally appear on L0–L2 pages. Dashboards have larger page titles and are more likely to have a Primary CTA.

##### Analytics

Analytics pages host deeper data over a range of time. Analytics is currently its own L1 page with nested L2 pages. The main difference between Analytics pages and other Dashboards is a range control that changes the date range for which all data on the page is displayed.

##### Item Detail

Item Detail pages present a single item in a collection of data — such as a specific customer profile from the Contacts table — as actionable as possible. Item details are usually L3+ pages and include a spot for additional information about the item beneath the title.

##### Default pages

Not every page falls into the Dashboard/Item Detail framework. Those pages use the Default Page Header variant customized to their purpose and location in the site hierarchy. Default pages can be full-width or a constrained layout for lower density content like a form, settings, or list of information related to a single topic area.

---

### Anatomy

1. **Title** — A functional title that corresponds to the page's label in our navigation.
2. **Subtitle** — Provides additional page context, such as a brief explanation of the feature.
3. **Range Control (Analytics only)** — Dropdown that changes the period for which data is presented on the entire page (including across tabs).
4. **Page Actions (Optional)** — A small number of prioritized actions that can be represented as Primary, Tertiary, or Icon buttons.
5. **Breadcrumbs (L3+ only)** — Navigation required on L3 pages and deeper, representing the current page's place in the site navigation.
6. **Title Accessory (Optional)** — Component slot, primarily for L3+ pages, that requires additional information or functionality — such as showing status.
7. **Item Meta (Item Detail only)** — Optional slot for essential data connected to the content item, like date created or connected profiles.
8. **Banner (Optional)** — Slot for critical account- or item-level alerts, using the Rosetta Banner for system alerts or a Card for prioritized marketing messages.
9. **Mobile Toolbar (Separate component)** — Not part of the Page Header composition, but frequently paired with Page Header on mobile to provide a link to the current page's parent.

---

## Guidance

Page Headers are flexible enough to accommodate a wide array of customization. However, because they appear across the entire platform, some consistency is essential.

### Composition

#### Placement

Page Headers should — with very few exceptions — be the first element on the page and take up the full width of the Primary Content Area. Do not preempt the Page Header with account alerts or marketing.

#### Spacing

Spacing between content slots is handled by the Page Header composition. Within the Page Header, avoid customizing the spacing of standard elements like page title and subtitle.

Spacing below the Page Header is dependent on the page type and first piece of content. In general:

- Target whitespace equal to space[9] between Dashboard and Analytics Page Headers and content.
- Target whitespace equal to space[6] between Item Detail and Default Page Headers and content.
- Adjust space down if the first piece of content has additional whitespace built into it (such as Tabs above tables).
- On mobile, spacing can be reduced following Rosetta spacing guidelines.

---

### Content

The Page Header component is container-based with significant flexibility in its content. Be mindful of the following guidelines when designing your Page Header.

- Use succinct, descriptive labeling for page titles.
- Don't replace page titles with other, conversational headlines.
- Limit interactivity in subtitles to links or more information triggers — and avoid if possible.
- Don't make the page title interactive. Use one of the more customizable slots.
- Be mindful of space limitations; use an Action List when you need to offer more actions than can be exposed at one time.
- Don't add elements to the Page Actions that do not behave as buttons.

---

### Responsive Behavior

Responsive behavior of the content slots within the Page Header are handled by the component.

Responsive changes within content slots are handled by the components used to create that content. For example, the Page Header component will stack the title and subtitle over the page actions.

The mobile state of the Page Header can be customized to suit custom content or functionality.

- Consider customizing the mobile page actions to prioritize the primary action and move others to an Action List.
- Consider hiding subtitles on mobile to prioritize the visibility of content on small screens.
- You may use the mobile toolbar for page actions that make more sense above the page title, such as range controls.
- Avoid truncating Page Header content. If unavoidable, reveal truncated content in a Tooltip on hover, tap, or focus.

---

### Accessibility

The accessibility considerations for Page Header vary depending on the content placed inside of it. In general, using Rosetta components and following Squarespace accessibility guidelines will provide a strong foundation.

- Implement the page title as an h1 unless another element makes more sense as the page's h1 for screen reader users.
- Provide buttons with appropriate ARIA labels. For Icon Buttons, expose labels as tooltips.
- Ensure custom interactive elements, such as links in the page meta, have a target size of at least 36×36 CSS pixels and are usable by keyboard.
- Provide alternative text for media such as icons that convey information not captured in adjacent text.
## Examples


### L12 Dashboard Variant

```jsx
(
  <PageHeader>
    <PageHeader.Body>
      <PageHeader.Title
        subtitle="Modern solutions making it with Squarespace"
        title="L1-2 Page Title"
      />
      <PageHeader.Actions>
        <Breakpoint.Provider>
          <Breakpoint.Renderer
            render={{
              default: () => (
                <>
                  <Button.Tertiary>Button</Button.Tertiary>
                  <Button.Primary>Button</Button.Primary>
                  <Touchable.Element.Icon
                    aria-label="Print icon"
                    onClick={() => {}}
                  >
                    <Print />
                  </Touchable.Element.Icon>
                  <Touchable.Element.Icon
                    aria-label="Extra Options"
                    onClick={() => {}}
                  >
                    <Ellipses />
                  </Touchable.Element.Icon>
                </>
              ),
              'mobile-0': () => (
                <>
                  <Button.Primary>Button</Button.Primary>
                  <Touchable.Element.Icon
                    aria-label="Extra Options"
                    onClick={() => {}}
                  >
                    <Ellipses />
                  </Touchable.Element.Icon>
                </>
              ),
            }}
          />
        </Breakpoint.Provider>
      </PageHeader.Actions>
    </PageHeader.Body>
    <Banner>
      <Banner.Main>
        <Banner.Row>
          <Banner.Glyph />
          <Banner.Column>
            <Banner.Title>Title</Banner.Title>
            <Banner.Body>Description</Banner.Body>
          </Banner.Column>
        </Banner.Row>
        <Banner.Action>Action</Banner.Action>
      </Banner.Main>
      <Banner.Close />
    </Banner>
  </PageHeader>
)
```

### L2 Analytics Variant

```jsx
{
  const [value, setValue] = useState('last-30-days');
  return (
    <PageHeader>
      <PageHeader.Body>
        <PageHeader.Title
          subtitle="Modern solutions making it with Squarespace"
          title="L2 Analytics Page Title"
        />
        <PageHeader.Actions>
          <Breakpoint.Provider>
            <Breakpoint.Renderer
              render={{
                default: () => (
                  <>
                    <PageHeader.Dropdown
                      aria-label="Date range"
                      onChange={setValue}
                      value={value}
                    >
                      <Dropdown.Option value="last-30-days">
                        Last 30 days
                      </Dropdown.Option>
                    </PageHeader.Dropdown>
                    <Button.Tertiary>Button</Button.Tertiary>
                    <Touchable.Element.Icon
                      aria-label="Print Icon"
                      onClick={() => {}}
                    >
                      <Print />
                    </Touchable.Element.Icon>
                    <Touchable.Element.Icon
                      aria-label="Download Icon"
                      onClick={() => {}}
                    >
                      <Download />
                    </Touchable.Element.Icon>
                  </>
                ),
                'mobile-0': () => (
                  <>
                    <PageHeader.Dropdown onChange={setValue} value={value}>
                      <Dropdown.Option value="last-30-days">
                        Last 30 days
                      </Dropdown.Option>
                    </PageHeader.Dropdown>
                    <Touchable.Element.Icon
                      aria-label="Extra Options"
                      onClick={() => {}}
                    >
                      <Ellipses />
                    </Touchable.Element.Icon>
                  </>
                ),
              }}
            />
          </Breakpoint.Provider>
        </PageHeader.Actions>
      </PageHeader.Body>
      <Banner>
        <Banner.Main>
          <Banner.Row>
            <Banner.Glyph />
            <Banner.Column>
              <Banner.Title>Title</Banner.Title>
              <Banner.Body>Description</Banner.Body>
            </Banner.Column>
          </Banner.Row>
          <Banner.Action>Action</Banner.Action>
        </Banner.Main>
        <Banner.Close />
      </Banner>
    </PageHeader>
  );
}
```

### L3 Plus Details Variant

```jsx
{
return (
    <PageHeader
      breadcrumbs={{
        crumbs: [
          {
            href: '#1',
            children: 'L1 Parent',
          },
          {
            href: '#2',
            children: 'L2 Parent',
          },
          {
            href: '#3',
            children: 'Parent',
          },
        ],
        currentPage: {
          children: 'Current Page',
        },
      }}
    >
      <PageHeader.Body>
        <PageHeader.Title
          title={<Text.Title>L3+ Page Title</Text.Title>}
          titleAccessory={
            <Chip.Container status="success" sx={{ flex: '0 0 auto' }}>
              <CheckmarkCircle
                css={{ flex: '0 0 auto', marginRight: 4, color: 'inherit' }}
              />
              <Chip.Label>Status</Chip.Label>
            </Chip.Container>
          }
        >
          <PageHeader.ItemMeta flexDirection="column" gap={2}>
            <Flex gap={2}>
              <Text.Body>Maeve Washington</Text.Body>
              <TextLink href="#">View profile</TextLink>
            </Flex>
            <Text.Caption>May 3, 2023, 12:15 PM</Text.Caption>
          </PageHeader.ItemMeta>
        </PageHeader.Title>
        <PageHeader.Actions>
          <Breakpoint.Provider>
            <Breakpoint.Renderer
              render={{
                default: () => (
                  <>
                    <Button.Tertiary>Button</Button.Tertiary>
                    <Touchable.Element.Icon
                      aria-label="Print Icon"
                      onClick={() => {}}
                    >
                      <Print />
                    </Touchable.Element.Icon>
                    <Touchable.Element.Icon
                      aria-label="Download Icon"
                      onClick={() => {}}
                    >
                      <Download />
                    </Touchable.Element.Icon>
                  </>
                ),
                'mobile-0': () => (
                  <>
                    <Button.Tertiary>Button</Button.Tertiary>
                    <Touchable.Element.Icon
                      aria-label="Extra Options"
                      onClick={() => {}}
                    >
                      <Ellipses />
                    </Touchable.Element.Icon>
                  </>
                ),
              }}
            />
          </Breakpoint.Provider>
        </PageHeader.Actions>
      </PageHeader.Body>
      <Banner>
        <Banner.Main>
          <Banner.Row>
            <Banner.Glyph />
            <Banner.Column>
              <Banner.Title>Title</Banner.Title>
              <Banner.Body>Description</Banner.Body>
            </Banner.Column>
          </Banner.Row>
          <Banner.Action>Action</Banner.Action>
        </Banner.Main>
        <Banner.Close />
      </Banner>
    </PageHeader>
  );
}
```