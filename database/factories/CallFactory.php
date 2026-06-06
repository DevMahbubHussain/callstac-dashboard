<?php

namespace Database\Factories;

use App\Models\Agent;
use App\Models\Call;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CallFactory extends Factory
{
    protected $model = Call::class;

    public function definition(): array
    {
        $startedAt = fake()->dateTimeBetween('-30 days', 'now');
        $duration = fake()->boolean(80) ? fake()->numberBetween(60, 3600) : 0;
        $status = fake()->randomElement(['completed', 'completed', 'completed', 'missed', 'abandoned']);

        return [
            'agent_id' => Agent::factory(),
            'customer_phone' => '555-' . fake()->numerify('####'),
            'customer_name' => fake()->name(),
            'call_type' => fake()->randomElement(['inbound', 'outbound']),
            'status' => $status,
            'started_at' => $startedAt,
            'ended_at' => $status === 'completed' ? (clone Carbon::parse($startedAt))->addSeconds($duration) : null,
            'duration_seconds' => $duration,
            'notes' => fake()->boolean(50) ? fake()->sentence() : null,
        ];
    }
}
