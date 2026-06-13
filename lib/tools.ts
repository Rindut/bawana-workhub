export type Tool = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  comingSoon?: boolean;
};

export const TOOL_CATEGORIES = [
  "Sales",
  "Delivery",
  "Content & Learning",
  "Company"
];

/** Seed data — used the first time storage is empty. */
export const defaultTools: Tool[] = [
  {
    id: "sales-radar",
    title: "Sales Radar",
    description: "Track your pipeline, follow up faster, close with clarity.",
    url: "https://sales.bawana.xyz",
    icon: "radar",
    category: "Sales"
  },
  {
    id: "pm-logbook",
    title: "PM Logbook",
    description: "Monitor project health, spot risks early, keep delivery on track.",
    url: "https://pmlog.bawana.xyz/",
    icon: "clipboard-check",
    category: "Delivery"
  },
  {
    id: "bawana-userguide",
    title: "BAWANA Userguide",
    description: "Guides, how-tos, and tips for everything BAWANA.",
    url: "https://docs.bawana.com",
    icon: "book-open",
    category: "Company"
  },
  {
    id: "netpolitan-showcase",
    title: "NETPOLITAN Showcase",
    description: "Show your work. Inspire your team.",
    url: "https://showcase.bawana.xyz/",
    icon: "star",
    category: "Company"
  },
  {
    id: "learning-studio",
    title: "Learning Studio",
    description: "Transform documents into interactive learning.",
    url: "https://learningstudio.bawana.com/",
    icon: "doc-play",
    category: "Content & Learning"
  },
  {
    id: "storyboard-builder",
    title: "Storyboard Builder",
    description:
      "Turn raw ideas into structured learning content your team can produce.",
    url: "https://stb.bawana.xyz/",
    icon: "storyboard",
    category: "Content & Learning",
    comingSoon: true
  }
];
