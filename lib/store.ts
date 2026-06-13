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

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

function useRedis(): boolean {
  return Boolean(redisUrl && redisToken);
}

async function redisCommand(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(redisUrl as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
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
    await saveTools(defaultTools);
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
