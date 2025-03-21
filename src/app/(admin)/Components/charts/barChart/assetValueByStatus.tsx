"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {getBarChartData} from "@/app/service/barChartService/functions";

const chartConfig = {
    value: {
        label: "Value",
        color: "hsl(var(--chart-8))",
    }
} satisfies ChartConfig

export function AssetValueByStatusBarChart() {
    const [data,setData]=useState([])
    useEffect(()=>{
        async function getData(){
            try {
                const response =await getBarChartData();
                setData(response.data);
            }catch (error){
                setData([
                    { status: "Checked Out", cost: 0, },
                    { status: "Available", cost: 0 },
                    { status: "Broken", cost: 0 },
                    { status: "Lost or Missing", cost: 0 },
                    { status: "Disposed", cost: 0 },
                    { status: "Under Repair", cost: 0 },
                ])
                console.error(error)
            }
        }
        getData();





    },[])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Asset Value By Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="status"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 20).replace("/", "\n/ ")}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="cost" fill="var(--color-value)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>


                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col gap-2 text-sm">*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Status*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}

        </Card>
    )
}
