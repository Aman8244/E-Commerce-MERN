import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//This is the cart Page of the Application.

const Cart = function () {
  const navigate = useNavigate();
  const [cartDetails, setCartDetails] = useState([]); // declare the variable to store cart data fetching from server
  
  useEffect(() => {
    // the function to get Cart Data
    const getCartData = () => {  
      const token = localStorage.getItem("token");  // Search for the stored session in the form of jwt token
      // if there is a token
      if (token) {
        axios
          .get("http://localhost:8000/cart", { // GET request to /cart route on the server to get the details of cart items.
            headers: {
              Authorization: `Bearer ${token}`,  // Send token in header of the request so that the server can verify the user and get you the correct details.
            },
          })
          .then((res) => {
            return res.data; 
          })
          .then((data) => {
            setCartDetails(data.items); // store the data using useState function setCartDetails
          });
      } 
    };
    getCartData();
  }, []);

  const handleDeleteCartItem = function (value) {
    // this is the function to remove cart item.
    let token = localStorage.getItem("token");
    // first we filter out the deleted cart item from the cartDetails array by using item's id
    setCartDetails(cartDetails.filter(el=>{
      return (el._id !== value._id)
    }))
   // now we request the server to remove the item from database also.
    axios
      .post("http://localhost:8000/cart/delete", { ...value }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("deleted successfully", res);
        
      })
      .catch((err) => {
        console.log(err);
      });
   
  };

  const CartItem = function (props) {
    // this is a react component that displays one Cart item. 
   
    const handleSelect = async(e)=>{
       // this is the function to update the quantity of the product. at the time of checkout
       // we update the quantity value to the server 
      await axios.put(`http://localhost:8000/cart/update/${props._id}`,{quantity:e.target.value}).then(res=>{
        return res.data
      }).then(result=>{
        setCartDetails(result.items) // update the cartDetails array with the updated cart data we get from the server
      })
      
    }

    return (
      <div>
          <div className="d-flex flex-row" >
            <img className="cartImage" alt={props.title} src={props.image} style={{width:"10%"}}/>
           <div className="d-flex flex-column" style={{width:"90%",marginLeft:"5%"}}>
           <h2 onClick={()=>{navigate(`/product/${props.productId}`)}} className="fs-5 text-capitalize" >
              {props.title}
            </h2>   
            <div className="d-flex flex-row ">
            <div style={{width:"70%"}}>
            <span className="text-decoration-line-through fs-6 fw-light" style={{paddingRight:"5%"}}>
             $ {props.price}
            </span>
            <span className="fw-light fs-6">
             $ {(props.price - ((props.discountPercentage/100)*props.price)).toFixed(2)}
            </span>
            </div>
            <form style={{width:"20%"}} >
              <span className="fw-light">Qty  </span>
              <select onChange={handleSelect}>
              <option selected>{props.quantity}</option>
              <option   value={1}>{1}</option> 
              <option   value={2}>{2}</option>
              <option   value={3}>{3}</option>
              <option   value={4}>{4}</option>
              <option   value={5}>{5}</option>
              </select>
            </form>
            <button
                     onClick={() => handleDeleteCartItem(props)}
                      className=" btn btn-sm btn-outline-danger delete-cart-item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                        />
                        <path
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                        />
                      </svg>
                    </button>
          </div>
           </div>
          </div>
         
      </div>
    );
  };
  // calculated the total price, discounted price and total quantity of product

   let totalPrice =0;
   let discountPrice = 0.0;
   let quantity = 0;
   if(cartDetails && cartDetails.length>0){
    cartDetails.forEach(el=>{
      totalPrice = totalPrice + (el.quantity*el.price);
      discountPrice = discountPrice + (el.price - ((el.discountPercentage/100)*el.price).toFixed(2))*el.quantity
      quantity += el.quantity
    })
   }
  // the function to handle the checkout button click
  const handleCheckOut = ()=>{
    let token = localStorage.getItem("token");
    // we clear the cart after we placed the order and post all the items in Order history 
    //post request to add items to order history
    axios.post("http://localhost:8000/orderHistory",{data:cartDetails},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setCartDetails([]);
    // request to empty the cart
    axios.get("http://localhost:8000/emptyCart",{headers:{
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }})
    alert("Your Order Has Been Placed");
  }
  
    return (
      <section>
        <div className="d-flex flex-row">
          <div style={{width:"60%"}}>
            {(cartDetails && cartDetails.length > 0) ? ( // we check if cart is empty 
            // if not map each element to the CartItem Component
              cartDetails.map((el) => {
                return (
                  <div className="cartItem">
                    <CartItem {...el} />
                  </div>
                );
              })
            ) : (// if cart is empty we display a PNG /Image
              <div><img src="https://cdn.dribbble.com/users/721524/screenshots/4112199/no_orders.png" className="no-cart-png" alt="gif"/></div>
            )}
          </div>
          <div  style={{width:"40%"}}>
          <div>
          <h1>Order</h1>
          <br/>
          <div>
            <h4>Order Details</h4>
            <ul>
              <li>
                <span>Quantity : </span>
                <span>{quantity}</span>
              </li>
              <li>
                <span>Total Price : </span>
                <span> <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="20"
              fill="currentColor"
              className="bi bi-currency-dollar"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
              />
            </svg>{totalPrice}</span>
              </li>
              <li>
                <span>
                  Discounted Price : 
                </span>
                <span> <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="20"
              fill="currentColor"
              className="bi bi-currency-dollar"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
              />
            </svg>{discountPrice.toFixed(2)}</span>
              </li>
              <li>
                <span>
                  Price You Need To Pay : 
                </span>
                <span>
                <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="20"
              fill="currentColor"
              className="bi bi-currency-dollar"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
              />
            </svg>{discountPrice.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
          </div>
          <div className="bg-white" style={{padding:"2%",marginTop:"8%"}}>
            {(cartDetails && cartDetails.length>0)?<button onClick={handleCheckOut} className="btn-xl btn btn-outline-success">CheckOut</button>:<div style={{padding:"2%",marginTop:"8%"}}></div>}
          </div>
        </div>
        </div>
      </section>
    );
   
};

export default Cart;
