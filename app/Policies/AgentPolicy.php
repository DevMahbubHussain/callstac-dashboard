<?php

namespace App\Policies;

use App\Models\Agent;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AgentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // All authenticated users can view agents list
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Agent $agent): bool
    {
        // All authenticated users can view individual agents
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Only admins can create agents
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Agent $agent): bool
    {
        // Only admins can update agent information
        // Users can update their own status only
        if ($user->agent && $user->agent->id === $agent->id) {
            // Allow users to update limited fields (like status)
            return true;
        }

        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Agent $agent): bool
    {
        // Only admins can delete agents
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Agent $agent): bool
    {
        // Only admins can restore agents
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Agent $agent): bool
    {
        // Only admins can permanently delete agents
        return $user->is_admin ?? false;
    }

    /**
     * Determine whether the user can update agent status.
     */
    public function updateStatus(User $user, Agent $agent): bool
    {
        // Users can update their own status
        if ($user->agent && $user->agent->id === $agent->id) {
            return true;
        }

        // Admins can update any agent's status
        return $user->is_admin ?? false;
    }
}
