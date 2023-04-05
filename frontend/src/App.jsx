import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// page components
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Posts from "./components/pages/Posts";
import Post from "./components/pages/Post";
import Categories from "./components/pages/Categories";

// styles
import "./App.css";
import AddPost from "./components/pages/addpost/AddPost";

function App() {
  return (
    <div className="App container mx-auto bg-gray-200 ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
