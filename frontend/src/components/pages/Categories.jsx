import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2 className="text-6xl text-red-200 font-bold">Categories</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
