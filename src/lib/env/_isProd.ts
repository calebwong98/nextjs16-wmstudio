// lib/_isProd.ts

export function isProd(): boolean {
  if (typeof window !== "undefined") {
    // ✅ Client-side check
    return (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    );
  }

  // ✅ Server-side check (Vercel sets this automatically)
  return process.env.VERCEL === "1";
}
