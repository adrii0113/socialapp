// import React from "react";
import axios from 'axios'


// funcion para recuperar los post con axios
const fetchPosts = async () =>{

    const res = await axios.get("http://localhost:8800/api/posts/626d69280c5777c8db2cc931")
    return res.data;
    console.log(res.data)
}

const fetchUser = async (post) => {

    const res = await axios.get(`http://localhost:8800/api/users${post.userId}`)

    return res.data
    console.log(res.data)

}



export {fetchPosts ,fetchUser};