
"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#09090b",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h1>Something went wrong!</h1>

          <p style={{ color: "#a1a1aa" }}>
            An unexpected error occurred.
            Please try again.
          </p>

          {error.digest && (
            <p style={{ color: "#71717a" }}>
              Error ID: {error.digest}
            </p>
          )}

          <button
            onClick={() => reset()}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#09090b",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
