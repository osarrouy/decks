import { defineConfig } from "@playwright/test";
import { fileURLToPath } from "node:url";

const origin = process.env.COURSE_TEST_ORIGIN;

export default defineConfig({
  testDir: "../tests/ui",
  outputDir: "../test-results",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: origin || "http://127.0.0.1:4175",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    viewport: { width: 1280, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: origin
    ? undefined
    : {
        cwd: fileURLToPath(new URL("../", import.meta.url)),
        command: "pnpm --filter site dev --port 4175 --strictPort",
        url: "http://127.0.0.1:4175",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
});
