<?php
use App\Http\Controllers;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/userlogin', 'UserController@utilizadores');
Route::get('/', 'UserController@index');
Route::get('/users', 'UserController@users');
Route::get('/images', 'ImageController@all');
Route::get('/games', 'GameController@all');