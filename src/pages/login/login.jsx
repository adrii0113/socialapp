
// import React from 'react';
import GoogleLogin from 'react-google-login';
// import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
// import axios from 'axios';
// // import { useNavigate } from "react-router";
// import { useRef } from "react";
// import shareVideo from '../assets/share.mp4';
// import logo from '../assets/logowhite.png';

// import { client } from '../client';



  // fucnion para enviar los datos
  // const responseGoogle = (response) => {
  //   // localStorage.setItem('user', JSON.stringify(response.profileObj));
  //   // const { name, googleId, imageUrl } = response.profileObj;
  //   // const doc = {
  //   //   _id: googleId,
  //   //   _type: 'user',
  //   //   userName: name,
  //   //   image: imageUrl,
  //   // };
  //   // client.createIfNotExists(doc).then(() => {
  //   //   navigate('/', { replace: true });
  //   // });
  //   console.log(response)
   
    
   
  // };
 
  
 

import { useContext, useRef } from "react";
// libreria para redireccionar entre rutas

import "./login.css";
import axios from 'axios';
import React from 'react';
import { loginCall } from '../../apiReq';
import { AuthContext } from "./../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  
  const email = useRef();
  const password = useRef();
  const { user, error, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value},dispatch)
   
  };

  return (
 
      <div className="login-page">

      
          <div class="login-box">
            <h2>Inciar sesión</h2>
              <form onSubmit={handleClick}>
                  <div class="user-box">
                    <input 
                    type="email"
                    required
                    ref={email}
                    />
                    <label>Email</label>
                  </div>
                  <div class="user-box">
                  <input
                    type="password"
                    required
                    minLength="6"
                    ref={password}
                  />
                    <label>Password</label>
                  </div>
                  <div className="button-container">
                   <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  <button>Iniciar sesión</button>
                  </a> 


                  <a href="">
                  <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  <Link to='/register'>
                    <button>
                        Crear cuenta
                    </button>
                  </Link>
                  </a>

                  </div>
              </form>
      </div>
    </div>
  );
}