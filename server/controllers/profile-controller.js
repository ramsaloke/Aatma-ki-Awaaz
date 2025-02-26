import jwt from "jsonwebtoken";
import fs from 'fs'
import Post from "../models/Post-model.js";
const JWT_SECRET = process.env.JWT_SECRET
const profileUser = async (req, res) => {
    try {
        console.log("Cookies received in profileUser:", req.cookies);
        const { token } = req.cookies; 

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid or expired token" });
            }
            res.json({ success: true, user: decodedUser });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in profileUser controller, please check it" });
    }
};

const userPosts = async (req, res) => {
    try {
        console.log("Cookies received in backend:", req.cookies);
        
        console.log("Request body:", req.body); 
        console.log("Uploaded file:", req.file);  

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const { title, summary, content } = req.body;
        const newPath = req.file.path.replace("\\", "/"); // Fix Windows path issue

        // Extract user ID from JWT token
        const { token } = req.cookies; 
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid or expired token" });
            }

            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: decodedUser.id, // Assign the user ID as the author
            });

            res.json({ success: true, post: postDoc });
        });

    } catch (error) {
        console.error("Error in userPosts:", error);
        res.status(500).json({ success: false, message: "Failed to create post" });
    }
};


const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "userName email") // Fetch only `username` & `email` from User model
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Failed to fetch posts" });
    }
};

const getPagePosts = async (req,res)=>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id).populate("author", "userName");
        if(!post) {
            return res.status(404).json({message:"Post not found"})
        }
        res.status(200).json(post)
    } catch (error) {
        console.error("Error fetching post", error);
        res.status(500).json({message:"internal server error"})
        
    }
}


// const updatePost = async (req, res) => {
//     try {
//         let newPath = null;

//         // ✅ Handle file upload
//         if (req.file) {
//             const { originalname, path } = req.file;
//             const ext = originalname.split('.').pop(); // Get file extension correctly
//             newPath = `${path}.${ext}`; // Use dot (.) instead of _
//             fs.renameSync(path, newPath);
//         }

//         // ✅ Get token from cookies
//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
//         }

//         // ✅ Verify JWT
//         jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
//             if (err) {
//                 return res.status(403).json({ success: false, message: "Invalid or expired token" });
//             }

//             // ✅ Get post ID from params
//             const { id } = req.params;
//             if (!id) {
//                 return res.status(400).json({ success: false, message: "Post ID is required" });
//             }

//             // ✅ Find the post in MongoDB
//             const postDoc = await Post.findById(id);
//             if (!postDoc) {
//                 return res.status(404).json({ success: false, message: "Post not found" });
//             }

//             // ✅ Check if the logged-in user is the author
//             if (!postDoc.author.equals(info.id)) {
//                 return res.status(403).json({ success: false, message: "You are not the author" });
//             }

//             // ✅ Update post details
//             postDoc.title = req.body.title;
//             postDoc.summary = req.body.summary;
//             postDoc.content = req.body.content;
//             if (newPath) {
//                 postDoc.cover = newPath;
//             }

//             await postDoc.save();

//             res.json({ success: true, post: postDoc });
//         });

//     } catch (error) {
//         console.error("Error in updatePost:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// const updatePost = async (req, res) => {
//     try {
//       console.log("Request Body:", req.body); // Debug: Log the request body
//       console.log("Request File:", req.file); // Debug: Log the uploaded file
  
//       const { id } = req.params; // Get the post ID from the URL params
//       const { title, summary, content } = req.body; // Get fields from the request body
//       let newPath = null;
  
//       // Handle file upload
//       if (req.file) {
//         const { originalname, path } = req.file;
//         const ext = originalname.split('.').pop(); // Get the file extension
//         newPath = `${path}.${ext}`; // Rename the file with the correct extension
//         fs.renameSync(path, newPath); // Save the file with the new path
//       }
  
//       // Find the post in the database
//       const postDoc = await Post.findById(id);
//       if (!postDoc) {
//         return res.status(404).json({ success: false, message: "Post not found" });
//       }
  
//       // Update the post fields
//       postDoc.title = title;
//       postDoc.summary = summary;
//       postDoc.content = content;
  
//       // Update the cover image if a new file was uploaded
//       if (newPath) {
//         postDoc.cover = newPath;
//       }
  
//       // Save the updated post
//       await postDoc.save();
  
//       // Send a success response
//       res.json({ success: true, post: postDoc });
//     } catch (error) {
//       console.error("Error in updatePost:", error);
//       res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   };
const updatePost = async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debugging
      console.log("Request File:", req.file); // Debugging
  
      const { id } = req.params;
      const { title, summary, content } = req.body;
      let newPath = null;
  
      // Handle file upload
      if (req.file) {
        const { originalname, path } = req.file;
        const ext = originalname.split('.').pop();
        newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);
      }
  
      // Find the post in the database
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      // Update the post fields
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
  
      // Update the cover image if a new file was uploaded
      if (newPath) {
        postDoc.cover = newPath;
      }
  
      // Save the updated post
      await postDoc.save();
  
      // Send a success response
      res.json({ success: true, post: postDoc });
    } catch (error) {
      console.error("Error in updatePost:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


export default { profileUser, userPosts , getUserPosts , getPagePosts,updatePost };
