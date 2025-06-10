import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User as UserIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-4"
                >
                    <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                            <Badge
                                variant={
                                    task.status === "completed"
                                        ? "success"
                                        : task.status === "in_progress"
                                        ? "warning"
                                        : "secondary"
                                }
                            >
                                {task.status === "todo"
                                    ? "Belum Dikerjakan"
                                    : task.status === "in_progress"
                                    ? "Sedang Dikerjakan"
                                    : "Selesai"}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="py-2">
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>Jatuh Tempo: {formatDate(task.due_date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <UserIcon className="w-4 h-4 mr-1" />
                                <span>
                                    Ditugaskan kepada: {task.assignee?.name || "Belum Ditugaskan"}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href={`/tasks/${task.id}`}>Lihat Detail</Link>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </Draggable>
    );
};

export default TaskCard;