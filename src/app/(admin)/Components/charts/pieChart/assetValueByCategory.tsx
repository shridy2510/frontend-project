"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
const chartData = [
    { category: "son", values: 275, fill: "var(--color-son)" },
    { category: "thai", values: 200, fill: "var(--color-thai)" },
    { category: "firefox", values: 187, fill: "var(--color-firefox)" },
    { category: "edge", values: 173, fill: "var(--color-edge)" },
    { category: "other", values: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    values: {
        label: "values",
    },
    son: {
        label: "Son",
        color: "hsl(var(--chart-1))",
    },
    thai: {
        label: "Thai",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function AssetValueByCategoryPieChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle> Asset Value By Category</CardTitle>

            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie data={chartData} dataKey="values" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="category" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
