import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContext } from '@sqs/rosetta-styled'
import { rosetta } from '@sqs/rosetta-themes'
import '@sqs/rosetta-themes/css/rosetta-default-root.css'
import { I18nContext } from '@sqs/i18n-react'
import enPack from '@sqs/i18n-cldr/packs/en.json'
import { initAccountContext } from '@sqs/config-context/account'
import { initWebsiteContext } from '@sqs/config-context/website'
import './index.css'
import App from './App.tsx'
import { installContextApi } from './mocks/installContextApi'
import { StageProvider } from './prototype/StageContext'

const i18nValue = {
  translationLocale: 'en-US',
  formattingLocale: 'en-US',
  htmlAttributesTransform: (_: unknown, __: unknown, props: Record<string, unknown>) => props ?? {},
  cldrLoader: () => enPack,
}

// The config-frontend source ported into src/vendor reads account and website
// context through @sqs/config-context, which fetches it once on boot. Both
// requests have to resolve before the ported components render and read roles,
// permissions and the site's status off that context.
async function bootstrap() {
  installContextApi()
  await Promise.all([initAccountContext(), initWebsiteContext()])

  createRoot(document.getElementById('root')!).render(
    <ThemeContext.Provider theme={rosetta.default}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <I18nContext.Provider value={i18nValue as any}>
        <BrowserRouter>
          <StageProvider>
            <App />
          </StageProvider>
        </BrowserRouter>
      </I18nContext.Provider>
    </ThemeContext.Provider>,
  )
}

bootstrap()
