import { ReactNode } from "react";

type ComingSoonRowProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

function ComingSoonPill() {
  return (
    <span className="relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-[#2b8fcb]/20 bg-gradient-to-r from-[#d6ebf7] via-[#d2f2ed] to-[#daf6ef] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3d85ad] shadow-[0_3px_10px_rgba(43,143,203,0.14)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-full bg-white/35"
      />
      <svg
        aria-hidden="true"
        className="relative h-3 w-3 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2.5L13.4 8.2L19 9.6L13.4 11L12 16.7L10.6 11L5 9.6L10.6 8.2L12 2.5Z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M18.5 14.5L19.2 16.8L21.5 17.5L19.2 18.2L18.5 20.5L17.8 18.2L15.5 17.5L17.8 16.8L18.5 14.5Z"
          fill="currentColor"
          opacity="0.75"
        />
      </svg>
      <span className="relative">Coming soon</span>
    </span>
  );
}

export function ComingSoonRow({ title, description, icon }: ComingSoonRowProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl bg-white/70 px-5 py-3.5 shadow-[0_4px_16px_rgba(0,80,120,0.08)] ring-1 ring-white/40 backdrop-blur-[4px]"
      aria-label={`${title} — coming soon`}
    >
      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#e8f4fd] to-[#ddf0f8] text-[#2b8fcb]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight text-[#1a2a3a]">
          {title}
        </p>
        <p className="truncate text-[12.5px] leading-[1.5] text-[#6b7e90]">
          {description}
        </p>
      </div>
      <ComingSoonPill />
    </div>
  );
}
