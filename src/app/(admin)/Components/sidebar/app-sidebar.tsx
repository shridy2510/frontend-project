"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot, CircleAlert,
  Command, FileChartColumn, Flag,
  Frame,
  GalleryVerticalEnd, House, Laptop, LayoutDashboard, List,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import {NavMain} from "@/app/(admin)/Components/sidebar/nav-main";
import {NavProjects} from "@/app/(admin)/Components/sidebar/nav-projects";
import {NavUser} from "@/app/(admin)/Components/sidebar/nav-user";
import {useEffect, useState} from "react";
import getUserInfoById from "@/app/service/userService/getUserInfoById";


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Alerts",
      url: "#",
      icon: Flag,
      isActive: true,
      items: [
        {
          title: "Asset Past Due",
          url: "/dashboard",
        },
        {
          title: "Available",
          url: "#",
        },
        {
          title: "Broken",
          url: "#",
        },
        {
          title: "Lost/Missing",
          url: "#",
        },

      ],
    },
    {
      title: "Assets",
      url: "#",
      icon:Laptop,
      items: [
        {
          title: "List of Assets",
          url: "#",
        },
        {
          title: "Add an Asset",
          url: "#",
        },
        {
          title: "Check out",
          url: "#",
        },
        {
          title: "Check in",
          url: "#",
        },
        {
          title: "Dispose",
          url: "#",
        },
      ],
    },
    {
      title: "Lists",
      url: "#",
      icon: List,
      items: [
        {
          title: "List of Assets",
          url: "#",
        },
        {
          title: "List of Others",
          url: "#",
        },

      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: FileChartColumn,
      items: [
        {
          title: "Asset Reports",
          url: "#",
        },
        {
          title: "Check-Out Reports",
          url: "#",
        },
        {
          title: "Status Reports",
          url: "#",
        },

      ],
    },

    {
      title: "Setup",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Company Info",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Models",
          url: "#",
        },
        {
          title: "Manufacturer",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar:""
  });
  useEffect(() => {
    const userid=localStorage.getItem("User_id");
    fetchUserData(userid);






  }, []);
  async function fetchUserData(id){
    const response= await getUserInfoById(id);
    setUserData({
      name: response.data.firstName,
      email: response.data.email,
      avatar: ""
    })

  }


  return (

    <Sidebar collapsible="icon" {...props} className="pt-16 flex">
      <SidebarHeader >
        <NavUser user={userData} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />

      </SidebarContent>

      <SidebarRail/>
    </Sidebar>
  )
}
