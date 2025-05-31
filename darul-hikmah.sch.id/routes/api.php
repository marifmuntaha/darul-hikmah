<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SliderController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VisitorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/auth/logout', [AuthController::class, 'logout']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('article', ArticleController::class);
    Route::apiResource('brand', BrandController::class)->except('show');
    Route::apiResource('category', CategoryController::class)->except('show');
    Route::apiResource('comment', CommentController::class);
    Route::apiResource('event', EventController::class);
    Route::apiResource('gallery', GalleryController::class)->except('show');
    Route::apiResource('menu', MenuController::class)->except('show');
    Route::apiResource('page', PageController::class)->only(['index', 'update']);
    Route::post('page/upload', [PageController::class, 'upload']);
    Route::apiResource('setting', SettingController::class)->only(['index', 'update']);
    Route::apiResource('slider', SliderController::class);
    Route::apiResource('tag', TagController::class)->except('show');
    Route::apiResource('user', UserController::class)->except('show');
    Route::apiResource('visitor', VisitorController::class)->only('index');
});

Route::get('/test', function () {
    Http::post('https://wa-api.limitasi.my.id/message/text?key=portal-ydh', [
        'id' => '082229366506',
        'message' => 'Testing Koneksi Whatsapp via laravel'
    ]);
});
