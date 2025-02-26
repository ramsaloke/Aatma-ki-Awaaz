import mb from "../assets/mb.jpg";
import { Link } from "react-router-dom";
import {format} from 'date-fns'
// eslint-disable-next-line react/prop-types
const Post = ({_id, title , summary, cover , content , createdAt,author}) => {
  return (
   <div> <main>
         <div className="post">
          <div className="image">
        <Link to={`/posts/${_id}`}>  <img src={`https://aatma-ki-awaaz.onrender.com/${cover}`} alt="Cover" /></Link>
        
          </div>

          <div className="text">
            <Link to={`/posts/${_id}`}><h2 className="title">{title} </h2></Link>
            
            <p className="info">
              <a className="author"> {author?.userName || "unknown author"} </a>
              <time >{format(new Date(createdAt), "MMM dd yyyy hh:mm a")}</time>
            </p>
            <p className="paragraph">
          {summary}
             
            </p>
          </div>
        </div>
        </main>
    </div>
   
  )
}

export default Post
