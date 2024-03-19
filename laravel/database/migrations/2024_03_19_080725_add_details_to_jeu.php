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
        Schema::table('Jeu', function (Blueprint $table) {
            $table->string('description')->nullable();
            $table->string('image')->nullable();
            $table->string('capsule')->nullable();
            $table->string('priceInitial')->nullable();
            $table->string('priceFinal')->nullable();
            $table->string('dev')->nullable();
            $table->boolean('noSuccess')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Jeu', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('image');
            $table->dropColumn('capsule');
            $table->dropColumn('priceInitial');
            $table->dropColumn('priceFinal');
            $table->dropColumn('dev');
        });
    }
};
