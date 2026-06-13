import { getTools, saveTools } from "@/lib/store";
import { Tool } from "@/lib/tools";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function checkAdmin(req: Request): NextResponse | null {
  const adminPassword = process.env.WORKHUB_ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "WORKHUB_ADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }

  if (req.headers.get("x-admin-key") !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

/** Public: the dashboard reads the tool list. */
export async function GET() {
  const tools = await getTools();
  return NextResponse.json(tools, {
    headers: { "Cache-Control": "no-store, max-age=0" }
  });
}

/** Admin-only: verify the admin password (used by the admin login form). */
export async function POST(req: Request) {
  const denied = checkAdmin(req);
  if (denied) return denied;

  return NextResponse.json({ ok: true });
}

function isValidTool(value: unknown): value is Tool {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Record<string, unknown>;

  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    t.title.trim().length > 0 &&
    typeof t.description === "string" &&
    typeof t.url === "string" &&
    typeof t.icon === "string" &&
    typeof t.category === "string" &&
    (t.comingSoon === undefined || typeof t.comingSoon === "boolean")
  );
}

/** Admin-only: replace the full tool list. */
export async function PUT(req: Request) {
  const denied = checkAdmin(req);
  if (denied) return denied;

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body) || !body.every(isValidTool)) {
    return NextResponse.json(
      { error: "Body must be an array of valid tools." },
      { status: 400 }
    );
  }

  await saveTools(body);
  return NextResponse.json({ ok: true });
}
