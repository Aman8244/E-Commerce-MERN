import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
const OrderHistory = () => {
    
    const [orderData,setOrderData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8000/orderHistory",{headers:{
            Authorization:`Bearer ${token}`
        }}).then(res=>{
              setOrderData(res.data)
        })
        
    },[]) 
    console.log(orderData)
  return (
    <div>
      <div className='card order-card'>
        <div>
          <h1>Your Orders</h1>
        </div>
           {(orderData && orderData.length>0)?
           orderData[0].items.map(el=>{
            return (
              <div className='card' onClick={()=>{navigate(`/product/${el.productId}`)}}>
              <div className='card-body'>
                <div className='d-flex flex-row'>
                    <img src={el.image} alt='product thumbnail' height={60} width={60} className='thumbnail'/>
                    <h2 style={{width:"60%",fontSize:"1.3rem",paddingLeft:"5%"}}>{el.title}</h2> 
                    <p className='card-text'>$ {el.price}</p>
                </div>
              </div>
           </div>
            )
           }) :<div>
            <img src='https://cdn.dribbble.com/users/721524/screenshots/4112199/no_orders.png' alt='no orders png' className='no-order-png'/></div>}
      </div>
    </div>
  )
}

export default OrderHistory
