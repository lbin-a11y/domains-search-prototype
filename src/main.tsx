import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContext } from '@sqs/rosetta-styled'
import { rosetta } from '@sqs/rosetta-themes'
import '@sqs/rosetta-themes/css/rosetta-default-root.css'
import { I18nContext } from '@sqs/i18n-react'
import enPack from '@sqs/i18n-cldr/packs/en.json'
import './index.css'
import App from './App.tsx'

const i18nValue = {
  translationLocale: 'en-US',
  formattingLocale: 'en-US',
  htmlAttributesTransform: (_: unknown, __: unknown, props: Record<string, unknown>) => props ?? {},
  cldrLoader: () => enPack,
}

createRoot(document.getElementById('root')!).render(
  <ThemeContext.Provider theme={rosetta.default}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <I18nContext.Provider value={i18nValue as any}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nContext.Provider>
  </ThemeContext.Provider>,
)
