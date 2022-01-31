import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Header from './components/layout/Header/header.js';
import './App.css';
import WebFont from 'webfontloader';
import React, {useEffect} from 'react';
import Footer from "./components/layout/Footer/footer.js";
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'
import Products from "./components/Product/Products.js";
import Search from './components/Product/Search.js';
import { LoginSignUp } from "./components/User/LoginSignUp.js";

function App() {
    useEffect(() => {
        WebFont.load({
            google: {
              families: ["Roboto", "Droid Sans", "Chilanka"],
            },
          });
    }, []);
    return <Router>
        <Header/>
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<LoginSignUp />} />
        </Routes>
        <Footer/>
    </Router>
}
export default App;
