<?php

namespace App\Events;

use App\Models\Call;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CallStarted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $call;

    public function __construct(Call $call)
    {
        $this->call = $call;
    }

    public function broadcastOn()
    {
        return [
            new Channel('dashboard'),
            new PrivateChannel('agent.' . $this->call->agent_id),
        ];
    }

    public function broadcastWith()
    {
        return [
            'call' => $this->call->load(['agent', 'customer']),
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
