import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
const { user, logout } = useContext(AuthContext);
console.log(user);
const handleLogout = () => {
  logout();
  toast.success("Logged out successfully");
}





  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 flex items-center justify-start gap-2">
        <Link to="/" className="btn btn-ghost text-3xl">Brgr</Link>
        {user? <p className="text-xl">Welcome <span className="font-bold">{user.username}</span> !! </p> : <p></p>  }
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>

          </li>
          {user ? <Link to="/edit-menu"> <button className="btn"> Edit Menu</button> </Link> : <></>}
          {user ? <button className="btn" onClick={handleLogout}> LogOut</button> : <Link to="/sign-up"> <button className="btn">Login/Signup</button> </Link>}

        </ul>
      </div>
    </div>
  );
}

export default Navbar;
