import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Rating } from '../component'
const SearchItems = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchName = queryParams.get('searchItem');
    const [searchData,setSearchData] = useState([]);
    useEffect(()=>{
        const fetchSearchData = async ()=>{
            await axios.post("/product/search",{searchItem:searchName}).then(res=>{
              setSearchData(res.data)
            })
        }
        fetchSearchData();
        
    },[searchName,setSearchData])
    const navigate = useNavigate();       
  
  return (
    <div className='d-flex flex-row'>
      <div style={{width:"70%"}}>
      {searchData.map(props=>{
        return (
            <div  className="productCard" onClick={()=>navigate(`/product/${props._id}`)}>
               <section>
                 <img className="productImage" src={props.thumbnail} alt={props.title}/>
                 <h2 className='productTitle' style={{marginLeft:"5rem",display:"inline-block"}}>{props.title}</h2>
                 <p cl assName="productRating">
                   <Rating {...props}/> <span>{props.rating}</span>
                 </p>
                 <p><svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
            </svg>{props.price}</p>
                 <p className="text-truncate">
                   {props.description}
                 </p>
                 {/* <div>
                 <Link to={`/product/${props._id}`} target='_blank'>View Details</Link>
                 </div> */}
                 </section>
             </div>
        )
      })}
      </div>
      <div>
        <div>
            <h4 className='price-filter'>Price</h4>
            <div>
              <ul>
                <li>
                <span>
                <Link className='price-filter-link' to={`/filtered/?searchItem=${searchName}&price=500`}>Under $500</Link>
                </span>
                </li>
                <li>
                <span>
                <Link className='price-filter-link' to={`/filtered/?searchItem=${searchName}&price=1000`}>Under $1000</Link>
                </span>
                </li>
                <li>
                <span>
                <Link className='price-filter-link' to={`/filtered/?searchItem=${searchName}&price=1500`}>Under $1500</Link>
                </span>
                </li>
                <li>
                <span>
                <Link className='price-filter-link' to={`/filtered/?searchItem=${searchName}&price=2000`}>Under $2000</Link>
                </span>
                </li>
                <li>
                <span>
                <Link className='price-filter-link' to={`/filtered/?searchItem=${searchName}&price=5000`}>Under $5000</Link>
                </span>
                </li>
              </ul>
              
            </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItems
