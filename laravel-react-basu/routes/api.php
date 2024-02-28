<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ReservationController;
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

{/*Discontinued Routes */}
// Route::get('/accounts', [AuthController::class, 'getAccounts']);
// Route::delete('/accounts/{id}', [AuthController::class, 'deleteAccount']);
// Route::put('/accounts/{id}', [AuthController::class, 'updateAccount']);

//Public Routes
Route::get('/location', 'LocationController@getLocation');
Route::post('/account/register', [AuthController::class, 'register']);
Route::post('/signup', [AuthController::class,'signup']);
Route::post('/login', [AuthController::class,'login']);
Route::get('/users', [AuthController::class, 'getUser']);
Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);

//Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/location', [LocationController::class, 'updateLocation']);
    Route::get('/location', [LocationController::class, 'getLocation']);
});




