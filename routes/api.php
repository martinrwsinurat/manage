<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);

    // Project routes
    Route::apiResource('projects', ProjectController::class);

    // Task routes
    Route::prefix('projects/{project}')->group(function () {
        Route::apiResource('tasks', TaskController::class);
        Route::patch('tasks/{task}/status', [TaskController::class, 'updateStatus']);

        // Comment routes
        Route::prefix('tasks/{task}')->group(function () {
            Route::apiResource('comments', CommentController::class);
        });
    });
}); 