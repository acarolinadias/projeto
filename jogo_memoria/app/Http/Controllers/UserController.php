<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function utilizadores()
    {
        return view("frontend.partial.users");
    }


    public function estatisticas()
    {
        return view("backend.partial.estatisticas");
    }
    public function index()
    {
        return view('backend.partial.index');
    }
}
