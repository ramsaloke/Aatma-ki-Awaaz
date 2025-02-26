import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";


const Login = () => {
  const [userName , setUserName] = useState('');
  const [password , setPassword] = useState('');
  const [redirect , setRedirect] = useState(false);
  const { fetchUser } = useContext(AuthContext);



  const userHandler = (e)=>{
    setUserName(e.target.value);
  }

  const passwordHandler = (e)=>{
    setPassword(e.target.value)
  }

  const login = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ REQUIRED for cookies to be set
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Login response:", data);
        await fetchUser();
        toast.success("Login successful!"); 
        setRedirect(true);
      } else {
        toast.error(data.message || "Wrong credentials");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong. Please check your network connection.");
    }
  };
  

  if(redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="flex items-center justify-center  mb-6">
       
    <div className="w-full max-w-[450px] p-8  bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-3">Login Karo Yaar</h1>
      <form onSubmit={login} className="space-y-4">
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input 
          value={userName}
          onChange={userHandler}
            type="text" 
            id="username" 
            name="username" 
            className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm   border-gray-300" 
            placeholder="Enter your username" 
            required
          />
        </div>
        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
          value={password}
          onChange={passwordHandler}
            type="password" 
            id="password" 
            name="password" 
            className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm  border-gray-300" 
            placeholder="Enter your password" 
            required
          />
        </div>
        {/* Submit Button */}
        <button 
          type="submit" 
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700  "
        >
          Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login