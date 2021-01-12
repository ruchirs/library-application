import axios from 'axios';

/**
 * base url to server
 */

 const token = localStorage.getItem('token')

 const instance = axios.create({
     baseURL: process.env.dbURL || "http://localhost:5000/api/",
     headers: {
        'Content-Type': 'application/json;charset=UTF-8',
       Authorization: 'Bearer ' +   token
     }
 })

 export default instance