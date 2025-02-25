<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/artikel', [ArticleController::class, 'index'])->name('article');
Route::get('/artikel/{article}/lihat', [ArticleController::class, 'show'])->name('article.show');
Route::get('event', [EventController::class, 'index'])->name('event');
Route::get('kontak', [ContactController::class, 'index'])->name('contact');
