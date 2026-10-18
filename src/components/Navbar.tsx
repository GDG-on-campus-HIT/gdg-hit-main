"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import { CalendarDays, Home, Info, LucideIcon, Mail, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import UserAuth from "@/hooks/userAuth";
import ProfileDropDown from "./ProfileDropDown";

type NavLink = { label: string; tab: string; route: string; icon: LucideIcon };

export const navBarLinks: NavLink[] = [
  { label: "Home", tab: "Home", route: "/", icon: Home },
  { label: "Events", tab: "Events", route: "/events", icon: CalendarDays },
  { label: "Members", tab: "Members", route: "/members", icon: Users },
  { label: "About us", tab: "About", route: "/about-us", icon: Info },
  { label: "Contact us", tab: "Contact", route: "/contact-us", icon: Mail },
];

// Glass is reserved for the floating bars; it falls back to an opaque surface when people
// ask for less transparency or more contrast.
const glass =
  "bg-[hsl(var(--background)/0.75)] backdrop-blur-xl backdrop-saturate-150 contrast-more:bg-background [@media(prefers-reduced-transparency:reduce)]:bg-background";

function isActiveRoute(pathname: string, route: string) {
  return route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`);
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function AccountAction() {
  const isAuth = UserAuth();

  if (isAuth) return <ProfileDropDown />;

  return (
    <Link
      href="/login"
      className="inline-flex h-11 items-center rounded-full border border-black/10 px-5 text-sm font-medium text-neutral-900 transition-colors hover:border-black/25 hover:bg-black/[0.04] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.06] lg:h-9 lg:px-4"
    >
      Log in
    </Link>
  );
}

function TopBar({ pathname }: { pathname: string }) {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled ? cn(glass, "border-black/[0.08] dark:border-white/[0.08]") : "border-transparent"
      )}
    >
      <div className="max-container flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="GDG on Campus HIT home" className="shrink-0">
          <img src="/assets/gdg-hit-logo-light.svg" alt="" className="h-9 dark:hidden" />
          <img src="/assets/gdg-hit-logo.svg" alt="" className="hidden h-9 dark:block" />
        </Link>

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex items-center gap-1">
            {navBarLinks.map((link) => {
              const active = isActiveRoute(pathname, link.route);
              return (
                <li key={link.route}>
                  <Link
                    href={link.route}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-9 items-center px-3.5 text-sm font-medium transition-colors",
                      active
                        ? "text-neutral-950 dark:text-white"
                        : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="desktop-nav-indicator"
                        aria-hidden
                        className="absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-neutral-950 dark:bg-white"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <AccountAction />
      </div>
    </header>
  );
}

function TabBar({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 px-3 lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <ul
        className={cn(
          glass,
          "mx-auto grid max-w-md grid-cols-5 gap-1 rounded-[28px] border border-black/[0.08] p-1.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] dark:border-white/10 dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]"
        )}
      >
        {navBarLinks.map((link) => {
          const active = isActiveRoute(pathname, link.route);
          const Icon = link.icon;
          return (
            <li key={link.route}>
              <Link
                href={link.route}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-14 flex-col items-center justify-center gap-1 rounded-[22px] text-[11px] font-medium transition-colors",
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-neutral-600 active:bg-black/5 dark:text-neutral-400 dark:active:bg-white/10"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tab-bar-indicator"
                    aria-hidden
                    className="absolute inset-0 rounded-[22px] bg-black/[0.06] dark:bg-white/10"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon aria-hidden className="relative h-[22px] w-[22px]" strokeWidth={active ? 2.25 : 1.75} />
                <span className="relative">{link.tab}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const NavBar = () => {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <TopBar pathname={pathname} />
      <TabBar pathname={pathname} />
    </MotionConfig>
  );
};

export default NavBar;
