import { test } from "node:test";
import assert from "node:assert/strict";
import { youtubeEmbedUrl } from "../src/lib/deck/youtube.mjs";

test("YouTube video links become single-video embeds with manual playback", () => {
  for (const input of [
    "https://www.youtube.com/watch?v=M7lc1UVf-VE&list=playlist&autoplay=1",
    "https://youtube.com/watch?v=M7lc1UVf-VE",
    "https://m.youtube.com/watch?v=M7lc1UVf-VE",
    "https://youtu.be/M7lc1UVf-VE?si=share",
    "https://www.youtube.com/embed/M7lc1UVf-VE",
    "https://www.youtube.com/shorts/M7lc1UVf-VE",
  ]) {
    assert.equal(
      youtubeEmbedUrl(input),
      "https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0&controls=1&playsinline=1",
    );
  }
});

test("YouTube start times are preserved without forwarding invalid values", () => {
  for (const [query, expected] of [
    ["t=90", "90"],
    ["t=90s", "90"],
    ["t=1m30s", "90"],
    ["t=1h2m3s", "3723"],
    ["start=12&t=90", "12"],
    ["start=0&t=90", null],
    ["t=-1", null],
    ["t=invalid", null],
    ["start=1.5", null],
    ["start=99999999999999999999", null],
  ]) {
    const embed = new URL(
      youtubeEmbedUrl(`https://youtu.be/M7lc1UVf-VE?${query}`),
    );
    assert.equal(embed.searchParams.get("start"), expected);
  }
});

test("invalid URLs never become arbitrary iframe sources", () => {
  for (const input of [
    "",
    "https://",
    "not a URL",
    "javascript:alert(1)",
    "https://example.com/watch?v=M7lc1UVf-VE",
    "https://youtube.com.example.com/watch?v=M7lc1UVf-VE",
    "https://www.youtube.com/playlist?list=example",
    "https://www.youtube.com/watch?v=invalid",
    "https://youtu.be/M7lc1UVf-VE/extra",
    "ftp://youtube.com/watch?v=M7lc1UVf-VE",
  ]) {
    assert.equal(youtubeEmbedUrl(input), undefined);
  }
});
