# Key Figures

Key Figures are rows of cards that highlight the most relevant and actionable data within a product area, feature, or record.

## Usage

### General guidance

Key Figures help prioritize and contextualize customer data. Key Figures are not required on every page that includes customer data, but can help customers find greater value in the platform by making their data clearer and more actionable throughout their journey.

They can be used on product landing pages to provide an overview of business performance within a product area and help focus customers' attention on the most important information. On dashboards, they can summarize the progress of vital workflows and surface potential operational problems. On detail pages for records like contact profiles and invoices, Key Figures can highlight recent activity.

### Variants

#### Dashboard

Use the Dashboard variant on landing pages one or two levels deep in the site navigation. Data highlighted in Dashboard Key Figure cards should help focus the customer's attention on important performance metrics or facilitate the efficient completion of workflows.

#### Analytics

Analytics Key Figure cards act as tabs. Use the Analytics variant on dashboards meant specifically for deep data analysis to summarize the data organized underneath each Key Figure tab.

#### Item Detail

Use the Item Detail variant on pages dedicated to a single instance of a content type (for example, an individual profile or invoice) to highlight the most important data and activity attached to a content item.

##### Item Detail card variants

**Standard Figure** — Contains a title with optional tooltip, the figure, a caption, and an optional link.

**Linked Figure** — If the card highlights another related content item, you can link to that item's details in the key figure. As a rule of thumb, if the link is also the title of the linked page, use a linked figure. Otherwise, use a standard figure with a link in the footer.

**Row Hero** — If one figure in the row is particularly important, you can highlight it with larger text. Rows should have only one hero.

**Titled Row Hero** — By default, the Row Hero is a number and a caption, but you can use it with a title instead. Do not use both Titled Row Hero and Row Hero cards in the same Key Figure row. If you need both a title and a caption, use a standard figure.

### Anatomy

1. **Card Title** — A simple and straightforward description of the data presented.
2. **Card Subtitle (Optional, only in Dashboard cards)** — Brief context, such as a description of the data or time period it represents.
3. **Info Trigger (Optional)** — Displays a tooltip with brief, additional context.
4. **Figure** — The key data point being presented. Generally numerical, but can follow a variety of formats. Should be static text.
5. **Card Footer (Optional)** — Supporting content for the data point. Try to keep the visibility of the card footer consistent across all key figures in a row.
6. **Footer Caption (Recommended)** — Captions can clarify data: showing change over time or conveying status. Can accept text and status messages. In general, use the right footer for links. Caption elements don't need to be the same across cards, but if you use captions on one card, try to use them on all.
7. **Footer Accessory (Optional, not available in Analytics cards)** — In general, use the right footer for linking from the card or displaying status. You do not need a right footer on all cards in a row as long as all cards have a left caption element.
8. **Range Control (Optional)** — If a historical view of Key Figure data is helpful in the context of the current dashboard, include a range control dropdown in the whitespace above the cards. This should only control the Key Figures. On analytical dashboards, the range control appears in the Page Header. The Analytics Key Figure variant does not have its own range control.

### Composition

#### Page hierarchy

In general, Key Figures should appear immediately after the Page Header, although they may be preempted by Banners with critical system messaging. In general, promotional cards and Banners should appear below Key Figures.

#### Positioning

Generally, the Key Figure row should appear alone on one row of the page grid. However, if there are only 1–2 Key Figures, the row may be followed by another module.

#### Customization

Limit more customized composition to card figure and footer content. Avoid adjusting the size, spacing, and styling of functional elements like card titles and the cards themselves.

### Content

#### Highlighted data

Select data that is either the most important or actionable to a client given their location and depth in the platform. For example, "Most Popular Products" would be more relevant on a dashboard in the "Selling" section than a dashboard of customer profiles.

Try to limit Key Figures to a small number around 3 to avoid bogging customers down. To prioritize, consider:

- What information best conveys the health of the customers' business in the current product area?
- What operational issues might be surfaced to customers in Key Figures?
- What business metrics are customers able to affect through actions they take near the Key Figures?

#### Null state

When no data is available, the figure is replaced with a gray dash. Consider using a plain text caption to explain why the card isn't displaying data.

### Behavior

#### Content scaling

By default, the width of the Key Figure row is distributed equally across cards.

The ideal number of Key Figure cards is around three, but cards have built-in minimum and maximum widths for predictable behavior if the number of cards varies.

##### Dashboard cards

