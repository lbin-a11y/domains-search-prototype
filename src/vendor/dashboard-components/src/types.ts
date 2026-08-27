export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type AnalyticsEventIdentifier = {
  /**
   * Event identifier to be used for tracking when the item is clicked. Should be snake_case.
   *
   * @example 'creating_a_custom_checkout_form' or 'managing_members'
   */
  eventIdentifier?: string;
};
