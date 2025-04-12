<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Public routes
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/category/{id}/products', [ProductController::class, 'productsByCategory']);


// Protected routes (authenticated)
Route::middleware('auth:sanctum')->group(function () {
    // only for logged-in users
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('buy/{id}', [ProductController::class, 'buy']);
     // Cart
     Route::get('/cart', [CartController::class, 'index']);
     Route::post('/cart', [CartController::class, 'store']);
     Route::put('/cart/{product_id}', [CartController::class, 'update']);
     Route::delete('/cart/{product_id}', [CartController::class, 'destroy']);
     Route::delete('/cart/clear', [CartController::class, 'clear']);

    //only for admin
    Route::middleware('admin')->group(function () {
        Route::post('/admin/categories', [CategoryController::class, 'store']);
        Route::post('/admin/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy']);

        Route::post('/admin/products', [ProductController::class, 'store']);
        Route::post('/admin/products/{id}', [ProductController::class, 'update']);
        Route::delete('/admin/products/{id}', [ProductController::class, 'destroy']);
    });
});
