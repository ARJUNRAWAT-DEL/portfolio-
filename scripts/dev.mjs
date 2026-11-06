// Accept common preview-host arguments while preserving normal Next.js development.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
const args = process.argv
  .slice(2)
  .filter((arg) => arg !== "--strictPort")
  .map((arg) => (arg === "--host" ? "--hostname" : arg));
// Managed preview supplies --strictPort. Prefer the tested production build there.
const production =
  process.argv.includes("--strictPort") && existsSync(".next/BUILD_ID");
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    ...(production ? ["start"] : ["dev", "--turbopack"]),
    ...args,
  ],
  { stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 1));
