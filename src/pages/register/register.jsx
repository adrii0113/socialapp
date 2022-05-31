import './register.css'
import React from 'react';
import axios from 'axios';
import { useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Register() {
  const username = useRef();
  const nombreCompleto = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const nacimiento = useRef();
  const history = useHistory();
 

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Las contrasenas no coinciden!");
    } else {
      const user = {
        nombreUsuario :username.current.value,
        nombreCompleto: username.current.value,
        email: email.current.value,
        password: password.current.value,
        fechaNacimiento: nacimiento.current.value,
      };

      try {
        
        // await axios.post("http://localhost:8800/api/auth/registro", user);
        await axios.post("https://social-app-adrian.herokuapp.com/api/auth/registro", user);
        Swal.fire({
          title: 'Cuenta creada!',
          text: 'Cuenta creada satisfactoriamente',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        window.setTimeout(() => {
          history.push("/login");
        }, 100);
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: 'Registro incorrecto!',
          text: 'El usuario ya existe',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        document.querySelector(".loginBox").reset();
      }
    }
  };
  return(

  <div>
    <div className="login-page">
      <div class="login-box">
        <h2>Crear nueva cuenta</h2>
          <form onSubmit={handleClick}>
                  <div class="user-box">
                  <input

                        maxLength={16}
                        pattern={"[A-Za-z0-9]{1,15}"}
                        required
                        ref={username}
                        
                      />
                    <label>Nombre de usuario</label>
                  </div>

                  <div class="user-box">
                  <input

                    maxLength={64}
                    pattern={"[a-zA-Z]{1,15}"}
                    required
                    ref={nombreCompleto}
                        
                      />
                    <label>Nombre completo</label>
                  </div>

                  <div class="user-box">
                  <input

                      placeholder="Email"
                      required
                      ref={email}
                      type="email"
                        
                      />
                    <label>Email</label>
                  </div>

                  <div class="user-box">
                  <input


                      required
                      ref={nacimiento}
                      type="date"
                      min="30-05-2004" 
                      
                      />
                    <label>Fecha de nacimiento</label>
                  </div>

                  <div class="user-box">
                  <input

                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
                      ref={password}
                      type="password"
                        
                      />
                    <label>Password</label>
                  </div>

                  <div class="user-box">
                  <input

                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
                      ref={passwordAgain}
                      type="password"
                        
                      />
                    <label>Repeat password</label>
                  </div>
                
                  <div className="button-container">
                  <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  <button>Crear cuenta</button>
                  </a> 


                  <a href="">
                  <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  <Link to='/login'>
                    <button>
                        Iniciar sesion
                    </button>
                  </Link>
                  </a>

                  </div>
                </form>
        </div>
      </div>
    </div>

    
  )
}

