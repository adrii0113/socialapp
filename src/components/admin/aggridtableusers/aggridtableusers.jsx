// ag-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; 
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// react imports
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';

// alerts
import Swal from 'sweetalert2'
// peticiones
import axios from 'axios';

// react utils
import { AuthContext } from "./../../../context/AuthContext";
import { useContext} from "react";
import { useHistory } from "react-router";




export default function Aggridtableusers(){

    const { user } = useContext(AuthContext);
    const history = useHistory();
    // definicion de las propiedades de la tabla
    const [rowData, setRowData] = useState(); 
     // DefaultColDef sets props common to all Columns
     const [columnDefs, setColumnDefs] = useState([
    
        {field: 'nombreUsuario'},
        {field: 'nombreCompleto', filter: true},
        {field: 'email'},
        {field: 'createdAt', headerName: 'Fecha de creación'},
        {field: 'fechaNacimiento', headerName: 'Fecha nacimiento'},
        {field: 'ciudad'},
        {field: 'seguidores.length', headerName: 'Seguidores'},
        {field: 'seguidos.length', headerName: 'Seguidos'},
      ]);
    const defaultColDef = useMemo( ()=> ({
        sortable: true
    }));
    const cellClickedListener = async (event) =>{
        Swal.fire({
            title: 'Seguro que quieres eliminar el usuario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `No eliminar`,
          }).then((result) => {
           
            if (result.isConfirmed) {
                if (event.data._id == user._id) {
                  Swal.fire('No puedes eliminar tu propia cuenta!', '', 'success')
                } else {

                  Swal.fire('Eliminado!', '', 'success')
                  axios.delete(`https://social-app-adrian.herokuapp.com/api/posts/deleteposts/${event.data._id}`);
                  axios.delete(`https://social-app-adrian.herokuapp.com/api/users/adminDelete/${event.data._id}`);
                  history.push("/adminPanel");
                }
            } else if (result.isDenied) {
              Swal.fire('El usuario no ha sido eliminado', '', 'info')
            }
            history.push("/adminPanel");
          })

      }
    // recoger los datos de todos los post 
    useEffect(() => {
        Swal.fire({
          title: 'Pulsa en los usuarios para eliminar o editar!',

          icon: 'info',
          confirmButtonText: 'OK'
        })
        fetch('https://social-app-adrian.herokuapp.com/api/users/allusers')
              
          .then((response) => response.json())
          .then(rowData => setRowData(rowData))
      }, []);


    return(
      
      <AgGridReact 
      
        rowData={rowData}  
        columnDefs={columnDefs} 
        defaultColDef={defaultColDef} 
        animateRows={true} 
        rowSelection='multiple' 
        paginationAutoPageSize={true}
        pagination={true}
        onCellClicked={cellClickedListener}
      /> 
    )
   

}