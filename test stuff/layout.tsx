import Header from "@/app/(admin)/Components/header/header";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/app/(admin)/Components/sidebar/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import {Toaster} from "@/components/ui/toaster";

export default function UserLayout({ children }: { children: React.ReactNode }){
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            <SidebarProvider className="flex flex-1 pt-4">
                <AppSidebar/>

                <SidebarInset className="flex flex-1 flex-col">
                    <div
                        className="flex h-16 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>

                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <main>{children}</main>
                        <Toaster />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>



    )


}