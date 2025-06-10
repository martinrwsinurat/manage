import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import { Task } from "@/types";

interface KanbanBoardProps {
    tasks: Task[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
    const tasksByStatus = {
        todo: tasks.filter((task) => task.status === "todo"),
        in_progress: tasks.filter((task) => task.status === "in_progress"),
        completed: tasks.filter((task) => task.status === "completed"),
    };

    const onDragEnd = (result: any) => {
        // Handle the logic for reordering tasks here
        // result.destination will give you the new position of the task
        // result.source will give you the original position of the task
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="kanban-board" direction="horizontal">
                {(provided) => (
                    <div
                        className="flex space-x-4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Column title="Belum Dikerjakan" tasks={tasksByStatus.todo} />
                        <Column title="Sedang Dikerjakan" tasks={tasksByStatus.in_progress} />
                        <Column title="Selesai" tasks={tasksByStatus.completed} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default KanbanBoard;