<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Task $task)
    {
        $comments = $task->comments()
            ->with('user')
            ->latest()
            ->get();

        return Inertia::render('Tasks/Show', [
            'task' => $task->load(['assigned_to', 'project']),
            'comments' => $comments
        ]);
    }

    public function store(Request $request, Task $task)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $task->comments()->create([
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);

        return back();
    }

    public function update(Request $request, Task $task, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update($validated);

        return back();
    }

    public function destroy(Task $task, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }

        $comment->delete();

        return back();
    }
} 