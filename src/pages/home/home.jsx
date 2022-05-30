// COMPONENT IMPORTS

import Topbar from './../../components/user/topbar/topbar'
import Feed from './../../components/user/Feed/feed';
import Rightbar from './../../components/user/rightbar/rightbar'
import { useHistory } from "react-router";
import axios from  "axios";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import Sidebar from '../../components/user/sidebar/sidebar';

// CSS
import './home.css'

export default function Home(){
    const history = useHistory();
    const [user, setUser] = useState({})
    const nombreUsuario = useParams().nombreUsuario;
    useEffect(()=>{
        const fetchUser = async () =>{
    
          const res = await axios.get(`https://social-app-adrian.herokuapp.com/api/users?nombreUsuario=${nombreUsuario}`) 
          setUser(res.data);
      }
        
      fetchUser()
      },[nombreUsuario])

    return(
        
        <div className="main-container">
            <Topbar/>
                <main>
                    <Sidebar/>
                    <Feed/>
                    <Rightbar/>
                </main>
        </div>

    )

}