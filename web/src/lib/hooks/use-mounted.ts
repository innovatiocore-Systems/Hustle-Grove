"use client";

import * as React from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `false` during SSR and the first client render, then `true` once
 * mounted. Uses `useSyncExternalStore` so the value flips without a
 * setState-in-effect, while staying hydration-safe (server snapshot is
 * always `false`).
 */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
