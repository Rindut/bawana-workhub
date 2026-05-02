import Image from "next/image";

type HeaderProps = {
  dateLabel: string;
  onLogout?: () => void;
};

export function Header({ dateLabel, onLogout }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#2b8fcb] to-[#27b89c]">
          <Image
            src="/bawana-icon-transparent.png"
            alt="Bawana icon"
            fill
            priority
            sizes="36px"
            className="object-contain p-0.5"
          />
        </div>
        <Image
          src="/bawana-wordmark-v2.png"
          alt="Bawana"
          width={110}
          height={24}
          priority
          className="h-auto w-[110px] brightness-0 invert"
        />
        <span className="ml-1 border-l border-white/40 pl-3 text-[13px] font-normal uppercase tracking-[0.12em] text-white/70">
          WORKHUB
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-3.5 py-[7px] text-[13px] font-medium text-white backdrop-blur-[6px]">
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 text-white/85"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3V5M16 3V5M4 9H20M6.2 5H17.8C18.7941 5 19.6 5.80589 19.6 6.8V18.8C19.6 19.7941 18.7941 20.6 17.8 20.6H6.2C5.20589 20.6 4.4 19.7941 4.4 18.8V6.8C4.4 5.80589 5.20589 5 6.2 5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{dateLabel}</span>
        </div>

        {onLogout ? (
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-white/25 px-[18px] py-[7px] text-[13px] font-medium text-white backdrop-blur-[6px] transition hover:bg-white/35"
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
}
