import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Rating } from '../component'
// this is the page for pagination 
const Explore = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page'); // get the page count
    const [productData,setProductData] = useState([]);
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    const pageCount = parseInt(page) // convert string to integer
    useEffect(()=>{
      
        const filterItems = (element)=>{
            if(element.id < (pageCount*10) && element.id>(pageCount*10-10) )
                return element;
          }
        const appdata = axios.get("http://localhost:8000/").then((res)=>{
              return res.data
        })
        appdata.then((result)=>{
            setData(result);
            setProductData(data.filter(filterItems))
        }).catch(error=>{
            console.error("Error:",error);
        })
        
        
    },[pageCount,data])
  return (
    <div>
      <div style={{padding:"4%", background: "linear-gradient(to right, #929291, #98989a)"}}>
    <div>
      <h1>Continue Shopping</h1>
    </div>
          <div className='row' style={{marginTop:"3%"}}>
          {productData.map(props=>
            <div className="col-lg-4 col-md-12 mb-4">
            <div className="card">
            <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
              data-mdb-ripple-color="light">
              <img src={props.thumbnail}
                className="w-100" style={{height:"200px"}} alt='product-thumbnail' />
              <Link to={`/product/${props._id}`}>
                <div className="hover-overlay">
                  <div className="mask" style={{backgroundColor:" rgba(251, 251, 251, 0.15)"}}></div>
                </div>
              </Link>
            </div>
            <div className="card-body">
              <Link  to={`/product/${props._id}`} className="text-reset">
                <h5 class="card-title mb-3">{props.title}</h5>
              </Link>
              <h6><Rating {...props}/>{props.rating}</h6>
              <h6 className="mb-3">${props.price}</h6>

            </div>
          </div>
        </div>
             )}
          </div>
            <div>
         </div>
        </div>
      <form action='/explore' method='Get' style={{textAlign:"center",margin:"4%"}}>
               {(pageCount===1)? <button onClick={()=>{navigate('/')}} value={1} name='page' type='submit' className="btn btn-lg ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>:
                <button value={pageCount-1} name='page' type='submit' className="btn btn-lg ">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>}
                <span className="pageCount">{pageCount}</span>
               <button value={pageCount+1} name='page' type='submit' className="btn btn-lg ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
              </form>
    </div>
  )
}

export default Explore
