"use client";

import { ComingSoonRow } from "@/components/dashboard/ComingSoonRow";
import { Greeting } from "@/components/dashboard/Greeting";
import { Header } from "@/components/dashboard/Header";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { DecorCircles } from "@/components/shared/DecorCircles";
import {
  hasWorkhubAccess,
  WORKHUB_ACCESS_KEY
} from "@/lib/auth";
import { ToolIcon } from "@/lib/icons";
import { Tool } from "@/lib/tools";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [tools, setTools] = useState<Tool[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!hasWorkhubAccess()) {
      router.replace("/");
      return;
    }

    setIsAuthorized(true);
    setIsChecking(false);
  }, [router]);

  useEffect(() => {
    fetch("/api/tools", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load tools");
        return res.json();
      })
      .then((data: Tool[]) => setTools(data))
      .catch(() => setLoadError(true));
  }, []);

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  }).format(new Date());

  const handleLogout = () => {
    localStorage.removeItem(WORKHUB_ACCESS_KEY);
    router.push("/");
  };

  if (isChecking || !isAuthorized) {
    return null;
  }

  const liveTools = tools?.filter((tool) => !tool.comingSoon) ?? [];
  const comingSoonTools = tools?.filter((tool) => tool.comingSoon) ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-10">
      <DecorCircles />
      <div className="relative z-10 mx-auto w-full max-w-[1160px]">
        <Header dateLabel={dateLabel} onLogout={handleLogout} />

        <div className="mt-12">
          <Greeting />
        </div>

        {loadError && (
          <p className="text-[15px] font-medium text-white/90">
            Could not load the tool list. Please refresh the page.
          </p>
        )}

        <section className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {liveTools.map((tool) => (
            <div key={tool.id} className="h-full min-h-0">
              <ToolCard
                title={tool.title}
                description={tool.description}
                url={tool.url}
                icon={<ToolIcon name={tool.icon} />}
                category={tool.category}
              />
            </div>
          ))}
        </section>

        {comingSoonTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.12)]">
              Coming soon
            </h2>
            <div className="mt-3.5 flex flex-col gap-3">
              {comingSoonTools.map((tool) => (
                <ComingSoonRow
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={<ToolIcon name={tool.icon} />}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
