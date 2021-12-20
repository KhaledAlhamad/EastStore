import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../logContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "font-awesome/css/font-awesome.min.css";
import '../Cart/Cart.css'
import { Helmet } from 'react-helmet';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const Cart = () => {
  // const {params} = props.product
  //   const { state } = useLocation();
  const [product, setProduct] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const AuthStr = 'Bearer '.concat(token); 

  


  useEffect(() => {
    console.log(uid);
    // //   if(!user?.id) return;
    // //   console.log(user.id);
    user ? axios.get(`http://localhost:8080/cart/${uid}`,
    { headers: { token: AuthStr } }).then((res) => {
      setProduct(res.data[0]?.product);
      console.log(res.data[0]?.product);
      setLoading(false);
    }) : console.log("login first");;
    console.log(AuthStr);
  }, []);

  const removeItem = (e) => {
    console.log(e._id);
    console.log(uid);


    axios.delete(`http://localhost:8080/cart`, {
      userId: uid,
      productId: e._id,
    }).then((res) =>{
      console.log(res)
    });
  };

  // if (loading) {
  //   return (
  //     <div className="sweet-loading">
  //       <ClipLoader loading={loading} css={override} size={150} />
  //     </div>
  //   );
  // }
  return (
    <div>
{/*      
      <div className="container mt-5 p-3 rounded cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center">
                <i className="fa fa-arrow-left" />
                <span className="ml-2">Continue Shopping</span>
              </div>
              <hr />
              <h6 className="mb-0">Shopping cart</h6>
              <div className="d-flex justify-content-between">
                <span>You have {product?.length} items in your cart</span>
                <div className="d-flex flex-row align-items-center">
                  <span className="text-black-50">Sort by:</span>
                  <div className="price ml-2">
                    <span className="mr-1">price</span>
                    <i className="fa fa-angle-down" />
                  </div>
                </div>
              </div>
              {product?.map((e) => (
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                  <div className="d-flex flex-row">
                    <img className="rounded" src={e?.image} width={40} />
                    <div className="ml-2">
                      <span className="font-weight-bold d-block">{e.name}</span>
                      <span className="spec">{e?.color}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="d-block">{e?.quantity}</span>
                    <span className="d-block ml-5 font-weight-bold">
                      ${e?.price}
                    </span>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(e)}
                    >
                      <i className="fa fa-trash ml-3 text-black-50" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="payment-info">
              <div className="d-flex justify-content-between align-items-center">
                <span>Card details</span>
                <img
                  className="rounded"
                  src="https://i.imgur.com/WU501C8.jpg"
                  width={30}
                />
              </div>
              <span className="type d-block mt-3 mb-1">Card type</span>
              <label className="radio">
                {" "}
                <input
                  type="radio"
                  name="card"
                  defaultValue="payment"
                  defaultChecked
                />{" "}
                <span>
                  <img
                    width={30}
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                  />
                </span>{" "}
              </label>
              <label className="radio">
                {" "}
                <input type="radio" name="card" defaultValue="payment" />{" "}
                <span>
                  <img
                    width={30}
                    src="https://img.icons8.com/officel/48/000000/visa.png"
                  />
                </span>{" "}
              </label>
              <label className="radio">
                {" "}
                <input type="radio" name="card" defaultValue="payment" />{" "}
                <span>
                  <img
                    width={30}
                    src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
                  />
                </span>{" "}
              </label>
              <label className="radio">
                {" "}
                <input type="radio" name="card" defaultValue="payment" />{" "}
                <span>
                  <img
                    width={30}
                    src="https://img.icons8.com/officel/48/000000/paypal.png"
                  />
                </span>{" "}
              </label>
              <div>
                <label className="credit-card-label">Name on card</label>
                <input
                  type="text"
                  className="form-control credit-inputs"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="credit-card-label">Card number</label>
                <input
                  type="text"
                  className="form-control credit-inputs"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="credit-card-label">Date</label>
                  <input
                    type="text"
                    className="form-control credit-inputs"
                    placeholder="12/24"
                  />
                </div>
                <div className="col-md-6">
                  <label className="credit-card-label">CVV</label>
                  <input
                    type="text"
                    className="form-control credit-inputs"
                    placeholder={342}
                  />
                </div>
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information">
                <span>Subtotal</span>
                <span>$3000.00</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Shipping</span>
                <span>$20.00</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Total(Incl. taxes)</span>
                <span>$3020.00</span>
              </div>
              <button
                className="btn btn-primary btn-block d-flex justify-content-between mt-3"
                type="button"
              >
                <span>$3020.00</span>
                <span>
                  Checkout
                  <i className="fa fa-long-arrow-right ml-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div> */}

<Helmet>
            <title>Cart</title>
        </Helmet>
        {product?.length === 0 ? 
        <h1>Empty</h1>
        :
        <div className ='cartfull'>
        <div className = 'cart'>
            <h1>Your Cart : {product?.length}</h1>
            <div className ='productsoncart'>
            {/* {product.map(product =>(
                    <Productoncart product = {product} />
                ))} */}
            </div>

        </div>
        <div className = 'totalcart'>
            <h3>
            {/* Subtotal ({product.reduce((acc,item)=>acc+item.qty,0)} items) : */}

            </h3>
            <h3 className = 'totalprice'>
            {/* {product.reduce((acc,item )=>
                acc + item.qty * item.price,0

             ).toFixed(2)}$ */}
            </h3>
            <h3>
            Delivery :

            </h3>
            <h3 className = 'totalprice'>
            For free.

            </h3>
            <h3>
            Taxes :

            </h3>
            <h3 className = 'totalprice'>
            -- --.

            </h3>
            <h3>
            Total :

            </h3>
            <h3 className = 'totalprice'>
            {/* {product?.reduce((acc,item )=>
                acc + item.qty * item.price,0

             ).toFixed(2)}$ */}
            </h3>
            <button className = 'checkoutbtn' disabled={product?.length===0} >
            CHECKOUT
            </button>
        </div>

        </div>
        }
      
    </div>
  );
};

export default Cart;
