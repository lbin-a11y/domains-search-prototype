import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Box, Flex, Text } from '@sqs/rosetta-primitives'
import { LogoSquarespace } from '@sqs/rosetta-icons'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="12" fill="#1877F2"/>
      <path fill="#fff" d="M16.671 15.469l.469-3.046h-2.922V10.38c0-.833.408-1.644 1.717-1.644h1.329V6.123S16.035 5.9 14.916 5.9c-2.407 0-3.98 1.459-3.98 4.099v2.324H8.353v3.046h2.583V23.8c.519.082 1.051.124 1.594.124.543 0 1.075-.042 1.594-.124v-8.331h2.547z"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit() {
    onSuccess()
    setEmail('')
    setPassword('')
    setShowPassword(false)
  }

  const ssoProviders = [
    { icon: <GoogleIcon />, label: 'Continue with Google' },
    { icon: <AppleIcon />, label: 'Continue with Apple' },
    { icon: <FacebookIcon />, label: 'Continue with Facebook' },
  ]

  if (!isOpen) return null

  return createPortal(
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)',
        '@media (max-width: 767px)': {
          alignItems: 'flex-end',
        },
      }}
    >
      <Box
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        sx={{
          background: '#fff',
          borderRadius: 16,
          width: 700,
          maxWidth: '94vw',
          pt: 8,
          pb: 7,
          px: 9,
          position: 'relative',
          '@media (max-width: 767px)': {
            width: '100%',
            maxWidth: '100%',
            borderRadius: '20px 20px 0 0',
            pt: 5,
            pb: 8,
            px: 6,
            animation: 'authSlideUp 0.32s cubic-bezier(0.4,0,0.2,1)',
            '@keyframes authSlideUp': {
              from: { transform: 'translateY(100%)' },
              to: { transform: 'translateY(0)' },
            },
          },
        }}
      >
        {/* Drag handle — mobile only */}
        <Flex justifyContent="center" sx={{ mb: 4, '@media (min-width: 768px)': { display: 'none' } }}>
          <Box sx={{ width: 36, height: 4, borderRadius: 2, background: '#e0e0e0' }} />
        </Flex>

        {/* Logo */}
        <Flex justifyContent="center" mb={4}>
          <LogoSquarespace color="fg.default" sx={{ width: 30, height: 30 }} />
        </Flex>

        {/* Title — Rosetta typography */}
        <Box mb={7} sx={{ textAlign: 'center' }}>
          <Text.Title m={0} sx={{ letterSpacing: '-0.02em' }}>
            Log into Squarespace
          </Text.Title>
        </Box>

        {/* Two-column layout (desktop) → single-column (mobile) */}
        <Flex sx={{ minHeight: 240, '@media (max-width: 767px)': { flexDirection: 'column', minHeight: 'auto' } }}>

          {/* Left: email + password form */}
          <Box sx={{ flex: 1 }}>
            <Box mb={5}>
              <Text.Caption
                m={0}
                mb={2}
                sx={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'fg.default' }}
              >
                Email Address
              </Text.Caption>
              <Box
                as="input"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="name@example.com"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 40,
                  border: 'none',
                  borderBottom: '2px solid',
                  borderColor: 'fg.default',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  color: 'fg.default',
                  px: 0,
                  '::placeholder': { color: 'var(--colors-fg-disabled)' },
                }}
              />
            </Box>

            <Box mb={6}>
              <Text.Caption
                m={0}
                mb={2}
                sx={{ display: 'block', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'fg.default' }}
              >
                Password
              </Text.Caption>
              <Box sx={{ position: 'relative' }}>
                <Box
                  as="input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Password"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 40,
                    border: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'border.default',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '15px',
                    fontFamily: 'inherit',
                    color: 'fg.default',
                    px: 0,
                    pr: '36px',
                    '::placeholder': { color: 'var(--colors-fg-disabled)' },
                  }}
                />
                <Box
                  as="button"
                  onClick={() => setShowPassword((p) => !p)}
                  sx={{
                    position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', p: '4px',
                    color: 'fg.muted', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    '&:hover': { color: 'fg.default' },
                  }}
                >
                  <EyeIcon />
                </Box>
              </Box>
            </Box>

            <Box
              as="button"
              onClick={handleSubmit}
              sx={{
                width: '100%', height: 50, background: '#ebebeb', color: '#aaa',
                border: 'none', borderRadius: 4, cursor: 'pointer',
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', fontFamily: 'inherit',
                transition: 'background 0.15s, color 0.15s',
                '&:hover': { background: '#d8d8d8', color: '#555' },
              }}
            >
              Log in
            </Box>
          </Box>

          {/* Divider */}
          <Flex
            flexDirection="column"
            alignItems="center"
            sx={{
              mx: 7, flexShrink: 0,
              '@media (max-width: 767px)': { flexDirection: 'row', mx: 0, my: 5 },
            }}
          >
            <Box sx={{ width: '1px', flex: 1, background: '#e5e5e5', '@media (max-width: 767px)': { width: 'auto', height: '1px' } }} />
            <Box sx={{ py: 3, '@media (max-width: 767px)': { py: 0, px: 3 } }}>
              <Text.Caption m={0} sx={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'fg.muted' }}>
                or
              </Text.Caption>
            </Box>
            <Box sx={{ width: '1px', flex: 1, background: '#e5e5e5', '@media (max-width: 767px)': { width: 'auto', height: '1px' } }} />
          </Flex>

          {/* Right: SSO */}
          <Flex flexDirection="column" gap={3} sx={{ flex: 1, justifyContent: 'center' }}>
            {ssoProviders.map(({ icon, label }) => (
              <Box
                key={label}
                as="button"
                onClick={handleSubmit}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  height: 54, border: '1px solid', borderColor: 'border.default',
                  borderRadius: 4, background: '#fff', cursor: 'pointer',
                  px: 4, fontFamily: 'inherit', fontSize: '14px', fontWeight: 500,
                  color: 'fg.default', transition: 'background 0.15s, border-color 0.15s',
                  '&:hover': { background: '#fafafa', borderColor: '#bbb' },
                }}
              >
                {icon}
                {label}
              </Box>
            ))}
          </Flex>
        </Flex>

        {/* Can't log in */}
        <Flex justifyContent="center" mt={6}>
          <Text.Caption
            m={0}
            sx={{
              fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', color: 'fg.muted',
              '&:hover': { color: 'fg.default' },
            }}
          >
            Can't log in?
          </Text.Caption>
        </Flex>
      </Box>
    </Box>,
    document.body
  )
}
