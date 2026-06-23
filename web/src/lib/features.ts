/**
 * Demo feature flags.
 *
 * The demo build of Hustle Grove ships with member-facing functionality
 * disabled — only the admin portal and the public marketing/inquiry flow are
 * exposed. The underlying code (member login, registration and the
 * `/dashboard` portal) is left fully intact; flipping `memberAccess` back to
 * `true` re-enables every member entry point with no further changes.
 */
export const FEATURES = {
  /** When false: hide member login/registration, the member dashboard and
   *  all member navigation. Set to true to restore the full member experience. */
  memberAccess: false,
} as const;

export type FeatureFlag = keyof typeof FEATURES;
