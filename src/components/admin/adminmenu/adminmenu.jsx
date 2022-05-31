
import { Link } from "react-router-dom";
import './adminmenu.css'
import { HiOutlineUsers } from 'react-icons/hi'
import { FaRegListAlt } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io'
import { HiOutlineUserAdd } from 'react-icons/hi';
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai'

import { FiUsers } from 'react-icons/fi'
export default function Adminmenu(){


    return(
    <div class="sidebarAdminMenu">
        {/* <div class="sidebar-top">
            <span class="brand">Panel de administrador</span>
        </div> */}
        <div class="sidebar-center">
            <ul class="list">

                

                <Link to={'/admin/userlist'}  style={{ textDecoration: 'none', color:'white' }}>
                <li className="list-item">
                    <FiUsers className="sidebarIcon" />
                    {/* <FeedIcon></FeedIcon> */}
                    <span className="sidebarListItemText">Usuarios</span>
                </li>
                </Link>

                <Link to={'/admin/postlist'}  style={{ textDecoration: 'none', color:'white' }}>
                <li className="list-item">
                    <FaRegListAlt className="sidebarIcon" />
                    {/* <FeedIcon></FeedIcon> */}
                    <span className="sidebarListItemText">Publicaciones</span>
                </li>
                </Link>
               
                <Link to={'/admin/newuser'}  style={{ textDecoration: 'none', color:'white' }}>
                <li className="list-item">
                    <AiOutlineUserAdd className="sidebarIcon" />
                    {/* <FeedIcon></FeedIcon> */}
                    <span className="sidebarListItemText">Nuevo usuario</span>
                </li>
                </Link>
               
               
            </ul>
        </div>
        
    </div>
    
    )
}