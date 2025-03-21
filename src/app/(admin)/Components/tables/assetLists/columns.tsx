"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    ArrowUpDown,
    Eye,
    MapPinOff,
    MoreHorizontal,
    Pencil, ShieldAlert,
    Trash,
    Trash2,
    UserRoundCheck,
    UserRoundMinus, Wrench
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import React from "react";
import {Asset} from "@/app/AssetType";
import {
    AlertDialogAvailable,
    AlertDialogBroken, AlertDialogCheckIn,
    AlertDialogDelete, AlertDialogDisposed,
    AlertDialogLostMissing,
    AlertDialogUnderRepair
} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {
    broken,
    checkIn,
    deleteAsset,
    dispose,
    lostMissing, makeAvailable,
    repair
} from "@/app/service/action/functions/actionFunction";
import CheckOutModal from "@/app/(admin)/Components/modals/Actions/checkout";
import ViewAssetModal from "@/app/(admin)/Components/modals/asset/assetModal";
import EditAssetModal from "@/app/(admin)/Components/modals/asset/editAssetModal";

export const columns: ColumnDef<Asset>[] = [
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
        accessorKey: "assetTag",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Asset Tag ID
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
        accessorKey: "modelName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Model No.
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
            const asset = row.original;
            const status = row.getValue("status");

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


                        {status === "Available" && (
                            <>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <CheckOutModal id={asset.id}/>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogBroken onconfirm={() => broken(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogDisposed onconfirm={() => dispose(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogLostMissing onconfirm={() => lostMissing(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}


                        {status === "Disposed" && (
                            <>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogAvailable onconfirm={() => makeAvailable(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}

                        {status === "Under Repair" && (
                            <>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogDisposed onconfirm={() => dispose(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogLostMissing onconfirm={() => lostMissing(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogAvailable onconfirm={()=>makeAvailable(asset.id)}/>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                            </>
                        )}
                        {status === "Lost or Missing" && (
                            <>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogDisposed onconfirm={() => dispose(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogBroken onconfirm={()=>broken(asset.id)}/>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogAvailable onconfirm={() => makeAvailable(asset.id)} />
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                            </>
                        )}
                        {status === "Checked Out" && (
                            <>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogCheckIn onconfirm={()=>checkIn(asset.id)}/>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
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
                            </>
                        )}
                        {status === "Broken" && (
                            <>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogDisposed onconfirm={()=>dispose(asset.id)}/>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogUnderRepair onconfirm={() => repair(asset.id)} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <AlertDialogAvailable onconfirm={() => makeAvailable(asset.id)} />
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                            </>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
