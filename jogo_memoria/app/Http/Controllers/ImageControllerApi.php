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

    /*public function getAllImage(Request $request) {

        if ($request->has('page')) {
            return ImageResource::collection(Image::paginate(5));
        } else {
            return ImageResource::collection(Image::all());
        }
    }*/

    public function getImage($id)
    {
        return new ImageResource(Image::find($id));
    }

    public function store(Request $request)
    {
        $image = $request->get('path');
        $fileName = time() . '' . $image;

        Imagem::make($request->get('image'))->resize(50, 50)->save(public_path('img/').$fileName);

        $request->validate([
            'face' => 'required ',
            'active' => 'required',
        ]);


        $imagem = new Image();
        $imagem->fill($request->all());
        $imagem->path =  $fileName;
        $imagem->save();
        return response()->json(new ImageResource($imagem), 201);
    }

    public function update(Request $request, $id)
    {
        $image = Image::findOrFail($id);

        $image->update($request->all());
        return new ImageResource($image);
    }


}
