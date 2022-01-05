import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../components/logContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "font-awesome/css/font-awesome.min.css";
import { Helmet } from "react-helmet";
import { Add, Remove } from "@material-ui/icons";
// import { ClearIcon } from '@mui/icons-material';
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { STRIPE_KEY } from "../config/db";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { removeProduct } from "../reducers/cart/cart";

const KEY = STRIPE_KEY;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [product, setProduct] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const AuthStr = "Bearer ".concat(token);
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = localStorage.getItem("cart")
  

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    console.log(cart.total);
console.log(cartItems);
localStorage.setItem('cart',cart)
    const makeRequest = async () => {
      try {
        const res = await axios.post(`http://localhost:8080/checkout/payment`, {
          tokenId: stripeToken.id,
          amount: 500,
        });
        Swal.fire({
          icon: "success",
          title: `Your Order Has Been Placed`,
        });
        setTimeout(() => {
          navigate("../", { replace: true });
          // window.location.reload()
        }, 1000);
        // navigate("/",{
        //   stripeData: res.data,
        //   products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const removeItem = (p) => {
    dispatch(removeProduct(p._id));
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <Link to="/products">
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
              <TopText>Shopping Bag({cart.products.length})</TopText>
            </TopTexts>
          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(product)}
                      >
                        X
                      </button>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>

              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              {cart.total ? (
                <StripeCheckout
                  name="East Store"
                  image="https://www.freepnglogos.com/uploads/running/running-icon-transparent-running-images-vector-8.png"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
              ) : (<Button onClick={() => {Swal.fire({
                icon: "warning",
                title: `Cart is empty!`,
              })}}>CHECKOUT NOW</Button>
                
              )}
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Cart;
