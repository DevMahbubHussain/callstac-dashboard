<?php

namespace App\Events;

use App\Models\Agent;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AgentStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $agent;

    public function __construct(Agent $agent)
    {
        $this->agent = $agent;
    }

    public function broadcastOn()
    {
        return [
            new Channel('dashboard'),
            new Channel('agents'),
        ];
    }

    public function broadcastWith()
    {
        return [
            'agent' => $this->agent->load('user'),
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
