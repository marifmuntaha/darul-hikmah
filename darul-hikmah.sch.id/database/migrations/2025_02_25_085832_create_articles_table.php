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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('placeholder')->nullable();
            $table->integer('user_id');
            $table->integer('category_id');
            $table->string('title');
            $table->string('slug');
            $table->text('content');
            $table->enum('comment', ['1', '2'])->default('1');
            $table->enum('status', ['1', '2'])->default('2');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
