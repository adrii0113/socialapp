import "./amigoCercano.css";
import { Link } from "react-router-dom";
export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${user.nombreUsuario}`} style={{ textDecoration: 'none' , color:'black'}}>
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.imagenPerfil || PF+"/person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{user.nombreUsuario}</span>
    </li>
    </Link>
  );
}