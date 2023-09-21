import React from 'react'
import { useState,useEffect } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Carousel } from 'react-bootstrap';

const Home = () => {
    const [data,setData] = useState([]);
    const [productData,setProductData] = useState([]);
    const [discountedItems,setDiscountedItems] = useState([]);

    useEffect(()=>{
      const filterItems = (element)=>{
        if(element.id < 10 && element.id>0 )
            return element;
      }
        const appdata = axios.get("http://localhost:8000/").then((res)=>{
          return res.data
        })
      appdata.then((result)=>{
        setData(result);
      }).catch(error=>{
      console.error("Error:",error);
        })
      setProductData(data.filter(filterItems))
         const deals = async()=>{
              await axios.get("http://localhost:8000/deals").then(res=>{
                return res.data
              }).then(result=>{
                  setDiscountedItems(result)
              })
         }
         deals();
    },[data]);
  const navigate = useNavigate();
 
  const Rating = function(props){
    if(props.rating>=1 && props.rating<2)
      return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
        </div>
      );
    else if(props.rating>=2 && props.rating<3)
      return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
        </div>
      );
    else if(props.rating>=3 && props.rating<4)
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
      </div>
    );
    else if(props.rating>=4 && props.rating<5)
       return (
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
        </div>
       );
    else
      return (
        <div>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
    </div>)
    
}
  return (
    <section>
        <div>
        <Carousel className='carousel-fade carousel slide'>
        <Carousel.Item onClick={()=>{navigate(`/search/?searchItem=womens-dresses`)}}>
        <img  style={{height:"300px"}} src={"https://i.pinimg.com/736x/24/46/05/24460549741f20a37e34f62c85d3de41.jpg"} className="d-block w-100" alt={''} />
      </Carousel.Item>
        <Carousel.Item onClick={()=>{navigate(`/search/?searchItem=mens-shoes`)}}>
        <img  style={{height:"300px"}} src={"https://cdn.shopify.com/s/files/1/0607/6678/1671/products/069f8fdf1de34bffa348299702794f1f.thumbnail.0000000000.jpg?v=1670324805"} className="d-block w-100" alt={''} />
      </Carousel.Item>
     
      <Carousel.Item  onClick={()=>{navigate(`/search/?searchItem=fragrances`)}}>
        <img  style={{height:"300px"}} src={"https://cdn.shopify.com/s/files/1/0745/0201/3236/products/Beardo_Christmas_combo_thumbnails_2160x216006.jpg?v=1681901909&width=1445"} className="d-block w-100" alt={''} />
      </Carousel.Item>
      <Carousel.Item  onClick={()=>{navigate(`/search/?searchItem=laptops`)}}>
        <img  style={{height:"300px"}} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAs-F8oUQT7yOWXTiCWcD2lUnZXaRPCyMDGoJKMJ3MrA&usqp=CAU&ec=48600113"} className="d-block w-100" alt={''} />
      </Carousel.Item>
      <Carousel.Item  onClick={()=>{navigate(`/search/?searchItem=groceries`)}}>
        <img  style={{height:"300px"}} src={"https://cdn.slidesharecdn.com/ss_thumbnails/onlinegrocery-151216065743-thumbnail.jpg?width=640&height=640&fit=bounds"} className="d-block w-100" alt={''} />
      </Carousel.Item>
      <Carousel.Item  onClick={()=>{navigate(`/search/?searchItem=skincare`)}}>
        <img  style={{height:"300px"}} src={"https://1.bp.blogspot.com/-0cf4eOaDNTQ/Wv2Z5uVQ5cI/AAAAAAAACDQ/b88763WH6vAbozGjsbvahOJqzLiajBFzQCLcBGAs/s1600/skin%2Bcare%2Broutine%2Bthumbnail%2Bfinal.jpg"} className="d-block w-100" alt={''} />
      </Carousel.Item>
      <Carousel.Item onClick={()=>{navigate(`/search/?searchItem=smartphones`)}}>
        <img  style={{height:"300px"}} src={"https://static.toiimg.com/thumb/resizemode-4,msid-96713899,width-1200,height-900/96713899.jpg"} className="d-block w-100" alt={''} />
     </Carousel.Item>  
  </Carousel>
    </div>
   
       <div className='category'>
        <div >
            <h2 style={{fontSize:"3rem"}}>Deals</h2>
            <span style={{color:"grey",fontSize:"1rem"}}>(Atleast 15% OFF)</span>
        </div><br/>
        <div>
     <Carousel className='carousel-fade carousel slide'>
    {discountedItems.map((el) => (
      <Carousel.Item  onClick={()=>{navigate(`/product/${el._id}`)}}  key={el._id}>
        <img  style={{height:"300px"}} src={el.thumbnail} className="d-block w-100" alt={el.title} />
      </Carousel.Item>
    ))}
  </Carousel>
  </div>
  </div>
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
              <Link  to={`/product/${props._id}`}>
                <div className="hover-overlay">
                  <div className="mask" style={{backgroundColor:" rgba(251, 251, 251, 0.15)"}}></div>
                </div>
              </Link>
            </div>
            <div className="card-body">
              <Link to={`/product/${props._id}`} className="text-reset">
                <h5 class="card-title mb-3">{props.title}</h5>
              </Link>
              {/* <a href={`/product/${props._id}`} className="text-truncate">
                <p>{props.description}</p>
              </a> */}
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
       {/* <div>
       {discountedItems.map(el=>{
        return <Category {...el} id={el._id} key={el.id}/>
       })}
       </div> */}
      <form action='/explore' method='Get' style={{textAlign:"center",margin:"4%"}}>
                <button disabled value={1} name='page' type='submit' className="btn btn-lg ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <span className="pageCount">{1}</span>
                <button value={2} name='page' type='submit' className="btn btn-lg ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
              </form>
 
       
 
    </section>
    
  )
}

export default Home
