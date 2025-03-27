"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, CheckCheck, MoreHorizontal, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Asset, RequestedAsset} from "@/app/AssetType";
import React from "react";
import CheckOutButtonModal from "@/app/(admin)/Components/modals/Actions/checkOutButton";
import {
    AlertDialogAccept,
    AlertDialogDeleteSetUp,
    AlertDialogReject
} from "@/app/(admin)/Components/AlertDialog/alertdialog";
import {deleteModels} from "@/app/service/action/functions/actionFunction";
import {
    acceptRequestUserAsset,
    rejectRequestUserAsset,
    updateRequestCheckIn
} from "@/app/service/requestAssetService/functions";
import {changeToCheckedOut} from "@/app/service/action/checkout";
import {changeToAFromCheckIn} from "@/app/service/action/checkin";


export const columns: ColumnDef<RequestedAsset>[] = [
    {
        accessorKey: "requestDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Request Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
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
                    Name
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
        accessorKey: "location",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Location
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
            let statusBgColor = "";
            if (status === "pending") {
                statusBgColor = "bg-[#A4A8D1]"; // gray background for pending
            } else if (status === "rejected") {
                statusBgColor = "bg-[#F3A4A4]"; // Light red background for rejected
            } else if (status === "accepted") {
                statusBgColor = "bg-[#A4D1AF]"; // Light blue/green background for accepted
            } else {
                statusBgColor = "bg-[#A4A8D1]"; // Default gray background for other statuses
            }

            return (
                <div className={`px-3 py-2 rounded ${statusBgColor}`}>
                    {status}
                </div>
            );
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
                    Expected CheckIn
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "expectedCheckout",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expected CheckOut
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
                    Request By
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "requestType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Request Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey:"Actions",
        id: "actions",
        cell: ({ row }) => {
            const requestAsset = row.original;
            const requestType = row.getValue("requestType");

            return (
                <>
                    {requestType === "check out" && (
                        <div className="flex gap-2">
                            <AlertDialogAccept
                                onconfirm={() => {
                                    changeToCheckedOut(
                                        requestAsset.assetId,
                                        requestAsset.userId,
                                        requestAsset.expectedCheckout,
                                        requestAsset.expectedCheckin,
                                        requestAsset.location
                                    );
                                    acceptRequestUserAsset(requestAsset.id);
                                }}
                            />
                            <AlertDialogReject
                                onconfirm={() => {
                                    rejectRequestUserAsset(requestAsset.id);
                                }}
                            />
                        </div>
                    )}
                    {requestType === "check in" && (
                        <div className="flex gap-2">
                            <AlertDialogAccept
                                onconfirm={() => {
                                    changeToAFromCheckIn(requestAsset.assetId);
                                    updateRequestCheckIn(requestAsset.id);
                                    acceptRequestUserAsset(requestAsset.id);

                                }}
                            />
                            <AlertDialogReject
                                onconfirm={() => {
                                    // Replace with your function for handling check-in rejection if needed
                                    rejectRequestUserAsset(requestAsset.id);
                                }}
                            />
                        </div>
                    )}
                </>
            );

        },
    },


]
