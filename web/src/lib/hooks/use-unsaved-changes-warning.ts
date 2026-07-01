"use client";

import * as React from "react";

/**
 * Warns the user before they close/reload the tab while `when` is true (i.e. a
 * form has unsaved changes). App-Router client navigation can't be reliably
 * blocked, so this covers the browser-level exit; in-app leaving is guarded by
 * the form's own Save/Cancel affordances.
 */
export function useUnsavedChangesWarning(when: boolean) {
  React.useEffect(() => {
    if (!when) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Legacy requirement for some browsers to actually show the prompt.
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when]);
}
