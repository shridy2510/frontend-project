"use client"

import {LabelList, Pie, PieChart} from "recharts"

import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {getBarChartData} from "@/app/service/barChartService/functions";
import {getPieChartData} from "@/app/service/pieChartService/functions";
const colorMap = {
    "Available": "var(--color-available)",
    "Broken": "var(--color-broken)",
    "Checked Out": "var(--color-checkout)",
    "Disposed": "var(--color-disposed)",
    "Lost/Missing": "var(--color-lostMissing)",
    "Under Repair": "var(--color-repair)",
};



const chartConfig = {
    asset: {
        label: "Asset",
    },
    available: {
        label: "Available",
        color: "hsl(var(--chart-1))",
    },
    broken: {
        label: "Broken",
        color: "hsl(var(--chart-2))",
    },
    checkout: {
        label: "Checked Out",
        color: "hsl(var(--chart-3))",
    },
    disposed: {
        label: "Disposed",
        color: "hsl(var(--chart-4))",
    },
    lostMissing: {
        label: "Lost/Missing",
        color: "hsl(var(--chart-5))",
    },
    repair: {
        label: "Under Repair",
        color: "#A67F8E",
    },
} satisfies ChartConfig

export function AssetTotalByStatusPieChart() {
    const [data,setData]=useState([])
    useEffect(()=>{
        async function getData(){
            try {
                const response =await getPieChartData();

                const chartData = response.data.map(item => ({
                    ...item,
                    fill: colorMap[item.status] || "pink", // Default color if status is missing
                }));
                console.log(chartData)
                setData(chartData);

            }catch (error){
                setData([
                    { status: "Checked Out", number: 0, },
                    { status: "Available", number: 0 },
                    { status: "Broken", number: 0 },
                    { status: "Lost or Missing", number: 0 },
                    { status: "Disposed", number: 0 },
                    { status: "Under Repair", number: 0 },
                ])
                console.error(error)
            }
        }
        getData();





    },[])
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Number of Assets by Status</CardTitle>

            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[400px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="asset" hideLabel />}
                        />
                        <Pie data={data} dataKey="count">
                            <LabelList
                                dataKey="status"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: string) => chartConfig[value.toLowerCase().replace(/\s/g, "")]?.label || value
                                }
                            />


                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>


        </Card>


    )
}
