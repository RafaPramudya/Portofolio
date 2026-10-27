"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// next-themes' inline script must run during SSR to apply the theme before
// first paint, but React 19 warns when the client render sees an executable
// <script>. Marking it as a data block only on the client silences the warning
// without disabling the SSR script.
const scriptProps =
  typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}
