/**
 * Width-based breakpoint used by the prototype's responsive layouts.
 *
 * Rosetta's own `mobile-*` breakpoints also require a coarse pointer, so they do
 * not fire when a desktop browser window is simply narrowed. For a prototype
 * that gets demoed by dragging the window, a plain width query is what actually
 * behaves as expected. 767px matches Rosetta's "single view" cutoff.
 */
export const MOBILE = '@media (max-width: 767px)';
