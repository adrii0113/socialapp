import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("https://social-app-adrian.herokuapp.com/api/users?userId=" + friendId);
        setUser(res.data);
        
        
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.imagenPerfil
            ?  user.imagenPerfil
            : "https://res.cloudinary.com/dtmuzq8to/image/upload/v1653948899/upload_/noAvatar_qbv5yk.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.nombreCompleto}</span>
    </div>
  );
}