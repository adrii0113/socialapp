import "./chat.css";
import Topbar from "./../../components/user/topbar/topbar";
import Conversation from "./../../components/user/conversations/conversations";
import Message from "./../../components/user/message/message";
import Sidebar from "./../../components/user/sidebar/sidebar"
import ChatOnline from "./../../components/user/chatcontacts/chatcontacts";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { FiSend, FiFilePlus } from 'react-icons/fi'
import Swal from 'sweetalert2'

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.seguidos.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://social-app-adrian.herokuapp.com/api/chat/" + user._id);
        setConversations(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("https://social-app-adrian.herokuapp.com/api/chat/messages/" + currentChat?._id);

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  useEffect(()=>{
    const getFullNameReciver = async () =>{
      let reciver = currentChat.members[1];
      console.log(reciver)
      try {
        const res = await axios.post("https://social-app-adrian.herokuapp.com/api/users/" + reciver);
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFullNameReciver()
  }, [currentChat])

  let mensajeVacio = false;
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!document.querySelector(".chatMessageInput").value == ""){

      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
  
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
  
      try {
        const res = await axios.post("https://social-app-adrian.herokuapp.com/api/chat/messages/", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        title: 'Mensaje vacio!',
        text: 'Tienes que escribir al menos un caracter',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  
  // validateMessageContent()
  
  // window.onload = validateMessageContent()

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          {/* <Sidebar/> */}
          <div className="chatMenuWrapper">
            
            {/* <input placeholder="Buscar chats" className="chatMenuInput" /> */}
            <div className="title-initConver">
              <h2>Conversaciones iniciadas</h2>
            </div>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="chatBox">
          <div className="chatBoxInfo">
            <span className="userName">
              {/* {console.log(currentChat.members[0])} */}
            </span>
          </div>
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="Escribe.."
                    onChange={(e) => setNewMessage(e.target.value)}
                    
                    value={newMessage}
                  ></input>
                  
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    {/* Enviar  */}
                  <FiSend/>
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                
              </span>
            )}
          </div>
        </div>
        
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}