"use client";

import dynamic from "next/dynamic";
import React from "react";

// The ssr: false boundary lives safely inside a Client Component file
const DynamicProviders = dynamic(
  () => import("./providers").then((mod) => ({ default: mod.Providers })),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <DynamicProviders>{children}</DynamicProviders>;
}