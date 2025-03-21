"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {columns} from "@/app/(admin)/Components/tables/userList/columns";
import {DataTable} from "@/app/(admin)/Components/tables/userList/data-table";
import {List} from "lucide-react";
import {useEffect, useState} from "react";

import {getUsers} from "@/app/service/userService/countAndValue";



export default function UserListPage() {
    const [data ,setData]=useState([])
    useEffect(()=>{

        async function fetchUserData() {
            // Fetch data from your API here.
            try{
                const response= await getUsers();
                // return response.data;
                setData(response.data)
            }
            catch(error){
                console.error("Error fetching asset data:", error);
                return null;

            }

        }
        fetchUserData();
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
