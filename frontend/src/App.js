import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Header from './components/layout/Header/header.js';
import './App.css';
import WebFont from 'webfontloader';
import React, {useEffect} from 'react';
import Footer from "./components/layout/Footer/footer.js";
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js'

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
        </Routes>
        <Footer/>
    </Router>
}
export default App;
