'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SidebarMenuButton} from "@/components/ui/sidebar";
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CirclePlus,
    CreditCard, FileUser, GitPullRequest, House, KeyRound,
    LayoutDashboard,
    List,
    LogOut,
    Sparkles, User, UserRoundPlus
} from "lucide-react";
import {useRouter} from "next/navigation";
import logout from "@/app/service/userService/logout";

export default function Header(){
    const router = useRouter();



    const logOut= async ()=>{
        try{await logout();}
        catch(error){throw error}

        router.push('/login')
        localStorage.removeItem("User_id")


    }

    return(

        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border b">
            <div className="flex h-14 items-center px-4 ">
                <div className="mr-4 hidden md:flex">
                    <div className=" mr-4 flex items-center space-x-2 lg:mr-6 ">
                        <a href="/Dashboard/id">
                            <img src="/assets/ITAM.svg" alt="itam" className="h-16 w-16"/>
                        </a>
                        <a href="/Dashboard/id"
                           className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                            <House/>
                            <span>Dashboard</span>
                        </a>
                        <a href="/UserRequestAsset"
                           className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                            <GitPullRequest/>
                            <span>Borrow</span>
                        </a>
                        <a href="/UserRequest"
                           className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                            <FileUser/>
                            <span>My Request</span>
                        </a>

                    </div>

                </div>

                <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">


                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/*<AvatarImage src={user.avatar} alt={user.name}/>*/}
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={ "bottom" }
                            align="end"
                            sideOffset={4}>

                            <DropdownMenuGroup>
                                <a href="/user/userProfile/id">
                                    <DropdownMenuItem>
                                        <User/>
                                        <span>My Profile</span>
                                    </DropdownMenuItem>
                                </a>

                            </DropdownMenuGroup>
                            < DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <a href="/user/changePassword/id">
                                    <DropdownMenuItem>
                                        <KeyRound/>
                                        Change Password
                                    </DropdownMenuItem>
                                </a>
                                <DropdownMenuItem>
                                    <Bell/>
                                    Notifications
                                </DropdownMenuItem>


                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={logOut}>
                                <LogOut/>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </header>
    )


}