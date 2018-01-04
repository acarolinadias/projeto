<?php

namespace App\Http\Controllers;

use App\Images;
use Illuminate\Http\Request;

class ImageController extends Controller
{

    public function all()
    {
        $images=Images::all();
        return view("backend.partial.imgs", compact("images"));
    }

}
