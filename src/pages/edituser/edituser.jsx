import './edituser.css'
import Topbar from './../../components/user/topbar/topbar';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router"
import { useRef } from "react";
import Swal from 'sweetalert2'
import { useHistory } from "react-router";
import Sidebar from './../../components/user/sidebar/sidebar'
import Rightbar from './../../components/user/rightbar/rightbar'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useForkRef } from '@material-ui/core';

export default function Edituser(){
    const [user, setUser] = useState({})
    const history = useHistory();
    const nombreUsuario = useParams().nombreUsuario;
    const username = useRef();
    const nombreCompleto = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const ciudad = useRef();
    const biografia = useRef();
    const userId = user._id;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;



    const [url,setUrl] = useState("")
    const [image, setImage] = useState("")
    
    useEffect(()=>{
      if(url){
        const userDefined = {
            userId:userId,
            // nombreUsuario :username.current.value,
            // nombreCompleto: username.current.value,
            // biografia: biografia.current.value,
            // ciudad: ciudad.current.value,
            imagenPerfil:url
        }
         axios.put("https://social-app-adrian.herokuapp.com/api/users/" + user._id, userDefined)
       .then(function (response) {
           console.log(response);
         })
         Swal.fire({
                  title: 'Imagen actualizada!',
                  text: 'Has enviado tu publicación correctamente',
                  icon: 'success',
                  confirmButtonText: 'OK'
                })
                window.setTimeout(() => {

                  window.location.reload();
                }, 100);

       
   }
   },[url])

   const deleteAcount =  () =>{
    Swal.fire({
      title: 'Seguro que quieres eliminar tu cuenta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire('Cuenta eliminada!', '', 'success')
        try {
          axios.delete(`https://social-app-adrian.herokuapp.com/api/posts/deleteposts/${user._id}`);
          axios.delete(`https://social-app-adrian.herokuapp.com/api/users/${user._id}`
           
          );
          window.setTimeout(() => {

            window.location.reload();
          }, 100);
          // history.push("/home");
        } catch (error) {
          console.log(error)
        }
        
      } else if (result.isDenied) {
        Swal.fire('La cuenta no ha sido eliminada', '', 'info')
      }
      history.push("/login");
      window.setTimeout(() => {
        history.push("/login");
      }, 100);
    })
   
  
   }

    const postDetails = (e)=>{
      e.preventDefault()
        const userDefined = {
          userId:userId,
          nombreUsuario :username.current.value,
          nombreCompleto: username.current.value,
          biografia: biografia.current.value,
          ciudad: ciudad.current.value,
          // imagenPerfil:url
      }
      try {
        axios.put("https://social-app-adrian.herokuapp.com/api/users/" + user._id, userDefined)
      .then(function (response) {
          console.log(response);
        })
        Swal.fire({
                 title: 'Cuenta actualizada!',
                 text: 'Los datos de la cuenta han sido actualizados',
                 icon: 'success',
                 confirmButtonText: 'OK'
               })
              window.setTimeout(() => {
                history.push("/login");
                window.location.reload()
              }, 150);
        
      } catch (error) {
        console.error(error)
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar los datos de la cuenta',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
      //   const data = new FormData()
      // data.append("file",image)
      // data.append("upload_preset", "upload_")
      // data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME)

      // fetch("https://api.cloudinary.com/v1_1/dtmuzq8to/image/upload",{
      //   method:"post",
      //   body:data
      // })
      // .then(res=>res.json())
      //  .then(data=>{
      //   console.log(data)
      //   setUrl(data.url)
        
         
      //  })
      //  .catch(err=>{
      //      console.log(err)
      //  })
      
      // const data = new FormData()
      // data.append("file",image)
      // data.append("upload_preset", "upload_")
      // data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME)

      // fetch("https://api.cloudinary.com/v1_1/dtmuzq8to/image/upload",{
      //   method:"post",
      //   body:data
      // })
      // .then(res=>res.json())
      //  .then(data=>{
      //   console.log(data)
      //   setUrl(data.url)
        
         
      //  })
      //  .catch(err=>{
      //      console.log(err)
      //  })

    }

    const editImageProfile = () =>{

      // if (!document.querySelector("#fileButton").value == "") {
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
       })
       const userDefined = {
        userId:userId,
        imagenPerfil:url
      }
      console.log(url)
      try {
        axios.put("https://social-app-adrian.herokuapp.com/api/users/" + user._id, userDefined)
      .then(function (response) {
          console.log(response);
        })
        // Swal.fire({
        //          title: 'Imagen de perfil actulizada!',
        //          text: 'Los datos de la cuenta han sido actualizados',
        //          icon: 'success',
        //          confirmButtonText: 'OK'
        //        })
              //  window.setTimeout(() => {
              //   history.push("/login");
              //   window.location.reload()
              // }, 300);
        
      } catch (error) {
        console.error(error)
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar los datos de la cuenta',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
      // } else {
      //   Swal.fire({
      //     title: 'Error!',
      //     text: 'No se ha seleccionado ninguna imagen',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   })
      // }
      

    }

    // recolectar el usuario actual
    useEffect(()=>{
        const fetchUser = async () =>{
    
          const res = await axios.get(`https://social-app-adrian.herokuapp.com/api/users?nombreUsuario=${nombreUsuario}`) 
          setUser(res.data);
      }
        
      fetchUser()
      },[nombreUsuario])


      // const handleClick = async (e) => {
      //   e.preventDefault();
        
      //   // if (passwordAgain.current.value !== password.current.value) {
      //   //   passwordAgain.current.setCustomValidity("Las contrasenas no coinciden!");
      //   // } else {
      //     const userDefined = {
      //       userId:userId,
      //       nombreUsuario :username.current.value,
      //       nombreCompleto: username.current.value,
      //       biografia: biografia.current.value,
      //       ciudad: ciudad.current.value,
      //       imagenPerfil:url
      //       // password: password.current.value,
      //     };
         
      //     try {
            
      //       await axios.put("http://localhost:8800/api/users/" + user._id, userDefined)

      //       Swal.fire({
      //         title: 'Cuenta actualizada!',
      //         text: 'Cuenta actualizada correctamente',
      //         icon: 'success',
      //         confirmButtonText: 'OK'
      //       })
      //       window.setTimeout(() => {
      //         history.push("/login");
      //         window.location.reload();
      //       }, 300);



    
      //     } catch (err) {
      //       // console.log(err);
      //       // Swal.fire({
      //       //   title: 'Error!',
      //       //   text: 'Error',
      //       //   icon: 'error',
      //       //   confirmButtonText: 'OK'
      //       // })
      //       // document.querySelector(".loginBox").reset();
      //   //   }
      //   }
      // };

      const EditUserForm = () =>{

        return(

        
        <div class="container">

            <form className='form' onSubmit={postDetails}>
              {/* <div className="form"> */}
              <div className="editTtileForm">
                <h2>Editar perfil de: {user.nombreCompleto}</h2>
              </div>
                <div className="img-perfil">
                    <img
                      className="imgprofile"
                      src={user.imagenPerfil || "https://res.cloudinary.com/dtmuzq8to/image/upload/v1653948899/upload_/noAvatar_qbv5yk.png"}
                      alt=""
                      
                    />
                </div>
                <div className="form-item">

                  <label for="first-name">Nombre de usuario</label>
                  <input
                    
                    maxLength={16}
                    // pattern="/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/"
                    required
                    ref={username}
                    className="editInput"
                    // value={user.nombreUsuario}
                    placeholder={user.nombreUsuario}
                    />
                </div>

                <div className="form-item">
                <label for="last-name">Nombre completo</label>
                          <input
                                      placeholder={user.nombreCompleto}
                                      // value={user.nombreCompleto}
                                      maxLength={64}
                                      // pattern="/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/"
                                      required
                                      ref={nombreCompleto}
                                      className="editInput"
                                      
                                    />
                </div>
                        
                         
                  <div className="form-item">
                  <label for="email">Ciudad</label>
                          <input
                                      placeholder={user.ciudad}
                                      required
                                      ref={ciudad}
                                      className="editInput"
                                      // value={user.ciudad}
                                      />
                  </div>  




                  <div className="form-item">
                  <label for="phone">Biografia</label>
                          <input
                                      placeholder={user.biografia}
                                      required
                                      ref={biografia}
                                      className="editInput"
                                      // value={user.biografia}
                                      />
                  </div> 




                  <div className="form-item">
                  <label for="phone">Password</label>
                        <input
                                      placeholder="Password"
                                      required
                                      // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
                                      ref={password}
                                      className="editInput"
                                      type="password"
                                    />
                  </div> 




                  <div className="form-item">
                  <label for="phone">Repetir password</label>
                        <input
                                      placeholder="Password Again"
                                      required
                                      // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
                                      ref={passwordAgain}
                                      className="editInput"
                                      type="password"
                                    />

                  </div>    

                  <div className="form-item">
                  <label for="phone">Repetir password</label>
                        <input
                                      placeholder="Password Again"
                                      required
                                      // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
                                      ref={passwordAgain}
                                      className="editInput"
                                      type="password"
                                    />

                  </div> 

                  {/* <div className="form-item">
                  <label for="phone">Estado civil</label>
                  <input type="radio" id="huey" name="drone" value="huey"></input>
                  <label for="huey">Huey</label>\
                  <input type="radio" id="huey" name="drone" value="huey"></input>
                  <label for="huey">Huey</label>

                  </div>  */}


                  <div className="select-image">
                
               
                  <input type="file" id='fileButton' className='setImage' onChange={(e)=>setImage(e.target.files[0])} />
                  
                  </div>  
                          

        <div className="submit-button">
        {/* <button className="editButton" type="submit" onClick={handleClick}>
        Actualizar datos
        </button> */}

        {/* <button className="editButton" type="submit" onClick={()=>postDetails()}>
        Actualizar 
        </button>
         */}
         <button className="shareButton"
            onClick={()=>postDetails()}
            
            >Publicar</button>
              </div>   
              <div className="deleteAccount">
                <button onClick={deleteAcount} className="deleteButtonAccount">
                  Eliminar tu cuenta
                </button>
              </div>
              <div className="editProfileImage">
                <button onClick={editImageProfile} className='editImageButton'>
                  Editar imagen de perfil
                </button>
              </div>
            </form>
            {/* </div> */}
        </div>
            )
      }
      
    return(
        <>
            <Topbar/>
            <div className="container-main">
                <Sidebar/>
                <EditUserForm/>
                <Rightbar/>
            </div>
                
        </>

    
        


    )
}