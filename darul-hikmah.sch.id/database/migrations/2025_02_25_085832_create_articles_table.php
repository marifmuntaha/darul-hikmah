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
            $table->integer('user_id');
            $table->integer('category_id');
            $table->string('title');
            $table->text('content');
            $table->enum('comment', ['1', '2'])->default('1');
            $table->enum('status', ['1', '2'])->default('2');
            $table->timestamps();
        });

        Schema::create('article_tags', function (Blueprint $table) {
            $table->id();
            $table->integer('article_id');
            $table->integer('tag_id');
        });

        Schema::create('article_comments', function (Blueprint $table) {
            $table->id();
            $table->integer('article_id');
            $table->integer('comment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
        Schema::dropIfExists('article_tags');
        Schema::dropIfExists('article_comments');
    }
};
