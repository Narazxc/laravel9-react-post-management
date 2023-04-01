import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setError(null);
      setIsLoading(true);

      axios.get("http://127.0.0.1:8000/posts").then((res) => {
        const { posts } = res.data;
        setPosts(posts);
      });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  }, []);

  console.log(posts);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/posts/${id}`).then((res) => {
      console.log(res);

      setPosts(posts.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-6xl text-red-200 font-bold">Posts</h2>

        <div className="text-gray-200 flex items-center bg-blue-500 px-5 py-2 rounded-full">
          <Link to="/addpost">Add Post</Link>
        </div>
      </div>
      <div className="flex justify-center">
        <table className="border-collapse border border-slate-500 w-3/4 text-xl">
          <thead>
            <tr>
              <th className="border border-slate-600 ...">Title</th>
              <th className="border border-slate-600 ...">Content</th>
              <th className="border border-slate-600 ...">Creator</th>
              <th className="border border-slate-600 ...">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((post, index) => (
                <tr key={index}>
                  <td className="border border-slate-700 ...">{post.title}</td>
                  <td className="border border-slate-700 ...">
                    {post.content}
                  </td>
                  <td className="border border-slate-700 ...">
                    {post.creator}
                  </td>
                  <td className="flex justify-center">
                    <Link
                      to={`/posts/${post.id}`}
                      className="bg-green-500 rounded-xl px-10 py-1"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 rounded-xl px-10 py-1"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
