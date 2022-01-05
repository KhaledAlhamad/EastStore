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
import "../Cart/Cart.css";
import { Helmet } from "react-helmet";

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
  const AuthStr = "Bearer ".concat(token);

  useEffect(() => {
    console.log(uid);
    // //   if(!user?.id) return;
    // //   console.log(user.id);
    user
      ? axios
          .get(`http://localhost:8080/cart/${uid}`, {
            headers: { token: AuthStr },
          })
          .then((res) => {
            setProduct(res.data[0]?.product);
            console.log(res.data[0]?.product);
            setLoading(false);
          })
      : console.log("login first");
    console.log(AuthStr);
  }, []);

  const removeItem = (e) => {
    console.log(e._id);
    console.log(uid);

    axios
      .delete(`http://localhost:8080/cart`, {
        userId: uid,
        productId: e._id,
      })
      .then((res) => {
        console.log(res);
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
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {product?.length === 0 ? (
        <h1>Empty</h1>
      ) : (
        <div className="cartfull">
          <div className="cart">
            <h1>Your Cart : {product?.length}</h1>
            <div className="productsoncart">
              {/* {product.map(product =>(
                    <Productoncart product = {product} />
                ))} */}
            </div>
          </div>
          <div className="totalcart">
            <h3>
              {/* Subtotal ({product.reduce((acc,item)=>acc+item.qty,0)} items) : */}
            </h3>
            <h3 className="totalprice">
              {/* {product.reduce((acc,item )=>
                acc + item.qty * item.price,0

             ).toFixed(2)}$ */}
            </h3>
            <h3>Delivery :</h3>
            <h3 className="totalprice">For free.</h3>
            <h3>Taxes :</h3>
            <h3 className="totalprice">-- --.</h3>
            <h3>Total :</h3>
            <h3 className="totalprice">
              {/* {product?.reduce((acc,item )=>
                acc + item.qty * item.price,0

             ).toFixed(2)}$ */}
            </h3>
            <button className="checkoutbtn" disabled={product?.length === 0}>
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
