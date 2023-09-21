import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginAndSecurity = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({});

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(!token){
            navigate("/profile")
        }
        else{
            axios.get("http://localhost:8000/userDetails",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then(res=>{
                setUser(res.data)
        })
        }
    },[navigate])
  return (
    <div>
       <div>
        <div style={{textAlign:"center"}}>
          <h1>Login and Security</h1>
        </div>
        <div style={{width:"60%",margin:"2.5% 20% 2.5% 20%",padding:"2%"}} className='card'>
        <div className='card changeLoginInfo'>
            <div className='card-text d-flex flex-row'>
                 <span style={{marginRight:"2%"}}>Email Address :</span><span style={{marginRight:"10%"}}> {user.email}</span>
                 <form method='Get' action='/LoginAndSecurity/change'><button type='submit' name='changeField' value={"email"} className='btn'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button></form>
            </div>
          </div>
          <div className='card changeLoginInfo'>
            <div className='card-text d-flex flex-row'>
                 <span style={{marginRight:"2%"}}>Name : </span><span style={{marginRight:"10%"}}>{user.name}</span>
                 <form method='Get' action='/LoginAndSecurity/change'><button type='submit' name='changeField' value={"name"} className='btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button></form>
            </div>
          </div>
          <div className='card changeLoginInfo'>
            <div className='card-text d-flex flex-row'>
                 <span style={{marginRight:"2%"}}>Password :  </span><span style={{marginRight:"10%"}}> ********</span>
                 <form  method='Get' action='/LoginAndSecurity/change'><button type='submit' name='changeField' value={"password"} className='btn'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button></form>
            </div>
          </div>
          <div>
            <button onClick={()=>{navigate(`/profile`)}} className='btn btn-dark'>Save Changes</button>
          </div>
        </div>
       </div>
    </div>
  )
}

export default LoginAndSecurity
