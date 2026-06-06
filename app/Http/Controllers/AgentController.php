<?php

namespace App\Http\Controllers;

use App\Events\AgentStatusChanged;
use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index()
    {
        // TEMPORARY: Disabled authorization for development testing
        // $this->authorize('viewAny', Agent::class);

        $agents = Agent::with('user')->active()->get();
        return response()->json($agents);
    }

    public function show($id)
    {
        $agent = Agent::with(['user', 'calls'])->findOrFail($id);

        // TEMPORARY: Disabled authorization for development testing
        // $this->authorize('view', $agent);

        return response()->json($agent);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:online,offline,break,available',
        ]);

        $agent = Agent::findOrFail($id);

        // TEMPORARY: Disabled authorization for development testing
        // $this->authorize('updateStatus', $agent);

        // Only allow updating the status field, not other sensitive fields
        $agent->update(['status' => $request->status]);
        $agent->load('user');

        if (app()->environment('production', 'local')) {
            broadcast(new AgentStatusChanged($agent));
        }

        return response()->json($agent);
    }

    public function statistics($agentId)
    {
        $agent = Agent::findOrFail($agentId);

        // TEMPORARY: Disabled authorization for development testing
        // $this->authorize('view', $agent);

        $stats = [
            'total_calls' => $agent->calls()->count(),
            'completed_calls' => $agent->calls()->completed()->count(),
            'missed_calls' => $agent->calls()->missed()->count(),
            'avg_duration' => $agent->calls()->completed()->avg('duration_seconds') ?? 0,
            'today_calls' => $agent->calls()->today()->count(),
        ];

        return response()->json($stats);
    }
}
