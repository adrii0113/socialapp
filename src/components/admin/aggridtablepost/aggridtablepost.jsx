import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { useState } from 'react';
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
export default function Aggridtablepost(){

    // definicion de las propiedades de la tabla
    const [rowData, setRowData] = useState(); 
     // DefaultColDef sets props common to all Columns
     const [columnDefs, setColumnDefs] = useState([
        
        {field: 'userId', headerName: 'Nombre de usuario'},
        {field: 'desc'},
        {field: 'likes.length', headerName: 'Likes'},
        {field: 'createdAt', headerName: 'Fecha de creación'},
      ]);
    const defaultColDef = useMemo( ()=> ({
        sortable: true
    }));

    // recoger los datos de todos los post 
    useEffect(() => {
        
        fetch('https://social-app-adrian.herokuapp.com/api/posts/all')
              
            .then((response) => response.json())
            .then(rowData => setRowData(rowData))
                
      }, []);

      const cellClickedListener = async (event) =>{

        // var userName = document.querySelector(".userName").value;
        // userName.value= event.data.nombreUsuario;
            new Swal({
              title: "Estas seguro de que quieres eliminar esta publicacion?",
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
                  title: 'Publicación eliminada!',
                  text: 'La publicacion ha sido eliminada correctamente!',
                  icon: 'success'
                }).then(function() {
                  
                    try {
                       const res = axios.delete(`https://social-app-adrian.herokuapp.com/api/posts/${event.data._id}`);
                       console.log(res.data)
                    } catch (error) {
                      console.log(error)
                    }
                  
                });
              } else {
                new Swal("Cancelled", "Your imaginary file is safe :)", "error");
              }
            })
          
        
        
      }
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