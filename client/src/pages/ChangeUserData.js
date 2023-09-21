import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"


const ChangeUserData = () => {
    const navigate = useNavigate() 
    const location = useLocation(); // useLocation hook is used to get the params value in the URL 
    const queryParams = new URLSearchParams(location.search); 
    const changeField = queryParams.get('changeField'); // the user data field which is requested to be changed
    // Declaring all the variables to store different fields of user data
    const [changeData,setChangeData] = useState(''); 
    const [name,setname] = useState({
        firstname:"",
        lastname:""
    })
    const [password,setPassword] = useState({
        prevPassword:"",
        newPassword:""
    })
   
    useEffect(()=>{
         // Checking if user is still logged in 
        let token = localStorage.getItem("token");
        if(!token){
            navigate("/login")
        }
    })

    const handleEmailSubmit = ()=>{
        // function to change the email of the user
        let token = localStorage.getItem("token");
        // request the server to change the email as per the input 
         axios.post("http://localhost:8000/userDetails",{
            email:changeData,
         },{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
            alert(res.data.message); 
         })
         navigate("/LoginAndSecurity");
         
    }
    const handleNameSubmit = ()=>{
        //function to update the name of the user
        let token = localStorage.getItem("token");
         axios.post("http://localhost:8000/userDetails",name,{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
            alert(res.data.message); 
         })
         navigate("/LoginAndSecurity");
    }

    const handlePasswordSubmit = ()=>{
        // function to update the password
        let token = localStorage.getItem("token");
         axios.post("http://localhost:8000/userDetails",password,{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
            if(res.data.status===200){
                alert(res.data.message)

            }
            else{
                alert(res.data.message)
            }
         })
         navigate("/LoginAndSecurity");   
    }
  if(changeField==='email')
  return (
    <div>
      <div>
        <div  className='login-security-change'>
            <h1>Change Your Email Address </h1><br/>
            <form onSubmit={handleEmailSubmit} className='card login-change-form' >
                <p>Enter the new email address you would like to associate with your account below.</p>
                <label></label>
                <input required onChange={(e)=>setChangeData(e.target.value)} type='email' name='email'/>
                <button type='submit' className='btn btn-outline-dark'>Save Changes</button>

            </form>
        </div>
      </div>
    </div>
  )
  else if(changeField==='name')
  return (
    <div>
      <div>
        <div  className='login-security-change'>
            <h1>Change Your Name  </h1>  <br/>         
            <form onSubmit={handleNameSubmit} className='card login-change-form'>
            <p>If you want to change the name associated with your account, you may do so below. Be sure to click the Save Changes button when you are done.</p>
                <label for="Firstname">First Name</label>
                <input id='Firstname' onChange={(e)=>setname(prev=>{
                    return {
                        ...prev,
                        firstname:e.target.value
                    }
                })} type='text' required/>
                <label for="Lastname">Last Name</label>
                <input id='Lastname' required onChange={(e)=>setname(prev=>{
                    return {
                        ...prev,
                        lastname:e.target.value
                    }
                })}type='text'/>
                <button type='submit' className='btn btn-outline-dark'>Save Changes</button>
            </form>
        </div>
      </div>
    </div>
  )
  else if(changeField==='password')
  return (
    <div>
      <div>
        <div className='login-security-change'>
            <h1>Change Your Password </h1><br/>
            <form onSubmit={handlePasswordSubmit} className='card login-change-form '>
                <p>Use the form below to change the password for your account</p>
                <label for="Firstname">Previous Password</label>
                <input id='Firstname' required  onChange={(e)=>setPassword(prev=>{
                    return {
                        ...prev,
                        prevPassword:e.target.value
                    }
                })} type='password'/>
                <label for="Lastname">New Password</label>
                <input id='Lastname'  required onChange={(e)=>setPassword(prev=>{
                    return {
                        ...prev,
                        newPassword:e.target.value
                    }
                })}type='password'/>
                <button type='submit' className='btn btn-outline-dark'>Save Changes</button>
            </form>
        </div>
      </div>
    </div>
  )


}

export default ChangeUserData
