
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Payment,columns} from "@/app/(admin)/Components/tables/userList/columns";
import {DataTable} from "@/app/(admin)/Components/tables/userList/data-table";
import {List} from "lucide-react";


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            userName: "son",
            gmail:"son@gmail.com",
            firstName: "Son",
            lastName: "Thai",
            role:"Admin",
            company:"VínSmart",
            phoneNumber:"0124232424"
        },
        {
            id: "728ed5ư2f",
            userName: "hoang",
            gmail:"hoang@gmail.com",
            firstName: "Hoang",
            lastName: "Thai",
            role:"User",
            company:"VínSmart",
            phoneNumber:"0943434434"
        },
        // ...
    ]
}

export default async function UserListPage() {
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
                        <CardTitle>List of Users</CardTitle>
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
