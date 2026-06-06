<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agent_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('disposition_id')->nullable()->constrained('call_dispositions')->onDelete('set null');
            $table->string('customer_phone');
            $table->string('customer_name')->nullable();
            $table->enum('call_type', ['inbound', 'outbound'])->default('inbound');
            $table->enum('status', ['ringing', 'in_progress', 'completed', 'missed', 'abandoned'])->default('ringing');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('duration_seconds')->default(0);
            $table->text('notes')->nullable();
            $table->string('recording_url')->nullable();
            $table->timestamps();

            $table->index('agent_id');
            $table->index('status');
            $table->index('started_at');
            $table->index('disposition_id');
            $table->index('customer_phone');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calls');
    }
};
