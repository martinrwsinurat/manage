import React from "react";
import KanbanBoard from "@/components/KanbanBoard";

const Index: React.FC = () => {
    return (
        <div className="py-12 min-h-screen">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold mb-6">Kanban Board</h1>
                <KanbanBoard />
            </div>
        </div>
    );
};

export default Index;