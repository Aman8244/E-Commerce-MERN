import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"

const ProductPage = () => {
   const {productId} = useParams();
   const [productData,setProductData]= useState({});
   
   const navigate = useNavigate();

   useEffect(()=>{
    // console.log(productId);
    const getProductDetail = async()=>{
      await axios.get(`http://localhost:8000/api/products/${productId}`).then(res=>{
        return res.data
       }).then(result=>{
          setProductData(result)
          
       })
    }
    getProductDetail();
   
   },[productId])

   const handleAddToCart = ()=>{
    let token = localStorage.getItem('token');
    console.log(token)
    if(token){
      axios.post("http://localhost:8000/cart",{
        id:productData._id,
        title:productData.title,
        image:productData.thumbnail,
        price:productData.price,
        discountPercentage:productData.discountPercentage,
        productId:productId
      },{headers:{
        Authorization:`Bearer ${token}`
      }})
    }
    else{
      navigate("/login")
    }
     
   }
 
  return (
    <div>
      <div className='d-flex flex-row'>
         <div id='singleProductImg'  style={{width:"30%"}}>
           <img src={(productData.images && productData.images[0])?productData.images[0]:productData.thumbnail} alt={productData.title} className="img-fluid hover-shadow singleProductImg"/>
         </div>
         <div className='singleProductDetails' style={{width:"60%"}}>
            <div>
                <h1 className='text-capitalize lh-base'>{productData.title}</h1>
            </div>
            <div>
                <p>
                {productData.description}
                </p>
            </div>
            <div className='d-flex flex-row'>
                <p className='text-decoration-line-through' style={{width:'10%'}}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
            </svg> */}
                    $ {productData.price}
                </p>
                
                <p>
                  $ {(productData.price-(productData.price)*productData.discountPercentage/100).toFixed(2)}
                </p>
            </div>
            <p className='text-muted'>
                  {productData.discountPercentage}% <span >OFF</span>
                </p>
            <div>
         <button className="btn btn-large btn-primary" href='#' type='submit' onClick={handleAddToCart}>Add To Cart</button>
         </div>
         </div>
         
       </div>
        
    </div>
  )
}

export default ProductPage
