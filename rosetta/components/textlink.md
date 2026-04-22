# Text Link

Component that is activated by clicking or tapping on highlighted text, pointing the user to another location.

## Guidance

### General guidance

Text Links usually appear within or directly following a sentence and usually navigate users between pages or to a new location on the same page.

Text Links should only be used with text or characters that behave like text. To make non-text content like images or cards interactive, use the Touchable component.

### Content

Text Links should follow sentence casing. Do not use a period at the end of a Text Link.

Sometimes the Text Link will just consist of a noun (FAQ), and sometimes it will be an entire action (Submit a request). In every case, the Text Link should clearly explain where it is going to take the user. Don't use phrases like "Click Here" and instead opt to write the copy in a way that the object of interest becomes the Text Link ("Read our Terms of Service"). This is especially important for users with cognitive/memory disabilities or those using assistive technology, who can navigate to the Text Links directly and may bypass the surrounding content.

Because Text Links take the user out of their current flow, use them sparingly. You can also use bolded text to reference a page without removing the user from a flow.

Instead of showing a URL, use a title or appropriate words related to the link (e.g., Squarespace instead of squarespace.com). If you must show a URL, write it in lowercase and leave out the https://www. at the beginning and the final slash at the end (unless the Text Link requires these to work).

### Accessibility

#### Visual presentation

Text Links must be visually distinguishable from surrounding text. Color alone is not sufficient to differentiate links and static text. An additional affordance, such as the default text underline, must also be present.

#### Text and labeling

The Text Link text should clearly and adequately convey the purpose or destination of the Text Link. It should be unique, and make sense when taken out of context so that users can distinguish between Text Links when listing all of the Text Links on the page. There are no limits as to how many Text Links can be on a page as long as they are appropriate.

In addition to link text, the link itself must also have a valid accessible name. The name can consist of regular text or a label (via `aria-label` or `aria-labelledby`).

#### Target size

The interactive area (also known as the target size) on Text Links is determined by their line height and copy length, often making them smaller than the WCAG 2.1 minimum target size of 44 x 44 CSS PX.

Text Links inside longer lines of text are exempt from target size requirements, with the following considerations:

- Text Links should be at least one full word or two to three words long.
- Avoid making entire sentences into Text Links.
- If an entire body of text, such as a headline, is linked then it does need to meet the minimum target size requirements.
- Avoid using Text Links in isolation (e.g., in place of a Button) unless there is another link to the same content on the current screen that does meet minimum target size requirements.

#### External linking

Text Links that go to external sites, open in new windows by default, or link to files should be visually distinguishable from regular links. Additionally, these links should notify users of their behavior using either the link text or `ARIA` attributes. Otherwise, users relying on assistive technology to navigate may be surprised to find themselves on a new site.

In general, avoid opening links in new tabs or windows unless it's the user's stated preference. New tabs and windows present navigation challenges to users relying on assistive technology that may prevent them from coming back to your content.

## Usage

### Overview

Use Text Links when you would like to direct someone to a new location or further information. Text Links should generally appear within a longer body of text, such as a paragraph or caption.

Be careful to avoid using Text Links where a Button would be more appropriate. Text Links are generally used for navigation, while Buttons generally complete an action (like submitting a form).

While users are used to CTAs styled as Buttons behaving like links, they are much less likely to expect something that looks like a Text Link to complete an action like completing a purchase or deleting content. Instead of using Text Links for actions, consider the Tertiary variant of our Button component.

### Creating Text Links in Figma

In Figma, you can create Text Links by applying type styles from the Rosetta Styles Figma library to selected text. Because you will generally be applying link styles to text within a larger Text component, they are not available as stand-alone Figma components.

### Styling

Text Links inherit their font properties (size, weight, letter-spacing, and line-height) from their surrounding text. Changes to type styles within the Text Link component correspond to the following interactive states.

#### States

**Default** — The styling of the link before user interaction. Text Links are underlined to differentiate them from static text. This affordance is an accessibility requirement and should not be removed — even if changing the color of link text.

