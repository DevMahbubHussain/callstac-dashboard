<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Call;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function overview()
    {
        $today = Carbon::today();

        $stats = [
            'total_calls_today' => Call::whereDate('started_at', $today)->count(),
            'active_agents' => Agent::where('status', 'online')->count(),
            'available_agents' => Agent::whereIn('status', ['online', 'available'])->count(),
            'missed_calls_today' => Call::whereDate('started_at', $today)->missed()->count(),
            'avg_call_duration' => Call::completed()->whereDate('started_at', $today)->avg('duration_seconds') ?? 0,
            'active_calls_now' => Call::whereIn('status', ['ringing', 'in_progress'])->count(),
        ];

        return response()->json($stats);
    }

    public function liveStats()
    {
        $now = now();

        return response()->json([
            'timestamp' => $now,
            'active_calls' => Call::with(['agent', 'customer'])
                ->whereIn('status', ['ringing', 'in_progress'])
                ->get(),
            'online_agents' => Agent::where('status', 'online')->with('user')->get(),
            'available_agents' => Agent::whereIn('status', ['online', 'available'])->count(),
        ]);
    }

    public function agentPerformance()
    {
        $agents = Agent::active()->with('user')->get();

        $performance = $agents->map(function ($agent) {
            $calls = $agent->calls();
            $completedCalls = $calls->completed();

            return [
                'agent_id' => $agent->id,
                'name' => $agent->name,
                'total_calls' => $calls->count(),
                'completed_calls' => $completedCalls->count(),
                'missed_calls' => $calls->missed()->count(),
                'avg_duration' => $completedCalls->avg('duration_seconds') ?? 0,
                'success_rate' => $calls->count() > 0
                    ? round(($completedCalls->count() / $calls->count()) * 100, 2)
                    : 0,
            ];
        })->sortByDesc('total_calls')->values();

        return response()->json($performance);
    }
}
