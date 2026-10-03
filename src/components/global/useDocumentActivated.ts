"use client";

import { useSyncExternalStore } from "react";

function isPrerendering() {
  return (
    typeof document !== "undefined" &&
    (document as Document & { prerendering?: boolean }).prerendering === true
  );
}

function subscribeToActivation(onActivate: () => void) {
  if (!isPrerendering()) return () => {};

  document.addEventListener("prerenderingchange", onActivate, { once: true });
  return () => document.removeEventListener("prerenderingchange", onActivate);
}

export function useDocumentActivated() {
  return useSyncExternalStore(subscribeToActivation, () => !isPrerendering(), () => false);
}
