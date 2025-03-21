'use client'
import {columns} from "@/app/(admin)/Components/tables/actions/checkIn/columns";
import {DataTable} from "@/app/(admin)/Components/tables/actions/checkIn/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {FileChartColumn, UserRoundMinus,} from "lucide-react";
import React, {useEffect, useState} from "react";
import {getAsset, getCheckedOutAsset} from "@/app/service/AssetService/functions";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            assetTag: "43434ab",
            serial:"abdcd123",
            assetName: "laptop",
            model: " macbook air",
            company: "apple",
            cost: 1000
        },

    ]
}

export default function CheckedOutStatusReportPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchAssetData() {
            // Fetch data from your API here.
            try{
                const response= await getCheckedOutAsset();
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
        fetchAssetData();
    },[])

    return (
        <div className="content p-8">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <UserRoundMinus size={32} />
            Check In
    </h1>
    <div className="ml-16 mr-24">
    <Card className="p-4">
        <CardHeader>
            <CardTitle>Checked Out Assets</CardTitle>
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
