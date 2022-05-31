// CSS
import "./rightbar.css";
// IMPORT
import { Users } from "./../../../dummyData";
import Online from "./../online/online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import Share from './../share/share';
import Swal from 'sweetalert2'
import { useHistory } from "react-router";
import Post from './../post/post'


// FUNCTION
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const { userd } = useContext(AuthContext);
  const history = useHistory();
  const [followed, setFollowed] = useState(
    console.log(currentUser.seguidos.includes(user?._id) + "AQIO")
  );

  function getEdad(dateString) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        
        const friendList = await axios.get("https://social-app-adrian.herokuapp.com/api/users/friends/" + user._id);
        
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(()=>{
    const getPosts = async () =>{

      const res =  await axios.get("https://social-app-adrian.herokuapp.com/api/posts/all");

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
  }
    
  getPosts()
  },[])


  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`https://social-app-adrian.herokuapp.com/api/users/${user._id}/dejarseguir`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`https://social-app-adrian.herokuapp.com/api/users/${user._id}/seguir`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        console.log(followed)
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
  };

  const handleUnfollowUser = async () =>{
    
    console.log(followed)
    if (!followed) {
      try {
        await axios.put(`https://social-app-adrian.herokuapp.com/api/users/${user._id}/dejarseguir`, {
            userId: currentUser._id,
          });
          setFollowed(!followed)
          Swal.fire({
            title: 'Acabas de dejar de seguirle',
            text: 'Ya no podras ver sus publicaciones',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          history.push("/login")
        
      } catch (error) {
        console.log(error)
      }
      
    } else{
      Swal.fire({
        title: 'Aun no sigues a este usuario!',
        text: 'No puedes dejar de seguirle',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
    
    setFollowed(!followed)
    
  }

  const handleFollowUser = async () =>{
    console.log(followed)
    if(!followed){

      try {
        await axios.put(`https://social-app-adrian.herokuapp.com/api/users/${user._id}/seguir`, {
            userId: currentUser._id,
          });
          setFollowed(followed)
          Swal.fire({
            title: 'Acabas de seguir a este usuario!',
            text: 'Ahora puedes ver sus publicaciones',
            icon: 'success',
            confirmButtonText: 'OK'
          })

          history.push("/login")
          // history.push(`/profile/${user.nombreUsuario}`)
        
      } catch (error) {
        console.log(error)
      }
    } else {
      Swal.fire({
        title: 'Ya sigues a este usuario!',
        text: 'No puedes seguirle de nuevo',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

    setFollowed(!followed)
    
  }

  const initChat = async () =>{

    const reciverId = user._id;
    
    const senderId = userd._id

    var chatExists = false;
    
    const userParams = {
      senderId:senderId,
      receiverId :reciverId,
      
    };

    try {
      const res = await axios.get("https://social-app-adrian.herokuapp.com/api/chat/find/" + reciverId + "/" + senderId);
      console.log(res.data.members.length)
      if (res.data.members.length == 2) {
        
        chatExists = true;
      }
     
    } catch (error) {
      chatExists = false;
    }

    if (!chatExists) {
      
      try {
        await axios.post("https://social-app-adrian.herokuapp.com/api/chat", userParams);
        Swal.fire({
          title: 'Conversación iniciada!',
          text: 'Sera redirigido al chat',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        window.setTimeout(() => {
          history.push("/chat")
        }, 300);
        
      } catch (error) {
        console.log(error)
      }
    } else {
      Swal.fire({
        title: 'Ya tienes una conversación con este usuario!',
        text: 'Navega al apartado de chat para continuar la conversación',
        icon: 'info',
        confirmButtonText: 'OK'
      })
    }
  }
  
 
  // useEffect(() => {
  //   const friendId = conversation.members.find((m) => m !== currentUser._id);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios("http://localhost:8800/api/users?userId=" + friendId);
  //       setUser(res.data);
        
        
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);
  // console.log(getEdad(user.fechaNacimiento))
  const HomeRightbar = () => {
    return (
      <>
        <div className="lastsPosts">
          <div className="titleRecentPostContainer">
            <h2 className="titleRecentPost">
              Ultimas publicaciones
            </h2>
          </div>
          {posts.slice(0, 2 ).map((p) => (
          <Post key={p._id} post={p} />

          ))}
          {/* {posts.sort(0, 2 ).map((p) => (
          <Post key={p._id} post={p} />

          ))} */}
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <div className="newPostRightbar">

        <h2 className="rightbarTitle">Realizar nueva publicacíon</h2>
        </div>
        <ul className="rightbarFriendList">
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
          {/* {friends.map(friend => (
            <Link to={"/profile/" + friend.nombreUsuario}>
              <div className="rightbarFollowing">
              <img
                src={friend.imagenPerfil ? PF+friend.profilePicture : PF+"person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
                />
              <span className="rightbarFollowingName">{friend.nombreUsuario}</span>
            </div>
          </Link>
          ))} */}
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>

      {user.nombreUsuario !== currentUser.nombreUsuario && (
        <>
        {/* <button className="rightbarFollowButton" onClick={handleClick}>
        
        {followed ? "Dejar de seguir" : "Seguir" }
        {followed ? <Remove/> : <Add/> }
        
        </button> */}
        <div className="button-profile-container">

        <button className="rightbarFollowButton" onClick={handleFollowUser}>
          Seguir <Add/>
        </button>

        <button className="rightbarUnFollowButton" onClick={handleUnfollowUser}>
         Dejar de seguir <Remove/>
        </button>
        </div>
          <button className="initChatButton" onClick={initChat}>Inicar conversacion</button>
        </>
      )}
        
        <h4 className="rightbarTitle">Información sobre {user.nombreUsuario}</h4>
        <div className="rightbarInfo">
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Nombre completo</span>
            <span className="rightbarInfoValue">{user.nombreCompleto ? user.nombreCompleto : "Desconocido"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ciudad</span>
            <span className="rightbarInfoValue">{user.ciudad ? user.ciudad : "Desconocido"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Edad:</span>
            <span className="rightbarInfoValue">{user.fechaNacimiento ? getEdad(user.fechaNacimiento): "Desconocida"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Seguidores:</span>
            <span className="rightbarInfoValue">{user.seguidores ? user.seguidores.length : "Aun no tiene"}</span>
          </div>
          
        </div>
        <h4 className="rightbarTitle">Amigos</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={"/profile/" + friend.nombreUsuario}>
              <div className="rightbarFollowing">
              <img
                src={friend.imagenPerfil ? PF+friend.profilePicture : "https://res.cloudinary.com/dtmuzq8to/image/upload/v1653948899/upload_/noAvatar_qbv5yk.png"}
                alt=""
                className="rightbarFollowingImg"
                />
              <span className="rightbarFollowingName">{friend.nombreUsuario}</span>
            </div>
          </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
        
      <Share/>
      </div>
    </div>
  );
}
