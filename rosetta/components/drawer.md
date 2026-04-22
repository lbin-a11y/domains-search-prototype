# Drawer

Drawer is a static, full screen window which requires the user to focus on a series of tasks to complete an action. It presents clear decisions and should be used to display additional content, actions, or menus in a way that overlays the main interface while maintaining context.

## Import

```js
import { Drawer } from '@sqs/rosetta-compositions';
```

## Guidance

### Best practices

- Title should tell the user what specific action(s) they're taking (e.g. "Add subscriber"). Use sentence casing.
- Side navigation items should use one or two descriptive words in title case (e.g. "Account Settings"). Restrict nav item names to ~16 characters to avoid wrapping.
- Break nav items into groups with section labels to aid information architecture.
- Guidance Panel title should always be "Help & FAQ".

### Variants

- **Default** — standard content drawer
- **With Steps (aka Wizard)** — step-based workflow using `StepIndicator.Vertical` and `Drawer.StepsContainer`
- **With Side Nav** — navigation-driven drawer using `NavMenu` and `Drawer.NavigationContainer`
- **Side Sheet** — narrower, panel-style drawer using `Drawer.SideSheet`
- **With Guidance** — drawer with an attached `Drawer.Guidance.Sheet` panel for FAQs and help content

Use the Guidance Panel if:
- You foresee users needing additional help on the task
- You'd otherwise add "Learn more" links to your content
- You want to surface help before users exit the flow or contact support

### Anatomy

1. **Header** — `Drawer.Header` / `Drawer.Header.TitleRow` / `Drawer.Header.Title` — contains the drawer title and close button. `Drawer.Header.TitleRow` defaults to `alignItems="start"`. When placing inline elements alongside the title (badges, chips, or other shorter elements), pass `alignItems="center"` to vertically center them with the close button.
2. **Body** — `Drawer.Body` — main scrollable content area
3. **Footer** — `Drawer.Footer` — action buttons (Save, Next, Back, etc.)
4. **Navigation Container** — `Drawer.NavigationContainer` — vertical nav list or step indicator for multi-section drawers
5. **Guidance Panel** — `Drawer.Guidance.Sheet` — contextual help panel anchored to the drawer

### Size & behavior

Responds based on device type. Any width over `480px` defaults to desktop presentation.

- **Desktop**: full fixed browser width, full height minus `27px` overlay top scrim
- **Mobile**: min-width `328px`

## Examples

### Basic use

```jsx
import { useState } from 'react';
// import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Grid } from '@sqs/rosetta-elements';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';

() => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Drawer.Transition>
        {showDrawer && (
          <Drawer.Modal onRequestClose={() => setShowDrawer(false)}>
            <Drawer.Overlay />
            <Drawer.Sheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Basic Drawer</Drawer.Header.Title>
                  <Drawer.CloseButton onClick={() => setShowDrawer(false)} />
                </Drawer.Header.TitleRow>
              </Drawer.Header>
              <Drawer.Body>
                <Grid.Container gridConstraint={[12, 10, 8]} py={5} rowGap={8}>
                  <Grid.Item columns={12}>
                    <Text.SectionTitle pb={1}>Optional content title</Text.SectionTitle>
                    <Text.Subtitle pb={4}>Optional description</Text.Subtitle>
                    <Text.Body>Content</Text.Body>
                  </Grid.Item>
                </Grid.Container>
              </Drawer.Body>
              <Drawer.Footer justifyContent="end">
                <Button.Primary onClick={() => setShowDrawer(false)}>Save</Button.Primary>
              </Drawer.Footer>
            </Drawer.Sheet>
          </Drawer.Modal>
        )}
      </Drawer.Transition>
      <Button.Primary onClick={() => setShowDrawer(true)}>Open Drawer</Button.Primary>
    </>
  );
};
```

### With steps (wizard)

Use `Drawer.StepsContainer` + `StepIndicator.Vertical` for step-based workflows. `Drawer.ShowStepsButton` in the header collapses/expands the steps panel on mobile.

