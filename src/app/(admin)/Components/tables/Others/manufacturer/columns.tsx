"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ArrowUpDown, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import React from "react";
import {Asset, Manufacturer} from "@/app/AssetType";
import {deleteCategories, deleteManufacturers} from "@/app/service/action/functions/actionFunction";
import {AlertDialogDeleteSetUp} from "@/app/(admin)/Components/AlertDialog/alertdialog";


export const columns: ColumnDef<Manufacturer>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),

    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "url",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Url
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey:"Actions",
        id: "actions",
        cell: ({ row }) => {
            const manufacturer = row.original

            return (
                <div className="flex gap-2"> {/* Add gap between buttons */}
                    <Button className="h-7 w-7 border border-[#7796CB] text-[#7796CB] bg-white"
                            onClick={() => navigator.clipboard.writeText(manufacturer.id)}>
                        <Pencil/>
                    </Button>
                    <AlertDialogDeleteSetUp onconfirm={()=>{deleteManufacturers(manufacturer.id)}}/>

                </div>
            )
        },
    },
]
