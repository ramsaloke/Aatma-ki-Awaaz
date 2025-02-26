import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Header = () => {
  const { user, fetchUser } = useContext(AuthContext);
  console.log(user);
  

  return (
    <header>
      <Link to="/" className="logo">
        Aatma Ki Awaaz
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/create">Create Post</Link>
            <Link to="/"
              onClick={async () => {
                await fetch("https://aatma-ki-awaaz.onrender.com/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });
                fetchUser(); // ✅ Update state after logout
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
