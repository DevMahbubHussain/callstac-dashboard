<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'address',
        'company',
        'notes',
    ];

    public function calls(): HasMany
    {
        return $this->hasMany(Call::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(CallTag::class, 'call_call_tag');
    }
}
