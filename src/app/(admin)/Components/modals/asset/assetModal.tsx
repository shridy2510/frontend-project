"use client"

import { useState } from "react";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { viewAsset } from "@/app/service/AssetService/functions";

export default function ViewAssetModal({ id }) {
    const [data, setData] = useState({
        id: null,
        assetTag: "",
        name: "",
        serial: "",
        modelName: "",
        companyName: "",
        status: "",
        assignedUserName: "",
        lastCheckout: null,
        expectedCheckin: null,
        cost: 0,
    });

    const [open, setOpen] = useState(false);

    const getAssetData = async () => {
        try {
            const response = await viewAsset(id);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching asset data:", error);
        }
    };

    // Format currency with commas
    const formatCurrency = (amount) => {
        return amount?.toLocaleString('vi-VN') || '0';
    };

    // Format date or return N/A
    const formatDate = (date) => {
        return date ? format(new Date(date), "PPP") : 'N/A';
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span
                    onClick={() => {
                        getAssetData();
                        setOpen(true);
                    }}
                    className="cursor-pointer hover:opacity-75 transition-opacity"
                >
                    <Eye className="inline-block mr-2 h-4 w-4" />
                    View
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-left">{data.name || "Asset Details"}</DialogTitle>
                    <DialogDescription className="text-left">
                        Detailed information about the selected asset.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Name</Label>
                        <div className="flex-1">{data.name || 'N/A'}</div>
                    </div>

                    {/* Asset Tag */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Asset Tag</Label>
                        <div className="flex-1">{data.assetTag || 'N/A'}</div>
                    </div>

                    {/* Serial */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Serial</Label>
                        <div className="flex-1">{data.serial || 'N/A'}</div>
                    </div>

                    {/* Model Name */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Model</Label>
                        <div className="flex-1">{data.modelName || 'N/A'}</div>
                    </div>

                    {/* Company Name */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Company</Label>
                        <div className="flex-1">{data.companyName || 'N/A'}</div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Status</Label>
                        <div className="flex-1">{data.status || 'N/A'}</div>
                    </div>

                    {/* Assigned User */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Assigned User</Label>
                        <div className="flex-1">{data.assignedUserName || 'N/A'}</div>
                    </div>

                    {/* Last Checkout */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Last Checkout</Label>
                        <div className="flex-1">{formatDate(data.lastCheckout)}</div>
                    </div>

                    {/* Expected Checkin */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Expected Checkin</Label>
                        <div className="flex-1">{formatDate(data.expectedCheckin)}</div>
                    </div>

                    {/* Cost */}
                    <div className="flex items-center gap-4">
                        <Label className="w-32 font-semibold text-gray-600">Cost</Label>
                        <div className="flex-1">
                            {data.cost ? `${formatCurrency(data.cost)} VND` : 'N/A'}
                        </div>
                    </div>
                </div>
                <DialogFooter >
                    <Button
                        onClick={() => setOpen(false)}
                        className="px-6"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}