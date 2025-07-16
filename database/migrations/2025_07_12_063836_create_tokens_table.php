<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tokens', function (Blueprint $table) {
            $table->id();
            $table->string('token');
            $table->enum('status', ['Active', 'Expired']);
            $table->unsignedBigInteger('sub_admin_id'); // Foreign key
            $table->integer('regen_count')->default(0);
            $table->timestamp('last_regen_at')->nullable();
            $table->integer('token_limit')->default(0); // Add this line
            $table->integer('token_used')->default(0);  // Add this line
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('sub_admin_id')->references('id')->on('sub_admins')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tokens');
    }
};
