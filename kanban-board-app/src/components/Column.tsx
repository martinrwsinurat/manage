import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Task } from "@/types";

interface ColumnProps {
    title: string;
    tasks: Task[];
    columnId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, columnId }) => {
    return (
        <div className="column">
            <h3 className="text-lg font-medium mb-4">{title}</h3>
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="task-list"
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;