```jsx
import { useState } from 'react';
// import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Grid, StepIndicator } from '@sqs/rosetta-elements';
// import { ChevronLargeLeft, ChevronLargeRight } from '@sqs/rosetta-icons';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';

() => {
  const steps = [
    { text: 'Step 1', key: 0 },
    { text: 'Step 2', key: 1 },
    { text: 'Step 3', key: 2 },
    { text: 'Step 4', key: 3 },
    { text: 'Step 5', key: 4 },
  ];

  const [showDrawer, setShowDrawer] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;
  const currentStep = steps[stepIndex];

  return (
    <>
      <Drawer.Transition>
        {showDrawer && (
          <Drawer.Modal onRequestClose={() => setShowDrawer(false)}>
            <Drawer.Overlay />
            <Drawer.Sheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Drawer with Steps</Drawer.Header.Title>
                  <Drawer.CloseButton onClick={() => setShowDrawer(false)} />
                </Drawer.Header.TitleRow>
                <Drawer.ShowStepsButton
                  onClick={() => setShowSteps((s) => !s)}
                  show={showSteps}
                >
                  {currentStep.text}
                </Drawer.ShowStepsButton>
              </Drawer.Header>
              <Drawer.Body
                flexDirection={{ _: 'row', 'mobile-*': 'column' }}
                overflowY="hidden"
              >
                <Drawer.StepsContainer show={showSteps}>
                  <StepIndicator.Vertical
                    setStepIndex={setStepIndex}
                    stepIndex={stepIndex}
                    steps={steps}
                  />
                </Drawer.StepsContainer>
                <Box flexGrow={1} overflowY="auto">
                  <Grid.Container gridConstraint={[12, 10, 8]} py={5} rowGap={8}>
                    <Grid.Item columns={12}>
                      <Text.SectionTitle pb={1}>
                        Optional content title for step {stepIndex + 1}
                      </Text.SectionTitle>
                      <Text.Subtitle pb={4}>Optional description</Text.Subtitle>
                      <Text.Body>Content</Text.Body>
                    </Grid.Item>
                  </Grid.Container>
                </Box>
              </Drawer.Body>
              <Drawer.Footer justifyContent="space-between">
                <Button.Secondary
                  disabled={isFirstStep}
                  onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
                  sx={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
                >
                  <Flex gap={1}>
                    <ChevronLargeLeft color={isFirstStep ? 'fg.disabled' : 'fg.default'} />
                    Back
                  </Flex>
                </Button.Secondary>
                {isLastStep ? (
                  <Button.Primary onClick={() => setShowDrawer(false)}>Done</Button.Primary>
                ) : (
                  <Button.Primary onClick={() => setStepIndex((s) => Math.min(steps.length - 1, s + 1))}>
                    <Flex gap={1}>
                      Next
                      <ChevronLargeRight color="fg.onStrong" />
                    </Flex>
                  </Button.Primary>
                )}
              </Drawer.Footer>
            </Drawer.Sheet>
          </Drawer.Modal>
        )}
      </Drawer.Transition>
      <Button.Primary onClick={() => { setStepIndex(0); setShowDrawer(true); }}>
        Open Drawer with Steps
      </Button.Primary>
    </>
  );
};
```

### With navigation menu

Use `Drawer.NavigationContainer` + `NavMenu` for settings-style drawers with a sidebar. `Drawer.ShowNavigationButton` collapses/expands the nav on mobile.

```jsx
import { useState } from 'react';
// import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Grid } from '@sqs/rosetta-elements';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';
// import { NavMenu } from '@sqs/rosetta-compositions/navmenu';

() => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Billing');
  const [showNav, setShowNav] = useState(false);

  const navItems = [
    { label: 'Website', href: '#' },
    { label: 'Domains & Email', href: '#' },
    { label: 'Selling', href: '#' },
    { label: 'Brand', href: '#' },
    { label: 'Marketing', href: '#' },
    { label: 'Billing', href: '#' },
    { label: 'Developer Tools', href: '#' },
  ];

  return (
    <>
      <Drawer.Transition>
        {showDrawer && (
          <Drawer.Modal onRequestClose={() => setShowDrawer(false)}>
            <Drawer.Overlay />
            <Drawer.Sheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Settings</Drawer.Header.Title>
                  <Drawer.CloseButton onClick={() => setShowDrawer(false)} />
                </Drawer.Header.TitleRow>
                <Drawer.ShowNavigationButton
                  onClick={() => setShowNav((s) => !s)}
                  show={showNav}
                >
                  {activeNavItem}
                </Drawer.ShowNavigationButton>
              </Drawer.Header>
              <Drawer.Body
                flexDirection={{ _: 'row', 'mobile-*': 'column' }}
                overflowY="hidden"
              >
                <Drawer.NavigationContainer show={showNav}>
                  <NavMenu
                    onChange={(label) => { setActiveNavItem(label); setShowNav(false); }}
                    value={activeNavItem}
                  >
                    <NavMenu.NavGroup>
                      {navItems.map((item) => (
                        <NavMenu.NavItem key={item.label} href={item.href} value={item.label}>
                          <NavMenu.NavText variant="subtitle">{item.label}</NavMenu.NavText>
                        </NavMenu.NavItem>
                      ))}
                    </NavMenu.NavGroup>
                  </NavMenu>
                </Drawer.NavigationContainer>
                <Box flexGrow={1} overflowY="auto" py={5}>
                  <Grid.Container gridConstraint={[12, 10, 8]} rowGap={4}>
                    <Grid.Item columns={12}>
                      <Text.SectionTitle>{activeNavItem}</Text.SectionTitle>
                      <Text.Body>Content for {activeNavItem}</Text.Body>
                    </Grid.Item>
                  </Grid.Container>
                </Box>
              </Drawer.Body>
            </Drawer.Sheet>
          </Drawer.Modal>
        )}
      </Drawer.Transition>
      <Button.Primary onClick={() => setShowDrawer(true)}>Open Drawer</Button.Primary>
    </>
  );
};
```

