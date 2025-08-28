export type AuthCardVariant =
  | "sign-in"
  | "sign-up"
  | "admin-sign-in"
  | "admin-sign-up";

type CardContent = {
  title: string;
  linkText: string;
  link: string;
};

const SIGN_IN_CARD_CONTENT: CardContent = {
  title: "Log in",
  linkText: "sign up here",
  link: "/sign-up",
};

const SIGN_UP_CARD_CONTENT: CardContent = {
  title: "Sign up",
  linkText: "login in here",
  link: "/log-in",
};

const ADMIN_SIGN_IN_CARD_CONTENT: CardContent = {
  title: "Admin Log in",
  linkText: "sign up here",
  link: "/admin/sign-up",
};

const ADMIN_SIGN_UP_CARD_CONTENT: CardContent = {
  title: "Admin Sign up",
  linkText: "login in here",
  link: "/admin/log-in",
};

const AUTH_CARD_CONTENT: Record<AuthCardVariant, CardContent> = {
  "sign-in": SIGN_IN_CARD_CONTENT,
  "sign-up": SIGN_UP_CARD_CONTENT,
  "admin-sign-in": ADMIN_SIGN_IN_CARD_CONTENT,
  "admin-sign-up": ADMIN_SIGN_UP_CARD_CONTENT,
};

const DEFAULT_BUTTON_TEXT = {
  "sign-in": "Log in",
  "sign-up": "Sign up",
  "admin-sign-in": "Log in",
  "admin-sign-up": "Sign up",
};

const PENDING_BUTTON_TEXT = {
  "sign-in": "Logging in...",
  "sign-up": "Signing up...",
  "admin-sign-in": "Logging in...",
  "admin-sign-up": "Signing up...",
};

export function getCardContent(variant: AuthCardVariant): CardContent {
  return AUTH_CARD_CONTENT[variant] || SIGN_IN_CARD_CONTENT;
}

export function getSubmitButtonContent(
  variant: AuthCardVariant,
  isPending: boolean,
) {
  return isPending
    ? PENDING_BUTTON_TEXT[variant]
    : DEFAULT_BUTTON_TEXT[variant];
}
