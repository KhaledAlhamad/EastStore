import "./App.css";
import "./style.css"
import "./login.css"
import "./Home.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Cart from "./components/Cart";

function App() {
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
          <Route exact path="/cart" element={<Cart/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
