'use client'
import {columns} from "@/app/(admin)/Components/tables/alerts/pendingRequest/columns";
import {DataTable} from "@/app/(admin)/Components/tables/alerts/pendingRequest/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {FileChartColumn, Flag, UserRoundCheck,} from "lucide-react";
import React, {useEffect, useState} from "react";
import {getAvailableAsset, getCheckedOutAsset} from "@/app/service/AssetService/functions";
import {getPendingRequestAsset} from "@/app/service/requestAssetService/functions";



export default function PendingRequestPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchRequestData() {
            // Fetch data from your API here.
            try{
                const response= await getPendingRequestAsset();
                // return response.data;
                setData(response.data)
            }
            catch(error){
                console.error("Error fetching asset data:", error);
                setData([
                    {
                        id: "Error",
                        assetTag: "Error",
                        serial: "Error",
                        name: "Error",
                        status: "Error",
                        modelName: "Error",
                        companyName: "Error",
                        cost:"Error"
                    }])
            }

        }
        fetchRequestData();
    },[])

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <Flag size={32}  />
                Alert
            </h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Pending Request</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="container mx-auto py-3 ">
                            <DataTable columns={columns} data={data} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
