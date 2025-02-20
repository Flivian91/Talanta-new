import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]); //protect the admin dashboard
const isSponserRoute = createRouteMatcher(["/sponser(.*)"]); //protect the sponser dashboard
const isLinkProtected = createRouteMatcher([
  "/subscriptions",
  "/profile",
  "/saved",
  "/upload",
  "/notifications",
  "/settings",
]);
const isYouRoute = createRouteMatcher(["/you(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const { redirectToSignIn, userId } = await auth();
  if (!userId && isYouRoute(req)) {
    // Logic to run before redirecting the user
    console.log(
      "User is not authenticated and trying to access a protected route."
    );
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
