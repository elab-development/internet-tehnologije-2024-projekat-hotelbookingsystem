<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->string('reservation_code')->unique();
            $table->string('reservation_status');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->integer('guest_count');
            $table->text('notes')->nullable();
            $table->timestamps();

  // validation check          $table->check('check_out_date > check_in_date');
  // validation check          $table->check('guest_count > 0');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
