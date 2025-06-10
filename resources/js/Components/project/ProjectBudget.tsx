import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface ProjectBudgetProps {
    budget: number | null;
    spentBudget: number;
    projectId: number;
}

export function ProjectBudget({
    budget,
    spentBudget,
    projectId,
}: ProjectBudgetProps) {
    const { data, setData, post, processing } = useForm({
        amount: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("projects.budget.update", projectId), {
            onSuccess: () => {
                toast.success("Budget updated successfully");
                setData("amount", "");
            },
            onError: () => {
                toast.error("Failed to update budget");
            },
        });
    };

    const percentage = budget ? (spentBudget / budget) * 100 : 0;
    const budgetStatus = budget
        ? percentage >= 100
            ? "Over budget"
            : percentage >= 80
            ? "Near budget limit"
            : "Within budget"
        : "No budget set";

    const statusColor =
        percentage >= 100
            ? "text-red-500"
            : percentage >= 80
            ? "text-yellow-500"
            : "text-green-500";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Budget Status</span>
                        <span className={statusColor}>{budgetStatus}</span>
                    </div>
                    <Progress value={percentage} className="h-2" max={100} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">Total Budget</p>
                        <p className="text-2xl font-bold">
                            {budget
                                ? new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                  }).format(budget)
                                : "Not set"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Spent Budget</p>
                        <p className="text-2xl font-bold">
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(spentBudget)}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Add Expense</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            placeholder="Enter amount"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        {processing ? "Updating..." : "Update Budget"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
