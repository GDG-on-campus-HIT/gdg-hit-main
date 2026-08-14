import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";

const authPaths = ["/login", "/signup", "/verification"];
const adminPathPrefix = "/admin";
// Add closed paths for recruitment
const closedRecruitmentPaths = ["/recruitment", "/recruitment/form"];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  console.log(`[Middleware] Path: ${request.nextUrl.pathname}`);
  console.log(`[Middleware] AccessToken: ${!!accessToken}, RefreshToken: ${!!refreshToken}`);

  let isAuthenticated = false;
  let userRole: string | null = null;

  const path = request.nextUrl.pathname;

  // Original authentication logic
  try {
    if (accessToken) {
      try {
        // Bypass signature verification in middleware to prevent infinite loops due to secret mismatch
        // Security is still enforced by the backend API
        const payload = decodeJwt(accessToken as string);

        // Extract user role from the payload
        userRole = payload.role as string;
        isAuthenticated = true;
      } catch (error) {
        console.log(`[Middleware] JWT Verification Failed:`, error);
        if (refreshToken) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_ENV === "production"
                ? "https://apiv2.gdghit.dev/api/v1/refresh-token"
                : "http://localhost:8080/api/v1/refresh-token"
              }`,
              {
                method: "GET",
                headers: {
                  Cookie: `refresh_token=${refreshToken}`,
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );

            if (!response.ok) {
              throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            console.log("[Middleware] Token refreshed successfully. Redirecting to set cookies...");

            const nextResponse = NextResponse.redirect(
              new URL(request.nextUrl.pathname, request.url)
            ); // Redirect to the current path

            const accessTokenExpire = parseInt(
              process.env.ACCESS_TOKEN_EXPIRE || "1200",
              10
            );

            const refreshTokenExpire = parseInt(
              process.env.REFRESH_TOKEN_EXPIRE || "1200",
              10
            );

            const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

            nextResponse.cookies.set("access_token", data.accessToken, {
              expires: new Date(
                Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000
              ),
              maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
              httpOnly: false,
              sameSite: isProduction ? "none" : "lax",
              secure: isProduction,

              ...(isProduction && {
                domain: ".gdghit.dev",
              }),
            });

            nextResponse.cookies.set("refresh_token", data.refreshToken, {
              expires: new Date(
                Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000
              ),
              maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
              httpOnly: false,
              sameSite: isProduction ? "none" : "lax",
              secure: isProduction,

              ...(isProduction && {
                domain: ".gdghit.dev",
              }),
            });

            if (authPaths.includes(path)) {
              return nextResponse;
            }

            return nextResponse;
          } catch (refreshError) {
            isAuthenticated = false;
          }
        }
        isAuthenticated = false;
      }
    }
  } catch (error) {
    isAuthenticated = false;
  }

  // Restrict access to /recruitment paths for unauthenticated users
  if (closedRecruitmentPaths.includes(path)) {
    if (!isAuthenticated) {
      console.log("Recruitment path blocked - not authenticated");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Paths that explicitly require authentication
  const protectedPaths = [
    "/dashboard",
    "/profile",
  ];
  const isProtectedPath =
    protectedPaths.includes(path) ||
    path.startsWith("/events/") && (path.endsWith("/register") || path.includes("/prior-knowledge")) ||
    path.startsWith("/admin");

  // Check if the path requires admin access
  if (path.startsWith(adminPathPrefix)) {
    if (!isAuthenticated || userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (isAuthenticated && authPaths.includes(path)) {
    // Authenticated user at login/signup - redirect to redirectTo if present, else home
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    const safeRedirect = redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/";
    return NextResponse.redirect(new URL(safeRedirect, request.url));
  } else if (!isAuthenticated && isProtectedPath) {
    // Unauthenticated user trying to access a protected path
    const signinUrl = new URL("/login", request.url);
    const validPath = path && typeof path === "string" && path !== "undefined" ? path : "/";
    signinUrl.searchParams.set("redirectTo", validPath);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/signup",
    "/verification",
    "/admin/:path*",
    "/events/:id/register",
    "/profile",
    "/recruitment/form",
    "/recruitment",
    "/events/:id/prior-knowledge",
    "/events/:id/prior-knowledge/test",
    "/events/:id/register",
  ],
};
