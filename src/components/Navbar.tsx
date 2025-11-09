"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ScrollProgress } from "./magicui/scroll-progress";
import UserAuth from "@/hooks/userAuth";
import ProfileDropDown from "./ProfileDropDown";
// import ProfileDropDown from "./ProfileDropDown";
// import UserAuth from "@/hooks/userAuth";

export const navBarLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/Home.png",
  },
  {
    label: "Events",
    route: "/events",
    icon: "/assets/events.png",
  },
  {
    label: "Members",
    route: "/members",
    icon: "/assets/Members.png",
  },
  {
    label: "About us",
    route: "/about-us",
    icon: "/assets/AboutUs.png",
  },
  {
    label: "Contact us",
    route: "/contact-us",
    icon: "/assets/ContactUs.png",
  },
];

const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-950/80 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-around px-2 py-2">
          {navBarLinks.map((link) => {
            const isActive =
              pathname === link.route ||
              pathname.startsWith(`${link.route}/`);

            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px] active:scale-95",
                  {
                    "text-brand-500-main dark:text-brand-500-main": isActive,
                    "text-gray-600 dark:text-gray-400": !isActive,
                  }
                )}
              >
                <img
                  src={link.icon}
                  alt={link.label}
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    {
                      "opacity-100 scale-110": isActive,
                      "opacity-70": !isActive,
                    }
                  )}
                />
                <span className="text-xs font-medium">{link.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-brand-500-main dark:bg-brand-500-main rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const isAuth = UserAuth()
  return (
    <>
      <nav className="w-full top-0 z-50 backdrop-blur-lg  fixed">
        <ScrollProgress className="top-[65px]" />
        {/* main nav bar  */}
        <div className="max-container py-3 flex justify-between items-center ">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <img src="/assets/gdg-hit-logo.svg" alt="" className="h-10" />
            </Link>
          </div>

          <div className="flex space-x-6 items-center ">
            <div className="space-x-8 max-lg:hidden">
              {navBarLinks.map((link) => {
                const isActive =
                  pathname === link.route ||
                  pathname.startsWith(`${link.route}/`);

                return (
                  <Link
                    href={link.route}
                    key={link.label}
                    className={cn(
                      "relative text-brand-primary font-medium hover:text-brand-500-main dark:hover:text-brand-500-main underline-offset-4 transition duration-200 dark:text-gray-100 text-sm pb-1",
                      {
                        " font-medium text-brand-500-main dark:text-brand-500-main":
                          isActive,
                      }
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500-main dark:bg-brand-500-main rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center">
              {
                !isAuth ?
                  <Link href="/login">
                    <button className="px-8 py-2 rounded-full relative gradient-card dark:text-white text-neutral-800 text-sm hover:shadow-2xl  transition duration-200 border dark:border-white/10">
                      <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      <span className="relative z-20 font-medium">Login</span>
                    </button>
                  </Link>
                  :
                  <ProfileDropDown />
              }
            </div>
          </div>
        </div>
      </nav>
      <BottomNavBar />
    </>
  );
};

export default NavBar;
