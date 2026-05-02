"use client";

import { Greeting } from "@/components/dashboard/Greeting";
import { Header } from "@/components/dashboard/Header";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { DecorCircles } from "@/components/shared/DecorCircles";
import {
  hasWorkhubAccess,
  WORKHUB_ACCESS_KEY
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type ToolItem = {
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
};

const iconClassName = "h-5 w-5";

const tools: ToolItem[] = [
  {
    title: "Sales Radar",
    description: "Track your pipeline, follow up faster, and close deals with clarity.",
    url: "https://sales.bawana.xyz",
    icon: (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "PM Logbook",
    description: "Monitor project health, spot risks early, and keep delivery on track.",
    url: "https://pmlog.bawana.xyz/",
    icon: (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="4"
          width="14"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 11.5L10.5 14L16 8.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "Storyboard Builder",
    description:
      "Turn raw ideas into structured learning content your team can produce.",
    url: "https://stb.bawana.xyz/",
    icon: (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 8H15M5 12H13M5 16H11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M15.2 16.8L18.5 13.5M18.5 13.5L21 16M18.5 13.5L16 11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: "BAWANA Userguide",
    description:
      "Your go-to reference for everything BAWANA. Guides, how-tos, and tips in one place.",
    url: "https://docs.bawana.com",
    icon: (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.8 6.2C6.4 5.1 8.4 4.9 10.2 5.6C11.2 6 12.1 6.6 12.9 7.4V18C12.1 17.2 11.2 16.6 10.2 16.2C8.4 15.5 6.4 15.7 4.8 16.8V6.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M19.2 6.2C17.6 5.1 15.6 4.9 13.8 5.6C12.8 6 11.9 6.6 11.1 7.4V18C11.9 17.2 12.8 16.6 13.8 16.2C15.6 15.5 17.6 15.7 19.2 16.8V6.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!hasWorkhubAccess()) {
      router.replace("/");
      return;
    }

    setIsAuthorized(true);
    setIsChecking(false);
  }, [router]);

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

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-10">
      <DecorCircles />
      <div className="relative z-10 mx-auto w-full max-w-[1160px]">
        <Header dateLabel={dateLabel} onLogout={handleLogout} />

        <div className="mt-12">
          <Greeting />
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              url={tool.url}
              icon={tool.icon}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
