import axios from "axios";
import Swal from 'sweetalert2'


export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
      
    const res = await axios.post("https://social-app-adrian.herokuapp.com/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    
    Swal.fire({
      title: 'Login incorrecto!',
      text: 'Vuelva a introducir los datos',
      icon: 'error',
     
      color:'black',
      confirmButtonText: 'OK'
    })
  }
};