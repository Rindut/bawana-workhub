"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  hasWorkhubAccess,
  WORKHUB_ACCESS_KEY,
  WORKHUB_ACCESS_VALUE,
  WORKHUB_PASSWORD,
  WORKHUB_PASSWORD_ERROR
} from "@/lib/auth";
import { BrandLogo } from "./BrandLogo";

export function LoginCard() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasWorkhubAccess()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const canSubmit = password.trim().length > 0 && !isLoading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password.trim() === WORKHUB_PASSWORD) {
      localStorage.setItem(WORKHUB_ACCESS_KEY, WORKHUB_ACCESS_VALUE);
      setError("");
      router.push("/dashboard");
      return;
    }

    setError(WORKHUB_PASSWORD_ERROR);
    setIsLoading(false);
  };

  return (
    <div className="w-full rounded-[20px] bg-white px-9 pb-8 pt-9 shadow-[0_20px_60px_rgba(0,80,120,0.18),0_2px_8px_rgba(0,0,0,0.06)]">
      <BrandLogo />

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label
          htmlFor="password"
          className="mb-[7px] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a9bb0]"
        >
          Password
        </label>
        <div
          className={`mb-4 flex h-[46px] items-center rounded-[10px] border-[1.5px] px-[14px] transition ${
            error ? "border-red-400" : "border-[#e8eef4]"
          } bg-[#f5f8fb] focus-within:border-[#2b8fcb] focus-within:bg-white`}
        >
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            autoComplete="current-password"
            aria-label="Password"
            className="w-full bg-transparent text-sm text-[#1a2a3a] placeholder:text-[#b0bec8] focus:outline-none"
          />
        </div>

        {error ? (
          <p className="-mt-2 mb-2 text-xs font-medium text-red-500">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border-none bg-[#e8eef4] text-sm font-medium text-[#8a9bb0] transition duration-150 disabled:cursor-not-allowed disabled:opacity-90 enabled:bg-gradient-to-r enabled:from-[#2b8fcb] enabled:to-[#27b89c] enabled:text-white enabled:hover:-translate-y-[1px] enabled:hover:opacity-95"
        >
          {isLoading ? "Checking..." : "Login"}
          <svg
            aria-hidden="true"
            className="h-[14px] w-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
