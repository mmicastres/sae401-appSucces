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
        Schema::create('FriendTable', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('demandeur');
            $table->integer('destinataire');
            $table->boolean('accepter');
            $table->foreign('demandeur')->references('id')->on('users');
            $table->foreign('destinataire')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friend_tablz');
    }
};
