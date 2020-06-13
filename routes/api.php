<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Course;
use Illuminate\Support\Facades\Input;

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


Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@store');


################################### USER  ################################################

Route::prefix('/users')->middleware(['auth:api',])->group(function(){
    Route::get('', 'API\UserController@index')->name('users.index');
    // Route::post('', 'API\UserController@store')->name("users.store");
    Route::get('/{user}', 'API\UserController@show')->name("users.show");
    Route::put('/{user}', 'API\UserController@update')->name("users.update");
    Route::delete('/{user}', 'API\UserController@destroy')->name("users.destroy");
    
    
});

// to get ALLpLACE IF WE NEED
Route::prefix('/places')->middleware(['auth:api',])->group(function(){
    Route::get('', 'API\PlaceController@index')->name('users.index');
});


############################################# COURSE ####################################################

Route::prefix('/courses')->group(function(){
    Route::get('', 'API\course\CourseController@index')->name('courses.index');
    // Route::post('', 'API\course\CourseController@store')->name("courses.store");
    Route::get('/{course}', 'API\course\CourseController@show')->name("courses.show");
    Route::put('/{id}', 'API\course\CourseController@update')->name("courses.update");
    Route::delete('/{id}', 'API\course\CourseController@destroy')->name("courses.destroy");
});

Route::prefix('/courses')->middleware(['auth:api',])->group(function(){
    Route::post('', 'API\course\CourseController@store')->name("courses.store");

});

###################################// search functionn ####################################
Route::get('/search/{data}','API\course\CourseController@search')->name("courses.search");

#################################### CATEGORY ####################################
Route::prefix('/categories')->group(function(){
    Route::get('', 'API\category\CategoryController@index')->name('categories.index');
    Route::post('', 'API\category\CategoryController@store')->name("categories.store");
    Route::get('/{category}', 'API\category\CategoryController@show')->name("categories.show");
    Route::put('/{id}', 'API\category\CategoryController@update')->name("categories.update");
    Route::delete('/{id}', 'API\category\CategoryController@destroy')->name("categories.destroy");
});
   

// Route::prefix('/users')->middleware(['auth:api',])->group(function(){
//     Route::get('', 'API\UserController@index')->name('users.index');
//     // Route::post('', 'API\UserController@store')->name("users.store");
//     Route::get('/{user}', 'API\UserController@show')->name("users.show");
//     Route::put('/{user}', 'API\UserController@update')->name("users.update");
//     Route::delete('/{user}', 'API\UserController@destroy')->name("users.destroy");
// });


#################################### POST ###########################################

Route::prefix('/posts')->middleware(['auth:api',])->group(function(){
//     Route::get('', 'API\PostController@index');
// Route::get('/{id}', 'API\PostController@show');
Route::post('', 'API\PostController@store');
Route::put('/{id}', 'API\PostController@update');
Route::delete('/{id}', 'API\PostController@destroy');
});

Route::get('/posts', 'API\PostController@index');
Route::get('/posts/{id}', 'API\PostController@show');
// Route::post('/posts', 'API\PostController@store');
// Route::put('/posts/{id}', 'API\PostController@update');
// Route::delete('posts/{id}', 'API\PostController@destroy');



################################# PRODUCT #################################################

Route::prefix('/products')->group(function(){
    Route::get('', 'API\product\ProductController@index')->name('products.index');
    Route::get('/create', 'API\product\ProductController@create')->name("products.create");
    Route::post('', 'API\product\ProductController@store')->name("products.store");
    Route::get('/{product}', 'API\product\ProductController@show')->name("products.show");
    Route::get('/{product}/edit', 'API\product\ProductController@edit')->name("products.edit");
    Route::put('/{product}', 'API\product\ProductController@update')->name("products.update");
    Route::delete('/{prdouct}', 'API\product\ProductController@destroy')->name("products.destroy");

});


################################ EVENT ###############################################################

Route::prefix('/events')->group(function(){
    Route::get('', 'API\event\EventController@index')->name('events.index');
    Route::get('/create', 'API\event\EventController@create')->name("events.create");
    Route::post('', 'API\event\EventController@store')->name("events.store");
    Route::get('/{event}', 'API\event\EventController@show')->name("events.show");
    Route::get('/{event}/edit', 'API\event\EventController@edit')->name("events.edit");
    Route::put('/{event}', 'API\event\EventController@update')->name("events.update");
    Route::delete('/{event}', 'API\event\EventController@destroy')->name("events.destroy");

});



######################### SUBSCRIBE / INTEREST #######################################

Route::post('/categories/interests/{id}','API\CategorySubscription@store')->middleware('auth:api');//id of category
Route::delete('/categories/interests/{id}','API\CategorySubscription@destroy')->middleware('auth:api');//id of interest
Route::get('/categories/interests/{user_id}','API\CategorySubscription@index')->middleware('auth:api');




################################## COMMENT #########################################

Route::post('{post}/comments', 'API\CommentController@store')->middleware('auth:api');
Route::get('{post}/comments/{id}', 'API\CommentController@show')->middleware('auth:api');
Route::put('{post}/comments/{id}', 'API\CommentController@update')->middleware('auth:api');
Route::delete('{post}/comments/{id}', 'API\CommentController@destroy')->middleware('auth:api');


// to Generate Token 
// Route::post('/token', 'API\UserController@generateToken');
