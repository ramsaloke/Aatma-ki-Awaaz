
import Home from "./components/Home";
import Layout from "./components/Layout";

import "./index.css";

 
import { Route , Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div>
     <ToastContainer theme="dark"/> {/* Toast notifications will appear here */}
    <Routes >
    
    <Route path="/"  element={ <Layout/>}>
    
    <Route index element={<Home></Home>} />
    
    <Route path="/login" element={<Login></Login>}/> 
    <Route path="/register" element={<Register></Register>}/> 
    <Route path="/create" element={<CreatePost></CreatePost>}/> 
    <Route path="/posts/:id" element={<PostPage></PostPage>}/>
    <Route path="/posts/:id/edit" element={<EditPost />}/>

   

    </Route>
 
  
 
    </Routes>
   
    </div>
  );
}

export default App;
