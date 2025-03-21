'use client'
import {columns} from "@/app/(admin)/Components/tables/reports/assetReports/byCompany/columns";
import {DataTable} from "@/app/(admin)/Components/tables/reports/assetReports/byCompany/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {FileChartColumn,} from "lucide-react";
import {useEffect, useState} from "react";
import {getAsset} from "@/app/service/AssetService/functions";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            company: "apple",
            serial:"abdcd123",
            assetName: "Laptop",
            cost: 1000

        },
        {
            id: "39fvdvdd",
            company: "samsung",
            serial:"a1fedfe23",
            assetName: "Laptop",
            cost: 2000

        },

        // ...
    ]
}

export default  function CompanyReportPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchAssetData() {
            // Fetch data from your API here.
            try{
                const response= await getAsset();
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
        <FileChartColumn size={32} />
    Report
    </h1>
    <div className="ml-16 mr-24">
    <Card className="p-4">
        <CardHeader>
            <CardTitle>Assets by Company</CardTitle>
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
