import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagInputProps {
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    label?: string;
}

export function TagInput({
    tags,
    onTagsChange,
    label = "Tags",
}: TagInputProps) {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                onTagsChange([...tags, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onTagsChange(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag..."
                    className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </div>
    );
}
