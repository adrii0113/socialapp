// CSS
import "./post.css";
// IMPORTS
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import {format} from "timeago.js";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { BiLike} from "react-icons/bi";
import { AuthContext } from "./../../../context/AuthContext";
import { useHistory } from "react-router";
import { RiChatDeleteFill } from 'react-icons/ri';




// FUNCTION
export default function Post({ post }) {
  const [imageIds, setImageIds] = useState();
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const history = useHistory();


  const loadImages = async () => {
    try {
        const res = await fetch('https://social-app-adrian.herokuapp.com/api/images');
        const data = await res.json();
        // console.log(data)
        setImageIds(data);
    } catch (err) {
        console.error(err);
    }
};

// useEffect(() => {
//   loadImages();
// }, []);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));

  }, [currentUser._id, post.likes]);

  useEffect(()=>{
 

    const fetchUser = async () => {

      const res = await axios.get(`https://social-app-adrian.herokuapp.com/api/users?userId=${post.userId}`)
      setUser(res.data);
    } 

    fetchUser()

  },[post.userId])

  const likeHandler =()=>{
    try {
      axios.put("https://social-app-adrian.herokuapp.com/api/posts/" +  post._id + "/like", {userId: currentUser._id});

    } catch (err) {console.log(err)}


    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }


  const deletePost = () =>{
    try {
      Swal.fire({
        title: 'Seguro que quieres eliminar el post?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `No eliminar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Eliminado!', '', 'success')
          axios.delete("https://social-app-adrian.herokuapp.com/api/posts/"+ post._id)
          // history.push("/login");
        } else if (result.isDenied) {
          Swal.fire('El post no ha sido eliminado', '', 'info')
        }
        history.push("/login");
        window.setTimeout(() => {
          history.push("/login");
        }, 100);
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.nombreUsuario}`}>
            <img
              className="postProfileImg"
              src={user.imagenPerfil || PF+"/person/noAvatar.png"}
              alt=""
            />
            </Link>
            <span className="postUsername">
              {user.nombreUsuario}
            </span>
            <span className="postUsernameSign">
              {'@' +user.nombreUsuario + ''}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">

              {user.nombreUsuario === currentUser.nombreUsuario && (
                <>
                 {/* <button onClick={deletePost}>Eliminar</button> */}
                 <RiChatDeleteFill className="deletePostIcon" onClick={deletePost}/>
                 
                </>
              )}
            
            
          </div>
        </div>
        <div className="postCenter">
          <p className="postText">{post?.desc}</p>
          {post.img ?  <img className="postImg" src={post.img} alt="" /> : ""}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            
            <div className="interactOptions">

              <div className="interactOption">
            
              <BiLike onClick={likeHandler}>
              </BiLike>
              <span>{like}</span>
              </div>
              <div className="interactOption">

              </div>
            </div>

          </div>
          
        </div>
      </div>
      <div className="gallery">
                {/* {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))} */}
            </div>
    </div>
  );
}