import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-red-500 ">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-16  my-auto">
        <h2 className="ml-4 text-xl font-bold text-gray-800">
          <Link to="/">Posthub</Link>
        </h2>
        <ul className="flex justify-evenly gap-8">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/categories">Manage Category</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
