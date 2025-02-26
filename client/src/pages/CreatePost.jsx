import { useState } from "react";

import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


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

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files , setFiles] = useState("");
  const [redirect , setRedirect] = useState(false);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const summaryHandler = (e) => {
    setSummary(e.target.value);
  };
  const filesHandler = (e) => {
   setFiles(e.target.files);
  };

  const contentHandler = (newValue) => {
    setContent(newValue); // Set the new content value directly
    console.log("edited content", newValue); // Log the new content value
  };

 
  const createPost = async (e) => {
    e.preventDefault(); 

    const data = new FormData();
    data.set('title',title);
    data.set('summary', summary);
    data.set('content',content);
    
    data.set('file', files[0]);
   if(files.length === 0) {
    toast.error("Please choose a file before creating a post."); 
    return
   }
 
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/posts", {
        method: "POST",
        credentials: "include",
        body: data, 
      });

      if (response.ok) {
        toast.success("Post created successfully!");
       setRedirect(true)
      } else {
        toast.error("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if(redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createPost}>
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
   <div> <ReactQuill
               value={content}
               onChange={contentHandler}
               modules={modules}
               formats={formats}
             ></ReactQuill></div>
      <button style={{ marginTop: "5px" }} className="cursor-pointer">Create Post</button>
    </form>
  );
};

export default CreatePost;
