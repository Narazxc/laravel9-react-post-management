<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;


class PostController extends Controller
{
    //
    public function index() {
    //     $posts = [
    //     ['title' => 'googoogaagaa', 'content' => 'uuuuuuuuuuuu', 'creator' => 'sisisis'],
    //     ['title' => 'googoogaagaa', 'content' => 'uuuuuuuuuuuu', 'creator' => 'sisisis'],
    //     ['title' => 'googoogaagaa', 'content' => 'uuuuuuuuuuuu', 'creator' => 'sisisis'],
    //     ['title' => 'googoogaagaa', 'content' => 'uuuuuuuuuuuu', 'creator' => 'sisisis'],
    // ];
    $posts = Post::latest()->get();

    return ['posts' => $posts];

    }


    public function store(Request $request) {

        

        $post = new Post();
        $post->title = $request->input('title');
        $post->content = $request->input('content');

        $path = $request->file('file')->store('images');
        $post->creator = $path;

        $post->category_id = $request->input('category');

        

        $post->save();

        return ['msg' => 'upload success', 'post' => $post];

    }

    public function show($id) {

        $post = Post::findOrFail($id);
        return ['post' => $post];
    }

    public function update($id) {

        $post = Post::findOrFail($id);
        $post->title = request('title');
        $post->content = request('content');
        $post->creator = request('creator');

        $post->save();

        return ['post' => $post];
    }



    public function destroy($id) {
        $post = Post::findOrFail($id);
        $post->delete();   
    }





    

}
