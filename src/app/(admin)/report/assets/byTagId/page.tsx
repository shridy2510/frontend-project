import {columns} from "@/app/(admin)/Components/tables/reports/assetReports/byTagId/columns";
import {DataTable} from "@/app/(admin)/Components/tables/reports/assetReports/byTagId/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {FileChartColumn,} from "lucide-react";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            assetTag: "OK123",
            serial:"abdcd123",
            assetName: "Laptop",
            status: "Broken",
            cost: 1000

        },
        {
            id: "39fvdvdd",
            assetTag: "OK121",
            serial:"a1fedfe23",
            assetName: "Laptop",
            status: "Checked Out",
            cost: 2000

        },

        // ...
    ]
}

export default async function TagIdReportPage() {
    const data = await getData()

    return (
        <div className="content p-8">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
        <FileChartColumn size={32} />
    Report
    </h1>
    <div className="ml-16 mr-24">
    <Card className="p-4">
        <CardHeader>
            <CardTitle>Assets by Tag ID</CardTitle>
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
