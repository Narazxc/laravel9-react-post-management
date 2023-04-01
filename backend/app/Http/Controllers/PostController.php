<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

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


    public function store() {

        $post = new Post();
        $post->title = request('title');
        $post->content = request('content');
        $post->creator = request('creator');

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
