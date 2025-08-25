import {
  SentimentAnalysisGroup,
  type SentimentAnalysisResult,
} from "@/types/sentiment-analysis-result";
import { HomeIcon, Plus, Settings, TriangleAlert } from "lucide-react";

// Sidebar
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

// Pagination
export const PAGINATION_WINDOW = 1; // Count of links should be shown around the current active page
export const PAGINATION_MAX_VISIBLE = 7; // if there are more pages than this, pagination starts skipping
export const PAGINATION_EDGE_LIMIT = 5; // shows the number of pages at the edge of pagination

// Analyzed sentiment table
export const FEEDBACK_PAGE_LIMIT = 20;
export const FAKE_PROCESSED_FEEDBACK: SentimentAnalysisResult[] = [
  {
    id: "fbk_001",
    content: "The new dashboard UI is clean and much faster than before.",
    sentiment: "positive",
    confidence: 0.92,
    summary: "User appreciates the new dashboard design and performance.",
    userId: "usr_101",
    fileId: null,
    createdAt: "2025-08-18T10:15:00.000Z",
    updatedAt: "2025-08-18T10:15:00.000Z",
    deletedAt: null,
  },
  {
    id: "fbk_002",
    content: "Sometimes the app logs me out unexpectedly, which is annoying.",
    sentiment: "negative",
    confidence: 0.87,
    summary: "User is frustrated with random logout issues.",
    userId: "usr_102",
    fileId: "file_200",
    createdAt: "2025-08-18T11:45:00.000Z",
    updatedAt: "2025-08-18T11:50:00.000Z",
    deletedAt: null,
  },
  {
    id: "fbk_003",
    content:
      "I noticed the reports take a bit longer to generate than last week.",
    sentiment: "neutral",
    confidence: 0.75,
    summary: "Reports generation speed slightly decreased.",
    userId: "usr_103",
    fileId: null,
    createdAt: "2025-08-19T09:20:00.000Z",
    updatedAt: "2025-08-19T09:25:00.000Z",
    deletedAt: null,
  },
  {
    id: "fbk_004",
    content:
      "Not sure if the search filter is working correctly. Sometimes it gives random results.",
    sentiment: "unknown",
    confidence: 0.6,
    summary: "User is uncertain about search filter accuracy.",
    userId: "usr_104",
    fileId: "file_312",
    createdAt: "2025-08-19T13:00:00.000Z",
    updatedAt: "2025-08-19T13:10:00.000Z",
    deletedAt: null,
  },
  {
    id: "fbk_005",
    content: "Customer support was quick to resolve my issue, thanks!",
    sentiment: "positive",
    confidence: 0.95,
    summary: "User praises customer support responsiveness.",
    userId: "usr_105",
    fileId: null,
    createdAt: "2025-08-20T08:30:00.000Z",
    updatedAt: "2025-08-20T08:30:00.000Z",
    deletedAt: null,
  },
];
export const USER_DASHBOARD_TABS = ["table", "grouped"];
export const GROUPED_FEEDBACK_DATA: SentimentAnalysisGroup[] = [
  {
    id: "group_001",
    groupName: "UI Feedback",
    items: [
      {
        id: "fbk_001",
        content: "The new dashboard UI is clean and much faster than before.",
        sentiment: "positive",
        confidence: 0.92,
        summary: "User appreciates the new dashboard design and performance.",
        userId: "usr_101",
        fileId: null,
        createdAt: "2025-08-18T10:15:00.000Z",
        updatedAt: "2025-08-18T10:15:00.000Z",
        deletedAt: null,
      },
      {
        id: "fbk_002",
        content:
          "Sometimes the app logs me out unexpectedly, which is annoying.",
        sentiment: "negative",
        confidence: 0.87,
        summary: "User is frustrated with random logout issues.",
        userId: "usr_102",
        fileId: "file_200",
        createdAt: "2025-08-18T11:45:00.000Z",
        updatedAt: "2025-08-18T11:50:00.000Z",
        deletedAt: null,
      },
      {
        id: "fbk_003",
        content:
          "I noticed the reports take a bit longer to generate than last week.",
        sentiment: "neutral",
        confidence: 0.75,
        summary: "Reports generation speed slightly decreased.",
        userId: "usr_103",
        fileId: null,
        createdAt: "2025-08-19T09:20:00.000Z",
        updatedAt: "2025-08-19T09:25:00.000Z",
        deletedAt: null,
      },
    ],
  },
  {
    id: "group_002",
    groupName: "System & Support Feedback",
    items: [
      {
        id: "fbk_004",
        content:
          "Not sure if the search filter is working correctly. Sometimes it gives random results.",
        sentiment: "unknown",
        confidence: 0.6,
        summary: "User is uncertain about search filter accuracy.",
        userId: "usr_104",
        fileId: "file_312",
        createdAt: "2025-08-19T13:00:00.000Z",
        updatedAt: "2025-08-19T13:10:00.000Z",
        deletedAt: null,
      },
      {
        id: "fbk_005",
        content: "Customer support was quick to resolve my issue, thanks!",
        sentiment: "positive",
        confidence: 0.95,
        summary: "User praises customer support responsiveness.",
        userId: "usr_105",
        fileId: null,
        createdAt: "2025-08-20T08:30:00.000Z",
        updatedAt: "2025-08-20T08:30:00.000Z",
        deletedAt: null,
      },
      {
        id: "fbk_006",
        content: "Notifications sometimes arrive late, making me miss updates.",
        sentiment: "negative",
        confidence: 0.82,
        summary: "User complains about delayed notifications.",
        userId: "usr_106",
        fileId: null,
        createdAt: "2025-08-20T09:10:00.000Z",
        updatedAt: "2025-08-20T09:15:00.000Z",
        deletedAt: null,
      },
      {
        id: "fbk_007",
        content:
          "The export feature is helpful, but I wish it supported Excel format.",
        sentiment: "neutral",
        confidence: 0.78,
        summary: "User suggests adding Excel format to exports.",
        userId: "usr_107",
        fileId: "file_401",
        createdAt: "2025-08-20T10:05:00.000Z",
        updatedAt: "2025-08-20T10:10:00.000Z",
        deletedAt: null,
      },
      {
        id: "fbk_008",
        content:
          "Great response time from technical support on my last ticket.",
        sentiment: "positive",
        confidence: 0.9,
        summary: "User compliments technical support response time.",
        userId: "usr_108",
        fileId: null,
        createdAt: "2025-08-20T11:20:00.000Z",
        updatedAt: "2025-08-20T11:20:00.000Z",
        deletedAt: null,
      },
    ],
  },
];

// Add manual feedback page
export const TEST_TEXTAREA_TEXT = [
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
export const FEEDBACK_TEXTAREA_MAX_ITEMS = 500;
