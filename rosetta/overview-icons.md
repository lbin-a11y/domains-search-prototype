## Icons

Always prefer icons from Rosetta packages (imported from @sqs/rosetta) if they are available. Follow the instructions below for use of Rosetta icons.

## Organization and packages

We have three separate icon packages.

```json
{
	"@sqs/rosetta-icons": "^12.0.0",
	"@sqs/rosetta-glyphs": "^12.0.0",
	"@sqs/rosetta-payment-icons": "^12.0.0"
}
```

### Icons

Icons refer to our standard iconography used for interactive affordances and to illustrate the key concepts they appear next to. Icons are drawn in a 22 x 22 pixel bounding box.

In general, use icons when placed next to similar sized Text (20px or larger styles) or by themselves.

### Glyphs

Glyphs refer to simpler characters that appear inline with small text, such as Body and Caption styles. The primary purpose of Glyphs is to provide an additional affordance for text and color-based status messaging. Glyphs are drawn in a 16 x 16 pixel bounding box.

In general, use glyphs when placed next to similar sized Text (below 20px).

## Icons

### Usage

An import for an icon will import from the icons package:

```jsx
import { AlignHorizontalCenter } from "@sqs/rosetta-icons";
```

An import for a glyph will import from the glyphs package:

```jsx
import { AlignHorizontalCenter } from "@sqs/rosetta-glyphs";
```

Icons and glyphs render in `fg.default` (dark) by default. When placing them inside `Button.Primary`, `Button.Danger`, or any element with a strong/dark background, add `color="fg.onStrong"` so they remain visible. Without it, the icon is dark-on-dark and invisible.

Refer to the table below for a listing of all Icons. Note that while most Icons have a corresponding Glyph counterpart with the same name, **the names are not always identical**. Some icons and glyphs have different names or exist in only one package.

### Icons and glyphs with different names

The following icons do NOT have a glyph with the same name. Use the glyph name from the right column:

| Icon name (rosetta-icons) | Glyph name (rosetta-glyphs) |
| ------------------------- | --------------------------- |
| AlignVerticalBottom       | AlignVerticalDown           |
| AlignVerticalTop          | AlignVerticalUp             |
| ArrowDown                 | ArrowSmallDown              |
| BookSparkLocked           | BookSparkLock               |
| ChevronLargeDown          | ChevronDown                 |
| ChevronLargeLeft          | ChevronLeft                 |
| ChevronLargeRight         | ChevronRight                |
| ChevronLargeUp            | ChevronUp                   |
| ChevronSmallDown          | ChevronDown                 |
| ChevronSmallLeft          | ChevronLeft                 |
| ChevronSmallLeftRight     | ChevronLeftRight            |
| ChevronSmallRight         | ChevronRight                |
| ChevronSmallUp            | ChevronUp                   |
| ChevronSmallUpDown        | ChevronUpDown               |
| CrossLarge                | Cross                       |
| StarFilled100             | StarFilled                  |
| VideosLocked              | VideosLock                  |

### Glyphs with no icon counterpart

These glyphs exist in `@sqs/rosetta-glyphs` but have no matching export in `@sqs/rosetta-icons`:

ArrowDownLeft, ArrowDownRight, ArrowUpLeft, ArrowUpRight, BookSparkLock, Calendar, CheckmarkCircleFilled, Cross, CrossOctagonFilled, ExclamationMarkCircleFilled, InfoCircleFilled, Photo, QuestionMarkCircleFilled, StarFilled, Strike, Unlink, VideosLock

### Using both icons and glyphs in the same file

When you need both an icon and its glyph counterpart in the same file, use namespace imports to avoid name collisions:

```jsx
import { Plus } from '@sqs/rosetta-icons';
import * as Glyphs from '@sqs/rosetta-glyphs';

// Use the icon
<Plus />

// Use the glyph
<Glyphs.Plus />
```

Do NOT rename imports (e.g., `import { Plus as PlusGlyph }`) as this can cause issues with tooling that validates icon names against the package exports.

### All icons

