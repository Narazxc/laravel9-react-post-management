import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// date fns
import formantDistanceToNow from "date-fns/formatDistanceToNow";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setError(null);
      setIsLoading(true);

      axios.get("http://127.0.0.1:8000/categories").then((res) => {
        const { categories } = res.data;
        console.log(categories);
        setCategories(categories);
      });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  }, []);

  const handleDelete = (id) => {
    // delete on the server
    axios.delete(`http://127.0.0.1:8000/categories/${id}`).then((res) => {
      console.log(res);

      // delete on the frontend
      setCategories(categories.filter((c) => c.id !== id));
    });
  };
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-6xl text-red-200 font-bold">Categories</h2>
        {/* <table className="table-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                </tr>
              ))}
          </tbody>
        </table> */}

        <button
          type="button"
          class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
        >
          Create category
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Category
                  <a href="#"></a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Created at
                  <a href="#"></a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Action
                  <a href="#"></a>
                </div>
              </th>

              {/* <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.id}
                  </th>
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">
                    {formantDistanceToNow(new Date(category.created_at), {
                      addSuffix: true,
                    })}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => handleDelete(category.id)}
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
    </>
  );
}
