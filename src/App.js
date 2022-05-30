// PAGE IMPORTS
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Userprofile from "./pages/userprofile/userprofile";
import Chat from './pages/chat/chat'
import Adminpanel from './pages/admin/adminpanel/adminpanel';
import Newuser from "./pages/admin/newuser/newuser";
import Postlist from "./pages/admin/postList/postsList";
import Pagenotfound from "./pages/404/404";
import Edituser from "./pages/edituser/edituser";
import CretePost from "./pages/explorar/explorar";
import AdminHome from './pages/admin/home/home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
// estilos
import './styles/app.css'
import { AuthContext } from './context/AuthContext'

import { useContext } from "react";

import { register } from "timeago.js";


function App() {

  const { user } = useContext(AuthContext);
  // const { Navigate} = useNavigate()
  return (
    <div className="app">
      {/* <Home/> */}
      <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
          
        </Route>
        <Route exact path="/home">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:nombreUsuario">
          {/* {user ? <Redirect to="/register" /> :  <Userprofile />} */}
          <Userprofile />
        </Route>
        <Route path="/chat">
          {!user ? <Redirect to="/" /> : <Chat />}
        </Route>
        {/* ADMIN ROUTES */}
        <Route path="/adminPanel">
          {!user ? <Redirect to="/" /> : <Adminpanel />}
        </Route>
        <Route path="/adminPanel/:value">
          {!user ? <Redirect to="/adminPanel" /> : <Adminpanel />}
        </Route>
        <Route path="/adminPanel/:value">
          {!user ? <Redirect to="/adminPanel" /> : <Adminpanel />}
        </Route>
        <Route path="/admin/newuser">
        {!user ? <Redirect to="/" /> : <Newuser />}
        </Route>
        <Route path="/admin/postlist">
          {!user ? <Redirect to="/" /> : <Postlist />}
        </Route>
        <Route path="/admin/userlist">
          {!user ? <Redirect to="/" /> : <Adminpanel />}
        </Route>

        <Route path="/admin/home">
          {!user ? <Redirect to="/" /> : <AdminHome />}
        </Route>
        <Route path="/edituser/:nombreUsuario">
          {!user ? <Redirect to="/home" /> : <Edituser/>}
          
        </Route>

        <Route path="/explorar">
         <CretePost/>
        </Route>

        <Route path="*">
          <Pagenotfound />
        </Route>


      </Switch>
    </Router>
    </div>
  );
}

export default App;
