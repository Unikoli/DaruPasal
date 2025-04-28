<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EsewaController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShippingController;
use App\Models\ShippingInfo;
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
Route::get('products/{id}', action: [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/category/{id}/products', [ProductController::class, 'productsByCategory']);

//contact us
Route::get('/contact', [ContactController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);
  Route::get('/esewa/success', [EsewaController::class, 'success'])->name('esewa.success');
     Route::get('/esewa/failure', [EsewaController::class, 'failure'])->name('esewa.failure');



// Protected routes (authenticated)
Route::middleware('auth:sanctum')->group(function () {
    // only for logged-in users
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('buy/{id}', [ProductController::class, 'buy']);
     // Cart
     Route::get('/cart', [CartController::class, 'index']);
     Route::post('/cart', [CartController::class, 'store']);
     Route::put('/cart/{product_id}', [CartController::class, 'update']);
     Route::delete('/cart/clear', [CartController::class, 'clear']);
     Route::delete('/cart/{product_id}', [CartController::class, 'destroy']);

     //esewa payment
     Route::post('/esewa/prepare', [EsewaController::class, 'preparePayment']);
   
    //  Route::match(['get', 'post'], '/esewa/prepare', [EsewaController::class, 'preparePayment'])->name('esewa.prepare');


    //shipping information
    Route::get('/delivery-info', [ShippingController::class, 'index']);
    Route::post('/delivery-info', [ShippingController::class, 'store']);


     //order
     Route::get('/user/orders', [EsewaController::class, 'userOrders']);

    //only for admin
    Route::middleware('admin')->group(function () {
        Route::post('/admin/categories', [CategoryController::class, 'store']);
        Route::post('/admin/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy']);

        Route::post('/admin/products', [ProductController::class, 'store']);
        Route::post('/admin/products/{id}', [ProductController::class, 'update']);
        Route::delete('/admin/products/{id}', [ProductController::class, 'destroy']);

        Route::get('/admin/orders', [AdminController::class, 'adminOrders']); // Use admin middleware if needed
        Route::put('/admin/orders/{id}/status', [AdminController::class, 'updateOrderStatus']);

    });
});
