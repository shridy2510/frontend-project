"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    ArrowUpDown,
    Eye,
    MapPinOff,
    MoreHorizontal,
    Pencil,
    ShieldAlert,
    Trash,
    Trash2,
    UserRoundMinus
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
import {
    AlertDialogBroken, AlertDialogCheckIn,
    AlertDialogDelete,
    AlertDialogDisposed, AlertDialogLostMissing
} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {broken, checkIn, deleteAsset, dispose, lostMissing} from "@/app/service/action/functions/actionFunction";
import ViewAssetModal from "@/app/(admin)/Components/modals/asset/assetModal";
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
        accessorKey: "lastCheckout",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Check-Out Date
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
                    Expected Check-In Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "dueDuration",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Days Past Due
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ getValue }) => (
            <div className="bg-[#EF4444] flex items-center text-white justify-center h-full">
                {getValue()}
            </div>
        ),
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
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogCheckIn onconfirm={()=>checkIn(asset.id)}/>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogBroken onconfirm={()=>broken(asset.id)}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogDisposed onconfirm={()=>dispose(asset.id)}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <AlertDialogLostMissing onconfirm={()=>lostMissing(asset.id)}/>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]
