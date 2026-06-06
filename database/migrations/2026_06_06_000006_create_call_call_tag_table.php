<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('call_call_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('call_id')->constrained()->onDelete('cascade');
            $table->foreignId('call_tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['call_id', 'call_tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('call_call_tag');
    }
};
