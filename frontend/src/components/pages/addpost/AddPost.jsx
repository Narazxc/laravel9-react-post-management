import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AddPost.css";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [previewPicture, setPreviewPicture] = useState(null);

  const navigate = useNavigate();

  const clearForm = () => {
    setTitle("");
    setContent("");
    setCreator();
  };

  useEffect(() => {
    try {
      setError(null);
      setIsLoading(true);

      axios.get("http://127.0.0.1:8000/categories").then((res) => {
        const { categories } = res.data;
        // set default selection for category
        setSelectedCategory(categories[0].id);
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
  console.log("selected", selectedCategory);

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onChangePicture = (e) => {
    // display preview picture
    setPreviewPicture(URL.createObjectURL(e.target.files[0]));

    setCreator(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", creator);
    formData.append("category", selectedCategory);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/posts",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        clearForm();
        if (response.data.msg == "upload success") {
          navigate("/posts");
        }
      })
      .catch(function (error) {
        //handle error
        console.log(error);
        clearForm();
      });

    // const titlew = formData.get("title");
    // const con = formData.get("content");
    // const cat = formData.get("category");

    // console.log(titlew, con, cat);

    // axios
    //   .post("http://127.0.0.1:8000/posts", formData)
    //   .then(function (response) {
    //     console.log(response);
    //     // clearForm();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     // clearForm();
    //   });

    // console.log(formData);

    // console.log(title, content, creator);
  };

  return (
    <>
      <div>
        <h2 className="text-6xl text-red-200 font-bold">Add Post</h2>
      </div>
      <div className="container py-10 w-full flex justify-center">
        <div className=" w-full md:w-3/5 bg-white rounded-lg shadow-lg">
          <form
            id="form"
            className="m-6"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <input
                  name="content"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Creator
              </label>
              <div className="mt-2">
                <input
                  name="file"
                  type="text"
                  onChange={(e) => setCreator(e.target.value)}
                  value={creator}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div> */}
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  onChange={handleSelect}
                  name="category"
                  value={selectedCategory}
                >
                  {categories &&
                    categories.map((category) => (
                      <Fragment key={category.id}>
                        <option value={category.id}>{category.name}</option>
                      </Fragment>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file"
                        onChange={onChangePicture}
                        // value={creator}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <img className="" src={previewPicture && previewPicture} />
            <span className="ml-3 hidden sm:block">
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Submit
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
