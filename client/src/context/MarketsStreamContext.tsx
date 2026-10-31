"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { MarketsOverview, WsMessage } from "@/types/markets";

type Ctx = { overview: MarketsOverview | null; connected: boolean };
const StreamCtx = createContext<Ctx>({ overview: null, connected: false });

function wsUrl(): string {
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  const backendHost = process.env.NEXT_PUBLIC_WS_URL || '127.0.0.1:5000';
  return `${proto}//${backendHost}/ws/markets`;
}

export function MarketsStreamProvider({ children }: { children: ReactNode }) {
  const [overview, setOverview] = useState<MarketsOverview | null>(null);
  const [connected, setConnected] = useState(false);
  const alive = useRef(true);
  const retryCount = useRef(0);

  useEffect(() => {
    alive.current = true;
    let ws: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | undefined;

    function connect() {
      try { ws = new WebSocket(wsUrl()); }
      catch {
        const delay = Math.min(2000 * Math.pow(2, retryCount.current), 10000);
        retryCount.current++;
        retry = setTimeout(connect, delay);
        return;
      }
      ws.onopen = () => { if (alive.current) { setConnected(true); retryCount.current = 0; } };
      ws.onclose = () => {
        if (alive.current) {
          setConnected(false);
          const delay = Math.min(2000 * Math.pow(2, retryCount.current), 10000);
          retryCount.current++;
          retry = setTimeout(connect, delay);
        }
      };
      ws.onerror = () => ws?.close();
      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data as string) as WsMessage;
          if (msg.type === "snapshot" || msg.type === "tick") setOverview(msg.overview);
        } catch { /* ignore */ }
      };
    }

    connect();
    return () => {
      alive.current = false;
      if (retry) clearTimeout(retry);
      ws?.close();
    };
  }, []);

  const value = useMemo(() => ({ overview, connected }), [overview, connected]);
  return <StreamCtx.Provider value={value}>{children}</StreamCtx.Provider>;
}

export function useMarketsStream() { return useContext(StreamCtx); }
