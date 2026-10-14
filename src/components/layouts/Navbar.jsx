import { Library } from 'lucide-react';
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="w-full max-w-3xl border border-gray-100 rounded-lg my-4 py-2 mx-auto">
      <ul className="flex items-center justify-center gap-4 text-gray-600">
        <li>
          <NavLink to="">Books</NavLink>
        </li>
        <li>
          <NavLink to="">Categories</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className="flex items-center text-2xl text-black font-medium"
          >
            <Library />
            Elib
          </NavLink>
        </li>
        <li>
          <NavLink to="">How to Book</NavLink>
        </li>
        <li>
          <NavLink to="/login">Sign in</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
