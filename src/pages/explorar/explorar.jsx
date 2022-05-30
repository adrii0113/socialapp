// import './explorar.css'
// import Topbar from '../../components/user/topbar/topbar'
// // import { AuthContext } from "./../../../context/AuthContext";
// import { AuthContext } from './../../context/AuthContext'
// import axios from 'axios'
// import { useContext, useEffect, useState } from "react";
// import CloseFriend from '../../components/user/amigocercano/amigoCercano';
// export default function Explorar(){
//     const { user } = useContext(AuthContext);
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     const [users,setUsers] = useState([]);


//     useEffect(()=>{
//         const fetchUsers = async () =>{
    
//           const res =  await axios.get("http://localhost:8800/api/users/allusers");
//           // return res.data;
//           // console.log(res.data)
//           setUsers(res.data)
//       }
        
//         fetchUsers()
//       },[])

//       console.log(user)
//     return(
//         <div className="main-page-container">

//             <Topbar/>
//             <div className="main-container">
//             {users.slice(0, 7 ).map((p) => (
//             <CloseFriend key={p._id} user={p} />

//             ))}
//             {/* <div className="useritem">
//                 <div className="profile-img-user">

//                 </div> */}

//                 {/* <div className="profile-user-param">

//                 </div> */}
//                 {/* <div className="profile-user-param">
                    
//                 </div> */}
//                 {/* <div className="profile-user-param">
                    
//                 </div> */}
//             {/* </div> */}
//             </div>
//         </div>
//     )



// }\
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from "react-router"
import {useHistory} from 'react-router-dom'
const CretePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")


    useEffect(()=>{
       if(url){
        const newPost = {
            userId: "626a7c5cebb5b4903bc8eb23",
            desc: "gola",
            img:url
          }
        axios.post("http://localhost:8800/api/posts/",newPost)
        .then(function (response) {
            console.log(response);
          })
        
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset", "upload_")
       data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME)
       fetch("https://api.cloudinary.com/v1_1/dtmuzq8to/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }
 

   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >

        
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
           
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            
            >
                Submit post
            </button>

       </div>
   )
}

export default CretePost