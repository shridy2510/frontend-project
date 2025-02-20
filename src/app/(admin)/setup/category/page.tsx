
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/app/(admin)/Components/tables/Others/category/data-table";
import {columns} from "@/app/(admin)/Components/tables/Others/category/columns";
import {ClipboardMinus} from "lucide-react";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            type:"Accessory",
            name:"Accessory"
        },
        {
            id: "728ed5e2f",
            type:"License",
            name:"License"
        },
        // ...
    ]
}

export default async function CategoryPage() {
    const data = await getData()

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
