'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/app/(admin)/Components/tables/Others/company/data-table";
import {columns} from "@/app/(admin)/Components/tables/Others/company/columns";
import {BriefcaseBusiness} from "lucide-react";
import {useEffect, useState} from "react";
import {getAvailableAsset} from "@/app/service/AssetService/functions";
import {getCompany} from "@/app/service/companyService/getCompanyName";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            url:"http://vinsmart",
            name:"VínSmart"
        },
    {
        id: "728ed5e2f",
        url:"http://apple",
        name:"Apple"
    },
        // ...
    ]
}

export default  function CompanyPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchAssetData() {
            // Fetch data from your API here.
            try{
                const response= await getCompany();
                // return response.data;
                setData(response.data)
            }
            catch(error){
                console.error("Error fetching asset data:", error);
                setData([
                    {
                        id: "Error",
                        address: "Error",
                        name: "Error",

                    }])
            }

        }
        fetchAssetData();
    },[])

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <BriefcaseBusiness size={32} absoluteStrokeWidth />
                Companies</h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Companies Table</CardTitle>
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
