<?php

// use App\Http\Controllers\EsewaPaymentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/esewa', function () {
    return view('form');
});

// Route::get('/pay', [EsewaPaymentController::class, 'showForm'])->name('esewa.form');
// Route::post('/payment/success', [EsewaPaymentController::class, 'success'])->name('esewa.success');
// Route::post('/payment/failure', [EsewaPaymentController::class, 'failure'])->name('esewa.failure');
// Route::get('/checkout', [EsewaPaymentController::class, 'checkout'])->name('checkout');
// Route::post('/esewa-pay', [EsewaPaymentController::class, 'initiatePayment'])->name('esewa.pay');
// Route::get('/esewa-success', [EsewaPaymentController::class, 'success'])->name('esewa.success');
// Route::get('/esewa-fail', [EsewaPaymentController::class, 'fail'])->name('esewa.fail');

// Route::post('/esewa-v2-checkout', [EsewaPaymentController::class, 'v2Checkout'])->name('esewa.v2.checkout');

use App\Http\Controllers\EsewaController;
use App\Http\Controllers\EsewaPaymentController;

// Route::get('/esewa/pay', [EsewaPaymentController::class, 'showPaymentPage'])->name('pay');
// Route::post('/esewa/prepare', [EsewaPaymentController::class, 'preparePayment'])->name('prepare');
// Route::post('/esewa/redirect', [EsewaPaymentController::class, 'redirectToEsewa'])->name('esewa.redirect');
// Route::get('/esewa/success', [EsewaPaymentController::class, 'success'])->name('esewa.success');
// Route::get('/esewa/failure', [EsewaPaymentController::class, 'failure'])->name('esewa.failure');

// Route::get('/esewa/success', [\App\Http\Controllers\Api\EsewaController::class, 'success'])->name('esewa.success');
// Route::get('/esewa/failure', [\App\Http\Controllers\Api\EsewaController::class, 'failure'])->name('esewa.failure');
