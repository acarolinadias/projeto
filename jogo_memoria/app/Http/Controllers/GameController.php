<?php

namespace App\Http\Controllers;

use App\Games;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function all()
    {
        $games=Games::all();
        return view("backend.partial.games", compact("games"));
    }
}