Dashboard cards will fill the Key Figure row with no max-width.

##### Analytics cards

Analytics cards have a max-width of sizes[700] to preserve their folder tab-like appearance.

##### Item Detail cards

Item Detail cards have a max-width of 33% of their parent container and will float left if there are not enough cards to fill the Key Figure row.

#### Content wrapping

As Key Figure cards scale down, content will wrap. If using standard subcomponents, spacing should adjust to preserve visual alignment across cards.

You may add truncation or abbreviation, but avoid the need by being as concise as possible.

#### Horizontal overflow

Key Figures are wrapped in an Overflow Box to prevent unexpected layout shifts when the minimum width of Key Figure cards exceeds the row's container width.

#### Responsive behavior

On mobile, card width switches to a percentage of the container. Dashboard and Analytics Key Figures can be scrolled horizontally. Item Detail Key Figures stack vertically.

### Accessibility

#### Color coding

- Avoid using color alone to represent positive, negative, and neutral trends in Key Figure data. Doing so may make that information inaccessible to users with different forms of color blindness.
- Be sure to include text or icons to reinforce the meaning of color-coded information.

#### Non-text content

When using non-text content in Key Figures, like Status Messages with Glyphs, include appropriate alt text so any information not conveyed through text is still accessible to screen readers.

- Provide descriptive alt text when non-text content adds meaning that will be lost to users who can't see it.
- Don't provide alt text for non-text content that is redundant with nearby text.

#### Target sizing

Interactive elements inside Key Figures should have an accessible target size of at least 36×36 CSS pixels.

- Use additional padding or a Touchable wrapper with hitSlop to increase the target of small elements.
- Don't nest interactive elements inside the Analytics Tab variant.
## Examples


### Analytics Variant

```jsx
{
  const { Tooltip, Title, Figure, Footer } = KeyFigures.Card;
const AnalyticsTabRow = ({ numOfTabs }: { numOfTabs: number }) => {
    const [activeIndex, setActiveIndex] = React.useState(1);

    return (
      <KeyFigures variant="analytics">
        {[...Array(numOfTabs)].map((_, index) => (
          <KeyFigures.Card
            key={index}
            figure={
              <Figure>
                {'1000'}
              </Figure>
            }
            footer={
              <Footer
                caption={
                  <Footer.Caption
                    color="green.300"
                    display="inline-flex"
                    gap={1}
                  >
                    <ArrowUpRight sx={{ color: 'inherit' }} />
                    10% mo/mo
                  </Footer.Caption>
                }
              />
            }
            isActive={activeIndex === index}
            onToggle={() => setActiveIndex(index)}
            title={
              <Title>
                {'Orders'}
              </Title>
            }
            tooltip={
              <Tooltip>
                {'Some Tooltip Information'}
              </Tooltip>
            }
          />
        ))}
      </KeyFigures>
    );
  };
  return (
    <>
      <AnalyticsTabRow numOfTabs={1} />
      <AnalyticsTabRow numOfTabs={2} />
      <AnalyticsTabRow numOfTabs={3} />
      <AnalyticsTabRow numOfTabs={4} />
    </>
  );
}
```

### Dashboard Variant

