import { accountContext, configContext, websiteContext } from './context';

/**
 * `@sqs/config-context` bootstraps by fetching `/api/context/*` once. There is
 * no backend here, so this intercepts those requests and answers them with the
 * fixture context.
 *
 * Done in the app rather than as dev-server middleware so the mock travels with
 * a production build of the prototype too. Every other request passes through.
 */
const PAYLOADS: Record<string, unknown> = {
  '/api/context/account': accountContext,
  '/api/context/website': websiteContext,
  '/api/context/config': configContext,
};

export function installContextApi() {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string' ? input : input instanceof URL ? input.pathname : input.url;
    const path = new URL(url, window.location.origin).pathname;
    const payload = PAYLOADS[path];

    if (!payload) {
      return originalFetch(input, init);
    }

    return Promise.resolve(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  };
}
