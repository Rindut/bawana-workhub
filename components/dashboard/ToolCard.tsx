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
      className="group relative flex h-full cursor-pointer flex-col rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Open ${title}`}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[36px] rounded-tr-2xl bg-gradient-to-bl from-[#eef6fc] to-[#f8fbff]" />

      <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef5fb] text-primary">
        {icon}
      </div>

      <h2 className="relative mt-6 text-[28px] font-semibold leading-tight text-slate-800">
        {title}
      </h2>

      <p
        className="relative mt-3 min-h-14 text-lg leading-relaxed text-slate-600"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}
      >
        {description}
      </p>

      <div className="relative mt-6">
        <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition duration-150 group-hover:bg-primary-hover">
          Open
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
