import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { router } from "@inertiajs/react";

interface ProjectTagsProps {
    tags: string[];
    projectId: number;
}

export function ProjectTags({ tags, projectId }: ProjectTagsProps) {
    const { data, setData, post, processing } = useForm({
        tag: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.tag.trim()) return;

        post(route("projects.tags.store", projectId), {
            onSuccess: () => {
                toast.success("Tag added successfully");
                setData("tag", "");
            },
            onError: () => {
                toast.error("Failed to add tag");
            },
        });
    };

    const handleRemoveTag = (tag: string) => {
        router.delete(route("projects.tags.destroy", [projectId, tag]), {
            onSuccess: () => {
                toast.success("Tag removed successfully");
            },
            onError: () => {
                toast.error("Failed to remove tag");
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={data.tag}
                        onChange={(e) => setData("tag", e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={processing || !data.tag.trim()}
                    >
                        Add
                    </Button>
                </form>

                <div className="flex flex-wrap gap-2">
                    {tags && tags.length > 0 ? (
                        tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                {tag}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No tags yet</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
