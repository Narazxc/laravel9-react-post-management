import { useState, useEffect } from "react";
import axios from "axios";
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
  return (
    <>
      <div>
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
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Category
                  <a href="#"></a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Created at
                  <a href="#"></a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
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
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.id}
                  </th>
                  <td class="px-6 py-4">{category.name}</td>
                  <td class="px-6 py-4">
                    {formantDistanceToNow(new Date(category.created_at), {
                      addSuffix: true,
                    })}
                  </td>

                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
