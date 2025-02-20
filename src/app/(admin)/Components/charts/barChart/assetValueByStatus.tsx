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
const chartData = [
    { status: "Checked Out", value: 186, },
    { status: "Available", value: 305 },
    { status: "Broken", value: 237 },
    { status: "Lost/Missing", value: 73 },
    { status: "Disposed", value: 209 },
    { status: "Under Repair", value: 214 },
]

const chartConfig = {
    value: {
        label: "Value",
        color: "hsl(var(--chart-8))",
    }
} satisfies ChartConfig

export function AssetValueByStatusBarChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Asset Value By Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
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
                            tickFormatter={(value) => value.slice(0, 15)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" fill="var(--color-value)" radius={8}>
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

        </Card>
    )
}
