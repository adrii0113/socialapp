// CSS
import "./share.css";
// IMPORTS
import { AuthContext } from "./../../../context/AuthContext";
import { useContext, useEffect, useState , useRef} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import { DateRangeTwoTone } from "@material-ui/icons";
import { MdOutlinePermMedia } from 'react-icons/md'


export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const history = useHistory();

  // images
    const [image, setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
      if(url){
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          img:url
        }
       axios.post("http://localhost:8800/api/posts/",newPost)
       .then(function (response) {
           console.log(response);
         })
         Swal.fire({
                  title: 'Publicación enviada!',
                  text: 'Has enviado tu publicación correctamente',
                  icon: 'success',
                  confirmButtonText: 'OK'
                })
                history.push("/login");
       
   }
   },[url])
 
  const postDetails = ()=>{

    if (document.querySelector("#inputfile").value == "" && !document.querySelector(".shareInput").value == "") {
      console.log("a")
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
        img:url
      }

     axios.post("http://localhost:8800/api/posts/",newPost)
     .then(function (response) {
      console.log(response);
    })

    Swal.fire({
      title: 'Publicación enviada!',
      text: 'Has enviado tu publicación correctamente',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    history.push("/login");
    }
    
    if(!document.querySelector(".shareInput").value == "" ){

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
        console.log(data)
         setUrl(data.url)
      })
      .catch(err=>{
          console.log(err)
          
            const newPost = {
              userId: user._id,
              desc: desc.current.value,
              img:url
            }
           axios.post("http://localhost:8800/api/posts/",newPost)
           .then(function (response) {
            console.log(response);
          })
          
      })
    } else {
      Swal.fire({
              title: 'Publicación vacia!',
              text: 'Tienes que escribir al menos un caracter',
              icon: 'error',
              confirmButtonText: 'OK'
            })
    }

   
  }


    

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const newPost = {
  //     userId: user._id,
  //     desc: desc.current.value,
  //     img:url
  //   }
  //   const data = new FormData()
  //   data.append("file",image)
  //   data.append("upload_preset", "upload_")
  //   data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME)
  //   fetch("https://api.cloudinary.com/v1_1/dtmuzq8to/image/upload",{
  //       method:"post",
  //       body:data
  //   })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log(data)
  //      setUrl(data.url)
  //   })
  //   .catch(err=>{
  //       console.log(err)
  //   })


  //   if(!document.querySelector(".shareInput").value == "" ){
  //     e.preventDefault();
      
  //     try {
  //       await axios.post("http://localhost:8800/api/posts", newPost);
        
  //       Swal.fire({
  //         title: 'Publicación enviada!',
  //         text: 'Has enviado tu publicación correctamente',
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       })
  //       history.push("/login");
  //       // document.querySelector('#shareInput').value = '';
        
  //     } catch (err) {console.log(err)}

  //   } else {
  //     Swal.fire({
  //       title: 'Publicación vacia!',
  //       text: 'Tienes que escribir al menos un caracter',
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     })
  //   }
  
  // }
  
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.imagenPerfil || PF+"/person/noAvatar.png"}
            alt=""
          />
          <input
            placeholder={"Buenos dias " + user.nombreUsuario + ""}
            className="shareInput"
            ref={desc}
            required
          />
        </div>
        <hr className="shareHr" />
       
        {/* <form className="shareBottom"> */}
          <div className="shareOptions">
            {/* <MdOutlinePermMedia htmlColor="tomato" className="shareIcon"/> */}
            <label htmlFor="file" className="shareOption">
              
            {/* <span className="shareOptionText">Photo or Video</span> */}
                
                
                <input type="file" id="inputfile" className="adjuntarImagen" onChange={(e)=>setImage(e.target.files[0]) }  />
              
            </label>
          <div className="btn #64b5f6 blue darken-1">
            </div>
            {/* <button onClick={()=>postDetails()}>
            prueba
            
            </button>
             */}
            <button className="shareButton"
            onClick={()=>postDetails()}
            
            >Publicar</button>
           
          </div>
          {/* <button className="shareButton" onClick={()=>postDetails()}>
            Publicar
          </button> */}


          {/* <button onClick={handleSubmitFile}>aa</button> */}
          
        {/* </form> */}

        
      </div>
    </div>
  );
}