"use client";

import { LangSwitcher } from "@/components";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-3">
      <h1>Header</h1>
      <LangSwitcher />
    </header>
  );
}
