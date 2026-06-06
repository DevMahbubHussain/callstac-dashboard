<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\User;
use Illuminate\Database\Seeder;

class AgentSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::factory(10)->create();

        foreach ($users as $index => $user) {
            Agent::create([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => '555-010' . ($index + 1),
                'status' => ['online', 'offline', 'available', 'break'][array_rand(['online', 'offline', 'available', 'break'])],
                'extension' => '100' . ($index + 1),
                'hire_date' => now()->subMonths(rand(1, 24)),
                'is_active' => true,
            ]);
        }
    }
}
