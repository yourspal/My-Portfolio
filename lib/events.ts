export const ASK_EVENT = "assistant:open";
export const PALETTE_EVENT = "palette:open";

export function openAssistant(question?: string) {
  window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: { question } }));
}

export function openPalette() {
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT));
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}
