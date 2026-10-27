"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "@/i18n/content";

const ContentContext = createContext<Content | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  value: Content;
  children: ReactNode;
}) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

/** Read the copy resolved for the current locale. */
export function useContent() {
  const content = useContext(ContentContext);
  if (!content) {
    throw new Error("useContent must be used inside a ContentProvider");
  }
  return content;
}
