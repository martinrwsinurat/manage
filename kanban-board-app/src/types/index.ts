// filepath: kanban-board-app/kanban-board-app/src/types/index.ts
export interface Task {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    due_date: string;
    project: {
        id: number;
        name: string;
    };
    assignee: {
        id: number;
        name: string;
    } | null;
}

export interface Column {
    id: number;
    title: string;
    tasks: Task[];
}