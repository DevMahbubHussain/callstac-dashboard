<?php

namespace App\Http\Controllers;

use App\Events\CallEnded;
use App\Events\CallStarted;
use App\Models\Call;
use App\Models\Customer;
use Illuminate\Http\Request;

class CallController extends Controller
{
    public function index(Request $request)
    {
        $query = Call::with(['agent', 'customer', 'disposition', 'tags']);

        if ($request->has('agent_id')) {
            $query->where('agent_id', $request->agent_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('call_type')) {
            $query->where('call_type', $request->call_type);
        }

        if ($request->has('from_date')) {
            $query->whereDate('started_at', '>=', $request->from_date);
        }

        if ($request->has('to_date')) {
            $query->whereDate('started_at', '<=', $request->to_date);
        }

        return response()->json($query->orderBy('started_at', 'desc')->paginate(20));
    }

    public function store(Request $request)
    {
        $request->validate([
            'agent_id' => 'nullable|exists:agents,id',
            'customer_phone' => 'required|string',
            'customer_name' => 'nullable|string',
            'call_type' => 'required|in:inbound,outbound',
            'status' => 'required|in:ringing,in_progress,completed,missed,abandoned',
            'started_at' => 'nullable|date',
        ]);

        $call = Call::create($request->all());
        $call->load(['agent', 'customer', 'disposition']);

        if (app()->environment('production', 'local')) {
            broadcast(new CallStarted($call));
        }

        return response()->json($call, 201);
    }

    public function show($id)
    {
        $call = Call::with(['agent', 'customer', 'disposition', 'tags'])->findOrFail($id);
        return response()->json($call);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'disposition_id' => 'nullable|exists:call_dispositions,id',
            'status' => 'nullable|in:ringing,in_progress,completed,missed,abandoned',
            'ended_at' => 'nullable|date',
            'duration_seconds' => 'nullable|integer',
            'notes' => 'nullable|string',
            'recording_url' => 'nullable|string',
        ]);

        $call = Call::findOrFail($id);
        $previousStatus = $call->status;
        $call->update($request->all());
        $call->load(['agent', 'customer', 'disposition', 'tags']);

        if (app()->environment('production', 'local')) {
            if ($previousStatus !== 'completed' && in_array($call->status, ['completed', 'missed', 'abandoned'])) {
                broadcast(new CallEnded($call));
            }
        }

        return response()->json($call);
    }

    public function activeCalls()
    {
        $activeCalls = Call::with(['agent', 'customer'])
            ->whereIn('status', ['ringing', 'in_progress'])
            ->get();

        return response()->json($activeCalls);
    }

    public function missedCalls(Request $request)
    {
        $query = Call::with(['agent', 'customer'])->missed();

        if ($request->has('from_date')) {
            $query->whereDate('started_at', '>=', $request->from_date);
        }

        if ($request->has('to_date')) {
            $query->whereDate('started_at', '<=', $request->to_date);
        }

        return response()->json($query->orderBy('started_at', 'desc')->get());
    }
}
