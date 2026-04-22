# Banner

Component that displays important messages with optional actions, available in multiple variants (default, info, success, error, caution) and layouts (wide/narrow).

> **Note:** This is the new, redesigned Banner component. Please migrate your previous Banner to this one.

## Guidance

### Criteria for usage

There are three base criteria for using Banner:

1. **Relevant**: Message must relate directly to action taken or information displayed on current page or form.
2. **Prominent**: Message should require the elevated visual weight.
3. **Persistent**: Message needs to remain visible until user takes action or intentionally closes the message.

Use a Banner only if it meets all three of these conditions. Otherwise, use an alternative pattern.

**Do**

- Use Banner to communicate only the most relevant, prominent, and persistent statuses.
- Use Banner to communicate the state of an entire page or form.

**Don't**

- Use Banner to communicate irrelevant, unimportant, or temporary statuses.
- Use Banner to communicate status for a single component, a single heading, or a section of a page.

### When not to use Banner

**Don't use Banner to:**

**Communicate the status of components**

- Example: One input field in a form has an error.
- Instead, communicate that error with the error text on the input field, not with a Banner for the entire form.
- Components have status built into them; they do not need to be surfaced to the page or form level.

**Communicate the status of a composition**

- On some pages, there may be different compositions, or groups of components, that handle a specific feature, view, or settings.
- Any status that only affects a single composition should be communicated close to or within that composition.

**Convey status of a subpage**

- Example: Don't display a status for a subpage (Cookies and Data Privacy) on a higher level page (Settings).
- Keep statuses relevant to the current page.

**Make promos or recommendations**

- Promos, insights, tips, or related recommendations should use dedicated patterns like the SoL Static, Temporary Promo, Tip, and Insight.

### Alternatives to Banner

#### Status Message

- Status Message can be placed below, above, or next to other components.
- Rosetta component that consists of a glyph next to some Text.
- These come in the usual status variants of Danger, Warning, Success, Neutral, and Accent.
- "Lighter" UI footprint, especially on smaller surfaces.

#### SoL Static or Temporary Promo

- Feature Promos can be used for promotions or encouraging users to explore a feature.
- Can contain images to better visualize or promote a product or feature.
- Designed specifically for the Dashboard framework, including Full Width, Image, and No Image variants.

#### SoL Tip and Insight

- Tip is used to provide information that educates users on how to use a selling product.
- Insight provides data-backed information that helps users understand their business performance.

#### Empty State

- Empty state can be used in cases of errors.
- Could be used when there is insufficient data to orient what users should normally see.
- Can contain actions to help resolve or promote beginning a flow.
- Can communicate status, errors, or promotion while still preserving page layout.

---

## Usage

### Examples

#### Error

Actions on page or form are completely blocked and need immediate resolution:

- For this use case, this is a critical, blocking error that prevents users from interacting with the rest of the domain management, so we don't include a close option.
- Critical errors or failures that block the user from proceeding.
- Action must be taken immediately in order to resume normal operation.

#### Caution

Something is negatively affecting or partially blocking the user's ability to complete a page or form:

- This example encourages users to complete the store setup process.
- User should resolve something in order to proceed with the expected flow or action.
- A feature on the user's website will not function properly unless action is taken on a settings or configuration page.
- User's financials might be at risk unless user takes an action.

#### Success

Confirmation upon completion of a flow and redirection:

- A user just completed a full page form, wizard, or dedicated flow then gets redirected back to a table or dashboard view. There is no resolution needed, so we remove the action.
- A user has taken action on another page, which now enables new actions on this page.
- Note that Success banners should be displayed temporarily, on first redirect. After this initial confirmation, do not show this Banner.
- If the message needs to show upon taking action on this page, or needs to appear for a few seconds, using a Toast is more appropriate.

#### Default

Page or form requires additional information that should be disclosed, but users are not blocked:

- Some inputs on a form are different from their usual state because some condition is not met.

---

### Anatomy

1. **Glyph** — Each variant has a default glyph, but can be overridden. Required.
2. **Title** — Concise message or description. Required.
3. **Body (Optional)** — Provides context for the title. Can contain information or links. Optional if the Title is self-explanatory and needs no further context.
4. **Action Button (Optional)** — Action to resolve the issue. There should only be one action on a banner. Do not use informational links (View details, Learn More, etc.) as an action — use Text Links in the body instead. Optional if no resolution is needed.
5. **Close Button (Optional)** — Button to dismiss the Banner. Optional if the error should be intentionally persistent or a blocker.

**Do**

- Include support documentation or additional links as Text Links in the body.
- Use a short verb or phrase as the Action Button text.

**Don't**

- Include unnecessary body text.
- Use the Action Button as a link to support documentation.

### Sizing

Banner has two size variants: Default and Narrow.