### With guidance panel

`Drawer.Guidance.Sheet` mounts at the `Drawer.Guidance.Anchor` position inside the drawer. On desktop it overlays the body; on mobile it uses a full overlay. Add `isolation: 'isolate'` to the footer to ensure it renders above the guidance panel.

```jsx
import { useState } from 'react';
// import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Grid } from '@sqs/rosetta-elements';
// import { Accordion } from '@sqs/rosetta-compositions/accordion';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';

() => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [guidanceAnchor, setGuidanceAnchor] = useState(null);

  const closeAll = () => { setShowDrawer(false); setShowGuidance(false); };

  return (
    <>
      <Drawer.Transition>
        {showDrawer && (
          <Drawer.Modal onRequestClose={closeAll}>
            <Drawer.Overlay />
            <Drawer.Sheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Basic Drawer</Drawer.Header.Title>
                  <Flex gap={3}>
                    <Drawer.Guidance.Trigger onClick={() => setShowGuidance(true)} />
                    <Drawer.CloseButton onClick={closeAll} />
                  </Flex>
                </Drawer.Header.TitleRow>
              </Drawer.Header>
              <Drawer.Body>
                <Grid.Container gridConstraint={[12, 10, 8]} py={5} rowGap={8}>
                  <Grid.Item columns={12}>
                    <Text.SectionTitle pb={1}>Optional content title</Text.SectionTitle>
                    <Text.Body>Content</Text.Body>
                  </Grid.Item>
                </Grid.Container>
              </Drawer.Body>
              <Drawer.Guidance.Anchor ref={setGuidanceAnchor} />
              <Drawer.Footer justifyContent="end" sx={{ isolation: 'isolate' }}>
                <Button.Primary onClick={closeAll}>Save</Button.Primary>
              </Drawer.Footer>
            </Drawer.Sheet>
          </Drawer.Modal>
        )}
      </Drawer.Transition>
      <Drawer.Transition>
        {showGuidance && (
          <Drawer.Modal
            mountAt={guidanceAnchor}
            onRequestClose={() => setShowGuidance(false)}
          >
            <Drawer.Overlay display={{ _: 'none', 'mobile-*': undefined }} />
            <Drawer.Guidance.Sheet pb={{ _: '80px', 'mobile-*': undefined }}>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Guidance.Title />
                  <Drawer.CloseButton onClick={() => setShowGuidance(false)} />
                </Drawer.Header.TitleRow>
              </Drawer.Header>
              <Drawer.Body flexDirection="column" justifyContent="start" px={4}>
                <Accordion>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Accordion.Item key={i}>
                      <Accordion.Header
                        label={<Text.Body fontWeight="medium">FAQ item {i + 1}</Text.Body>}
                      />
                      <Accordion.Body>
                        <Flex pb={3} pt={1}>
                          <Text.Body>Answer to FAQ item {i + 1}.</Text.Body>
                        </Flex>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Drawer.Body>
            </Drawer.Guidance.Sheet>
          </Drawer.Modal>
        )}
      </Drawer.Transition>
      <Button.Primary onClick={() => setShowDrawer(true)}>Open Drawer</Button.Primary>
    </>
  );
};
```

### Side sheet

Use `Drawer.SideSheet` instead of `Drawer.Sheet` for a narrower panel-style drawer anchored to the side of the screen.

