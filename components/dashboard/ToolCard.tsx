import { ReactNode } from "react";

type ToolCardProps = {
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
  category?: string;
};

export function ToolCard({
  title,
  description,
  url,
  icon,
  category
}: ToolCardProps) {
  return (
    <a
      href={url}
      target="_self"
      className="group relative flex h-full min-h-[148px] flex-col gap-2.5 rounded-2xl bg-white/95 px-5 py-5 shadow-[0_8px_32px_rgba(0,80,120,0.13),0_1px_4px_rgba(0,0,0,0.06)] backdrop-blur-[4px] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(0,80,120,0.18),0_2px_8px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`Open ${title}`}
    >
      <div className="flex items-start justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#e8f4fd] to-[#ddf0f8] text-[#2b8fcb]">
          {icon}
        </div>
        {category && (
          <span className="rounded-full bg-[#eef6fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5a8aa8]">
            {category}
          </span>
        )}
      </div>

      <h3 className="flex items-center gap-1.5 text-[16px] font-bold leading-tight text-[#1a2a3a]">
        {title}
        <span
          aria-hidden="true"
          className="text-[16px] leading-none text-[#2b8fcb] opacity-0 transition duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
        >
          →
        </span>
      </h3>

      <p className="text-[13px] leading-[1.5] text-[#6b7e90]">{description}</p>
    </a>
  );
}
