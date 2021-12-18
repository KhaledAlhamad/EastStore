import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./logContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import 'font-awesome/css/font-awesome.min.css'


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

  useEffect(() => {
    // console.log(uid);
    //   if(!user?.id) return;
    //   console.log(user.id);
    axios.get(`http://localhost:8080/cart/${uid}`).then((res) => {
      setProduct(res.data[0].product);
      console.log(res.data[0].product);
      setLoading(false);
    });
    // console.log(state);
  }, []);

  const removeItem = () => {
      console.log('removed')
      axios.delete(`http://localhost:8080/cart/${uid}`, )
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
      {/* {product.map((e) => (
        <div>
          <img src={e.image}></img>
        </div>
      ))}
      <h1>{product[1].name}</h1> */}
      {/* <div className="container mt-5 p-3 rounded cart">
    <div className="row no-gutters">
        <div className="col-md-8">
            <div className="product-details mr-2">
                <div className="d-flex flex-row align-items-center"><i className="fa fa-long-arrow-left"></i><span className="ml-2">Continue Shopping</span></div>
                <hr/>
                <h6 className="mb-0">Shopping cart</h6>
                <div className="d-flex justify-content-between"><span>You have 4 items in your cart</span>
                    <div className="d-flex flex-row align-items-center"><span className="text-black-50">Sort by:</span>
                        <div className="price ml-2"><span className="mr-1">price</span><i className="fa fa-angle-down"></i></div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                    <div className="d-flex flex-row"><img className="rounded" src="https://i.imgur.com/QRwjbm5.jpg" width="40"/>
                        <div className="ml-2"><span className="font-weight-bold d-block">Iphone 11 pro</span><span className="spec">256GB, Navy Blue</span></div>
                    </div>
                    <div className="d-flex flex-row align-items-center"><span className="d-block">2</span><span className="d-block ml-5 font-weight-bold">$900</span><i className="fa fa-trash-o ml-3 text-black-50"></i></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                    <div className="d-flex flex-row"><img className="rounded" src="https://i.imgur.com/GQnIUfs.jpg" width="40"/>
                        <div className="ml-2"><span className="font-weight-bold d-block">One pro 7T</span><span className="spec">256GB, Navy Blue</span></div>
                    </div>
                    <div className="d-flex flex-row align-items-center"><span className="d-block">2</span><span className="d-block ml-5 font-weight-bold">$900</span><i className="fa fa-trash-o ml-3 text-black-50"></i></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                    <div className="d-flex flex-row"><img className="rounded" src="https://i.imgur.com/o2fKskJ.jpg" width="40"/>
                        <div className="ml-2"><span className="font-weight-bold d-block">Google pixel 4 XL</span><span className="spec">256GB, Axe black</span></div>
                    </div>
                    <div className="d-flex flex-row align-items-center"><span className="d-block">1</span><span className="d-block ml-5 font-weight-bold">$800</span><i className="fa fa-trash-o ml-3 text-black-50"></i></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                    <div className="d-flex flex-row"><img className="rounded" src="https://i.imgur.com/Tja5H1c.jpg" width="40"/>
                        <div className="ml-2"><span className="font-weight-bold d-block">Samsung galaxy Note 10&nbsp;</span><span className="spec">256GB, Navy Blue</span></div>
                    </div>
                    <div className="d-flex flex-row align-items-center"><span className="d-block">1</span><span className="d-block ml-5 font-weight-bold">$999</span><i className="fa fa-trash-o ml-3 text-black-50"></i></div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="payment-info">
                <div className="d-flex justify-content-between align-items-center"><span>Card details</span><img className="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30"></div><span className="type d-block mt-3 mb-1">Card type</span><label className="radio"> <input type="radio" name="card" value="payment" checked> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
                <label className="radio"> <input type="radio" name="card" value="payment"/> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>
                <label className="radio"> <input type="radio" name="card" value="payment"/> <span><img width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>
                <label className="radio"> <input type="radio" name="card" value="payment"/> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png" /></span> </label>
                <div><label className="credit-card-label">Name on card</label><input type="text" className="form-control credit-inputs" placeholder="Name"/></div>
                <div><label className="credit-card-label">Card number</label><input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000"/></div>
                <div className="row">
                    <div className="col-md-6"><label className="credit-card-label">Date</label><input type="text" className="form-control credit-inputs" placeholder="12/24"/></div>
                    <div className="col-md-6"><label className="credit-card-label">CVV</label><input type="text" className="form-control credit-inputs" placeholder="342"/></div>
                </div>
                <hr className="line"/>
                <div className="d-flex justify-content-between information"><span>Subtotal</span><span>$3000.00</span></div>
                <div className="d-flex justify-content-between information"><span>Shipping</span><span>$20.00</span></div>
                <div className="d-flex justify-content-between information"><span>Total(Incl. taxes)</span><span>$3020.00</span></div><button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button"><span>$3020.00</span><span>Checkout<i className="fa fa-long-arrow-right ml-1"></i></span></button>
            </div>
        </div>
    </div>
</div> */}
<div className="container mt-5 p-3 rounded cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center"><i className="fa fa-arrow-left" /><span className="ml-2">Continue Shopping</span></div>
              <hr />
              <h6 className="mb-0">Shopping cart</h6>
              <div className="d-flex justify-content-between"><span>You have {product.length} items in your cart</span>
                <div className="d-flex flex-row align-items-center"><span className="text-black-50">Sort by:</span>
                  <div className="price ml-2"><span className="mr-1">price</span><i className="fa fa-angle-down" /></div>
                </div>
              </div>
              {product.map((e) => (
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                <div className="d-flex flex-row"><img className="rounded" src={e?.image} width={40} />
                  <div className="ml-2"><span className="font-weight-bold d-block">{e.name}</span><span className="spec">{e?.color}</span></div>
                </div>
                <div className="d-flex flex-row align-items-center"><span className="d-block">{e?.quantity}</span><span className="d-block ml-5 font-weight-bold">${e?.price}</span><button className="btn btn-danger" onClick={() => removeItem()}><i className="fa fa-trash ml-3 text-black-50" /></button></div>
              </div>
              ))}
              
            </div>
          </div>
          <div className="col-md-4">
            <div className="payment-info">
              <div className="d-flex justify-content-between align-items-center"><span>Card details</span><img className="rounded" src="https://i.imgur.com/WU501C8.jpg" width={30} /></div><span className="type d-block mt-3 mb-1">Card type</span><label className="radio"> <input type="radio" name="card" defaultValue="payment" defaultChecked /> <span><img width={30} src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
              <label className="radio"> <input type="radio" name="card" defaultValue="payment" /> <span><img width={30} src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>
              <label className="radio"> <input type="radio" name="card" defaultValue="payment" /> <span><img width={30} src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>
              <label className="radio"> <input type="radio" name="card" defaultValue="payment" /> <span><img width={30} src="https://img.icons8.com/officel/48/000000/paypal.png" /></span> </label>
              <div><label className="credit-card-label">Name on card</label><input type="text" className="form-control credit-inputs" placeholder="Name" /></div>
              <div><label className="credit-card-label">Card number</label><input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" /></div>
              <div className="row">
                <div className="col-md-6"><label className="credit-card-label">Date</label><input type="text" className="form-control credit-inputs" placeholder="12/24" /></div>
                <div className="col-md-6"><label className="credit-card-label">CVV</label><input type="text" className="form-control credit-inputs" placeholder={342} /></div>
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information"><span>Subtotal</span><span>$3000.00</span></div>
              <div className="d-flex justify-content-between information"><span>Shipping</span><span>$20.00</span></div>
              <div className="d-flex justify-content-between information"><span>Total(Incl. taxes)</span><span>$3020.00</span></div><button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button"><span>$3020.00</span><span>Checkout<i className="fa fa-long-arrow-right ml-1" /></span></button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Cart;
