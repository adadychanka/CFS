export { auth as middleware } from "./auth/auth";

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$|sign-up).*)"], // _next/static,  _next/image, *.png, sign-up,  these routes won't be blocked by middleware
};
