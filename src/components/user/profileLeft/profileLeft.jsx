import './profileLeft.css'
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "./../../../context/AuthContext";
export default function ProfileLeft(){

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <>
        <div className="profileLeft">
            <div className="postTopLeft">
          <Link to={`/profile/${user.nombreUsuario}`}>
            <img
              className="postProfileImg"
              src={user.imagenPerfil || PF+"/person/noAvatar.png"}
              alt=""
              />
            </Link>
            <span className="postUsername">
              {user.nombreUsuario}
            </span>
            
            <p className="postUsernameSign">
              {'@' +user.nombreUsuario + ''}
            </p>
            </div>
        </div>
    </>

    )
}