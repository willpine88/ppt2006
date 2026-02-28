import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vinext from "vinext";
import { defineConfig } from "vite";

// Load .env.local and inject as process.env for Next.js compat
function loadEnvFile(path: string): Record<string, string> {
  try {
    const content = readFileSync(path, "utf-8");
    const env: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
    }
    return env;
  } catch {
    return {};
  }
}

const envVars = loadEnvFile(resolve(__dirname, ".env.local"));
const processEnvDefines: Record<string, string> = {};
for (const [key, val] of Object.entries(envVars)) {
  processEnvDefines[`process.env.${key}`] = JSON.stringify(val);
}

export default defineConfig({
  plugins: [vinext()],
  define: processEnvDefines,
});
