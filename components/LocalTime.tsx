"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/lib/profile";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: profile.timezone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

export default function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => fmt.format(new Date()),
    () => "--:--",
  );
  return <span className="tabular-nums">{time} IST</span>;
}
