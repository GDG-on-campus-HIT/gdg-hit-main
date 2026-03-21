'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLogOutMutation } from "@/redux/features/auth/authApi";

export default function ProfileDropDown() {
  const { user } = useSelector((state: any) => state.auth);

  const [logOut, { data, isLoading, error }] = useLogOutMutation();

// Call this function when you want to log out
const handleLogOut = () => {
  logOut(1);
};
  // console.log(user)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="#" alt="@shadcn" />
          <AvatarFallback className="uppercase">{user.name.substring(0,1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-3" align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal -mt-2 dark:text-slate-300">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        {/* {
          user.role == "admin" &&
        <DropdownMenuGroup>
          <Link href="/admin/dashboard">
            <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
          </Link>

        </DropdownMenuGroup>
        } */}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
