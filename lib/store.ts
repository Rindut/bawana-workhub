import { promises as fs } from "fs";
import path from "path";
import { defaultTools, Tool } from "./tools";

/**
 * Storage layer with two backends:
 *
 * 1. Upstash Redis (Vercel KV) — used when UPSTASH_REDIS_REST_URL and
 *    UPSTASH_REDIS_REST_TOKEN are set. Required in production on Vercel,
 *    where the filesystem is not persistent.
 * 2. Local JSON file (data/tools.json) — fallback for localhost / self-hosted.
 *
 * Same API either way: getTools() / saveTools().
 */

const REDIS_KEY = "workhub:tools";
const FILE_PATH = path.join(process.cwd(), "data", "tools.json");

/**
 * Resolve the Upstash/Vercel Redis REST credentials.
 *
 * The Vercel marketplace integration may add a custom prefix (e.g.
 * STORAGE_REDIS_REST_URL) or use KV-style names (KV_REST_API_URL). Rather
 * than hardcode one name, we scan env vars for any key ending in the known
 * suffixes, so it works regardless of the prefix chosen during setup.
 */
function resolveRedisCreds(): { url: string; token: string } | null {
  const env = process.env;

  const findBySuffix = (...suffixes: string[]): string | undefined => {
    for (const suffix of suffixes) {
      const key = Object.keys(env).find((k) => k.endsWith(suffix));
      if (key && env[key]) return env[key];
    }
    return undefined;
  };

  const url = findBySuffix("REDIS_REST_URL", "KV_REST_API_URL");
  const token = findBySuffix("REDIS_REST_TOKEN", "KV_REST_API_TOKEN");

  if (url && token) return { url, token };
  return null;
}

const redisCreds = resolveRedisCreds();

function useRedis(): boolean {
  return redisCreds !== null;
}

async function redisCommand(command: (string | number)[]): Promise<unknown> {
  const creds = redisCreds as { url: string; token: string };
  const res = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Redis request failed: ${res.status}`);
  }

  const data = (await res.json()) as { result: unknown };
  return data.result;
}

export async function getTools(): Promise<Tool[]> {
  if (useRedis()) {
    const raw = (await redisCommand(["GET", REDIS_KEY])) as string | null;

    if (!raw) {
      await saveTools(defaultTools);
      return defaultTools;
    }

    return JSON.parse(raw) as Tool[];
  }

  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(raw) as Tool[];
  } catch {
    // File missing (first run) or filesystem not writable (e.g. Vercel
    // serverless without Redis configured). Try to seed, but never let a
    // failed write break reads — fall back to defaults so the dashboard
    // still renders.
    try {
      await saveTools(defaultTools);
    } catch {
      // ignore: read-only filesystem
    }
    return defaultTools;
  }
}

export async function saveTools(tools: Tool[]): Promise<void> {
  if (useRedis()) {
    await redisCommand(["SET", REDIS_KEY, JSON.stringify(tools)]);
    return;
  }

  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(tools, null, 2), "utf8");
}
