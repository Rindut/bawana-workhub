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
import { LockIcon } from "./LockIcon";

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
    <div className="w-full max-w-[430px] rounded-2xl bg-white p-10 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <BrandLogo />

      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <label
          className={`flex h-12 items-center rounded-xl border px-4 transition ${
            error ? "border-red-400" : "border-transparent"
          } bg-slate-100`}
        >
          <LockIcon />
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            placeholder="Password"
            aria-label="Password"
            className="ml-3 w-full bg-transparent text-sm text-slate-700 placeholder:text-gray-400 focus:outline-none"
          />
        </label>

        {error ? (
          <p className="-mt-3 text-xs font-medium text-red-500">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-[#2d7fce] text-sm font-semibold text-white shadow-sm transition duration-150 hover:scale-[1.01] hover:from-primary-hover hover:to-[#2367aa] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? "Checking..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
}
