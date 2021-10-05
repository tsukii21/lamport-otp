import { Link } from "react-router-dom";

export default function Navbar({ loggedIn, logout }) {
  return (
    <div className="w-screen fixed top-0 left-0 bg-blue-100 flex justify-between p-5 font-bold">
      <span className="text-lg">App</span>{" "}
      {loggedIn ? (
        <button onClick={logout} className="underline text-blue-500 mr-3">
          Log out
        </button>
      ) : (
        <span>
          <Link to="/register" className="underline text-blue-500 mr-3">
            Register
          </Link>
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </span>
      )}
    </div>
  );
}
