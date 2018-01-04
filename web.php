<?php
use App\Http\Controllers;
use App\Http\Controllers\Auth;
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
Route::get('/login', 'LoginTesteController@login');

Route::get('/userlogin', 'UserController@userlogin')->name("login");

//-------


Route::get('/user', 'UserController@users');

Route::get('/', 'UserController@estatisticas')->name("home");
Route::get('/users', 'UserController@users')->name("users");
Route::get('/images', 'ImageController@all')->name("imgs");
Route::get('/alterarsenha', 'UserController@alterarsenha')->name("alterarsenha");
Route::get('/games', 'GameController@all')->name("games");