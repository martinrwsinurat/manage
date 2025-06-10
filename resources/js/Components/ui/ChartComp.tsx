"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartCompProps {
    data?: {
        month: string;
        completed: number;
        remaining: number;
    }[];
}

const defaultData = [
    { month: "Project A", completed: 75, remaining: 25 },
    { month: "Project B", completed: 45, remaining: 55 },
    { month: "Project C", completed: 90, remaining: 10 },
    { month: "Project D", completed: 30, remaining: 70 },
    { month: "Project E", completed: 60, remaining: 40 },
];

const chartConfig = {
    completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
    },
    remaining: {
        label: "Remaining",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function ChartComp({ data = defaultData }: ChartCompProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>
                    Showing completion status for all projects
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="completed"
                            fill="var(--color-completed)"
                            radius={4}
                        />
                        <Bar
                            dataKey="remaining"
                            fill="var(--color-remaining)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Overall progress: 60% <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing progress for all active projects
                </div>
            </CardFooter>
        </Card>
    );
}
