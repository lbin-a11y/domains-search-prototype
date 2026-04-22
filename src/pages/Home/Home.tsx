import { useState } from 'react'
import { Box, Flex, Text, Button } from '@sqs/rosetta-primitives'
import { Card, Divider, Badge } from '@sqs/rosetta-elements'
import { Stack } from '@sqs/rosetta-elements'
import { Dialog } from '@sqs/rosetta-compositions'
import { LogoSquarespace, Sparkles, Code, Layout, ColorPalette } from '@sqs/rosetta-icons'

const CATEGORIES = [
  {
    title: 'Primitives',
    description: 'Foundational building blocks like Box, Flex, Text, and Button that form the base of every interface.',
    icon: Code,
    count: 9,
  },
  {
    title: 'Elements',
    description: 'Composable components like Card, Checkbox, Tabs, and TextInput built from primitives.',
    icon: Layout,
    count: 26,
  },
  {
    title: 'Compositions',
    description: 'Complex patterns like Dialog, Table, Drawer, and PageHeader for advanced workflows.',
    icon: Sparkles,
    count: 20,
  },
  {
    title: 'Design Tokens',
    description: 'Colors, spacing, typography, shadows, and radii that define the visual language.',
    icon: ColorPalette,
    count: 6,
  },
]

export default function Home() {
  const [showPrimitivesDialog, setShowPrimitivesDialog] = useState(false)

  return (
    <Box bg="bg.base" minHeight="100vh">
      <Flex as="nav" alignItems="center" justifyContent="space-between" px={6} height={77} borderBottom="1px solid" borderColor="border.default">
        <Flex alignItems="center" gap={2}>
          <LogoSquarespace />
          <Text.Subtitle m={0} fontWeight="semibold">Rosetta</Text.Subtitle>
          <Badge appearance="default">Sandbox</Badge>
        </Flex>
        <Button.Secondary size="small" as="a" href="https://design-platform.squarespace.net" target="_blank" rel="noopener noreferrer">
          Documentation
        </Button.Secondary>
      </Flex>

      <Box maxWidth={1440} mx="auto" px={6}>
        <Flex flexDirection="column" gap={4} py={8}>
          <Flex flexDirection="column" gap={2} maxWidth={640}>
            <Text.DisplayTitle m={0}>Design System Sandbox</Text.DisplayTitle>
            <Text.Subtitle m={0} color="gray.300">
              A prototyping environment for building interfaces with Rosetta components, tokens, and patterns.
            </Text.Subtitle>
          </Flex>

          <Flex gap={2}>
            <Button.Primary size="medium">Get Started</Button.Primary>
            <Button.Secondary size="medium">Browse Components</Button.Secondary>
          </Flex>
        </Flex>

        <Divider />

        <Flex flexDirection="column" gap={4} py={6}>
          <Text.SectionTitle m={0}>Component Library</Text.SectionTitle>

          <Flex flexWrap="wrap" gap={4}>
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.title}
                  isHoverable
                  px={5}
                  py={4}
                  sx={{ flex: '1 1 280px', maxWidth: '400px', cursor: category.title === 'Primitives' ? 'pointer' : undefined }}
                  onClick={category.title === 'Primitives' ? () => setShowPrimitivesDialog(true) : undefined}
                >
                  <Stack space={2}>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Flex alignItems="center" gap={2}>
                        <Icon color="fg.muted" />
                        <Text.Subtitle m={0} fontWeight="semibold">{category.title}</Text.Subtitle>
                      </Flex>
                      <Badge appearance="default">{category.count}</Badge>
                    </Flex>
                    <Text.Body m={0} color="gray.300">{category.description}</Text.Body>
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </Flex>

        <Dialog.Transition>
          {showPrimitivesDialog && (
            <Dialog.Modal onRequestClose={() => setShowPrimitivesDialog(false)}>
              <Dialog.Overlay
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(6px)' }}
              />
              <Dialog size="small">
                <Dialog.Header>
                  <Dialog.Header.Title m={0}>Primitives</Dialog.Header.Title>
                  <Dialog.CloseButton onClick={() => setShowPrimitivesDialog(false)} />
                </Dialog.Header>
                <Dialog.Content>
                  <Text.Body m={0} width="100%">
                    Primitives content coming soon.
                  </Text.Body>
                </Dialog.Content>
                <Dialog.Footer justifyContent="end">
                  <Button.Primary onClick={() => setShowPrimitivesDialog(false)}>Done</Button.Primary>
                </Dialog.Footer>
              </Dialog>
            </Dialog.Modal>
          )}
        </Dialog.Transition>

        <Divider />

        <Flex flexDirection="column" gap={4} py={6}>
          <Text.SectionTitle m={0}>Quick Start</Text.SectionTitle>

          <Box bg="bg.default" p={5} sx={{ borderRadius: 6 }}>
            <Stack space={3}>
              <Text.Body m={0} fontWeight="semibold">Import and use a component</Text.Body>
              <Box bg="bg.base" p={4} sx={{ borderRadius: 4, fontFamily: 'monospace', fontSize: '13px', lineHeight: '22px', whiteSpace: 'pre', overflow: 'auto' }}>
                {`import { Button } from '@sqs/rosetta-primitives'
import { Card } from '@sqs/rosetta-elements'

function MyPage() {
  return (
    <Card px={4} py={3}>
      <Button.Primary>Hello Rosetta</Button.Primary>
    </Card>
  )
}`}
              </Box>
            </Stack>
          </Box>
        </Flex>

        <Divider />

        <Flex alignItems="center" justifyContent="center" py={6}>
          <Text.Caption color="gray.400">
            Built with Rosetta Design System
          </Text.Caption>
        </Flex>
      </Box>
    </Box>
  )
}
