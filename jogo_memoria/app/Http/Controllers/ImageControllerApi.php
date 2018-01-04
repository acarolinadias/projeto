<?php

namespace App\Http\Controllers;

use App\Images;
use Illuminate\Http\Request;

class ImageControllerApi extends Controller
{
    public function all(){
        return Images::all();
    }
    public function delete($id)
    {
        $img = Images::findOrFail($id);
        $img->delete();
        return response()->json(null, 204);
    }
}
