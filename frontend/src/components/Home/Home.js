import React, {Fragment} from 'react';
import {CgMouse} from 'react-icons/cg';
import Product from "./Products.js";
import "./Home.css";


// Temporarry Products until Fetching real products using Redux
const product = {
    name:"Hand Guard Ktm Duke",
    images:[{url:''}],
    price:3500,
    _id:'dukehandid001'
};


const Home = () => {
    return <Fragment>
        <div className='banner'>
            <p>Welcome To conceptTwo</p>

            <h1>Find Amazing Products</h1>
            <a href='#container'>
                <button>Scroll<CgMouse/></button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>

{/* Displaying Products Here -- Products Section Here */}
        <div className='container' id="container">
            <Product product={product} />
        </div>
    </Fragment>
}

export default Home
