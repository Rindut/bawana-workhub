"use client";

import { DecorCircles } from "@/components/shared/DecorCircles";
import { ICON_NAMES, ToolIcon } from "@/lib/icons";
import { Tool, TOOL_CATEGORIES } from "@/lib/tools";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const ADMIN_KEY_STORAGE = "workhub_admin_key";

const emptyForm: Omit<Tool, "id"> = {
  title: "",
  description: "",
  url: "",
  icon: "grid",
  category: "",
  comingSoon: false
};

const inputClassName =
  "w-full rounded-lg border border-[#d5e3ec] bg-white px-3.5 py-2.5 text-[14px] text-[#1a2a3a] placeholder:text-[#9fb2c1] focus:border-[#2b8fcb] focus:outline-none";

const labelClassName =
  "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5a8aa8]";

const primaryButtonClassName =
  "rounded-lg bg-gradient-to-r from-[#2b8fcb] to-[#27b89c] px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const subtleButtonClassName =
  "rounded-lg border border-[#d5e3ec] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#3d6580] transition hover:bg-[#f2f8fc]";

export default function AdminPage() {
  const router = useRouter();
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [tools, setTools] = useState<Tool[] | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (stored) setAdminKey(stored);
  }, []);

  useEffect(() => {
    if (!adminKey) return;

    fetch("/api/tools")
      .then((res) => res.json())
      .then((data: Tool[]) => setTools(data))
      .catch(() => setNotice("Could not load tools. Refresh the page."));
  }, [adminKey]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setVerifying(true);
    setAuthError("");

    const res = await fetch("/api/tools", {
      method: "POST",
      headers: { "x-admin-key": keyInput }
    });

    setVerifying(false);

    if (res.ok) {
      sessionStorage.setItem(ADMIN_KEY_STORAGE, keyInput);
      setAdminKey(keyInput);
      return;
    }

    const data = await res.json().catch(() => null);
    setAuthError(
      res.status === 401
        ? "Incorrect admin password."
        : data?.error ?? "Something went wrong."
    );
  };

  const updateTools = (next: Tool[]) => {
    setTools(next);
    setDirty(true);
    setNotice("");
  };

  const moveTool = (index: number, direction: -1 | 1) => {
    if (!tools) return;
    const target = index + direction;
    if (target < 0 || target >= tools.length) return;

    const next = [...tools];
    [next[index], next[target]] = [next[target], next[index]];
    updateTools(next);
  };

  const deleteTool = (id: string) => {
    if (!tools) return;
    const tool = tools.find((t) => t.id === id);
    if (!window.confirm(`Delete "${tool?.title}"?`)) return;
    updateTools(tools.filter((t) => t.id !== id));
  };

  const startEdit = (tool: Tool) => {
    setEditingId(tool.id);
    setForm({
      title: tool.title,
      description: tool.description,
      url: tool.url,
      icon: tool.icon,
      category: tool.category,
      comingSoon: tool.comingSoon ?? false
    });
  };

  const startAdd = () => {
    setEditingId("new");
    setForm(emptyForm);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    if (!tools) return;

    if (editingId === "new") {
      const tool: Tool = { id: crypto.randomUUID(), ...form };
      updateTools([...tools, tool]);
    } else {
      updateTools(
        tools.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
    }

    cancelEdit();
  };

  const saveAll = async () => {
    if (!tools || !adminKey) return;
    setSaving(true);
    setNotice("");

    const res = await fetch("/api/tools", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey
      },
      body: JSON.stringify(tools)
    });

    setSaving(false);

    if (res.ok) {
      setDirty(false);
      setNotice("Saved. The dashboard now shows the updated list.");
      return;
    }

    if (res.status === 401) {
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      setAdminKey(null);
      return;
    }

    const data = await res.json().catch(() => null);
    setNotice(data?.error ?? "Save failed. Please try again.");
  };

  const categories = Array.from(
    new Set([...TOOL_CATEGORIES, ...(tools ?? []).map((t) => t.category)])
  ).filter(Boolean);

  if (!adminKey) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
        <DecorCircles />
        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-[380px] rounded-2xl bg-white/95 p-7 shadow-[0_8px_32px_rgba(0,80,120,0.13)] backdrop-blur-[4px]"
        >
          <h1 className="text-[20px] font-bold text-[#1a2a3a]">
            WORKHUB Admin
          </h1>
          <p className="mt-1 text-[13px] text-[#6b7e90]">
            Enter the admin password to manage tools.
          </p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin password"
            className={`${inputClassName} mt-4`}
            autoFocus
          />
          {authError && (
            <p className="mt-2 text-[12.5px] font-medium text-[#d05252]">
              {authError}
            </p>
          )}
          <button
            type="submit"
            disabled={verifying || keyInput.length === 0}
            className={`${primaryButtonClassName} mt-4 w-full`}
          >
            {verifying ? "Checking…" : "Enter"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-10">
      <DecorCircles />
      <div className="relative z-10 mx-auto w-full max-w-[860px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.12)]">
            Manage Tools
          </h1>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/dashboard")}
              className={subtleButtonClassName}
            >
              ← Dashboard
            </button>
            <button
              onClick={saveAll}
              disabled={!dirty || saving}
              className={primaryButtonClassName}
            >
              {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
            </button>
          </div>
        </div>

        {notice && (
          <p className="mt-3 rounded-lg bg-white/85 px-4 py-2.5 text-[13px] font-medium text-[#1a2a3a]">
            {notice}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2.5">
          {tools === null && (
            <p className="text-[14px] text-white/90">Loading…</p>
          )}

          {tools?.map((tool, index) => (
            <div
              key={tool.id}
              className="flex items-center gap-4 rounded-xl bg-white/95 px-5 py-3.5 shadow-[0_4px_16px_rgba(0,80,120,0.10)]"
            >
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#e8f4fd] to-[#ddf0f8] text-[#2b8fcb]">
                <ToolIcon name={tool.icon} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-[14.5px] font-bold text-[#1a2a3a]">
                    {tool.title}
                  </p>
                  <span className="shrink-0 rounded-full bg-[#eef6fb] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#5a8aa8]">
                    {tool.category || "No category"}
                  </span>
                  {tool.comingSoon && (
                    <span className="shrink-0 rounded-full bg-[#fdf3e0] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#b08430]">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="truncate text-[12.5px] text-[#6b7e90]">
                  {tool.url}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={() => moveTool(index, -1)}
                  disabled={index === 0}
                  className={`${subtleButtonClassName} px-2.5 disabled:opacity-35`}
                  aria-label={`Move ${tool.title} up`}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveTool(index, 1)}
                  disabled={index === tools.length - 1}
                  className={`${subtleButtonClassName} px-2.5 disabled:opacity-35`}
                  aria-label={`Move ${tool.title} down`}
                >
                  ↓
                </button>
                <button
                  onClick={() => startEdit(tool)}
                  className={subtleButtonClassName}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTool(tool.id)}
                  className={`${subtleButtonClassName} text-[#d05252] hover:bg-[#fdf2f2]`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tools !== null && editingId === null && (
          <button
            onClick={startAdd}
            className={`${primaryButtonClassName} mt-5`}
          >
            + Add tool
          </button>
        )}

        {editingId !== null && (
          <form
            onSubmit={submitForm}
            className="mt-6 rounded-2xl bg-white/95 p-6 shadow-[0_8px_32px_rgba(0,80,120,0.13)]"
          >
            <h2 className="text-[17px] font-bold text-[#1a2a3a]">
              {editingId === "new" ? "Add tool" : "Edit tool"}
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="tool-title">
                  Title
                </label>
                <input
                  id="tool-title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClassName}
                  placeholder="e.g. Demo Hub"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="tool-url">
                  URL
                </label>
                <input
                  id="tool-url"
                  required
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className={inputClassName}
                  placeholder="https://"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClassName} htmlFor="tool-description">
                  Description (one line)
                </label>
                <input
                  id="tool-description"
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className={inputClassName}
                  placeholder="What does this tool help people do?"
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="tool-category">
                  Category
                </label>
                <input
                  id="tool-category"
                  required
                  list="category-options"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className={inputClassName}
                  placeholder="Pick or type a new one"
                />
                <datalist id="category-options">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-medium text-[#1a2a3a]">
                  <input
                    type="checkbox"
                    checked={form.comingSoon}
                    onChange={(e) =>
                      setForm({ ...form, comingSoon: e.target.checked })
                    }
                    className="h-4 w-4 accent-[#2b8fcb]"
                  />
                  Coming soon
                </label>
              </div>
            </div>

            <div className="mt-4">
              <span className={labelClassName}>Icon</span>
              <div className="grid grid-cols-8 gap-2 sm:grid-cols-11">
                {ICON_NAMES.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setForm({ ...form, icon: name })}
                    aria-label={`Icon: ${name}`}
                    title={name}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] transition ${
                      form.icon === name
                        ? "bg-gradient-to-br from-[#2b8fcb] to-[#27b89c] text-white"
                        : "bg-[#eef6fb] text-[#2b8fcb] hover:bg-[#ddf0f8]"
                    }`}
                  >
                    <ToolIcon name={name} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              <button type="submit" className={primaryButtonClassName}>
                {editingId === "new" ? "Add to list" : "Apply changes"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className={subtleButtonClassName}
              >
                Cancel
              </button>
              <p className="ml-1 text-[12px] text-white/85">
                Changes are applied to the list — press Save changes to
                publish.
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
