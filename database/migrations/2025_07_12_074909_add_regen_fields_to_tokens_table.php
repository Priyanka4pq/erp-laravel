<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('tokens', function (Blueprint $table) {
            if (!Schema::hasColumn('tokens', 'regen_count')) {
                $table->unsignedTinyInteger('regen_count')->default(0);
            }

            if (!Schema::hasColumn('tokens', 'last_regen_at')) {
                $table->timestamp('last_regen_at')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('tokens', function (Blueprint $table) {
            if (Schema::hasColumn('tokens', 'regen_count')) {
                $table->dropColumn('regen_count');
            }

            if (Schema::hasColumn('tokens', 'last_regen_at')) {
                $table->dropColumn('last_regen_at');
            }
        });
    }
};