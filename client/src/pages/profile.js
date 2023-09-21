import React, { useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios"
const UserProfile = ()=>{
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    useEffect(()=>{
        const getAuthorised = async()=>{
            const token = localStorage.getItem('token');
            if(token){
                await axios.get("http://localhost:8000/userDetails",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }).then(res=>{
                    setUser(res.data);
                })
            }
            else{
                navigate("/login")
            }
        } 
        getAuthorised();
        
    },[navigate])
    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        navigate("/")
    }

    return (
        <div>
           <h1>Your Account</h1>
           <hr/>
           <div className="d-flex flex-row">
            <div style={{margin:"2.5%"}}>
                <img src={"https://img.freepik.com/premium-vector/happy-smiling-young-man-avatar-3d-portrait-man-cartoon-character-people-vector-illustration_653240-187.jpg?w=2000"}
                     alt="profile-img" height={200} width={200} />
            </div>
            <div  style={{margin:"2.5%"}}>
                 <h3>{user.name}</h3>
                 <div>
                    <span>Username : </span><span>{user.username}</span>
                 </div>
                 <div>
                    <span>Email Address : </span><span>{user.email}</span>
                 </div>
                 <button style={{position:"relative",top:"30%"}} className="btn btn-outline-dark" onClick={handleLogOut}>LogOut</button>
            </div>
           </div>
           <hr/>
           <div className="row" style={{margin:"0"}}>
            <div className="col-lg-4 col-md-12 mb-4"  onClick={()=>navigate("/profile/orderhistory")}>
                <div className="card d-flex flex-row">
                       <img style={{margin:"4%"}} src={"https://t4.ftcdn.net/jpg/05/22/47/93/360_F_522479362_f5Wq6fgWoyvBsGX6POWNdDhfIIG5pIHG.jpg"} alt="box" height={50} width={50}/>
                       <div className="card-body">
                            <h4>Your Orders</h4>
                            <p>Track, return or buy things again</p>
                       </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 mb-4 "  onClick={()=>navigate("/loginAndSecurity")}>
                <div className="card d-flex flex-row">
                       <img style={{margin:"4%"}} src={"https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"} alt="box" height={50} width={50}/>
                       <div className="card-body">
                            <h4>Login & Security</h4>
                            <p>Edit user name, email, password</p>
                       </div>
                </div>
            </div>
           </div>
          
        </div>
    )
}
export default UserProfile;