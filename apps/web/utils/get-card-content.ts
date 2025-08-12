export type AuthCardVariant = "sign-in" | "sign-up";

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

const AUTH_CARD_CONTENT: Record<AuthCardVariant, CardContent> = {
  "sign-in": SIGN_IN_CARD_CONTENT,
  "sign-up": SIGN_UP_CARD_CONTENT,
};

export function getCardContent(variant: AuthCardVariant): CardContent {
  return AUTH_CARD_CONTENT[variant] || SIGN_IN_CARD_CONTENT;
}
