"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard, KeyRound,
  LogOut,
  Sparkles, User, UserRoundPlus,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import axios from "axios";
import keycloakConfig from "@/app/keycloak.config";
import logout from "@/app/service/userService/logout";












export function NavUser({
                          user,
                        }: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter();



  const logOut= async ()=>{
    await logout();
    router.push('/login')
    localStorage.removeItem("User_id")


  }

  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mt-16"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal  ">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <a href="/user/userProfile">
                  <DropdownMenuItem>
                    <User/>
                    <span>My Profile</span>
                  </DropdownMenuItem>
                </a>
              </DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <a href="/user/changePassword">
                  <DropdownMenuItem>
                    <KeyRound/>
                    Change Password
                  </DropdownMenuItem>
                </a>
                <a href="/user/createUser">
                  <DropdownMenuItem>
                    <UserRoundPlus/>
                    Create new Users
                  </DropdownMenuItem>
                </a>
                <a href="/alerts/pendingRequest">
                  <DropdownMenuItem>
                    <Bell/>
                    Notifications
                  </DropdownMenuItem>
                </a>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOut} >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
  )
}
