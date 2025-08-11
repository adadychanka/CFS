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
export const TABLPLE_TEXTAREA_TEXT = [
  "The sentiment analysis feature works really well and provides accurate insights. It helps me understand customer feelings quickly and easily.",
  "I love the clean UI and intuitive design. Navigating between feedback lists and analytics is smooth and hassle-free.",
  "The app sometimes lags when uploading large batches of feedback, but overall it’s very responsive and fast.",
  "Would be great to have more customization options for reports, like filtering by date range or sentiment type.",
  "Customer support was quick to respond when I had questions about integrating the app with other tools.",
  "The real-time dashboard is a game-changer for tracking customer sentiment trends over time.",
  "I appreciate the export feature that allows me to download feedback summaries for team meetings.",
  "Adding feedback manually is straightforward, but bulk import could be improved with better file format support.",
  "The tagging system helps organize feedback effectively, making it easy to prioritize customer issues.",
  "Some graphs and charts need clearer labels, but the overall data visualization is very helpful.",
  "I like how the app highlights negative feedback so we can act quickly to resolve problems.",
  "The mobile version could use some improvements; it’s slightly harder to use compared to the desktop app.",
  "Integrations with Slack and email notifications keep me updated on new customer feedback instantly.",
  "It would be useful to have sentiment predictions on feedback written in multiple languages.",
  "Overall, this app has streamlined our customer service process and helped us improve satisfaction scores significantly.",
];
export const FEEDBACK_MIN_LENGTH = 10;
export const FEEDBACK_MAX_LENGTH = 300;
export const FEEDBACK_MAX_ITEMS = 100;
