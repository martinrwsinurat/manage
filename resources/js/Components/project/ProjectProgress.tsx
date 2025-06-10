import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectProgressProps {
    progress: number;
    status: "not_started" | "in_progress" | "on_hold" | "completed";
    totalTasks: number;
    completedTasks: number;
}

const statusColors = {
    not_started: "bg-gray-500",
    in_progress: "bg-blue-500",
    on_hold: "bg-yellow-500",
    completed: "bg-green-500",
};

const statusLabels = {
    not_started: "Not Started",
    in_progress: "In Progress",
    on_hold: "On Hold",
    completed: "Completed",
};

export function ProjectProgress({
    progress,
    status,
    totalTasks,
    completedTasks,
}: ProjectProgressProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Status</p>
                        <Badge className={`${statusColors[status]} text-white`}>
                            {statusLabels[status]}
                        </Badge>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium">Tasks</p>
                        <p className="text-sm text-gray-500">
                            {completedTasks} of {totalTasks} completed
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
