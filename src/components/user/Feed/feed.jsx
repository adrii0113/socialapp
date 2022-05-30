import Post from "./../post/post";
import Share from "./../share/share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../../context/AuthContext";
import axios from "axios";


export default function Feed({nombreUsuario}) {
  const [posts,setPosts] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(()=>{
    const fetchPosts = async () =>{

      const res = nombreUsuario 
      ? await axios.get("http://localhost:8800/api/posts/profile/" + nombreUsuario) 
      :await axios.get("http://localhost:8800/api/posts/timeline/" + user._id)
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
  }
    
    fetchPosts()
  },[nombreUsuario])

  return (
    <div className="feed">
     <div className="feedWrapper">
        {(!nombreUsuario || nombreUsuario === user.nombreUsuario) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}