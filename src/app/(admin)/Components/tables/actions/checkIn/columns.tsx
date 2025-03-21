"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    ArrowUpDown,
    Eye, MapPinOff,
    MoreHorizontal,
    Pencil,
    ShieldAlert, Trash,
    Trash2,
    UserRoundCheck,
    UserRoundMinus, Wrench
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import React from "react";
import {Asset} from "@/app/AssetType";
import {AlertDialogCheckIn} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {checkIn} from "@/app/service/action/functions/actionFunction";
import EditAssetModal from "@/app/(admin)/Components/modals/asset/editAssetModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<Asset>[] = [
    {
        accessorKey: "assetTag",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Asset TagID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Asset Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: "modelName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Model
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "lastCheckout",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Check-out Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "expectedCheckin",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expected Check-in Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "assignedUserName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Checked out to
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            // Define background color classes based on status
            const statusBgColor =
                status === "Available"
                    ? "bg-[#AFD5AA]" // Light green background
                    : "bg-[#A4A8D1]"; // Default gray background

            return (
                <div className={`px-3 py-2 rounded ${statusBgColor}`}>
                    {status}
                </div>
            );
        },
    },


    {
        accessorKey:"Actions",
        id: "actions",
        cell: ({ row }) => {
            const asset = row.original

            return (
                <div className="flex gap-2"> {/* Add gap between buttons */}
                    <Button className=" border border-[#7796CB] text-[#7796CB] bg-white">
                        <AlertDialogCheckIn onconfirm={()=>checkIn(asset.id)}/>
                    </Button>
                </div>
            )
        },
    },

]
