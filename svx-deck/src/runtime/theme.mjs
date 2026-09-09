// Follow the same preference as @dg/ui, including same-origin portal embeds.
export function syncTheme() {
  const root = document.documentElement;
  const update = () => {
    try {
      root.dataset.theme =
        localStorage.getItem("dg-theme") === "dark" ? "dark" : "light";
    } catch {
      /* Light remains available when storage is blocked. */
    }
  };
  const storage = (event) => {
    if (event.key === "dg-theme" || event.key === null) update();
  };
  update();
  window.addEventListener("storage", storage);
  let observer;
  try {
    if (window.parent !== window) {
      const parent = window.parent.document.documentElement;
      const followParent = () => {
        root.dataset.theme = parent.dataset.theme === "dark" ? "dark" : "light";
      };
      observer = new MutationObserver(followParent);
      observer.observe(parent, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      followParent();
    }
  } catch {
    /* Cross-origin embeds use their own stored preference. */
  }
  return () => {
    window.removeEventListener("storage", storage);
    observer?.disconnect();
  };
}
