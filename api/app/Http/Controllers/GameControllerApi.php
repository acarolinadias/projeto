<?php

namespace App\Http\Controllers;

use App\Games;
use Illuminate\Http\Request;

class GameControllerApi extends Controller
{
    public function all(){
        return Games::all();
    }
}
