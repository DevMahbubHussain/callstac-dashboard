<?php

namespace Tests\Feature;

use App\Models\Agent;
use App\Models\Call;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CallTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_calls(): void
    {
        Call::factory()->count(5)->create();

        $response = $this->get('/api/calls');

        $response->assertStatus(200);
    }

    public function test_can_create_call(): void
    {
        $agent = Agent::factory()->create();

        $response = $this->post('/api/calls', [
            'agent_id' => $agent->id,
            'customer_phone' => '555-1234',
            'customer_name' => 'Test Customer',
            'call_type' => 'inbound',
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('calls', [
            'customer_phone' => '555-1234',
            'status' => 'in_progress',
        ]);
    }

    public function test_can_show_single_call(): void
    {
        $call = Call::factory()->create();

        $response = $this->get("/api/calls/{$call->id}");

        $response->assertStatus(200)
            ->assertJson(['id' => $call->id]);
    }

    public function test_can_update_call(): void
    {
        $disposition = \App\Models\CallDisposition::factory()->create();
        $call = Call::factory()->create(['status' => 'in_progress']);

        $response = $this->patch("/api/calls/{$call->id}", [
            'status' => 'completed',
            'duration_seconds' => 300,
            'disposition_id' => $disposition->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('calls', [
            'id' => $call->id,
            'status' => 'completed',
        ]);
    }

    public function test_can_get_active_calls(): void
    {
        Call::factory()->create(['status' => 'in_progress']);
        Call::factory()->create(['status' => 'completed']);

        $response = $this->get('/api/calls/active');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function test_can_get_missed_calls(): void
    {
        Call::factory()->create(['status' => 'missed']);
        Call::factory()->create(['status' => 'completed']);

        $response = $this->get('/api/calls/missed');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }
}