```jsx
import { useState } from 'react';
// import { Box, Button, Flex, Text } from '@sqs/rosetta-primitives';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';

() => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Drawer.Transition>
        {showDrawer && (
          <Drawer.Modal onRequestClose={() => setShowDrawer(false)}>
            <Drawer.Overlay />
            <Drawer.SideSheet>
              <Drawer.Header>
                <Drawer.Header.TitleRow>
                  <Drawer.Header.Title>Megan Tickle</Drawer.Header.Title>
                  <Drawer.CloseButton onClick={() => setShowDrawer(false)} />
                </Drawer.Header.TitleRow>
              </Drawer.Header>
              <Drawer.Body flexDirection="column" justifyContent="start">
                <Flex
                  flexDirection="column"
                  gap={8}
                  px={{ _: 6, 'mobile-*': 4 }}
                  py={{ _: 5, 'mobile-*': 4 }}
                >
                  <Flex alignItems="center" flexDirection="column" gap={4}>
                    <Flex
                      alignItems="center"
                      bg="gray.700"
                      borderRadius="circle"
                      justifyContent="center"
                      size="sizes.350"
                    >
                      <Text.Title color="fg.onStrong">MT</Text.Title>
                    </Flex>
                    <Text.SectionTitle>mtickle@example.com</Text.SectionTitle>
                  </Flex>
                </Flex>
              </Drawer.Body>
              <Drawer.Footer
                flexDirection={{ _: 'row', 'mobile-*': 'column' }}
                justifyContent="end"
              >
                <Button.Secondary color="fg.danger" onClick={() => setShowDrawer(false)}>
                  Delete Contact
                </Button.Secondary>
                <Button.Secondary onClick={() => setShowDrawer(false)}>
                  Edit Name
                </Button.Secondary>
              </Drawer.Footer>
            </Drawer.SideSheet>
          </Drawer.Modal>
        )}
      </Drawer.Transition>
      <Button.Primary onClick={() => setShowDrawer(true)}>Open Drawer</Button.Primary>
    </>
  );
};
```

### Header variants

```jsx
// import { Flex } from '@sqs/rosetta-primitives';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';

<Flex bg="bg.default" flexDirection="column" gap={3} p={3}>
  <Drawer.Header bg="bg.base">
    <Drawer.Header.TitleRow>
      <Drawer.Header.Title>Title with Bar</Drawer.Header.Title>
      <Drawer.CloseButton />
    </Drawer.Header.TitleRow>
  </Drawer.Header>

  <Drawer.Header bg="bg.base">
    <Drawer.Header.TitleRow>
      <Box>
        <Drawer.Header.Title>Title and Description with Bar</Drawer.Header.Title>
        <Drawer.Header.Description>Description</Drawer.Header.Description>
      </Box>
      <Drawer.CloseButton />
    </Drawer.Header.TitleRow>
  </Drawer.Header>

  <Drawer.Header.WithoutBar bg="bg.base">
    <Drawer.Header.TitleRow>
      <Drawer.Header.Title>Integrated Title</Drawer.Header.Title>
      <Drawer.CloseButton />
    </Drawer.Header.TitleRow>
  </Drawer.Header.WithoutBar>

  <Drawer.Header.WithoutBar.Large bg="bg.base">
    <Drawer.Header.TitleRow>
      <Drawer.Header.Title.Large>Large Integrated Title</Drawer.Header.Title.Large>
      <Drawer.CloseButton />
    </Drawer.Header.TitleRow>
  </Drawer.Header.WithoutBar.Large>
</Flex>
```

### Multiple drawers

Nest multiple `Drawer.Transition` + `Drawer.Modal` instances — each drawer stacks independently. Open drawer 2 from inside drawer 1's footer.

```jsx
import { useState } from 'react';
// import { Button } from '@sqs/rosetta-primitives';
// import { Drawer } from '@sqs/rosetta-compositions/drawer';

() => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const DrawerN = ({ index, show, close, openNext }) => (
    <Drawer.Transition>
      {show && (
        <Drawer.Modal onRequestClose={close}>
          <Drawer.Overlay />
          <Drawer.Sheet aria-label={`Drawer ${index}`}>
            <Drawer.Header>
              <Drawer.Header.TitleRow>
                <Drawer.Header.Title>Drawer {index}</Drawer.Header.Title>
                <Drawer.CloseButton onClick={close} />
              </Drawer.Header.TitleRow>
            </Drawer.Header>
            <Drawer.Body />
            {openNext && (
              <Drawer.Footer>
                <Button.Primary onClick={openNext}>Show Drawer {index + 1}</Button.Primary>
              </Drawer.Footer>
            )}
          </Drawer.Sheet>
        </Drawer.Modal>
      )}
    </Drawer.Transition>
  );

  return (
    <>
      <DrawerN index={1} show={show1} close={() => setShow1(false)} openNext={() => setShow2(true)} />
      <DrawerN index={2} show={show2} close={() => setShow2(false)} openNext={() => setShow3(true)} />
      <DrawerN index={3} show={show3} close={() => setShow3(false)} openNext={null} />
      <Button.Primary onClick={() => setShow1(true)}>Open Drawer</Button.Primary>
    </>
  );
};
```
