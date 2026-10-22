"use client";

import { useEffect, useRef } from "react";

/** Hidden honeypot + timestamp fields read by looksLikeBot() on the server. */
export function BotGuard() {
  const startedAt = useRef<HTMLInputElement>(null);
  // Set after hydration so the prerendered HTML stays static.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}
