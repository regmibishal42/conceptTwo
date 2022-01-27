import React, {Fragment, useEffect} from 'react';
import {CgMouse} from 'react-icons/cg';
import ProductCard from "./ProductCard.js";
import "./Home.css";
import MetaData from '../layout/metadata';
import {clearErrors, getProduct}  from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert';

// Temporarry Products until Fetching real products using Redux
// const product = {
//     name:"Hand Guard Ktm Duke",
//     images:[{url:'https://hardwarepasal.com/src/img/product/multipleimages/2019-03-25-06-30-43_PaWaKHNxBR.jpg'}],
//     price:3500,
//     _id:'dukehandid001'
// };


const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector((state) => state.products);
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProduct());
    }, [dispatch,error,alert]);
    return (
        <Fragment> {
            loading ? (
                <Loader/>) : (
                <Fragment>
                    <MetaData title="conceptTwo"/>
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
                        {
                        products && products.map(product => (
                            <ProductCard key={
                                    product._id
                                }
                                product={product}/>
                        ))
                    } </div>
                </Fragment>
            )
        } </Fragment>
    )
}

export default Home
