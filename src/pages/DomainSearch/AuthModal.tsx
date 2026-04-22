import { useState } from 'react'
import { Box, Flex, Field } from '@sqs/rosetta-primitives'
import { TextInput } from '@sqs/rosetta-elements'
import { Tabs } from '@sqs/rosetta-elements'
import { Dialog } from '@sqs/rosetta-compositions'

type AuthTab = 'login' | 'signup'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<AuthTab>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    onSuccess()
    setEmail('')
    setPassword('')
  }

  return (
    <Dialog.Transition>
      {isOpen && (
        <Dialog.Modal onRequestClose={onClose}>
          <Dialog.Overlay />
          <Dialog size="small">
            <Dialog.Header>
              <Dialog.Header.Title m={0}>Sign in to save domains</Dialog.Header.Title>
              <Dialog.CloseButton onClick={onClose} />
            </Dialog.Header>
            <Dialog.Content>
              <Tabs
                fitted
                value={tab}
                onChange={(v: string) => setTab(v as AuthTab)}
                options={[
                  { label: 'Log in', value: 'login' },
                  { label: 'Sign up', value: 'signup' },
                ]}
                sx={{ mb: 5 }}
              />
              <Flex flexDirection="column" gap={4} width="100%">
                <Field.Root name="auth-email" width="100%">
                  <Field.Label>Email</Field.Label>
                  <TextInput
                    value={email}
                    onChange={(v: string) => setEmail(v)}
                    placeholder="you@example.com"
                    sx={{ width: '100%' }}
                  />
                </Field.Root>
                <Field.Root name="auth-password" width="100%">
                  <Field.Label>Password</Field.Label>
                  <TextInput
                    type="password"
                    value={password}
                    onChange={(v: string) => setPassword(v)}
                    placeholder="Password"
                    sx={{ width: '100%' }}
                  />
                </Field.Root>
              </Flex>
            </Dialog.Content>
            <Dialog.Footer justifyContent="end">
              <Flex gap={3}>
                <Box
                  as="button"
                  onClick={onClose}
                  sx={{
                    background: 'none',
                    border: '1px solid',
                    borderColor: 'border.default',
                    borderRadius: 4,
                    height: 40,
                    px: 4,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    '&:hover': { background: 'var(--colors-bg-default)' },
                  }}
                >
                  Cancel
                </Box>
                <Box
                  as="button"
                  onClick={handleSubmit}
                  sx={{
                    background: 'var(--colors-fg-default)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    height: 40,
                    px: 4,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    transition: 'opacity 0.15s ease',
                    '&:hover': { opacity: 0.82 },
                  }}
                >
                  {tab === 'login' ? 'Log in' : 'Create account'}
                </Box>
              </Flex>
            </Dialog.Footer>
          </Dialog>
        </Dialog.Modal>
      )}
    </Dialog.Transition>
  )
}
