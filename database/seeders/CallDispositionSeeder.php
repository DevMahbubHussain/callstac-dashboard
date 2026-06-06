<?php

namespace Database\Seeders;

use App\Models\CallDisposition;
use Illuminate\Database\Seeder;

class CallDispositionSeeder extends Seeder
{
    public function run(): void
    {
        $dispositions = [
            ['name' => 'Answered', 'category' => 'Connected', 'sort_order' => 1],
            ['name' => 'No Answer', 'category' => 'Missed', 'sort_order' => 2],
            ['name' => 'Voicemail', 'category' => 'Missed', 'sort_order' => 3],
            ['name' => 'Busy', 'category' => 'Missed', 'sort_order' => 4],
            ['name' => 'Converted', 'category' => 'Success', 'sort_order' => 5],
            ['name' => 'Not Interested', 'category' => 'Failed', 'sort_order' => 6],
            ['name' => 'Callback Scheduled', 'category' => 'Follow-up', 'sort_order' => 7],
            ['name' => 'Wrong Number', 'category' => 'Invalid', 'sort_order' => 8],
            ['name' => 'Hang Up', 'category' => 'Disconnected', 'sort_order' => 9],
            ['name' => 'Transfer', 'category' => 'Connected', 'sort_order' => 10],
        ];

        foreach ($dispositions as $disposition) {
            CallDisposition::create($disposition);
        }
    }
}
