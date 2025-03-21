'use client'
import {Asset, columns} from "@/app/(admin)/Components/tables/assetLists/columns";
import {DataTable} from "@/app/(admin)/Components/tables/assetLists/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {List} from "lucide-react";

import {getAsset} from "@/app/service/AssetService/functions";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useEffect, useState} from "react";



export default  function AssetListPage() {
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
                        companyName: "Error"
                    }])
            }

        }
        fetchAssetData();
    },[])


    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <List size={32} absoluteStrokeWidth />
                List
            </h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>List of Assets</CardTitle>
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
