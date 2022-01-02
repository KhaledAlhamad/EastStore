import React from "react";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



const Footer = () => {
  return (
    <div>
      <footer className="text-center text-white" style={{backgroundColor: 'white'}}>
        {/* Grid container */}
        <div className="container pt-4">
          {/* Section: Social media */}
          <section className="mb-4">
           {/* Linkedin */}
            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/khalid-alhamad/" role="button" data-mdb-ripple-color="dark"><i className="fab fa-linkedin" /></a>
            {/* Github */}
            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://github.com/KhaledAlhamad" role="button" data-mdb-ripple-color="dark"><i className="fab fa-github" /></a>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div className="text-center text-dark p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          © Made by Khaled Alhamad:
          
        </div>
        {/* Copyright */}
      </footer>
    </div>
  );
};

export default Footer;
