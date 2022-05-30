import "./sidebar.css";
import {
  RssFeed,
  Chat,
  
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import CloseFriend from "./../amigocercano/amigoCercano";
import ProfileLeft from "../profileLeft/profileLeft";
import { Link } from "react-router-dom"
import axios from "axios";
import { MdOutlineFeed } from 'react-icons/md'
import { BsFillChatFill } from 'react-icons/bs'
import { AuthContext } from "./../../../context/AuthContext";
import { FaUserEdit } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineExplore, MdQueryStats} from 'react-icons/md'
export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    const fetchUsers = async () =>{

      const res =  await axios.get("http://localhost:8800/api/users/allusers");
      // return res.data;
      // console.log(res.data)
      setUsers(res.data)
  }
    
    fetchUsers()
  },[])
  // const getAllUsers = async () =>{
   
      
  
  //       const res =  await axios.get("http://localhost:8800/api/users/allusers");
        
       
  //       // setPosts(res.data)
  //       console.log(res.data)
    
  // }
  return (
    <div className="sidebar">
      {/* <button onClick={getAllUsers}>a</button> */}
      <div className="sidebarWrapper">
        <ProfileLeft/>
        <ul className="sidebarList">
        <Link to='/home' style={{ textDecoration: 'none' , color:'black'}}>
          <li className="sidebarListItem">
            <AiOutlineHome className="sidebarIcon" />
            {/* <FeedIcon></FeedIcon> */}
            <span className="sidebarListItemText">Inicio</span>
          </li>
          </Link>
          <Link to='/chat' style={{ textDecoration: 'none' , color:'black'}} >
          <li className="sidebarListItem">
            <AiOutlineMail className="sidebarIcon" />
            <span className="sidebarListItemText">Mensajes</span>
          </li>
      
          </Link>
          <Link to={`/edituser/${user.nombreUsuario}`} style={{ textDecoration: 'none' , color:'black'}} >
          <li className="sidebarListItem">
            <CgProfile className="sidebarIcon" />
            <span className="sidebarListItemText">Editar perfil</span>
          </li>
      
          </Link>

          <Link to={'/home'} >
          <li className="sidebarListItem">
            <MdOutlineExplore className="sidebarIcon" />
            <span className="sidebarListItemText">Explorar</span>
          </li>
      
          </Link>




          {/* <Link to={`/edituser/${user.nombreUsuario}`}>
          <li className="sidebarListItem">
              <FaUserEdit className="editUser"/>
            
            <span className="sidebarListItemText">Editar perfil</span>
          </li>
          </Link> */}

        </ul>
        
        {/* <hr className="sidebarHr" /> */}
        <ul className="sidebarFriendList">
          <h2 className="sidebarTitle">Quizas te pueda interesar</h2>
          {/* Users.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))} */}
          {users.slice(0, 7 ).map((p) => (
          <CloseFriend key={p._id} user={p} />

          ))}

          
        </ul>
      </div>
    </div>
  );
}