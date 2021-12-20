// import "./App.css";
import "./login.css"
import "./Home.css"
import "./Cart.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/login/Login";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile";
// import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment";
import { useContext } from "react";
import { UserContext } from "../src/components/logContext";
import Category from "./components/Category/Category";
import Products from "./pages/Catalouge";
import Catalogue from "./pages/Catalouge";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";



function App() {
  const {user, setUser }= useContext(UserContext)

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/payment" element={<Payment/>}></Route>
          <Route exact path="/products" element={<Catalogue/>}> </Route>
          <Route exact path="/products/:category" element={<Catalogue />}> </Route>
          <Route exact path="/product" element={<Product/>}> </Route>
          <Route exact path="/product/:id" element={<Product />}> </Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
