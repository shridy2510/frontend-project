import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Check,
    CheckCheck,
    Delete,
    MapPinOff,
    Pencil,
    ShieldAlert,
    Trash,
    Trash2, UserRoundCheck,
    UserRoundMinus,
    Wrench,
    X
} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button";

export function AlertDialogCheckInRequest({onconfirm},) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span><UserRoundMinus className="inline-block mr-2"/> Request Check In</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                    <AlertDialogTitle>Request to return this asset ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Accept</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}









