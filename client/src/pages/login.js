import React, { useEffect } from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginPage =()=>{
    const navigate = useNavigate();

    const [loginName,setLoginName] = useState('');
    const [firstName,setFname] = useState('');
    const [password,setPassword] = useState('')
    const [username,setUserName] = useState('');
    const [lastName,setLname] = useState('');
    const [email,setEmail] = useState('');
    useEffect(()=>{
      let token = localStorage.getItem('token');
      if(token){
        navigate("/profile");
      }
    },[navigate])
      const handleSubmit =(evt)=>{
        axios.post("http://localhost:8000/login",{
          username:loginName,
          password:password
        }).then((res)=>{
          if(res.data.token){
            let {token} = res.data;
            localStorage.setItem('token',token);
            console.log(localStorage.getItem("token"))
          }
          else if(res.data.status===401){
            alert(res.data.message);
          }
          navigate("/profile");
        })
        evt.preventDefault()
      }
      const handleSignUp = (evt)=>{
          axios.post("http://localhost:8000/register",{
              firstName:firstName,
              lastName:lastName,
              email:email,
              password:password,
              username:username
          }).then(res=>{
            if(res.data.status===200){
              let {token} = res.data;
              localStorage.setItem('token',token);
              
            }
            else if(res.data.status===401){
              alert(res.data.message);
            }
           navigate("/profile")
            
          })
        evt.preventDefault();
      }
      const [state,setState] = useState(0)
    
      if(state===0)
      return (
        <div  style={{textAlign:"center"}}>
          <div style={{width:"60%",border:"1px solid grey",margin:"5% 20% 5% 20%",padding:"2.5%"}}>
          <div style={{textAlign:"center"}}>
            <img src={require("../images/logo2.png")} alt='company logo' width={100} height={100}/>
          </div>
          <form style={{margin:"2%"}} onSubmit={handleSubmit}>
          <input className="form-control" name="loginusername" onChange={(e)=>{setLoginName(e.target.value)}} type="text" placeholder="Username" required />
          <input className="form-control" name="password" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="password" required/>
          <button type="submit" className='btn btn-dark' style={{margin:"2%"}}>Log In</button>
          <form action='/login/forget-password' method='Get'>
            <button className='btn' type='submit'>Forget Password ?</button>
          </form>
          <div className="form-text" style={{margin:"2%"}}>New User ? <button type="button"  className='btn btn-outline-dark' onClick={()=>setState(1)}>SignUp</button></div>
        </form>
        </div>
        </div>
      )
      else
      return (
        <div style={{width:"60%",border:"1px solid grey",margin:"5% 20% 5% 20%",padding:"2.5%",textAlign:"center"}}>
          <div>
          <div style={{textAlign:"center"}}>
            <img src={require("../images/logo2.png")} alt='company logo' width={100} height={100}/>
          </div>
          </div>
          <form onSubmit={handleSignUp} style={{margin:"2%"}}>
          <input className="form-control"  onChange={(e)=>{setFname(e.target.value)}} type="text" placeholder="First Name" required />
          <input className="form-control"  onChange={(e)=>{setLname(e.target.value)}} type="text" placeholder="Last Name" required />
          <input className="form-control" onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" required />
          <input className="form-control"  onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Username" required/>
          <input className="form-control"  onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required/>
          <button type="submit" style={{margin:"2%"}}  className='btn btn-dark'>SignUp</button>
         <div style={{margin:"2%"}} className='form-text'>
          Already have an account ? 
         <button type="submit"  className='btn btn-outline-dark'  onClick={()=>setState(0)}>Back To Log In</button>
         </div>
        </form>
        </div>
      )
    }

export default LoginPage;
