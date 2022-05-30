
import Topbar from './../../../components/user/topbar/topbar'
import Adminmenu from './../../../components/admin/adminmenu/adminmenu';
import './postlist.css';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import { useHistory } from "react-router";

// import NewUserForm from '../../components/newuserform/newuserform';
import { AuthContext } from "./../../../context/AuthContext";
import { useContext} from "react";
import { useParams } from 'react-router'
import Swal from 'sweetalert2'
import Aggridtablepost from './../../../components/admin/aggridtablepost/aggridtablepost'
// import BtnCellRenderer from './../../components/btncellrender/BtnCellRenderer'
import  {Component} from "react";
import { display } from '@material-ui/system';

class BtnCellRenderer extends Component {
  
  
    render() {
      const updateUser = (e) =>{
        console.log(e.target)
      }

      // funcion para borrar un usuario por el administrador
      const deleteUser = async (e) =>{
        console.log(e.data)
      }
      return (
        <div className="actionsContainer" style={{display:'flex', flexDirection:'column'}}>
          <button onClick={updateUser}>Bloquear</button>
          <button onClick={deleteUser}>Eliminar</button>
          <button >Actualizar</button>
        </div>
        
        
      )
    }
  }
export default function Postlist(){
  
  
   
  
    const { user } = useContext(AuthContext);
    let { params } = useParams();
    const rowHeight = 70;
    console.log(params);
    // const gridRef = useRef(); 
    const [rowData, setRowData] = useState(); 
     // DefaultColDef sets props common to all Columns
     const [columnDefs, setColumnDefs] = useState([
    
        {field: '_id'},
        {field: 'nombreCompleto', filter: true},
        {field: 'email'},
        {field: 'createdAt', headerName: 'Fecha de creación'},
        // {field: 'seguidores'},
        // {field: 'biografia'},
        // {field: 'Ciudad'},
        // {field: 'Bloquear'},
        // {field: 'Acciones',cellRenderer: BtnCellRenderer}
      ]);
 const defaultColDef = useMemo( ()=> ({
    sortable: true
  }));
  
 
  // const cellClickedListener = useCallback( event => {
  //   // console.log('cellClicked', event);
  //   console.log(event.data._id)
  //   try {
      
  //     await axios.delete(`http://localhost:8800/api/users/${event.data._id}`);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, []);

  const cellClickedListener = async (event) =>{
    console.log(event.data.nombreUsuario)
    // var userName = document.querySelector(".userName").value;
    // userName.value= event.data.nombreUsuario;
        new Swal({
          title: "Estas seguro de que quieres eliminar el usuario?",
          text: "No podras recuperarlo una vez eliminado!",
          icon: "warning",
          showCancelButton: true,
          closeOnCancel: true,
          buttons: [
            'No, cancelar!',
            'Si, estoy seguro!'
          ],
          dangerMode: true,
        }).then(function(isConfirm) {
          if (isConfirm) {
            new Swal({
              title: 'Usuario eliminado!',
              text: 'El usuario ha sido eliminado correctamente!',
              icon: 'success'
            }).then(function() {
              if(user.admin){
                try {
                   const res = axios.delete(`https://social-app-adrian.herokuapp.com/api/posts/${event.data._id}`);
                   console.log(res.data)
                } catch (error) {
                  console.log(error)
                }
              } else{
                console.log("no eres admin")
              }
            });
          } else {
            new Swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        })
      
    
    
  }
//   useEffect(() => {
//     fetch('http://localhost:8800/api/post/all')
          
//           .then((response) => response.json())
//           .then(rowData => setRowData(rowData))
//     // switch (params) {
//     //   case 'users':
//     //     try {
//     //       // fetch('http://localhost:8800/api/users/allusers')
          
//     //       // .then((response) => response.json())
//     //       // .then(rowData => setRowData(rowData))
          
//     //     } catch (error) {
//     //       console.log(error)
//     //     }
//     //     break;

//     //     case 'post':
//     //     try {
//     //       fetch('http://localhost:8800/api/post/allpost')
          
//     //       .then((response) => response.json())
//     //       .then(rowData => setRowData(rowData))
          
//     //     } catch (error) {
//     //       console.log(error)
//     //     }
//     //     break;
        
//     //   default:
//     //     break;
//     // }
//     // .then()
//   }, []);
  

  
  const history = useHistory();

  // const newUserModal = () =>{
  //   const newUserForm = document.querySelector(".newUser");
  //   newUserForm.className = "mostrar"
  //   // if(document.querySelector('.loginBox')){
  //   //   document.querySelector('.loginBox').style.display ="block"
  //   // } else{
  //   //   document.querySelector('.loginBox').style.display ="none"
  //   // }
  //   // document.querySelector('.loginBox').style.display ="none"
  // }


  

    return(

      <>
      <Topbar/>
        <div className='admin-panel-main-container'>
        
       
        <Adminmenu/>
          <div className="ag-theme-alpine" style={{width: 1100, height: 880}}>
        <Aggridtablepost></Aggridtablepost>
        
    </div>
      </div>
   
      </>
  )
}