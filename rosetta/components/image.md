# Image

A placeholder for loading images. Component has props for fallback while an image is loading or is unavailable.

> **Deprecated:** This component has been deprecated. Please use Web Performance's Image Component.

## Guidance

Use the Web Performance team's Image component.

### General guidance

Every image must have meaningful alt text (including empty alt text for decorative images).

### Content

Always consider localization when creating images because images that contain words, currency symbols, flags, etc. are:

- Hard to translate/localize.
- Difficult to convey in alt text.
- Impossible to adjust for better readability (e.g., change font style, increase font size).

When writing alt text for images, follow all proper grammatical rules. Capitalize the first word, and end full sentences with periods.

### Accessibility

Alternative text (alt text) is brief copy (ideally less than 250 characters) that describes an image. The copy should serve the equivalent purpose as the image, as screen readers can read it aloud and browser pages can display it when an image fails to load.

Key things to keep in mind when writing alt text:

- Consider what details the user would find most important.
- Add any text contained inside the image to the alt text.
- Use the alt text to describe where the link goes (e.g., if clicking the image links to a new page).
- Avoid using the phrase "image of" unless the medium is important (assistive technology will announce when something is an image before reading the text).

The only images that do not need alt text are decorative images, as they do not add information to the content of a page. Decorative images must be hidden from assistive technology by setting an empty alt attribute (`alt=""`) to avoid treating the image's file name as alt text.

#### When alt text isn't enough

In instances of complex information (e.g., charts, graphs, analytics), using a long description could be helpful in addition to alt text. The alt text should briefly describe the image, while the long description serves to capture all important details as text.

Long descriptions should be provided near the image, such as in the next paragraph or somewhere close to the image.

#### Moving images

In addition to the guidelines above, moving images like GIFs should also:

- Provide a way to pause or stop playback (e.g. by providing a pause button or swapping an animated image with a still image).
- Ensure that animated images do not flash or flicker more than three times per second.

## Design

No guidance at this time.
## Examples


### Default

```jsx
<Image
      alt={'A light house'}
      src="https://picsum.photos/400/300"
    />
```

### With Error

```jsx
<Image
      alt={'Image to illustrate the story with error prop'}
      error={
        <Text.Label>
          Error loading image
        </Text.Label>
      }
      src="www.ThisWillNotWork.com/getimage"
    />
```

### With Prevent Layout Shift

```jsx
<>
      <Image
        alt={'Image'}
        error={
          <Text.Label>
            Error loading image 
          </Text.Label>
        }
        height={75}
        preventLayoutShift={true}
        src="www.ThisWillNotWork.com/getimage"
        sx={{
          outline: '2px red solid',
        }}
        width={300}
      />
      <Text.Caption>
        
          Should show red outline of the image layout.
        
      </Text.Caption>
    </>
```

### With Fallback

```jsx
<Image
      alt={'A ferris wheel'}
      fallback={<ActivityIndicator />}
      src="https://picsum.photos/400/300"
    />
```

### Switch Between Images

```jsx
{
  const BASE_API = 'https://picsum.photos/100/100/?' + 'image=';
  const [imageNumber, setImageNumber] = React.useState(50);
  return (
    <>
      <Box>
        <Button.Tertiary mr={2} onClick={() => setImageNumber(imageNumber - 1)}>
          <Text>
            Previous
          </Text>
        </Button.Tertiary>
        <Button.Tertiary onClick={() => setImageNumber(imageNumber + 1)}>
          <Text>
            Next
          </Text>
        </Button.Tertiary>
      </Box>
      <Box>
        <Image
          alt={'Photography'}
          error={
            <Text.Label>
              Error loading image
            </Text.Label>
          }
          fallback={<ActivityIndicator />}
          src={`${BASE_API}${imageNumber}`}
        />
      </Box>
    </>
  );
}
```