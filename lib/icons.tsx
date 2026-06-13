import { ReactNode } from "react";

/**
 * Preset icon library. Tools reference icons by name, so new tools
 * added via the admin page pick from this set — no SVG pasting needed.
 * To extend, add an entry here; it appears in the admin picker automatically.
 */
const ICON_PATHS: Record<string, ReactNode> = {
  radar: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  "clipboard-check": (
    <>
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
    </>
  ),
  "book-open": (
    <>
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
    </>
  ),
  star: (
    <path
      d="M12 3.5L14.2 9.2H20.2L15.3 12.8L17.5 18.5L12 14.9L6.5 18.5L8.7 12.8L3.8 9.2H9.8L12 3.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  "doc-play": (
    <>
      <path
        d="M8 4H15L18 7V20H8V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15 4V7H18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M11 12L14 13.5L11 15V12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  ),
  storyboard: (
    <>
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
    </>
  ),
  "chart-bar": (
    <path
      d="M5 20V14M10 20V8M15 20V11M20 20V5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  chat: (
    <path
      d="M4 6C4 4.9 4.9 4 6 4H18C19.1 4 20 4.9 20 6V14C20 15.1 19.1 16 18 16H9L4 20V6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  calendar: (
    <>
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 9.5H20M8 3V6.5M16 3V6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.8V5.4M12 18.6V21.2M21.2 12H18.6M5.4 12H2.8M18.5 5.5L16.7 7.3M7.3 16.7L5.5 18.5M18.5 18.5L16.7 16.7M7.3 7.3L5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  rocket: (
    <>
      <path
        d="M12 3.5C14.5 5.5 15.5 9 15 12L12 15L9 12C8.5 9 9.5 5.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 12L7 14.5V17L9.5 15.5M15 12L17 14.5V17L14.5 15.5M12 15V19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  lightbulb: (
    <>
      <path
        d="M12 3C8.7 3 6 5.7 6 9C6 11.2 7.2 12.8 8.3 14C9 14.7 9.5 15.5 9.5 16.5H14.5C14.5 15.5 15 14.7 15.7 14C16.8 12.8 18 11.2 18 9C18 5.7 15.3 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 19.5H14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 19C4.5 16 6.5 14.5 9 14.5C11.5 14.5 13.5 16 14.5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15.5 5.8C16.9 6.3 18 7.6 18 9.2C18 10.4 17.4 11.4 16.5 12M16 14.8C18.2 15.4 19.8 17 20.5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 12H20M12 4C14.5 6.5 15.5 9 15.5 12C15.5 15 14.5 17.5 12 20C9.5 17.5 8.5 15 8.5 12C8.5 9 9.5 6.5 12 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  ),
  shield: (
    <>
      <path
        d="M12 3L19 5.5V11C19 15.5 16 19 12 20.5C8 19 5 15.5 5 11V5.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.5L11.2 13.7L15.2 9.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  layers: (
    <>
      <path
        d="M12 3.5L20 8L12 12.5L4 8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 12L12 16.5L20 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 16L12 20.5L20 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  ),
  video: (
    <>
      <rect
        x="3.5"
        y="6"
        width="13"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.5 10L20.5 7.5V16.5L16.5 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  ),
  database: (
    <>
      <ellipse
        cx="12"
        cy="5.5"
        rx="7"
        ry="2.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 5.5V18.5C5 20 8.1 21.2 12 21.2C15.9 21.2 19 20 19 18.5V5.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 12C5 13.5 8.1 14.7 12 14.7C15.9 14.7 19 13.5 19 12"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </>
  ),
  mail: (
    <>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 7L12 13L19.5 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M15.5 15.5L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  bolt: (
    <path
      d="M13 3L5 13.5H11L10 21L18 10.5H12L13 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  )
};

export const ICON_NAMES = Object.keys(ICON_PATHS);

export function ToolIcon({
  name,
  className = "h-5 w-5"
}: {
  name: string;
  className?: string;
}) {
  const paths = ICON_PATHS[name] ?? ICON_PATHS.grid;

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths}
    </svg>
  );
}
