"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, Check, Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import React from "react";
import {Asset} from "@/app/AssetType";

import {
    AlertDialogAvailable,
    AlertDialogDelete, AlertDialogDisposed,
    AlertDialogUnderRepair
} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {deleteAsset, dispose, makeAvailable, repair} from "@/app/service/action/functions/actionFunction";
import ViewAssetModal from "@/app/(admin)/Components/modals/asset/assetModal";
import EditAssetModal from "@/app/(admin)/Components/modals/asset/editAssetModal";




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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                        >
                            <ViewAssetModal id={asset.id}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem  onSelect={(e) => e.preventDefault() }>
                            <EditAssetModal id={asset.id}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogDelete onconfirm={()=>deleteAsset(asset.id)}/>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogDisposed onconfirm={()=>dispose(asset.id)}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogUnderRepair onconfirm={()=>repair(asset.id)}/>
                           </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogAvailable onconfirm={()=>makeAvailable(asset.id)}/>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },



]
