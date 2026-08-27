import type FullStory from '@fullstory/browser';

// @TODO: this should ultimately be refactored/removed in favor of an explicit import dependency, however we cannot currently use
// @sqs/fullstory because this package is published, and @sqs/fullstory is not. For now, we'll rely on the window global.
const withFS = (cb: (fs: typeof FullStory) => void) => {
  try {
    // get the top-most window; this ensures we're compatible with iframes.
    const FS = window?.top?.FS;
    if (FS) {
      cb(FS);
    }
  } catch {
    // do nothing
  }
};

export const fireEvent = (
  eventName: string,
  eventProperties: { [key: string]: any }
) => {
  withFS((FS) => {
    FS.event(eventName, eventProperties);
  });
};
