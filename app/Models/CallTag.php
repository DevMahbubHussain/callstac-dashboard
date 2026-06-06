<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CallTag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
    ];

    public function calls(): BelongsToMany
    {
        return $this->belongsToMany(Call::class, 'call_call_tag', 'call_tag_id', 'call_id');
    }
}
