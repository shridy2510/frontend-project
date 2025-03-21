'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/app/(admin)/Components/tables/Others/category/data-table";
import {columns} from "@/app/(admin)/Components/tables/Others/category/columns";
import {ClipboardMinus} from "lucide-react";
import {useEffect, useState} from "react";
import {getAvailableAsset} from "@/app/service/AssetService/functions";
import {getCategory} from "@/app/service/categoryService/functions";



export default  function CategoryPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchAssetData() {
            // Fetch data from your API here.
            try{
                const response= await getCategory();
                // return response.data;
                setData(response.data)
            }
            catch(error){
                console.error("Error fetching asset data:", error);
                setData([
                    {
                        id: "Error",
                        type: "Error",
                        name: "Error"
                    }])
            }

        }
        fetchAssetData();
    },[])

    return (
        <div className="content p-8 ">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <ClipboardMinus size={32} absoluteStrokeWidth />
                Categories</h1>
            <div className="ml-16 mr-24 ">
                <Card className="p-4 ">
                    <CardHeader>
                        <CardTitle>Categories Table</CardTitle>
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
