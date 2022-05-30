
import "./userprofile.css";
import Topbar from "./../../components/user/topbar/topbar";
import Sidebar from "./../../components/user/sidebar/sidebar";
import Feed from "./../../components/user/Feed/feed";
import Rightbar from "./../../components/user/rightbar/rightbar";


import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router"
export default function Profile() {
  const [user, setUser] = useState({})
  const nombreUsuario = useParams().nombreUsuario;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
      const fetchUser = async () =>{
  
        const res = await axios.get(`https://social-app-adrian.herokuapp.com/api/users?nombreUsuario=${nombreUsuario}`) 

        setUser(res.data);
    }
      
    fetchUser()
    },[nombreUsuario])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.encabezado || PF+"/person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.imagenPerfil || PF+"/person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.nombreUsuario}</h4>
                <span className="profileInfoDesc">{user.biografia}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed nombreUsuario={nombreUsuario}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}