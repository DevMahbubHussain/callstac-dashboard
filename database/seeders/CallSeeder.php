<?php

namespace Database\Seeders;

use App\Models\Call;
use App\Models\Agent;
use App\Models\CallDisposition;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CallSeeder extends Seeder
{
    public function run(): void
    {
        $agents = Agent::all();
        $dispositions = CallDisposition::all();

        $statuses = ['completed', 'completed', 'completed', 'missed', 'abandoned'];
        $callTypes = ['inbound', 'outbound'];

        for ($i = 0; $i < 100; $i++) {
            $agent = $agents->random();
            $status = $statuses[array_rand($statuses)];
            $callType = $callTypes[array_rand($callTypes)];
            $startedAt = Carbon::now()->subDays(rand(0, 30))->subHours(rand(0, 23));
            $duration = $status === 'completed' ? rand(60, 3600) : 0;
            $endedAt = $status === 'completed' ? (clone $startedAt)->addSeconds($duration) : null;

            Call::create([
                'agent_id' => $agent->id,
                'customer_phone' => '555-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT),
                'customer_name' => 'Customer ' . rand(1, 100),
                'call_type' => $callType,
                'status' => $status,
                'started_at' => $startedAt,
                'ended_at' => $endedAt,
                'duration_seconds' => $duration,
                'disposition_id' => $status === 'completed' ? $dispositions->random()->id : null,
                'notes' => $status === 'completed' ? 'Call completed successfully.' : null,
            ]);
        }

        foreach ($agents as $agent) {
            $activeCall = Call::create([
                'agent_id' => $agent->id,
                'customer_phone' => '555-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT),
                'customer_name' => 'Active Customer',
                'call_type' => 'inbound',
                'status' => 'in_progress',
                'started_at' => Carbon::now()->subMinutes(rand(1, 10)),
                'duration_seconds' => 0,
            ]);

            if (rand(0, 1)) {
                break;
            }
        }
    }
}
