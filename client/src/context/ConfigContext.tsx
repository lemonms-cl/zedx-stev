"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ApiConfig } from "@/types";

const fallbackConfig: ApiConfig = {} as ApiConfig;

const Ctx = createContext<ApiConfig | null>(null);

export function ConfigProvider({ value, children }: { value: ApiConfig; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConfig() {
  const v = useContext(Ctx);
  
  // Return the fallback configuration if the provider is missing during static export/prerendering
  if (!v) {
    return fallbackConfig;
  }
  
  return v;
}