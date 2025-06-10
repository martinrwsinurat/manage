<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'activeProjects' => Project::where('status', 'active')->count(),
            'tasksDueSoon' => Task::where('due_date', '>=', now())
                ->where('due_date', '<=', now()->addDays(7))
                ->where('status', '!=', 'completed')
                ->count(),
            'completedTasks' => Task::where('status', 'completed')->count(),
            'teamMembers' => User::count(),
        ];

        $projectProgress = Project::where('status', 'active')
            ->get()
            ->map(function ($project) {
                $totalTasks = $project->tasks()->count();
                $completedTasks = $project->tasks()->where('status', 'completed')->count();
                $progress = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;

                return [
                    'name' => $project->name,
                    'progress' => $progress,
                ];
            });

        $recentTasks = Task::with('project')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'project' => $task->project->name,
                    'dueDate' => $task->due_date->format('M d, Y'),
                    'status' => $task->status,
                ];
            });

        // Get upcoming deadlines (tasks due in the next 7 days)
        $upcomingDeadlines = Task::with('project')
            ->where('due_date', '>=', now())
            ->where('due_date', '<=', now()->addDays(7))
            ->where('status', '!=', 'completed')
            ->orderBy('due_date')
            ->take(5)
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'project' => $task->project->name,
                    'dueDate' => $task->due_date->format('M d, Y'),
                    'priority' => $task->priority ?? 'medium',
                ];
            });

        // Get team members with their roles and status
        $teamMembers = User::with('roles')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    // 'role' => $user->roles->first()?->name ?? 'Member',
                    'role' =>  'Member',
                    'avatar' => $user->profile_photo_url,
                    // 'status' => $user->isOnline() ? 'online' : 'offline',
                    'status' =>  'offline',
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'projectProgress' => $projectProgress,
            'recentTasks' => $recentTasks,
            'upcomingDeadlines' => $upcomingDeadlines,
            'teamMembers' => $teamMembers,
        ]);
    }
} 