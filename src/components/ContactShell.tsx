"use client";

import type { ReactNode } from "react";
import { ContactProvider } from "./ContactProvider";
import { ContactModal } from "./ContactModal";

export function ContactShell({ children }: { children: ReactNode }) {
  return (
    <ContactProvider>
      {children}
      <ContactModal />
    </ContactProvider>
  );
}
