"use client";

import * as React from "react";

/**
 * Catches errors thrown in the root layout itself. It replaces the entire
 * document, so it must render <html>/<body> and can't rely on the app's CSS —
 * styles are inlined to stay self-contained.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1.5rem",
          background: "#0f1712",
          color: "#f5f5f4",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ marginTop: "0.75rem", maxWidth: "28rem", color: "rgba(245,245,244,0.6)" }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.6rem 1.25rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            color: "#0f1712",
            background: "linear-gradient(90deg, #2f8f24, #c8a832)",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
