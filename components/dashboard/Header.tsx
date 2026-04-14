import Image from "next/image";

type HeaderProps = {
  dateLabel: string;
  onLogout?: () => void;
};

export function Header({ dateLabel, onLogout }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 bg-transparent">
        <Image
          src="/bawana-wordmark-v2.png"
          alt="Bawana"
          width={170}
          height={42}
          priority
          className="h-auto w-[150px] bg-transparent sm:w-[170px]"
        />
        <span className="h-6 w-px bg-slate-300" />
        <span className="text-sm font-semibold tracking-[0.18em] text-slate-500">
          WORKHUB
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm font-medium text-slate-600">
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-primary"
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
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
}
