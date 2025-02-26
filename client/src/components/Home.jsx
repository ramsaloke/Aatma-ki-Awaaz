
import { useEffect, useState } from "react"
import Post from "../components/Post.jsx"

const Home = () => {
const [posts , setPosts] = useState([])

useEffect(()=>{
  const fetchData = async()=>{
    try {
      const response = await fetch('https://aatma-ki-awaaz.onrender.com/api/auth/posts', {
         method: "GET",
  credentials: "include",
      })
    const data = await response.json();
    setPosts(data)
    } catch (error) {
      console.log("error occurs at rendering posts ", error)
    }
  }
  fetchData();
},[])
  return (
    <div>  <main>
    
    {posts.length > 0 && posts.map(post =>(
      <Post {...post}/>
    ))}
    
   </main></div>
  )
}

export default Home
