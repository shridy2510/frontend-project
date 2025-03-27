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
    Trash2,
    UserRoundMinus,
    Wrench,
    X
} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button";

export function AlertDialogDelete({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center gap-2">
  <Trash2 color="#EE6352"/> Delete
</span>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this asset and remove from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AlertDialogBroken({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center gap-2">
  <ShieldAlert/> Broken
</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Change this Asset Status to Broken ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AlertDialogDisposed({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center gap-2">
  <Trash/> Dispose
</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Dispose this Asset ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AlertDialogLostMissing({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span>
  <MapPinOff className="inline-block mr-2"/>
  Lost / Missing
</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Change this Asset Status to Lost or Missing ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AlertDialogUnderRepair({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="flex items-center gap-2"> <Wrench/>
                    Repair</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change this Asset Status to UnderRepair ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AlertDialogAvailable({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span>
  <Check className="inline-block mr-2"/>
  Make Available
</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Change this Asset Status to Available ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}export function AlertDialogCheckIn({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span><UserRoundMinus className="inline-block mr-2"/>Check In</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to Check In this Asset ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export function AlertDialogDeleteSetUp({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="h-7 w-7 border border-[#EE6352] text-[#EE6352] bg-white">
                    <Trash2/>
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this component and remove from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export function AlertDialogReject({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="h-7 w-7 border border-[#EE6352] text-[#EE6352] bg-white">
                    <X />
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Reject this request?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Reject</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export function AlertDialogAccept({onconfirm}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="h-7 w-7 border border-[#7796CB] text-[#7796CB] bg-white">
                    <CheckCheck />
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Accept this request?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onconfirm}>Accept</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}









