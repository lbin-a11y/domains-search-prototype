export function withTimeout<T>(
  timeoutMs: number,
  fn: () => Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    let hasTimedOut = false;

    const timeout = window.setTimeout(() => {
      hasTimedOut = true;
      reject('[customNavigation.withTimeout] timed out');
    }, timeoutMs);

    fn()
      .then(res => {
        if (!hasTimedOut) {
          window.clearTimeout(timeout);
          resolve(res);
        }
      })
      .catch(err => {
        if (!hasTimedOut) {
          window.clearTimeout(timeout);
          reject(err);
        }
      });
  });
}
