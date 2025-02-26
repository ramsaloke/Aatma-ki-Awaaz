import { useEffect, useState } from "react";
// import Editor from "./Editor";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
  
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
  
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
  
      ["clean"], // remove formatting button
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

const EditPost = () => {
  const {id} = useParams();
   const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files , setFiles] = useState("");
    const [redirect , setRedirect] = useState(false);
    
   

useEffect(()=>{
  const editPost = async ()=>{
    try {
      const response = await fetch(`https://aatma-ki-awaaz.onrender.com/api/auth/posts/${id}`);
      if(!response.ok) {
        throw new Error(`failed to fetch post with id ${id}`)
      } 
      const data = await response.json();
      setTitle(data.title)
      setSummary(data.summary)
      setContent(data.content)

     

    } catch (error) {
      console.error("failed editing the post",error)
    }
  };
  editPost()
},[id])
    const titleHandler = (e) => {
      setTitle(e.target.value);
    };
  
    const summaryHandler = (e) => {
      setSummary(e.target.value);
    };
    const filesHandler = (e) => {
     setFiles(e.target.files);
    //  console.log("Selected file:", e.target.files[0]);
    };
    const contentHandler = (newValue) => {
      setContent(newValue); // Set the new content value directly
       // Log the new content value
    };

    
    const updatePost = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id', id);
    
      if (files?.[0]) {
        data.set('file', files?.[0]); // Ensure the file is being set correctly
        // console.log("File appended to FormData:", files[0]);
      }
    
      try {
        const response = await fetch(`http://localhost:8080/api/auth/posts/${id}`, {
          method: "PUT",
          credentials: "include", // Important for sending cookies
          body: data, // FormData is sent directly
        });
    
        if (response.ok) {
          toast.success("Post updated successfully!");
          setRedirect(true);
        } else {
          toast.error("Failed to update post. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Error updating post:", error);
      }
    };
    if(redirect) {
      return <Navigate to={`/`} />
    }


    return (
      <form onSubmit={updatePost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={titleHandler}
        />
  
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={summaryHandler}
        />
        <input type="file" 
        
        onChange={filesHandler}/>
<div>
      <ReactQuill
                  value={content}
                  onChange={contentHandler}
                  modules={modules}
                  formats={formats}
                ></ReactQuill>
                </div>
        <button style={{ marginTop: "5px" }} className="cursor-pointer">Update Post</button>
      </form>
    );
}

export default EditPost 
