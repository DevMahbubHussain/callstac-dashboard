<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Call;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function callVolume(Request $request)
    {
        $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date',
            'group_by' => 'nullable|in:day,hour,week,month',
        ]);

        $fromDate = Carbon::parse($request->from_date);
        $toDate = Carbon::parse($request->to_date)->endOfDay();
        $groupBy = $request->get('group_by', 'day');

        $query = Call::whereBetween('started_at', [$fromDate, $toDate]);

        $data = match ($groupBy) {
            'hour' => $query->selectRaw('HOUR(started_at) as period, DATE(started_at) as date, COUNT(*) as count')
                ->groupBy('date', 'period')
                ->orderBy('date')
                ->orderBy('period')
                ->get(),
            'day' => $query->selectRaw('DATE(started_at) as period, COUNT(*) as count')
                ->groupBy('period')
                ->orderBy('period')
                ->get(),
            'week' => $query->selectRaw('YEARWEEK(started_at) as period, COUNT(*) as count')
                ->groupBy('period')
                ->orderBy('period')
                ->get(),
            'month' => $query->selectRaw('YEAR(started_at) as year, MONTH(started_at) as month, COUNT(*) as count')
                ->groupBy('year', 'month')
                ->orderBy('year')
                ->orderBy('month')
                ->get(),
            default => $query->selectRaw('DATE(started_at) as period, COUNT(*) as count')
                ->groupBy('period')
                ->orderBy('period')
                ->get(),
        };

        return response()->json([
            'from_date' => $fromDate,
            'to_date' => $toDate,
            'group_by' => $groupBy,
            'data' => $data,
        ]);
    }

    public function agentPerformance(Request $request)
    {
        $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date',
            'agent_id' => 'nullable|exists:agents,id',
        ]);

        $fromDate = Carbon::parse($request->from_date);
        $toDate = Carbon::parse($request->to_date)->endOfDay();

        $query = Agent::active()->with('user');

        if ($request->has('agent_id')) {
            $query->where('id', $request->agent_id);
        }

        $agents = $query->get();

        $report = $agents->map(function ($agent) use ($fromDate, $toDate) {
            $calls = $agent->calls()->whereBetween('started_at', [$fromDate, $toDate]);
            $completedCalls = (clone $calls)->completed();

            return [
                'agent_id' => $agent->id,
                'agent_name' => $agent->name,
                'total_calls' => $calls->count(),
                'completed_calls' => $completedCalls->count(),
                'missed_calls' => (clone $calls)->missed()->count(),
                'avg_duration' => $completedCalls->avg('duration_seconds') ?? 0,
                'total_duration' => $completedCalls->sum('duration_seconds') ?? 0,
                'success_rate' => $calls->count() > 0
                    ? round(($completedCalls->count() / $calls->count()) * 100, 2)
                    : 0,
            ];
        });

        return response()->json([
            'from_date' => $fromDate,
            'to_date' => $toDate,
            'data' => $report,
        ]);
    }

    public function dispositionSummary(Request $request)
    {
        $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date',
        ]);

        $fromDate = Carbon::parse($request->from_date);
        $toDate = Carbon::parse($request->to_date)->endOfDay();

        $summary = Call::whereBetween('started_at', [$fromDate, $toDate])
            ->join('call_dispositions', 'calls.disposition_id', '=', 'call_dispositions.id')
            ->selectRaw('call_dispositions.name as disposition_name, COUNT(*) as count, AVG(calls.duration_seconds) as avg_duration')
            ->groupBy('call_dispositions.name')
            ->orderByDesc('count')
            ->get();

        return response()->json([
            'from_date' => $fromDate,
            'to_date' => $toDate,
            'data' => $summary,
        ]);
    }

    public function export(Request $request)
    {
        $request->validate([
            'type' => 'required|in:call_volume,agent_performance,disposition_summary',
            'from_date' => 'required|date',
            'to_date' => 'required|date',
            'format' => 'required|in:csv,xlsx',
        ]);

        // This is a placeholder - you'd typically use Laravel Excel here
        return response()->json([
            'message' => 'Export feature requires maatwebsite/excel package',
            'type' => $request->type,
            'from_date' => $request->from_date,
            'to_date' => $request->to_date,
            'format' => $request->format,
        ]);
    }
}
