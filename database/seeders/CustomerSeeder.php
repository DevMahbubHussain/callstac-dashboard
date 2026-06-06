<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['name' => 'John Smith', 'phone' => '555-1234', 'email' => 'john@example.com', 'company' => 'Acme Corp'],
            ['name' => 'Jane Doe', 'phone' => '555-5678', 'email' => 'jane@example.com', 'company' => 'Tech Solutions'],
            ['name' => 'Bob Johnson', 'phone' => '555-9012', 'email' => 'bob@example.com', 'company' => 'Global Inc'],
            ['name' => 'Alice Williams', 'phone' => '555-3456', 'email' => 'alice@example.com', 'company' => 'StartUp LLC'],
            ['name' => 'Charlie Brown', 'phone' => '555-7890', 'email' => 'charlie@example.com', 'company' => 'Enterprise Co'],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