- The Default size variant should be used when Banner is 600px wide or larger.
- The Narrow size variant should be used when the component is 599px or narrower.

### Glyph Usage

Banner uses glyphs (not icons) as an additional method of communicating status in addition to color and content.

- Exclamation mark glyph: Use this icon to indicate a banner contains critical information.
- Checkmark glyph: Use this icon to indicate a banner contains a confirmation message.
- Information glyph: Use this icon to indicate a banner contains information for the user.
- Cross circle / Cross octagon glyphs: Use this icon to indicate blocked actions.

### Accessibility

Do not rely on color alone to convey status to users. Ensure language and glyphs properly reflect the severity of the Banner message for users who can't recognize certain colors.

---
## Examples


### Default

```jsx
(
  <Banner>
    <Banner.Main>
      <Banner.Row>
        <Banner.Glyph />
        <Banner.Column>
          <Banner.Title>{"Your account is approved"}</Banner.Title>
          <Banner.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Body>
        </Banner.Column>
      </Banner.Row>
      <Banner.Action>{"Action"}</Banner.Action>
    </Banner.Main>
    <Banner.Close />
  </Banner>
)
```

### Layout

```jsx
(
  <Flex flexDirection="column" gap={2}>
    <Banner layout="wide">
      <Banner.Main>
        <Banner.Row>
          <Banner.Glyph />
          <Banner.Column>
            <Banner.Title>{"Your account is approved"}</Banner.Title>
            <Banner.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Body>
          </Banner.Column>
        </Banner.Row>
        <Banner.Action>{"Action"}</Banner.Action>
      </Banner.Main>
      <Banner.Close />
    </Banner>

    <Banner layout="narrow">
      <Banner.Main>
        <Banner.Row>
          <Banner.Glyph />
          <Banner.Column>
            <Banner.Title>{"Your account is approved"}</Banner.Title>
            <Banner.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Body>
          </Banner.Column>
        </Banner.Row>
        <Banner.Action>{"Action"}</Banner.Action>
      </Banner.Main>
      <Banner.Close />
    </Banner>
  </Flex>
)
```

### All Variants

```jsx
(
  <Flex flexDirection="column" gap={2}>
    <Banner>
      <Banner.Main>
        <Banner.Row>
          <Banner.Glyph />
          <Banner.Column>
            <Banner.Title>{"Your account is approved"}</Banner.Title>
            <Banner.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Body>
          </Banner.Column>
        </Banner.Row>
        <Banner.Action>{"Action"}</Banner.Action>
      </Banner.Main>
      <Banner.Close />
    </Banner>

    <Banner.Caution>
      <Banner.Caution.Main>
        <Banner.Caution.Row>
          <Banner.Caution.Glyph />
          <Banner.Caution.Column>
            <Banner.Caution.Title>{"Your account is approved"}</Banner.Caution.Title>
            <Banner.Caution.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Caution.Body>
          </Banner.Caution.Column>
        </Banner.Caution.Row>
        <Banner.Caution.Action>{"Action"}</Banner.Caution.Action>
      </Banner.Caution.Main>
      <Banner.Caution.Close />
    </Banner.Caution>

    <Banner.Error>
      <Banner.Error.Main>
        <Banner.Error.Row>
          <Banner.Error.Glyph />
          <Banner.Error.Column>
            <Banner.Error.Title>{"Your account is approved"}</Banner.Error.Title>
            <Banner.Error.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Error.Body>
          </Banner.Error.Column>
        </Banner.Error.Row>
        <Banner.Error.Action>{"Action"}</Banner.Error.Action>
      </Banner.Error.Main>
      <Banner.Error.Close />
    </Banner.Error>

    <Banner.Info>
      <Banner.Info.Main>
        <Banner.Info.Row>
          <Banner.Info.Glyph />
          <Banner.Info.Column>
            <Banner.Info.Title>{"Your account is approved"}</Banner.Info.Title>
            <Banner.Info.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Info.Body>
          </Banner.Info.Column>
        </Banner.Info.Row>
        <Banner.Info.Action>{"Action"}</Banner.Info.Action>
      </Banner.Info.Main>
      <Banner.Info.Close />
    </Banner.Info>

    <Banner.Success>
      <Banner.Success.Main>
        <Banner.Success.Row>
          <Banner.Success.Glyph />
          <Banner.Success.Column>
            <Banner.Success.Title>{"Your account is approved"}</Banner.Success.Title>
            <Banner.Success.Body>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Banner.Success.Body>
          </Banner.Success.Column>
        </Banner.Success.Row>
        <Banner.Success.Action>{"Action"}</Banner.Success.Action>
      </Banner.Success.Main>
      <Banner.Success.Close />
    </Banner.Success>
  </Flex>
)
```