<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;
class ProjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }


    public function view(User $user, Project $project)
    {
        return $user->id === $project->user_id || $user->hasRole('Admin');
    }

    public function update(User $user, Project $project)
    {
        return $user->id === $project->user_id || $user->hasRole('Admin');
    }

    public function delete(User $user, Project $project)
    {
        return $user->id === $project->user_id || $user->hasRole('Admin');
    }

    /**
     * Determine whether the user can view the model.
     */
  

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

  
    public function restore(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return false;
    }
}
