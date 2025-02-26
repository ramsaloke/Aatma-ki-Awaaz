import { useState } from "react"
import { toast } from "react-toastify";

const Register = () => {

  const [userName , setUserName] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('')

const userHandler = (e) =>{ 
 let inputValue = e.target.value.trim();

 if(inputValue.includes(" ")){
    setError("username should not contain spaces in between")
 } else {
  setError("");
  setUserName(inputValue)
 }
}

const passwordHandler = (e)=>{
setPassword(e.target.value)
}

const register = async (e) => {
 e.preventDefault();

 try {
  const response = await fetch("https://aatma-ki-awaaz.onrender.com/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (response.status === 201) {
    toast.success("Registration successful!");
  } else {
    toast.error(data.message || "Registration failed");
  }
} catch (error) {
  console.error("Error:", error);
  toast.error("Something went wrong. Please try again.");
}
}
  return (
    <div className="flex items-center justify-center ">
       
    <div className="w-full max-w-[450px] p-8  bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-3">Register Karo Yaar</h1>
      <form onSubmit={register} action="" className="space-y-4">
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input 
          value={userName}
          onChange={userHandler}
            type="text" 
            id="username" 
            name="username" 
            className="w-full px-4 py-2 mt-1 border border-none rounded-lg shadow-sm pointer-cursor  " 
            placeholder="Enter your username" 
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
            className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm   " 
            placeholder="Enter your password" 
            required
          />
        </div>
        {/* Submit Button */}
        <button 
          type="submit" 
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer "
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
  )
}

export default Register
