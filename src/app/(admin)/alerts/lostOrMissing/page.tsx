'use client'
import {columns} from "@/app/(admin)/Components/tables/alerts/lostOrMissing/columns";
import {DataTable} from "@/app/(admin)/Components/tables/alerts/lostOrMissing/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {FileChartColumn, Flag,} from "lucide-react";
import AvailableStatusReportPage from "@/app/(admin)/report/status/available/page";
import AlertBrokenAssetPage from "@/app/(admin)/alerts/broken/page";
import {useEffect, useState} from "react";
import {getCheckedOutAsset, getLostMissingAsset} from "@/app/service/AssetService/functions";
import {Payment} from "@/app/(admin)/Components/tables/userList/columns";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            assetTag: "43434ab",
            serial:"abdcd123",
            assetName: "laptop",
            model: " macbook air",
            company: "apple"

        },
        {
            id: "39fvdvdd",
            category: "software",
            serial:"a1fedfe23",
            assetName: "apple Music",
            model: "",
            company: "apple"

        },

        // ...
    ]
}

export default  function AlertLostAssetPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchAssetData() {
            // Fetch data from your API here.
            try{
                const response= await getLostMissingAsset();
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
            <Flag size={32}  />
            Alert
    </h1>
    <div className="ml-16 mr-24">
    <Card className="p-4">
        <CardHeader>
            <CardTitle>Lost Or Missing Assets</CardTitle>
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
