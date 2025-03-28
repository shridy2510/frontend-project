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
import {Asset, Category} from "@/app/AssetType";
import {AlertDialogDeleteSetUp} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {deleteCategories} from "@/app/service/action/functions/actionFunction";


export const columns: ColumnDef<Category>[] = [
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey:"Actions",
        id: "actions",
        cell: ({ row }) => {
            const category = row.original

            return (
                // <DropdownMenu>
                //     <DropdownMenuTrigger asChild>
                //         <Button variant="ghost" className="h-8 w-8 p-0">
                //             <span className="sr-only">Open menu</span>
                //             <MoreHorizontal className="h-4 w-4" />
                //         </Button>
                //     </DropdownMenuTrigger>
                //     <DropdownMenuContent align="end">
                //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                //         <DropdownMenuItem
                //             onClick={() => navigator.clipboard.writeText(Asset.id)}
                //         >
                //             View
                //         </DropdownMenuItem>
                //         <DropdownMenuItem>Add </DropdownMenuItem>
                //         <DropdownMenuItem>Delete </DropdownMenuItem>
                //         <DropdownMenuSeparator />
                //
                //     </DropdownMenuContent>
                // </DropdownMenu>
                <div className="flex gap-2"> {/* Add gap between buttons */}
                    <Button className="h-7 w-7 border border-[#7796CB] text-[#7796CB] bg-white"
                           >
                        <Pencil/>
                    </Button>
                    <AlertDialogDeleteSetUp onconfirm={()=>{deleteCategories(category.id)}}/>

                </div>
            )
        },
    },
]
