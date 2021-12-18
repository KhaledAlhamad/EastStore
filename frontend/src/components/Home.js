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
    axios.get("http://localhost:8080/product").then((res) => {
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
        axios.post('http://localhost:8080/cart', {
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
      {/* <h1>Home {token}</h1> */}
      {/* <div>
        <section className="u-clearfix u-section-1" id="sec-f0b2">
          <div className="u-clearfix u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-align-right u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
                  <div className="u-container-layout u-valign-middle u-container-layout-1">
                    <h3 className="u-text u-text-default u-text-1">
                      last chance
                    </h3>
                    <h1 className="u-text u-text-default u-text-2">
                      70%
                      <br />
                    </h1>
                    <h2 className="u-text u-text-default u-text-3">off all</h2>
                    <p className="u-text u-text-default u-text-4">
                      Sample text. Click to select the text box. Click again or
                      double click to start editing the text.
                    </p>
                    <a
                      href="#"
                      className="u-active-none u-border-10 u-border-black u-btn u-btn-rectangle u-button-style u-hover-none u-none u-btn-1"
                    >
                      start now
                    </a>
                  </div>
                </div>
                <div
                  className="u-container-style u-image u-layout-cell u-right-cell u-size-30 u-image-1"
                  data-image-width={150}
                  data-image-height={101}
                >
                  <div className="u-container-layout u-container-layout-2" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="u-backlink u-clearfix u-grey-80">
          <a
            className="u-link"
            href="https://nicepage.com/website-templates"
            target="_blank"
          >
            <span>Website Templates</span>
          </a>
          <p className="u-text">
            <span>created with</span>
          </p>
          <a className="u-link" >
            <span>Website Builder Software</span>
          </a>
          
        </section>
      </div> */}

      <div>
        <section className="u-clearfix u-section-1" id="sec-f0b2">
          <div className="u-clearfix u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-align-right u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
                  <div className="u-container-layout u-valign-middle u-container-layout-1">
                    <h3 className="u-text u-text-default u-text-1">
                      last chance
                    </h3>
                    <h1 className="u-text u-text-default u-text-2">
                      70%
                      <br />
                    </h1>
                    <h2 className="u-text u-text-default u-text-3">off all</h2>
                    <p className="u-text u-text-default u-text-4">
                      Sample text. Click to select the text box. Click again or
                      double click to start editing the text.
                    </p>
                    <a
                      href="#"
                      className="u-active-none u-border-10 u-border-black u-btn u-btn-rectangle u-button-style u-hover-none u-none u-btn-1"
                    >
                      start now
                    </a>
                  </div>
                </div>
                <div
                  className="u-container-style u-image u-layout-cell u-right-cell u-size-30 u-image-1"
                  data-image-width={1278}
                  data-image-height={864}
                >
                  <div className="u-container-layout u-container-layout-2" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="u-clearfix u-section-2" id="sec-0149">
          <div className="u-clearfix u-sheet u-sheet-1">
            <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
              <div className="u-layout" style={{}}>
                <div className="u-layout-row" style={{}}>
                  <div
                    className="u-align-center u-container-style u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-white u-layout-cell-1"
                    src
                  >
                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                      <span className="u-icon u-icon-circle u-palette-1-base u-spacing-10 u-icon-1">
                        <svg
                          className="u-svg-link"
                          preserveAspectRatio="xMidYMin slice"
                          viewBox="0 0 32 32"
                          style={{}}
                        >
                          <use xlinkHref="#svg-1755" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          xmlSpace="preserve"
                          className="u-svg-content"
                          viewBox="0 0 32 32"
                          id="svg-1755"
                        >
                          <g>
                            <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z" />
                          </g>
                        </svg>
                      </span>
                      <h2 className="u-text u-text-default u-text-1">RUN</h2>
                      <p className="u-text u-text-2">
                        Sample text. Click to select the text box. Click again
                        or double click to start editing the text.
                      </p>
                      <a
                        href
                        className="u-active-none u-border-2 u-border-palette-1-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-btn-1"
                      >
                        learn more
                      </a>
                      <a
                        href="https://www.scmp.com/lifestyle/interiors-living/article/2126797/why-we-should-be-greening-our-homes-plants-top-trend-2018"
                        className="u-border-4 u-border-grey-dark-1 u-btn u-button-style u-custom-font u-font-playfair-display u-btn-2"
                        target="_blank"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                  {/* ------------------ FIRST IMAGE ---------------------- */}
                  <div
                    className="u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-1"
                    src
                    data-image-width={1200}
                    data-image-height={1200}
                  >
                    <div
                      className="u-container-layout u-valign-middle u-container-layout-2"
                      src
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="u-align-center u-clearfix u-section-3"
          id="carousel_c7ba"
        >
          <div className="u-clearfix u-sheet u-sheet-1">
            <h2 className="u-custom-font u-font-playfair-display u-text u-text-default u-text-1">
              Quilted sport shoes
            </h2>
            <p className="u-text u-text-default u-text-grey-40 u-text-2">
              Sample text. Click to select the text box. Click again or double
              click to start editing the text.
            </p>
            <div className="u-expanded-width u-list u-list-1">
              <div className="u-repeater u-repeater-1">
                <div className="u-container-style u-list-item u-repeater-item">
                  <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-1">
                    <img
                      className="u-image u-image-contain u-image-1"
                      src={products[0].image}
                      data-image-width={1280}
                      data-image-height={853}
                    />
                    <p className="u-text u-text-default u-text-grey-40 u-text-3">
                      Sample text. Click to select the text box. Click again or
                      double click to start editing the text.
                    </p>
                    <button className="btn btn-success" onClick={() => addToCart(products[0])}>buy</button>
                  </div>
                </div>
                <div className="u-container-style u-list-item u-repeater-item">
                  <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-2">
                    <img
                      className="u-image u-image-contain u-image-2"
                      src={products[1].image}
                      data-image-width={840}
                      data-image-height={840}
                    />
                    <p className="u-text u-text-default u-text-grey-40 u-text-4">
                      Sample text. Click to select the text box. Click again or
                      double click to start editing the text.
                    </p>
                    <button className="btn btn-success" onClick={() => addToCart(products[1])}>buy</button>

                  </div>
                </div>
                <div className="u-container-style u-list-item u-repeater-item">
                  <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-3">
                    <img
                      className="u-image u-image-contain u-image-3"
                      src="images/shoe.png"
                      data-image-width={1000}
                      data-image-height={1334}
                    />
                    <p className="u-text u-text-default u-text-grey-40 u-text-5">
                      Sample text. Click to select the text box. Click again or
                      double click to start editing the text.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://www.scmp.com/lifestyle/interiors-living/article/2126797/why-we-should-be-greening-our-homes-plants-top-trend-2018"
              className="u-border-4 u-border-grey-dark-1 u-btn u-button-style u-custom-font u-font-playfair-display u-btn-1"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </section>
        <section className="u-backlink u-clearfix u-grey-80">
          <a
            className="u-link"
            href="https://nicepage.com/website-templates"
            target="_blank"
          >
            <span>Website Templates</span>
          </a>
          <p className="u-text">
            <span>created with</span>
          </p>
          <a className="u-link">
            <span>Website Builder Software</span>
          </a>
          .
        </section>
      </div>
    </div>
  );
};

export default Home;
