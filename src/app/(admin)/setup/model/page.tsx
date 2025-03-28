'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/app/(admin)/Components/tables/Others/model/data-table";
import {columns} from "@/app/(admin)/Components/tables/Others/model/columns";
import {TvMinimal} from "lucide-react";
import {useEffect, useState} from "react";
import {getManufacturer} from "@/app/service/manufacturerService/functions";
import {getModel} from "@/app/service/modelService/getList";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728e25e2f",
            category:"Assets",
            name:"Samsung Galaxy Ultra",
            manufacturer: "Galaxy",
            model_number: "0101013232",
            description: "this is testing product"
        },
        {
            id: "728ed5e2f",
            category:"Assets",
            name:"Apple Pencil",
            manufacturer: "Apple",
            model_number: "01010102",
            description: "this is testing product"
        },
        // ...
    ]
}

export default  function ModelPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchAssetData() {
            // Fetch data from your API here.
            try{
                const response= await getModel();
                // return response.data;
                setData(response.data)
            }
            catch(error){
                console.error("Error fetching asset data:", error);
                setData([
                    {
                        id: "Error",
                        url: "Error",
                        name: "Error"
                    }])
            }

        }
        fetchAssetData();
    },[])

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <TvMinimal size={32} absoluteStrokeWidth/>
                Models</h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Models Table</CardTitle>
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
