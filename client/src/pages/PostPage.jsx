import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {user} = useContext(AuthContext)
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/posts/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch post with id: ${id}`);
                }
                const data = await response.json();
                setPostInfo(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [id]);

    if (!postInfo) return <div>Loading...</div>;

    return (
        <div className="post-page">
            <div className="image">
            <h1 className="text-2xl text-black-400 text-left font-bold mb-[2px]">{postInfo.title}</h1>
             
            <div className="author mb-[4px]">
    by <span className="font-semibold text-lg">{postInfo.author.userName || "Unknown Author"}</span>
    <time className="text-sm ml-2">{format(new Date(postInfo.createdAt), "MMM dd yyyy hh:mm a")}</time>
    
    {user && user.id === postInfo.author._id && (
       <Link className="ml-2 font-medium  text-blue-600 hover:text-blue-700 underline" to={`/posts/${postInfo._id}/edit`}>Edit this post</Link>
    )}
</div>

            <img src={`http://localhost:8080/${postInfo.cover}`} alt="" />
            </div>
           
          
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
};

export default PostPage;
