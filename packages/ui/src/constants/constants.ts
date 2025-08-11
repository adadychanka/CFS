import { Home as HomeIcon, Plus, Settings, TriangleAlert } from "lucide-react";

export const USER_ROLE: "user" | "admin" = "user";

export const USER_PAGE_LINKS = [
  {
    title: "Dashboard",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "New Sentiment",
    url: "/new-sentiment",
    icon: Plus,
  },
];

export const ADMIN_PAGE_LINKS = [
  {
    title: "Dashboard",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Alerts",
    url: "/alerts",
    icon: TriangleAlert,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

// Add manual feedback page
export const FEEDBACK_MIN_LENGTH = 10;
export const FEEDBACK_MAX_LENGTH = 3000;
export const FEEDBACK_MAX_ITEMS = 100;
