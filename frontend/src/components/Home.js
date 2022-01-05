import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "./logContext";
import Category from "./Category/Category";
import '../components/Category/Category.css'
import Carousel from "./Carousel/Carousel";
import Products from "./Products";
import Footer from "./Footer";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;


const Home = () => {
  const token = localStorage.getItem("username");
  const uid = localStorage.getItem("uid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user, setUser }= useContext(UserContext)




  useEffect(() => {
    // console.log(`username`, token);
    axios.get("/product").then((res) => {
      setProducts(res.data);
      setLoading(false);
      console.log(res.data);
    });
  }, []);

  const addToCart = (product) => {
      if(token){
        console.log(product)
        // navigate("/cart", {product:product});
        // navigate(`/cart`,  {state: product} )
        axios.post('/cart', {
            userId: uid,
            product: [product]
        }).then((res) => {
            console.log(res)
        })

      }  else{
        Swal.fire({
            icon: "warning",
            title: `Please login first`,
          });
        setTimeout(() => {
            navigate("/login", { replace: true });
            // window.location.reload()
          }, 2000);
      } 
  }
  if (loading) {
    return (
        <div className="sweet-loading">
      <ClipLoader loading={loading} css={override} size={150} />
    </div>
    );
  }
  return (
    <div>
      <div>
       <Carousel/> 
        <Category />
        <Products/> 
      </div>
    </div>
  );
};

export default Home;
