<?php

use Illuminate\Http\Request;

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

//Route::get('users', 'UserControllerApi@all');


Route::get('/userlogin', 'UserControllerApi@userConta');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('users', 'UserControllerAPI@getUsers');
Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::post('users', 'UserControllerAPI@store');
Route::put('users/{id}', 'UserControllerAPI@update');
Route::put('users/{id}/block', 'UserControllerAPI@block');
Route::put('users/{id}/unblock', 'UserControllerAPI@unblock');
Route::delete('users/{id}', 'UserControllerAPI@delete');

Route::get('/images', 'ImageControllerApi@all');
Route::delete('images/{id}', 'ImageControllerAPI@delete');



Route::get('/games', 'GameControllerApi@all');




