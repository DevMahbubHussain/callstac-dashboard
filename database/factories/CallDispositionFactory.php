<?php

namespace Database\Factories;

use App\Models\CallDisposition;
use Illuminate\Database\Eloquent\Factories\Factory;

class CallDispositionFactory extends Factory
{
    protected $model = CallDisposition::class;

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Answered', 'No Answer', 'Voicemail', 'Converted', 'Not Interested']),
            'category' => fake()->randomElement(['Connected', 'Missed', 'Success', 'Failed']),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}
