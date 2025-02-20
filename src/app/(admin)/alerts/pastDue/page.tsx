import {columns} from "@/app/(admin)/Components/tables/alerts/pastDue/columns";
import {DataTable} from "@/app/(admin)/Components/tables/alerts/pastDue/data-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import {FileChartColumn,} from "lucide-react";
import AvailableStatusReportPage from "@/app/(admin)/report/status/available/page";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            assetTag: "43434ab",
            user:"son",
            assetName: "laptop",
            model: " macbook air",
            checkOutDate: "1/1/2000",
            expectedCheckInDate: "1/1/2023",
            daysPastDue: "100"

        },
        {
            id: "728ed52sdsf",
            assetTag: "43434ab",
            user:"son",
            assetName: "laptop",
            model: " macbook air",
            checkOutDate: "1/1/2000",
            expectedCheckInDate: "1/1/2023",
            daysPastDue: "100"
        }

        // ...
    ]
}

export default async function AlertPastDueAssetPage() {
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
            <CardTitle>Past Due Assets</CardTitle>
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
