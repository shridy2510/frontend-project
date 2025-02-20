
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/app/(admin)/Components/tables/Others/manufacturer/data-table";
import {columns} from "@/app/(admin)/Components/tables/Others/manufacturer/columns";
import {Factory} from "lucide-react";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            url:"http://samsung",
            name:"Sam Sung"
        },
        {
            id: "728ed5e2f",
            url:"http://apple",
            name:"Apple"
        },
        // ...
    ]
}

export default async function ManufactuterPage() {
    const data = await getData()

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <Factory size={32} absoluteStrokeWidth />
                Manufacturers</h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Manufacturers Table</CardTitle>
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