**Hover** — When a user has positioned their pointer above a Text Link but has not clicked it, the link changes color and the underline is removed. This creates a meaningful visual difference from the default state that lets the user know they are about to trigger an interactive element.

**Focus** — When a Text Link has been highlighted by keyboard or voice navigation, a high-contrast border appears around the text. This helps users who are not navigating by mouse or touch to understand where they are on the page.

**Visited** — If a Text Link within Body text has already been followed, it is differentiated visually to help people keep track of what they've already seen. Visited links within captions and descriptions are not differentiated because those Text elements should only have 1–2 Text Links in general.

#### Variants

While a Text Link component will accept any Text style, we recommend limiting their use to Body-, Description-, and Caption-styled components.

**Description**

| State          | Text style                    | Color style |
| -------------- | ----------------------------- | ----------- |
| Default        | Subtitle (medium, underlined) | Gray 300    |
| Hover          | Subtitle (medium)             | Gray 200    |
| Focus          | Subtitle (medium, underlined) | Gray 200    |
| Hover on Focus | Subtitle (medium)             | Gray 200    |
| Visited        | Subtitle (medium, underlined) | Gray 300    |

**Body**

| State          | Text style              | Color style |
| -------------- | ----------------------- | ----------- |
| Default        | Body (book, underlined) | Gray 100    |
| Hover          | Body (book)             | Gray 200    |
| Focus          | Body (book, underlined) | Gray 200    |
| Hover on Focus | Body (book)             | Gray 200    |
| Visited        | Body (book, underlined) | Gray 300    |

**Caption**

| State          | Text style          | Color style |
| -------------- | ------------------- | ----------- |
| Default        | Caption (underlined)| Gray 300    |
| Hover          | Caption             | Gray 200    |
| Focus          | Caption (underlined)| Gray 200    |
| Hover on Focus | Caption             | Gray 200    |
| Visited        | Caption (underlined)| Gray 300    |

**External Text Links** — Use the External styling if your Text Link opens something in a new tab or window, opens or downloads a file, or takes the user to a new domain. This will add a visual affordance so users expect that behavior. Rosetta External Text Links also provide additional information to users navigating using assistive technology (such as a screen reader) who can't see the visual affordance.

Focus states also have a 2px Gray 200 box drawn around the link text.
## Examples


### Default

```jsx
<TextLink href="https://www.squarespace.com/">
      {'Link to Squarespace'}
    </TextLink>
```

### Using Text Style Variant

```jsx
<Flex flexDirection="column" gap={2}>
      {(Object.keys(rosetta.light.textStyles) as TextStyle[]).map(
        (variant: TextStyle, index) => {
          return (
            <TextLink
              key={index}
              href={`https://www.${paths[index % paths.length]}`}
              sx={{ display: 'block' }}
              textStyle={variant}
            >
              {'Link to {text}'}
            </TextLink>
          );
        }
      )}
    </Flex>
```

### Used With Inline Text

```jsx
<Flex flexDirection="column" gap={2}>
      {(Object.keys(rosetta.light.textStyles) as TextStyle[]).map(
        (variant: TextStyle, index) => {
          return (
            <Text
              key={index}
              m={1}
              sx={{ display: 'block' }}
              textStyle={variant}
            >
              {'Example {variant} text with link to '}
              <TextLink
                key={variant}
                href={`https://www.${paths[index % paths.length]}`}
              >
                {paths[index % paths.length]}
              </TextLink>
            </Text>
          );
        }
      )}
    </Flex>
```

### Sx Prop

```jsx
<TextLink
      href="https://www.squarespace.com/"
      sx={{
        display: 'block',
        fontSize: 4,
        ':hover': { color: 'gray.400' },
        ':visited': { color: 'blue.200' },
        ':active': { color: 'purple' },
      }}
    >
      {'Link to Squarespace, styled using sx prop'}
    </TextLink>
```

### Using External Link

```jsx
{
  const { ExternalLink } = TextLink;

  return (
    <TextLink href="https://www.squarespace.com/">
      {'Link to Squarespace'}
      <ExternalLink />
    </TextLink>
  );
}
```