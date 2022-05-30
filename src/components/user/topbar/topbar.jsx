

// esto de abajo es temporal
import "./topbar.css";
import  Adminconfig  from "./../../admin/adminconfig/adminconfig";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useMediaQuery } from 'react-responsive'

import { FaUserEdit } from 'react-icons/fa';

import { RiAdminLine } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs' 
import { RiAdminFill, RiLogoutCircleRFill } from 'react-icons/ri'
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrUserAdmin } from 'react-icons/gr'
import { AiOutlineHome } from 'react-icons/ai'
import {RiUserSettingsLine} from 'react-icons/ri'
import { BsChatText } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
export default function Topbar() {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 

  useEffect(()=>{
    const searchUser = async () =>{
      const res = await axios.get("https://social-app-adrian.herokuapp.com/api/users/allusers");
      setData(res.data)


      // if(user.admin != true){document.querySelector(".adminButton").style.display="none"};
    }
    searchUser();
  },[]);
  const AdminButton = () =>{
    return(
      <div>
        <Link to={`/adminPanel`}  style={{ textDecoration: 'none' }}>

        {/* <button className="adminButton">
          Panel de administrador
        </button> */}
        <RiAdminLine className="admin-Button"/>
        </Link>
      </div>
    )
  
}

  const displayUserResult = () =>{
    document.querySelector(".userResult").style.display = "block"
  }

  const displayNoneUserResult = () =>{
    window.setTimeout(() => {
      
      document.querySelector(".userResult").style.display = "none"
    }, 200);
  }
  const logOut = () =>{

    Swal.fire({
      title: 'Seguro que quieres cerrar sesion?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Cerrar',
      denyButtonText: `No cerrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cerrado sesion correctamente!', '', 'success')
        window.location.reload();
        <Link to={"/login"}></Link>
        user = null;
        
        // history.push("/login");
      } else if (result.isDenied) {
        Swal.fire('No ha cerrado sesión', '', 'info')
      }
      
    })
  }

  const displayResponsiveMenu = () =>{
    
    // document.querySelector(".topbarContainer").classList.toggle("topbarResponsive");
    // document.querySelector(".responsive-menu").style.display = "block"
    var btnResponsive = document.querySelector(".responsiveIcon")
    var topbarRight = document.querySelector(".topbarRight");
  
    btnResponsive.addEventListener('click', function () {
      topbarRight.classList.toggle('active');
    })
  }

 

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/home' style={{ textDecoration: 'none' }}>
        <span className="logo">Social App</span>
        </Link>
        {/* <div className="searchbar">
          <Search className="searchIcon" />
          <input
          placeholder="Buscar usuarios"
          className="searchInput"
          />
        </div> */}
        {/* <input
          placeholder="Search for friend, post or video"
          className="searchInput"
          onChange={event => {setSearchTerm(event.target.value)}}
        /> */}
        
      </div>
      <div className="topbarCenter">
         <div className="search">
          <div className="searchbar">
              <input
              placeholder="Buscar usuarios"
              className="searchInput"
              onChange={event => {setSearchTerm(event.target.value)}}
              // onClick={displayUserResult}
              onFocus={displayUserResult}
              onBlur={displayNoneUserResult}
              
            />
          </div> 
         
          <div className="userResult">
          {data.filter((val)=>{
              if (searchTerm == ""){
                return ""
              } else if(val.nombreUsuario.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                return val
              }
            }).map((val,key)=>{
              return (
              <div className="user" key={key}> 
                <Link to={`/profile/${val.nombreUsuario}`} style={{ textDecoration: 'none' , color:'black'}}>
                <p>
                <BsSearch className="lupa"/>
                {val.nombreUsuario} 

                </p>
                </Link>
              </div>
              )
            })}
        </div>
         

         </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
         <Link to={`/profile/${user.nombreUsuario}`}  style={{ textDecoration: 'none', color: 'white'}}>
         <span className="textIconButton">Perfil</span>
          <img
            src={user.imagenPerfil || "https://res.cloudinary.com/dtmuzq8to/image/upload/v1653948899/upload_/noAvatar_qbv5yk.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="topbarIcons">
          <div className="menuItem">
            <Link to={"/home"}  style={{ textDecoration: 'none', color: 'white'}}>
              <span className="textIconButton">Inicio</span>
              <AiOutlineHome className="homeIcon"/>
            </Link>
          </div>
          <div className="menuItem">
            <Link to={`/edituser/${user.nombreUsuario}`}  style={{ textDecoration: 'none', color: 'white'}}>
              <span className="textIconButton">Editar usuario</span>
              <RiUserSettingsLine className="editUser"/>
            </Link>
          </div>
          <div className="menuItem">
            {user.admin == true ? <span className="textIconButton">Panel administrador</span> : ""}
          
            {user.admin == true ? <AdminButton/> : ""}
          </div>

          <div className="menuItem">
            <Link to={"/chat"}  style={{ textDecoration: 'none', color: 'white'}} activeStyle={{ color: 'red' }}>
              <span className="textIconButton">Mensajes</span>
              <BsChatText className="chatIcon"/>
            </Link>
          </div>

          <div className="menuItem">

            <Link to={"/login"}  style={{ textDecoration: 'none', color: 'white'}}>
              <span className="textIconButton">Cerrar sesión</span>
              <AiOutlineLogout className="exitIcon" onClick={logOut}/>
            </Link>
          </div>
          {/* <div className="topbarIconItem">
            <Link to={'/chat'}  style={{ textDecoration: 'none', color: 'white' }}>
              <Chat className="chatIcon"/>
            </Link>
          </div> */}
          
        </div>
        
       
        
      </div>
     
      {/* <Example/> */}
      <div className="responsiveMenu">
      <GiHamburgerMenu className="responsiveIcon" onClick={displayResponsiveMenu}/>
      {/* <GiHamburgerMenu className="responsiveIcon"/> */}
      </div>
      {/* <ResponsiveMenu/> */}
    <div>
      
      <ul className="responsive-menu">
        <li>a</li>
      </ul>

    </div>
    </div>
  );
}