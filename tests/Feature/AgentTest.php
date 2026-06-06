<?php

namespace Tests\Feature;

use App\Models\Agent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AgentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_agents(): void
    {
        Agent::factory()->count(3)->create();

        $response = $this->get('/api/agents');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_can_show_single_agent(): void
    {
        $agent = Agent::factory()->create();

        $response = $this->get("/api/agents/{$agent->id}");

        $response->assertStatus(200)
            ->assertJson(['id' => $agent->id]);
    }

    public function test_can_update_agent_status(): void
    {
        $agent = Agent::factory()->create(['status' => 'offline']);

        $response = $this->patch("/api/agents/{$agent->id}/status", [
            'status' => 'online',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('agents', [
            'id' => $agent->id,
            'status' => 'online',
        ]);
    }

    public function test_can_get_agent_statistics(): void
    {
        $agent = Agent::factory()->create();

        $response = $this->get("/api/agents/{$agent->id}/statistics");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'total_calls',
                'completed_calls',
                'missed_calls',
                'avg_duration',
                'today_calls',
            ]);
    }
}
