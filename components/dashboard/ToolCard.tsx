import { ReactNode } from "react";

type ToolCardProps = {
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
  comingSoon?: boolean;
};

const cardClassName =
  "group relative flex h-full min-h-[224px] flex-col gap-3 rounded-2xl bg-white/95 px-6 pb-6 pt-[26px] shadow-[0_8px_32px_rgba(0,80,120,0.13),0_1px_4px_rgba(0,0,0,0.06)] backdrop-blur-[4px]";

const footerClassName = "mt-auto flex h-10 shrink-0 items-end";

function ComingSoonPill() {
  return (
    <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#2b8fcb]/20 bg-gradient-to-r from-[#d6ebf7] via-[#d2f2ed] to-[#daf6ef] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3d85ad] shadow-[0_3px_10px_rgba(43,143,203,0.14)]">
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

export function ToolCard({
  title,
  description,
  url,
  icon,
  comingSoon = false
}: ToolCardProps) {
  const content = (
    <>
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#e8f4fd] to-[#ddf0f8] text-[#2b8fcb]">
        {icon}
      </div>

      <h2 className="text-[17px] font-bold leading-tight text-[#1a2a3a]">
        {title}
      </h2>

      <p className="flex-1 text-[13.5px] leading-[1.55] text-[#6b7e90]">
        {description}
      </p>

      {!comingSoon ? (
        <div className={footerClassName}>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2b8fcb] to-[#27b89c] px-[18px] py-[9px] text-[13px] font-semibold text-white transition duration-150 group-hover:translate-x-0.5 group-hover:opacity-95">
            Open
            <span aria-hidden="true">→</span>
          </span>
        </div>
      ) : (
        <div className={footerClassName}>
          <ComingSoonPill />
        </div>
      )}
    </>
  );

  if (comingSoon) {
    return (
      <div
        className={`${cardClassName} cursor-default ring-1 ring-[#2b8fcb]/15`}
        aria-label={`${title} — coming soon`}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_self"
      className={`${cardClassName} cursor-pointer transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(0,80,120,0.18),0_2px_8px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
      aria-label={`Open ${title}`}
    >
      {content}
    </a>
  );
}
