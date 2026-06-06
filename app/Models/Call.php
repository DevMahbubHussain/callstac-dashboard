<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Call extends Model
{
    use HasFactory;

    protected $fillable = [
        'agent_id',
        'customer_id',
        'disposition_id',
        'customer_phone',
        'customer_name',
        'call_type',
        'status',
        'started_at',
        'ended_at',
        'duration_seconds',
        'notes',
        'recording_url',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'duration_seconds' => 'integer',
    ];

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function disposition(): BelongsTo
    {
        return $this->belongsTo(CallDisposition::class, 'disposition_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(CallTag::class, 'call_call_tag', 'call_id', 'call_tag_id');
    }

    public function scopeToday($query)
    {
        return $query->whereDate('started_at', today());
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeMissed($query)
    {
        return $query->whereIn('status', ['missed', 'abandoned']);
    }

    public function scopeByAgent($query, $agentId)
    {
        return $query->where('agent_id', $agentId);
    }

    public function getFormattedDurationAttribute(): string
    {
        $seconds = $this->duration_seconds;
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $secs);
    }

    public function getCallDurationAttribute(): string
    {
        if ($this->started_at && $this->ended_at) {
            return $this->started_at->diff($this->ended_at)->format('%H:%I:%S');
        }

        return '00:00:00';
    }
}
