"use client";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { BiMenu } from "react-icons/bi";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ScrollProgress } from "./magicui/scroll-progress";
// import ProfileDropDown from "./ProfileDropDown";
// import UserAuth from "@/hooks/userAuth";

export const navBarLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Events",
    route: "/events",
  },
  {
    label: "Members",
    route: "/members",
  },
  {
    label: "About us",
    route: "/about-us",
  },
  {
    label: "Contact us",
    route: "/contact-us",
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  //  const isAuth = UserAuth()
  return (
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
                    "text-brand-primary font-medium hover:text-brand-500-main dark:hover:text-brand-500-main underline-offset-4 transition duration-200 dark:text-gray-100",
                    {
                      " font-medium text-brand-500-main dark:text-brand-500-main":
                        isActive,
                    }
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <Sheet>
            <div className="flex items-center space-x-4">
              {/* <div className="max-lg:hidden">
              <ModeToggle />
            </div> */}
              {/* {
              !isAuth ? 
            <Link href="/signin">
              <Button className="bg-brand-500-main hover:bg-brand-600 text-white font-medium">
                Sign in
              </Button>
            </Link>
            :
            <ProfileDropDown />
            } */}
              <button className="px-8 py-2 rounded-full relative gradient-card text-white text-sm hover:shadow-2xl  transition duration-200 border dark:border-white/10">
                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <span className="relative z-20 font-medium">Login</span>
              </button>
              <SheetTrigger className="lg:hidden  text-gray-700  border-none dark:hover:text-white dark:text-gray-400 p-2 rounded-md">
                <BiMenu size={25} className="" />
              </SheetTrigger>
            </div>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center space-x-2">
                    <Link href="/">
                      <img src="/assets/gdg-hit-logo.svg" alt="" />
                    </Link>
                  </div>
                </SheetTitle>
                <div className="flex flex-col space-y-4 py-6">
                  {navBarLinks.map((link) => {
                    const isActive =
                      pathname === link.route ||
                      pathname.startsWith(`${link.route}/`);

                    return (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.route}
                          className={cn(
                            "text-brand-primary font-semibold hover:underline underline-offset-4 transition duration-200 dark:text-gray-400",
                            {
                              "font-medium text-brand-500-main dark:text-brand-500-main":
                                isActive,
                            }
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
                <SheetDescription className="flex justify-center pt-5">
                  © 2025 GDG on campus HIT.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
