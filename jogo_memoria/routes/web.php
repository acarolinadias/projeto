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
Route::get('/', 'UserController@index')->name("home");
Route::get('/users', 'UserController@users')->name("users");
Route::get('/images', 'ImageController@all')->name("imgs");
Route::get('/games', 'GameController@all')->name("games");