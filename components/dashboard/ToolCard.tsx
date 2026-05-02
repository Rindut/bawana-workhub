import { ReactNode } from "react";

type ToolCardProps = {
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
};

export function ToolCard({ title, description, url, icon }: ToolCardProps) {
  return (
    <a
      href={url}
      target="_self"
      className="group flex h-full cursor-pointer flex-col gap-3 rounded-2xl bg-white/95 px-6 pb-6 pt-[26px] shadow-[0_8px_32px_rgba(0,80,120,0.13),0_1px_4px_rgba(0,0,0,0.06)] backdrop-blur-[4px] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(0,80,120,0.18),0_2px_8px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`Open ${title}`}
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#e8f4fd] to-[#ddf0f8] text-[#2b8fcb]">
        {icon}
      </div>

      <h2 className="text-[17px] font-bold leading-tight text-[#1a2a3a]">
        {title}
      </h2>

      <p className="flex-1 text-[13.5px] leading-[1.55] text-[#6b7e90]">
        {description}
      </p>

      <div className="mt-1">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2b8fcb] to-[#27b89c] px-[18px] py-[9px] text-[13px] font-semibold text-white transition duration-150 group-hover:translate-x-0.5 group-hover:opacity-95">
          Open
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
