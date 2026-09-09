import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";

// Prefix only actual deck assets, preserving remote URLs, routes and query/hash suffixes.
export function prefixStaticAssets(source, staticDir, base) {
  if (!base) return source;
  const root = resolve(staticDir);
  return source.replace(
    /(["'`(])\/(?!\/)([^"'`()\s<>]+)/g,
    (match, delimiter, url) => {
      const pathname = url.split(/[?#]/)[0];
      const file = resolve(root, pathname);
      if (!file.startsWith(root + sep) || !existsSync(file)) return match;
      return `${delimiter}${base}/${url}`;
    },
  );
}

export function svxDeckStaticAssets(staticDir, base) {
  return {
    name: "svx-deck:static-assets",
    enforce: "pre",
    transform(source, id) {
      if (!/\.(?:svx|svelte|css|[cm]?[jt]s|md)(?:\?|$)/.test(id)) return;
      const code = prefixStaticAssets(source, staticDir, base);
      return code === source ? undefined : { code, map: null };
    },
  };
}
