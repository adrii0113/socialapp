

import Topbar from "./../../../components/user/topbar/topbar";
import Adminmenu from "../../../components/admin/adminmenu/adminmenu";
import AdminSidebar from "../../../components/admin/adminsidebar/adminsidebar";
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import './newuser.css'
import { useHistory } from "react-router";
export default function Newuser(){
   


    const [user, setUser] = useState({})
    const history = useHistory();
    // const nombreUsuario = useParams().nombreUsuario;
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
    


    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
          passwordAgain.current.setCustomValidity("Las contrasenas no coinciden!");
          Swal.fire({
            title: 'Error al crear!',
            text: 'Las contrasenas no coinciden',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          const user = {
            nombreUsuario :username.current.value,
            nombreCompleto: username.current.value,
            email: email.current.value,
            ciudad: ciudad.current.value,
            biografia: biografia.current.value,
            password: password.current.value,
          };
          try {
            await axios.post("http://localhost:8800/api/auth/registro", user);
            
            Swal.fire({
              title: 'Usuario creado!',
              text: 'Usuario creado correctamente',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            window.setTimeout(() => {
              
              history.push("/admin/userlist")
            }, 200);

    
          } catch (err) {
            console.log(err);
            Swal.fire({
              title: 'Registro incorrecto!',
              text: 'El usuario ya existe',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        }
      }
    return(
       

      <div className="new-user-main-container">
        <Topbar/>
          <div className="new-user-main">
          <Adminmenu/>
          <div className="form-container">
          <form className='form-new-user' onSubmit={handleClick}>
              
              <div className="editTtileForm">
                <h2 className="title-new-user">Crear nuevo usuario</h2>
              </div>
                <div className="form-item">

                  <label for="first-name">Nombre de usuario</label>
                  <input
                    placeholder={user.nombreUsuario}
                    maxLength={16}
                    pattern={"[a-zA-Z]+"}
                    required
                    ref={username}
                    className="editInput"
                    />
                </div>

                <div className="form-item">
                <label for="last-name">Nombre completo</label>
                          <input
                                      placeholder={user.nombreCompleto}
                                      maxLength={64}
                                      pattern={"[a-zA-Z]+"}
                                      required
                                      ref={nombreCompleto}
                                      className="editInput"
                                      
                                    />
                </div>
                <div className="form-item">
                  <label>Email</label>

                                  <input

                                  placeholder="Email"
                                  required
                                  ref={email}
                                  type="email"
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
                                      
                                      />
                  </div>  




                  <div className="form-item">
                  <label for="phone">Biografia</label>
                          <input
                                      placeholder={user.biografia}
                                      required
                                      ref={biografia}
                                      className="editInput"
                                      
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
                  <div className="select-image">
                
               
               
                  
                  </div>  
                          

        <div className="submit-button">
        <button className="editButton" type="submit">
        Crear nuevo usuario
        </button>

          </div>   
                  </form>
          </div>
          </div>
      </div>
    )
}