/** Convert a video URL into a single-video embed, without forwarding arbitrary parameters. */
export function youtubeEmbedUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (!["https:", "http:"].includes(url.protocol)) return undefined;

  let id;
  if (url.hostname === "youtu.be") {
    id = url.pathname.slice(1);
  } else if (
    ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)
  ) {
    id =
      url.pathname === "/watch"
        ? url.searchParams.get("v")
        : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1];
  }
  if (!id || !/^[\w-]{11}$/.test(id)) return undefined;

  const embed = new URL(`https://www.youtube.com/embed/${id}`);
  embed.searchParams.set("autoplay", "0");
  embed.searchParams.set("controls", "1");
  embed.searchParams.set("playsinline", "1");
  const time = url.searchParams.get("start") ?? url.searchParams.get("t");
  if (time) {
    const match = time.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
    const seconds = /^\d+$/.test(time)
      ? Number(time)
      : match
        ? Number(match[1] ?? 0) * 3600 +
          Number(match[2] ?? 0) * 60 +
          Number(match[3] ?? 0)
        : 0;
    if (Number.isSafeInteger(seconds) && seconds > 0) {
      embed.searchParams.set("start", String(seconds));
    }
  }
  return embed.href;
}
