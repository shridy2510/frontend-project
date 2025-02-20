import {columns} from "@/app/(admin)/Components/tables/assetLists/columns";
import {DataTable} from "@/app/(admin)/Components/tables/assetLists/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {List} from "lucide-react";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            assetTag: "OK123",
            serial: "abdcd123",
            assetName: "Laptop",
            status: "Broken",
            model: "Macbook Air",
            company: "VinSmart"
        },
        {
            id: "39fvdvdd",
            assetTag: "OK121",
            serial: "a1fedfe23",
            assetName: "Laptop",
            status: "Checked Out",
            model: "Macbook Pro",
            company: "VinSmart"
        }

    ]
}

export default async function AssetListPage() {
    const data = await getData()

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
