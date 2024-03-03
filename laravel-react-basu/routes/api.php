<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\ShuttleFormController;
use App\Http\Controllers\TripController;
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



//Public Routes
Route::post('/account/register', [AuthController::class, 'register']);
Route::post('/signup', [AuthController::class,'signup']);
Route::post('/login', [AuthController::class,'login']);
Route::get('/users', [AuthController::class, 'getUser']);


Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);

//Routes for Shuttle Storage
Route::post('/shuttle/form', [ShuttleFormController::class,'post']);
Route::get('shuttle/storage', [ShuttleFormController::class, 'get']);
Route::delete('/shuttle/storage/{id}', [ShuttleFormController::class, 'delete']);


//Live Tracking:


//Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/driver', [DriverController::class, 'show']);
    Route::post('/driver', [DriverController::class, 'update']);

    Route::post('trip', [TripController::class, 'store']);
    Route::post('trip/{trip}', [TripController::class, 'show']);

    Route::post('trip/{trip}/accept', [TripController::class, 'accept']);
    Route::post('trip/{trip}/start', [TripController::class, 'start']);
    Route::post('trip/{trip}/end', [TripController::class, 'end']);
    Route::post('trip/{trip}/location', [TripController::class, 'location']);

    Route::get('/user', function(Request $request){
        return $request->user();
    });
});




