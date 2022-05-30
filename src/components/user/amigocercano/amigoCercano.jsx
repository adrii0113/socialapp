import "./amigoCercano.css";
import { Link } from "react-router-dom";
export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${user.nombreUsuario}`} style={{ textDecoration: 'none' , color:'black'}}>
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.imagenPerfil || "https://res.cloudinary.com/dtmuzq8to/image/upload/v1653948899/upload_/noAvatar_qbv5yk.png"} alt="" />
      <span className="sidebarFriendName">{user.nombreUsuario}</span>
    </li>
    </Link>
  );
}