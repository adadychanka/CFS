import { Home as HomeIcon, Plus, Settings, TriangleAlert } from "lucide-react";

export const USER_ROLE = "admin";

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
