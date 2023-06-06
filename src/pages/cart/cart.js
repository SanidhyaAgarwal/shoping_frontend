import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import "./cart.css";
import { useEffect, useState } from "react";

const SHIPPING_CHARGES = 25;

const Cart = () => {
  const[cartIds,setCartIds]=useState([])
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const[cartData,setCartData]=useState([])
  const[address,setAddress]=useState([])
  const[addressId,setAddressId]=useState(null)
  const[trigger,setTrigger]=useState(true)
  const removeCart=(id)=>{
    
    fetch(`http://localhost:8081/api/carts/inactive/${id}`,{
      method:"PUT",headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=>{
      if(!res.ok){
        throw Error("not found")
      }
      return res.json()
    }).then((data)=>{
      setTrigger(!trigger)
    })

  }
  
  const cartTotal=()=>{
    var total=0;
    var listOfId=[];
    cartData.map((items)=>{
      listOfId.push(items.cartId);
      total+=(items.product.price*items.quantity)
    })
    return total;
  }

  const round = (value, decimals) => {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  };
  useEffect(() => {
    const userId=1;
    fetch(`http://localhost:8081/api/carts/active/${userId}`)
    .then((res)=>{
      if(!res.ok){
        throw Error("not found")
      }
      return res.json()
    }).then((data)=>{
      setCartData(data)
    })
    
  }, [trigger]);
  useEffect(() => {
    const userId=1;
    fetch(`http://localhost:8081/api/address/usersaddresses/${userId}`)
    .then((res)=>{
      if(!res.ok){
        throw Error("not found")
      }
      return res.json()
    }).then((data)=>{
      setAddress(data)
    
    })
    
  }, [trigger]);

  const increment=(id,quantity)=>{
    var inc=quantity+1;
    fetch(`http://localhost:8081/api/carts/${id}/?quantity=${inc}`,{
      method:"PUT",headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=>{
      if(!res.ok){
        throw Error("not found")
      }
      return res.json()
    }).then((data)=>{
      setTrigger(!trigger)
    })
  }
  const decrement=(id,quantity)=>{
    var dec=quantity-1;
    fetch(`http://localhost:8081/api/carts/${id}/?quantity=${dec}`,{
      method:"PUT",headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=>{
      if(!res.ok){
        throw Error("not found")
      }
      return res.json()
    }).then((data)=>{
      setTrigger(!trigger)
    })
  }
  return (
    <div className="cartWrapper">
      <div className="container">
        {cartData.length >= 1 ? (
          <div className="grid my-5">
            <div className="cartItem p-3">
              <h2>Order Summary</h2>
              {cartData.map((item) => (
                <div className="item" key={item.product.prodId}>
                  <div className="grid py-3">
                    <div className="itemImage">
                      <img src={item.product.imgUrl} alt="" />
                    </div>
                    <div className="itemDesc">
                      <div className="title">
                        <Link
                          to={"/product/" + item.product.prodId}
                          className="titleLink"
                        >
                          {item.product.prodName}
                        </Link>
                      </div>
                      <span className="price">
                        ₹{round(item.product.price * item.quantity, 2)}
                      </span>
                      {/* <div className="remove">Remove</div> */}
                    </div>
                    <div className="itemControl flex">
                      <div>
                        <button
                          onClick={() => increment(item.cartId,item.quantity)}
                          className="addQty"
                        >
                          +
                        </button>
                        <span className="mx-1">{item.quantity}</span>
                        <button
                          onClick={() => decrement(item.cartId,item.quantity)}
                          disabled={item.quantity === 1}
                          className="removeQty"
                        >
                          -
                        </button>
                        <div
                          className="remove my-1"
                          onClick={() => removeCart(item.cartId)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="payment p-3">
              <h2>Payment Summary</h2>
              <div className="summary py-3 my-2">
                <div className="flex py-1">
                  <span>Subtotal:</span>
                  <span className="price">₹{round(cartTotal(), 2)}</span>
                </div>
                <div className="flex py-1">
                  <span>Shipping Fee:</span>
                  <span className="price">₹{SHIPPING_CHARGES}</span>
                </div>
                <div className=" flex py-1">
                  <span>Total:</span>
                  <span className="price">
                    ₹{round(cartTotal() + SHIPPING_CHARGES, 2)}
                  </span>
                </div>
              </div>
              <div className=" flex py-1">
                  <span>Select address</span>
                  <span className="price">
                  <select >
                    {address && address.map((add)=>
                    <option>{add.address}</option>)
                    }
                <option>hi</option>
                <option>hi</option>
                <option>hi</option>
              </select>
                  </span>
                </div>
              
        
              <Link
                to={"/payment"}
                className="titleLink"
              >
                <button>checkout</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="error">
            <p>&#9432; Cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Cart };
