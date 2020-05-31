<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/users', 'API\UserController@store')->name("users.store");
Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@store');

// Route::prefix('/users')->group(function(){
Route::prefix('/users')->middleware(['auth:api',])->group(function(){
    Route::get('', 'API\UserController@index')->name('users.index');
    // Route::post('', 'API\UserController@store')->name("users.store");
    Route::get('/{user}', 'API\UserController@show')->name("users.show");
    Route::put('/{user}', 'API\UserController@update')->name("users.update");
    Route::delete('/{user}', 'API\UserController@destroy')->name("users.destroy");
});

// to Generate Token 
// Route::post('/token', 'API\UserController@generateToken');