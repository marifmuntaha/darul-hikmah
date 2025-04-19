<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/halaman/sejarah', [PageController::class, 'history'])->name('history');
Route::get('/berita', [ArticleController::class, 'index'])->name('article');
Route::get('/berita/{slug}/lihat', [ArticleController::class, 'show'])->name('article.show');
Route::get('/kegiatan', [EventController::class, 'index'])->name('event');
Route::get('/kegiatan/{event}/lihat', [EventController::class, 'show'])->name('event.show');
Route::get('/kontak', [ContactController::class, 'index'])->name('contact');
