import { type MiddlewareConfig } from "next/server";

export { auth as middleware } from "./auth/auth";

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.png$|sign-up|admin/log-in|admin/sign-up).*)",
  ], // _next/static,  _next/image, *.png, sign-up, admin/log-in, admin/sign-up these routes won't be blocked by middleware
};
