"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    ArrowUpDown,

} from "lucide-react";
import {Button} from "@/components/ui/button";

import React from "react";
import {Asset} from "@/app/AssetType";
import {AlertDialogDisposed} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {dispose} from "@/app/service/action/functions/actionFunction";

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
        accessorKey: "companyName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
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
        accessorKey: "serial",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Serial
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
                    <Button className=" border border-[#EE6352] text-[#EE6352] bg-white ">
                            <AlertDialogDisposed onconfirm={()=>dispose(asset.id)}/>
                    </Button>
                </div>
            )
        },
    },


]
