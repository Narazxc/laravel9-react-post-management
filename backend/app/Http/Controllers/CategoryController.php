<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    public function index() {

        // $categories = [['name' => 'food'], ['name' => 'food'], ['name' => 'food'], ['name' => 'food']];
        

    $categories = Category::latest()->get();

    return ['categories' => $categories];

    }


    public function store(Request $request) {

        $category = new Category();
        $category->name = request('name');
   
        $category->save();

        return ['msg' => 'upload success', 'category' => $category];
   
}

    // public function show($id) {

        
    //     return ['post' => $post];
    // }

    // public function update($id) {



    //     $post->save();

    //     return ['post' => $post];
    // }



    // public function destroy($id) {

    //     $post->delete();   
    // }




}
