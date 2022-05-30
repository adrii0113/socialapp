import './home.css'
import Adminmenu from './../../../components/admin/adminmenu/adminmenu'
import axios from 'axios'
import Topbar from './../../../components/user/topbar/topbar'
import { useEffect, useState, useContext } from "react";
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import { Line as Chart } from 'react-chartjs-2'
import LineChart from "./LineChart";
import { UserData } from "./Data";
import Post  from './../../../components/user/post/post'
// import {default} from './barchart' 
export default function Home(){

    
    const [postLastMonth, setPostLastMonth] = useState();
    const [posts,setPosts] = useState([])
   
    
 
   
    const loginLastMonth = async ()=>{
        try {
            const res = await axios.get('https://social-app-adrian.herokuapp.com/api/posts/all');
            setPosts(

                res.data.slice(5).sort((p1, p2) => {
                    return (p2.likes.length) - (p1.likes.length);
                  })

            )
            setPosts(res.data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
 
        loginLastMonth();
        
    
      },[postLastMonth])
    
    return(
        
        
        // <Topbar/>
        // <div className="home-main-container">
        // {/* <BarChart/> */}
        // <Adminmenu/>
        //     <div className="stats-container">
        //     <div className="login-last-month">

        //     </div>

        //     <div className="accounts-register-last-month">

        //     </div>

        //     <div className="posts-most-liked">

        //     </div>

        //     <div className="user-more-posts">

        //     </div>
        //     </div>

            
        // </div>

        <div className="main-container">
           
        
            <Topbar/>
            <div className='admin-main'>
            <Adminmenu/>
            <div className="stats-container">
                <div className="login-last-month">
               
                </div>

                <div className="accounts-register-last-month">
                    <div className="title-accounts-register-last-month">
                        
                        
                            {/* {posts.map((p) => (
                            <Post key={p._id} post={p} />
                            ))} */}
                    </div>
                </div>
            </div>
          

            </div>
           
            
        </div>

    )
}