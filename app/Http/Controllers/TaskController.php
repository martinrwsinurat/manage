<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with(['project', 'assignee'])
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'status' => $task->status,
                    'due_date' => $task->due_date,
                    'project' => [
                        'id' => $task->project->id,
                        'name' => $task->project->name,
                    ],
                    'assignee' => $task->assignee ? [
                        'id' => $task->assignee->id,
                        'name' => $task->assignee->name,
                    ] : null,
                ];
            });

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create(Request $request)
    {
        $projectId = $request->query('project_id');
        $project = null;

        if ($projectId) {
            $project = Project::findOrFail($projectId);
        }

        return Inertia::render('Tasks/Create', [
            'users' => User::select('id', 'name')->get(),
            'projects' => Project::select('id', 'name')->get(),
            'selectedProject' => $project ? [
                'id' => $project->id,
                'name' => $project->name,
            ] : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'required|in:todo,in_progress,completed',
            'due_date' => 'required|date',
        ]);

        $task = Task::create($validated);

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task created successfully.');
    }

    public function show(Task $task)
    {
        $task->load(['project', 'assignee', 'comments.user', 'attachments.comments.user']);
        return Inertia::render('Tasks/Show', [
            'task' => $task,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function edit(Task $task)
    {
        $task->load(['project', 'assignee', 'comments.user', 'attachments.comments.user']);
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => Project::all(),
            'users' => User::all(),
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'required|exists:users,id',
            'status' => 'required|in:todo,in_progress,completed',
            'due_date' => 'required|date',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
} 