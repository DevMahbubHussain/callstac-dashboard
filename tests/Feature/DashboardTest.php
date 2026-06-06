<?php

namespace Tests\Feature;

use App\Models\Agent;
use App\Models\Call;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_overview_statistics(): void
    {
        Agent::factory()->create(['status' => 'online']);
        Call::factory()->create([
            'status' => 'completed',
            'started_at' => Carbon::today(),
        ]);

        $response = $this->get('/api/dashboard/overview');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'total_calls_today',
                'active_agents',
                'available_agents',
                'missed_calls_today',
                'avg_call_duration',
                'active_calls_now',
            ]);
    }

    public function test_can_get_live_stats(): void
    {
        $agent = Agent::factory()->create(['status' => 'online']);
        Call::factory()->create(['status' => 'in_progress', 'agent_id' => $agent->id]);

        $response = $this->get('/api/dashboard/live-stats');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'timestamp',
                'active_calls',
                'online_agents',
                'available_agents',
            ]);
    }

    public function test_can_get_agent_performance(): void
    {
        Agent::factory()->count(3)->create();

        $response = $this->get('/api/dashboard/agent-performance');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }
}
