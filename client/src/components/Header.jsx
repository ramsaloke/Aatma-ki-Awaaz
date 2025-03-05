import { Link , Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";


const Header = () => {
  const { user, fetchUser , setUser} = useContext(AuthContext);
  console.log(user);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://aatma-ki-awaaz.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null); // ✅ Immediately reset user
        Navigate("/"); // ✅ Redirect to home
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  

  return (
    <header>
      <Link to="/" className="logo">
        Aatma Ki Awaaz
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/create">Create Post</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
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