| Icon Name                       | Similar Terms                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------- |
| Accordion                       | Section, Expand                                                                 |
| Adjust                          | Settings, Filter, Slider                                                        |
| AdjustRows                      |                                                                                 |
| Ai                              | Design Intelligence, Artificial Intelligence, AI Writer, AI Dots, Generative AI |
| Album                           | Music, Podcast, Playlist, Soundtrack, Collection                                |
| AlignHorizontalCenter           |                                                                                 |
| AlignHorizontalLeft             |                                                                                 |
| AlignHorizontalRight            |                                                                                 |
| AlignVerticalBottom             |                                                                                 |
| AlignVerticalCenter             |                                                                                 |
| AlignVerticalTop                |                                                                                 |
| AppStore                        | Customize Menu                                                                  |
| Appear                          |                                                                                 |
| Archive                         | File, Filing Cabinet, History                                                   |
| ArrowDown                       |                                                                                 |
| ArrowLeft                       |                                                                                 |
| ArrowRight                      |                                                                                 |
| ArrowUp                         |                                                                                 |
| ArrowUpCircleFilled             | Send, Enter, Go                                                                 |
| AspectRatio16X9                 | Rectangle                                                                       |
| AspectRatio1X1                  | Square                                                                          |
| AspectRatio2X3                  | Rectangle                                                                       |
| AspectRatio3X2                  | Rectangle                                                                       |
| AspectRatio3X4                  | Rectangle                                                                       |
| AspectRatio4X3                  | Rectangle                                                                       |
| AspectRatio4X5                  | Rectangle                                                                       |
| AspectRatio5X4                  | Rectangle                                                                       |
| AspectRatio9X16                 | Rectangle                                                                       |
| AspectRatioAnamorphicHorizontal | Rectangle, 2.39:1, 2.4:1                                                        |
| AspectRatioAnamorphicVertical   | Rectangle, 1:2.39, 1:2.4                                                        |
| AspectRatioCustom               | Rectangle                                                                       |
| Audio                           | Music, Sound, Notes                                                             |
| Automation                      | Workflow, Automated, Trigger, Pathway, Flow                                     |
| Bank                            | Money, Building, Payment, Institution                                           |
| BarChart                        | Chart, Data, Variation, Graph                                                   |
| Blog                            | Pen, Fountain Pen, Blogging, Collection, Write, Writing                         |
| BlogLock                        | Monetized Blogs, Paywall, Paywalled Blogs                                       |
| Blur                            | Image Editing                                                                   |
| Bold                            | Text Editing                                                                    |
| BookSpark                       | Resource, Idea, Learn                                                           |
| BookSparkLocked                 | Locked Course, Paywalled Course, Book Paywall                                   |
| BorderAll                       |                                                                                 |
| BorderBottom                    |                                                                                 |
| BorderCenterHorizontal          |                                                                                 |
| BorderCenterVertical            |                                                                                 |
| BorderLeft                      |                                                                                 |
| BorderLeftRight                 |                                                                                 |
| BorderRight                     |                                                                                 |
| BorderTop                       |                                                                                 |
| BorderTopBottom                 |                                                                                 |
| Branching                       | Automations, Drip, Conditional                                                  |
| Brightness                      | Image Editing, Sun, Sunshine                                                    |
| Bug                             | Issue, Insect, Beetle                                                           |
| BulletedList                    | List, Unordered, Text Editing                                                   |
| Business                        | Organization, Enterprise, Team, Building                                        |
| CalendarStar                    | Reservations, Tock                                                              |
| Camera                          | Photo, Picture                                                                  |
| Capital                         |                                                                                 |
| Carousel                        | Image, Slideshow                                                                |
| Checkbox                        | Boolean, Input                                                                  |
| Checkmark                       | Tick, Correct, Yes, Positive                                                    |
| CheckmarkCircle                 | Tick, Correct, Yes, Positive                                                    |
| CheckmarkShield                 | Data Privacy, Cookies, Protection                                               |
| ChevronLargeDown                |                                                                                 |
| ChevronLargeLeft                |                                                                                 |
| ChevronLargeRight               |                                                                                 |
| ChevronLargeUp                  |                                                                                 |
| ChevronSmallDown                |                                                                                 |
| ChevronSmallLeft                |                                                                                 |
| ChevronSmallLeftRight           | scrub                                                                           |
| ChevronSmallRight               |                                                                                 |
| ChevronSmallUp                  |                                                                                 |
| ChevronSmallUpDown              | scrub                                                                           |
| Circle                          | Aspect Ratio, Crop, Round                                                       |
| ClearFormatting                 |                                                                                 |
| Clipboard                       | copy to clipboard                                                               |
| ClipboardText                   |                                                                                 |
| Code                            | Pre, Preformatted, HTML, CSS, JS, Text Editing                                  |
| Collapse                        |                                                                                 |
| ColorFill                       | Color, Paint                                                                    |
| ColorPalette                    | Color, Paint                                                                    |
| ColorPaletteSparkle             | Dynamic Templates                                                               |
| ContactCard                     |                                                                                 |
| Contrast                        | Image Editing                                                                   |
| CoverPage                       | Front, Webpage                                                                  |
| CreditCard                      | Money, Payment, CC                                                              |
| Crop                            |                                                                                 |
| CrossLarge                      | Close, Cancel, X, Negative, Delete, Remove                                      |
| CrossOctagon                    | Danger, error                                                                   |
| CrossSmall                      | Close, Cancel, X, Negative, Delete, Remove                                      |
| CrossSmallCircle                | X, Clear, Stop, Cancel                                                          |
| Csv                             | Data, Table, Import Export Content                                              |
| Currency                        | Money, Finance, Cash, Dollar, $                                                 |
| DecreaseIndent                  | Text Editing                                                                    |
| Desktop                         | Computer, Mac, Windows                                                          |
| DesktopUnlinked                 | Computer, Mac, Windows                                                          |
| Diamond                         | gem, premium                                                                    |
| DimensionX                      | Pause, Play                                                                     |
| DimensionY                      | Pause, Play                                                                     |
| DimensionZ                      | Pause, Play                                                                     |
| DollarSign                      | $, value, commerce, sales                                                       |
| Donation                        |                                                                                 |
| Download                        |                                                                                 |
| Drag                            | Handle, Dragger, Draggable, Grab                                                |
| Dropdown                        | Select, Choose, Choice, Input                                                   |
| Duplicate                       | Copy, Repeat                                                                    |
| Ease                            |                                                                                 |
| Edit                            | Pen, Editing, Write, Writing, Change                                            |
| Ellipses                        | Dot, More, Settings, Menu, Overflow                                             |
| EmptyPage                       | Dot Page, Blank                                                                 |
| Events                          | Event, Calendar, Date, Month                                                    |
| ExclamationMarkCircle           | Warning, Error, Info                                                            |
| Expand                          | full screen                                                                     |
| ExternalLink                    | New Window, Open                                                                |
| ExternalSelling                 | AI Selling, Social Shopping                                                     |
| Eyedropper                      | Image Editing                                                                   |
| FeatureGate                     | FG, Feature Gating                                                              |
| FeatureGateLock                 | FG, Gate, Feature Gate Badge, Premium, Feature Gate Bundle                      |
| Filters                         | Image Editing                                                                   |
| Fitness                         | Barbell, Weight, Dumbell, Gym, Workout                                          |
| Flash                           | Zap, Lightning                                                                  |
| FlashAuto                       | Zap, Lightning                                                                  |
| FlashOff                        | Zap, Lightning                                                                  |
| FlipXAxis                       | Image Editing                                                                   |
| FlipYAxis                       | Image Editing                                                                   |
| FocalPoint                      |                                                                                 |
| Folder                          | File, Group                                                                     |
| FontFamily                      | Font, Typeface                                                                  |
| Funnel                          |                                                                                 |
| Gallery                         | Photo, Graphic, Picture, Image                                                  |
| GapHorizontal                   | Size, Spacing, Vertical, X Axis                                                 |
| GapVertical                     | Size, Spacing, Vertical, X Axis                                                 |
| Gift                            | Donation, Present, Give, Donate                                                 |
| GiftCard                        | Money, Payment, Love, Heart                                                     |
| Global                          | World, All, Network                                                             |
| GlobalCode                      | Text, Type                                                                      |
| GlobalContent                   | Global Component, Shared Component, Linked Component, Diamond                   |
| GlobalImage                     | Text, Type                                                                      |
| GlobalText                      | Text, Type                                                                      |
| Grid3X3                         | 3 column view                                                                   |
| GroupAlignHorizontalCenter      |                                                                                 |
| GroupAlignHorizontalLeft        |                                                                                 |
| GroupAlignHorizontalRight       |                                                                                 |
| GroupAlignVerticalBottom        |                                                                                 |
| GroupAlignVerticalCenter        |                                                                                 |
| GroupAlignVerticalTop           |                                                                                 |
| H1                              | Text Style, Header, Text Editing                                                |
| H2                              | Text Style, Header, Text Editing                                                |
| H3                              | Text Style, Header, Text Editing                                                |
| H4                              | Text Style, Header, Text Editing                                                |
| H5                              | Text Style, Header, Text Editing                                                |
| H6                              | Text Style, Header, Text Editing                                                |
| Heart                           | Love, Like, Enjoy, Rate                                                         |
| HeartFilled                     | Love, Like, Enjoy, Rate                                                         |
| Hide                            | Eye, Show, Negative, Off                                                        |
| Highlights                      | Image Editing                                                                   |
| Home                            | House                                                                           |
| HomeSmall                       | House, Home Page                                                                |
| Hover                           |                                                                                 |
| Image                           | Photo, Graphic, Picture                                                         |
| ImageBlockCard                  |                                                                                 |
| ImageBlockCollage               |                                                                                 |
| ImageBlockInline                |                                                                                 |
| ImageBlockOverlap               |                                                                                 |
| ImageBlockPoster                |                                                                                 |
| ImageBlockStack                 |                                                                                 |
| In                              |                                                                                 |
| InBack                          | curve motion ease                                                               |
| InOut                           | curve motion                                                                    |
| InOutBack                       | curve motion                                                                    |
| IncreaseIndent                  | Text Editing                                                                    |
| Index                           | Home                                                                            |
| IndexStacked                    | Home                                                                            |
| Infinity                        |                                                                                 |
| InfoCircle                      | Information, Help, Question, Guide, Tooltip                                     |
| Insert                          |                                                                                 |
| InsertCard                      | Credit Card, Point of Sale, Paying, Finance                                     |
| Invoice                         | invoicing, selling                                                              |
| Italic                          | Text Editing                                                                    |
| Key                             | API Keys, SSO                                                                   |
| Keyboard                        | Escape Key, Shortcut                                                            |
| LayerAbove                      |                                                                                 |
| LayerBelow                      |                                                                                 |
| Layers                          |                                                                                 |
| Layout                          | Grid, Design                                                                    |
| LetterSpacing                   | Kerning                                                                         |
| Line                            | Divider                                                                         |
| LineChart                       | Chart, Data, Variation, Graph                                                   |
| LineDashed                      | Divider                                                                         |
| LineHeight                      | Leading                                                                         |
| Linear                          |                                                                                 |
| Link                            | URL                                                                             |
| Location                        | Address, Map, Marker, GPS, Locate, Geo                                          |
| Lock                            | Password, Secure, Padlock                                                       |
| Logo500Px                       |                                                                                 |
| LogoAmazon                      |                                                                                 |
| LogoAndroid                     |                                                                                 |
| LogoApple                       |                                                                                 |
| LogoAppleNews                   |                                                                                 |
| LogoBandsintown                 |                                                                                 |
| LogoBehance                     |                                                                                 |
| LogoBigCartel                   |                                                                                 |
| LogoBlogger                     |                                                                                 |
| LogoBluesky                     |                                                                                 |
| LogoChowNow                     |                                                                                 |
| LogoChrome                      |                                                                                 |
| LogoCodePen                     |                                                                                 |
| LogoDiscord                     |                                                                                 |
| LogoDribbble                    |                                                                                 |
| LogoDropbox                     |                                                                                 |
| LogoEvernote                    |                                                                                 |
| LogoFacebook                    |                                                                                 |
| LogoFigma                       |                                                                                 |
| LogoFlickr                      |                                                                                 |
| LogoFoursquare                  |                                                                                 |
| LogoGettyImages                 |                                                                                 |
| LogoGitHub                      |                                                                                 |
| LogoGoodreads                   |                                                                                 |
| LogoGoogle                      |                                                                                 |
| LogoGooglePlay                  |                                                                                 |
| LogoHouzz                       |                                                                                 |
| LogoITunes                      |                                                                                 |
| LogoImDb                        |                                                                                 |
| LogoInstagram                   |                                                                                 |
| LogoLinkedIn                    |                                                                                 |
| LogoMedium                      |                                                                                 |
| LogoMeetup                      |                                                                                 |
| LogoOpenTable                   |                                                                                 |
| LogoPandora                     |                                                                                 |
| LogoPinterest                   |                                                                                 |
| LogoPodcast                     |                                                                                 |
| LogoReddit                      |                                                                                 |
| LogoRss                         |                                                                                 |
| LogoScheduling                  |                                                                                 |
| LogoShopify                     |                                                                                 |
| LogoSmugMug                     |                                                                                 |
| LogoSnapchat                    |                                                                                 |
| LogoSoundCloud                  |                                                                                 |
| LogoSpotify                     |                                                                                 |
| LogoSquarespace                 |                                                                                 |
| LogoSquarespaceCircle           |                                                                                 |
| LogoStitcher                    |                                                                                 |
| LogoStumbleUpon                 |                                                                                 |
| LogoTheDots                     |                                                                                 |
| LogoThreads                     |                                                                                 |
| LogoTidal                       |                                                                                 |
| LogoTikTok                      |                                                                                 |
| LogoTock                        |                                                                                 |
| LogoTripAdvisor                 |                                                                                 |
| LogoTumblr                      |                                                                                 |
| LogoTwitch                      |                                                                                 |
| LogoTwitter                     |                                                                                 |
| LogoUnfold                      |                                                                                 |
| LogoUsps                        |                                                                                 |
| LogoVevo                        |                                                                                 |
| LogoVimeo                       |                                                                                 |
| LogoVsco                        |                                                                                 |
| LogoWordPress                   |                                                                                 |
| LogoX                           |                                                                                 |
| LogoYelp                        |                                                                                 |
| LogoYouTube                     |                                                                                 |
| LogoZola                        |                                                                                 |
| Logout                          | Sign out, Exit                                                                  |
| Loop                            |                                                                                 |
| Mail                            | Email, Envelope                                                                 |
| Marquee                         | Input, Text Field                                                               |
| MediaEffect                     | Generative Background, Animated Background                                      |
| Menu                            | Home, Hamburger                                                                 |
| Message                         | chat, sms, text, dialog, bubble                                                 |
| Mic                             | Microphone, Audio, Sound, Record                                                |
| MicOff                          | Microphone, Audio, Sound, Record                                                |
| Minus                           | Subtract, Remove, Less                                                          |
| MinusCircle                     | Subtract, Remove, Less, Delete                                                  |
| MinusSmall                      | Indeterminate                                                                   |
| Mobile                          | iOS, iPhone, Android                                                            |
| Moon                            | dark theme, dark mode, night                                                    |
| MouseMove                       |                                                                                 |
| MultiColumn                     | Layout, Grid                                                                    |
| MultipleHalf                    | Zoom, Speed, Scale, .5x                                                         |
| MultipleOne                     | Zoom, Speed, Scale, 1x                                                          |
| MultipleTwo                     | Zoom, Speed, Scale, 2x                                                          |
| NotAllowed                      | Clear Formatting, Disabled, Ban, No, Prohibited, Slash                          |
| NotificationBell                | Bell, Notification, Alert                                                       |
| Number                          | Hash, Pound, Numeric                                                            |
| NumberedList                    | List, Ordered, Text Editing                                                     |
| Opacity                         | Image Editing                                                                   |
| Orders                          | Inbox, Tray                                                                     |
| Out                             |                                                                                 |
| OutBack                         | curve motion                                                                    |
| P1                              | Text Style, Paragraph, Text Editing                                             |
| P2                              | Text Style, Paragraph, Text Editing                                             |
| P3                              | Text Style, Paragraph, Text Editing                                             |
| PaddingBottom                   | Spacing                                                                         |
| PaddingCenterHorizontal         | Spacing                                                                         |
| PaddingCenterVertical           |                                                                                 |
| PaddingLeft                     |                                                                                 |
| PaddingLeftRight                |                                                                                 |
| PaddingRight                    |                                                                                 |
| PaddingTop                      |                                                                                 |
| PaddingTopBottom                |                                                                                 |
| Page                            |                                                                                 |
| Paragraph                       |                                                                                 |
| PdpFull                         |                                                                                 |
| PdpHalf                         |                                                                                 |
| PdpSimple                       |                                                                                 |
| PdpWrap                         |                                                                                 |
| People                          |                                                                                 |
| Percent                         |                                                                                 |
| Performance                     |                                                                                 |
| Person                          |                                                                                 |
| PersonLock                      |                                                                                 |
| Phone                           |                                                                                 |
| PhoneCall                       |                                                                                 |
| PieChart                        |                                                                                 |
| Pin                             |                                                                                 |
| PinFilled                       |                                                                                 |
| Play                            |                                                                                 |
| Plug                            |                                                                                 |
| Plus                            |                                                                                 |
| PointOfSale                     |                                                                                 |
| Portfolio                       |                                                                                 |
| Press                           |                                                                                 |
| Preview                         |                                                                                 |
| Print                           |                                                                                 |
| Product                         |                                                                                 |
| Project                         |                                                                                 |
| QuestionMark                    |                                                                                 |
| QuestionMarkCircle              |                                                                                 |
| Quote                           |                                                                                 |
| Radio                           |                                                                                 |
| Receipt                         |                                                                                 |
| Redo                            |                                                                                 |
| Refresh                         |                                                                                 |
| ResetStyles                     |                                                                                 |
| RestaurantMenu                  |                                                                                 |
| RichTextEditor                  |                                                                                 |
| RotateLeft                      |                                                                                 |
| RotateRight                     |                                                                                 |
| RoundedCorners                  |                                                                                 |
| RoundedEndCap                   |                                                                                 |
| RoundedRectangle                |                                                                                 |
| Saturation                      |                                                                                 |
| ScaleHeight                     |                                                                                 |
| ScaleWidth                      |                                                                                 |
| Scroll                          |                                                                                 |
| Search                          |                                                                                 |
| ServiceBell                     |                                                                                 |
| Settings                        |                                                                                 |
| SetupGuide                      | Checkmark, Sparkle, Bubble, Guidance                                            |
| Shadows                         | Image Editing                                                                   |
| Shapes                          | Triangle, Circle                                                                |
| Share                           | New Window, Open, External                                                      |
| ShareLocked                     | New Window, Open, External                                                      |
| Sharpen                         | Image Editing                                                                   |
| Shipping                        | Truck, Moving, Package, Handling                                                |
| ShoppingBag                     | Shop, Pickup                                                                    |
| Show                            | Eye, On, Unhide                                                                 |
| Shuffle                         | Random, Twist, Arrow                                                            |
| SidebarEdit                     | Edit Menu, Customize Menu                                                       |
| Signature                       | Sign, E-sign, Contract, Acceptance, Agreement                                   |
| SitePreview                     | External Link, New Window, Open                                                 |
| Slideshow                       | Carousel, Image                                                                 |
| SocialLInks                     | Share, Social Media                                                             |
| SortDown                        | Descending                                                                      |
| SortUp                          | Ascending                                                                       |
| Sparkles                        | Star, Highlight, Accent                                                         |
| SpeedFast                       | High                                                                            |
| SpeedSlow                       | Low                                                                             |
| Spring                          | curve motion                                                                    |
| SquareEndCap                    | Roundness                                                                       |
| Stack                           |                                                                                 |
| StackAlignHorizontalBottom      |                                                                                 |
| StackAlignHorizontalCenter      |                                                                                 |
| StackAlignHorizontalTop         |                                                                                 |
| StackAlignPlaceholder           |                                                                                 |
| StackAlignVerticalCenter        |                                                                                 |
| StackAlignVerticalLeft          |                                                                                 |
| StackAlignVerticalRight         |                                                                                 |
| StackFilled                     |                                                                                 |
| StackHorizontal                 |                                                                                 |
| StackVertical                   |                                                                                 |
| Star                            | Rating                                                                          |
| StarCircle                      |                                                                                 |
| StarFilled100                   | Rating                                                                          |
| StarFilled50                    | Rating, Half                                                                    |
| Stop                            | Pause, Play                                                                     |
| StopFilled                      | Pause, Play                                                                     |
| Store                           | Cart, Shop, Shopping, Purchase, Buy                                             |
| StraightenLeft                  | Image Editing, Adjust                                                           |
| StraightenRight                 | Image Editing, Adjust                                                           |
| Strikethrough                   | Text Editing                                                                    |
| Style                           | Paintbrush                                                                      |
| Subscript                       | Text Editing                                                                    |
| Superscript                     | Text Editing                                                                    |
| Survey                          | Quiz, Question, Data                                                            |
| TShirtGraphic                   | Shirt, Tee, Custom Tee, Merch                                                   |
| Tablet                          |                                                                                 |
| Tag                             | Bookmark, Flag, Price                                                           |
| TagCloud                        |                                                                                 |
| Tap                             | click, press, touch                                                             |
| Text                            | Type                                                                            |
| TextAlignCenter                 | Text Editing, Alignment                                                         |
| TextAlignJustify                | Text Editing, Alignment                                                         |
| TextAlignLeft                   | Text Editing, Alignment                                                         |
| TextAlignRight                  | Text Editing, Alignment                                                         |
| TextArea                        | Input, Text Field                                                               |
| TextHighlight                   | Squiggle, Decoration, Underline, Effect                                         |
| TextScale                       | Type, Size                                                                      |
| TextSmall                       | Type                                                                            |
| ThumbsDown                      |                                                                                 |
| ThumbsUp                        |                                                                                 |
| TicketStar                      | Events, Tock, Pass                                                              |
| Time                            | Clock, Hour, Minute, Second                                                     |
| Timer                           | Clock, Hour, Minute, Second                                                     |
| Timer10S                        | Clock, Hour, Minute, Second                                                     |
| Timer3S                         | Clock, Hour, Minute, Second                                                     |
| Timer5S                         | Clock, Hour, Minute, Second                                                     |
| TimerOff                        | Clock, Hour, Minute, Second                                                     |
| Trash                           | Delete, Bin, Garbage, Recycle, Remove, Destroy                                  |
| TypeScaleLarger                 | Text                                                                            |
| TypeScaleSmaller                | Text                                                                            |
| Underline                       | Text Editing                                                                    |
| Undo                            | Reverse, Change                                                                 |
| Unlock                          | Password, Secure, Padlock                                                       |
| Upload                          |                                                                                 |
| Video                           | Movie                                                                           |
| VideoEmpty                      | No Video, Empty State Video, Missing Video                                      |
| Videos                          | Courses, Classes, Playlist                                                      |
| VideosLocked                    | Video Lock, Paywalled Video                                                     |
| VolumeHigh                      | Sound, Audio, Music, Loud                                                       |
| VolumeLow                       | Sound, Audio, Music, Loud                                                       |
| VolumeOff                       | Sound, Audio, Music, Loud                                                       |
| VolumeZero                      | Sound, Audio, Music, Loud                                                       |
| Website                         | URL, Web Address, Webpage                                                       |
| WebsiteLock                     | Crawlers                                                                        |
| Weight                          | Shipping, Scale, Package                                                        |
| WhiteBalance                    | Image Editing                                                                   |