```jsx
{
  const [value, setValue] = React.useState('30');
  const keyFigureCardRefs: HTMLElement[] = [];
  const { Tooltip, Title, Figure, Subtitle, Footer } = KeyFigures.Card;
return (
    <>
      <KeyFigures variant="dashboard">
        <KeyFigures.Card
          figure={
            <Figure>
              {'1,000'}
            </Figure>
          }
          footer={
            <Footer
              accessory={
                <Footer.Accessory>
                  <Chip label="Active" status="success" usage="badge" />
                </Footer.Accessory>
              }
              caption={
                <Footer.Caption color="green.300">
                  {'10% mo/mo'}
                </Footer.Caption>
              }
            />
          }
          subtitle={
            <Subtitle>
              {'Card subtitle'}
            </Subtitle>
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
        <KeyFigures.Card
          figure={
            <Figure>
              {'2,400'}
            </Figure>
          }
          footer={
            <Footer
              accessory={
                <Footer.Accessory>
                  <Chip label="Active" status="success" usage="badge" />
                </Footer.Accessory>
              }
              caption={
                <Footer.Caption color="green.300">
                  {'9% mo/mo'}
                </Footer.Caption>
              }
            />
          }
          subtitle={
            <Subtitle>
              {'Card subtitle'}
            </Subtitle>
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
      </KeyFigures>
      <Dropdown.Base
        aria-label={'Set range'}
        label=""
        onChange={setValue}
        placeholder="Last 30 days"
        sx={{
          position: 'absolute',
          top: 0,
          right: 6,
        }}
        value={value}
      >
        <Dropdown.Option value="7">
          {'Last 7 days'}
        </Dropdown.Option>
        <Dropdown.Option value="30">
          {'Last 30 days'}
        </Dropdown.Option>
        <Dropdown.Option value="60">
          {'Last 60 days'}
        </Dropdown.Option>
        <Dropdown.Option value="365">
          {'Last 365 days'}
        </Dropdown.Option>
      </Dropdown.Base>
      <KeyFigures variant="dashboard">
        {[
          {
            caption: '10% mo/mo',
            figure: '1,000',
          },
          {
            caption: '9% mo/mo',
            figure: '2,400',
          },
          {
            caption: 'No data available',
            figure: '',
          },
          {
            caption: '-5% mo/mo',
            figure: '540',
          },
          {
            caption: '22% mo/mo',
            figure: '4,200',
          },
        ].map((keyFigure, index) => {
          return (
            <KeyFigures.Card
              key={index}
              ref={(element) => {
                if (element) {
                  keyFigureCardRefs[index] = element;
                }
              }}
              figure={<Figure>{keyFigure.figure}</Figure>}
              footer={
                <Footer
                  accessory={
                    <Footer.Accessory>
                      <Chip label="Active" status="success" usage="badge" />
                    </Footer.Accessory>
                  }
                  caption={
                    <Footer.Caption color="green.300">
                      {keyFigure.caption}
                    </Footer.Caption>
                  }
                />
              }
              subtitle={
                <Subtitle>
                  {'Card subtitle'}
                </Subtitle>
              }
              title={
                <Title>
                  {'Orders'}
                </Title>
              }
              tooltip={
                <Tooltip>
                  {'Some Tooltip Information'}
                </Tooltip>
              }
            />
          );
        })}
      </KeyFigures>
    </>
  );
}
```

### Item Detail Variant

```jsx
{
  const { Tooltip, Title, Figure, Footer } = KeyFigures.Card;
return (
    <>
      <KeyFigures variant="itemDetail">
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          footer={
            <Footer
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
        />
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          footer={
            <Footer
              accessory={
                <Footer.Accessory>
                  <TextLink href="" textStyle="caption">
                    Add data
                  </TextLink>
                </Footer.Accessory>
              }
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
      </KeyFigures>
      <KeyFigures variant="itemDetail">
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          footer={
            <Footer
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
        />
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          footer={
            <Footer
              accessory={
                <Footer.Accessory>
                  <TextLink href="" textStyle="caption">
                    Add data
                  </TextLink>
                </Footer.Accessory>
              }
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
        <KeyFigures.Card
          figure={<Figure />}
          footer={
            <Footer
              caption={
                <Footer.Caption>
                  {'No data available'}
                </Footer.Caption>
              }
            />
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
      </KeyFigures>
      <KeyFigures variant="itemDetail">
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          footer={
            <Footer
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
        />
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
        <KeyFigures.Card
          figure={
            <Figure>
              {'1000'}
            </Figure>
          }
          footer={
            <Footer
              accessory={
                <Footer.Accessory>
                  <TextLink href="" textStyle="caption">
                    Add data
                  </TextLink>
                </Footer.Accessory>
              }
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
        <KeyFigures.Card
          figure={
            <Figure>
              <TextLink>#HEX123</TextLink>
            </Figure>
          }
          footer={
            <Footer
              accessory={
                <Footer.Accessory>
                  <TextLink href="" textStyle="caption">
                    Add data
                  </TextLink>
                </Footer.Accessory>
              }
              caption={
                <Footer.Caption>
                  {'As of Mon DD, YYYY'}
                </Footer.Caption>
              }
            />
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
        <KeyFigures.Card
          figure={<Figure />}
          footer={
            <Footer
              caption={
                <Footer.Caption>
                  {'No data available'}
                </Footer.Caption>
              }
            />
          }
          title={
            <Title>
              {'Orders'}
            </Title>
          }
          tooltip={
            <Tooltip>
              {'Some Tooltip Information'}
            </Tooltip>
          }
        />
      </KeyFigures>
    </>
  );
}
```