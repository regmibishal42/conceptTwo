import React, {Fragment, useEffect,useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, getProductDetails} from '../../actions/productAction';
import {useParams} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert";
import MetaData from '../layout/metadata';
import {addItemsToCart} from '../../actions/cartAction';

// https://rukminim1.flixcart.com/image/416/416/bike-crash-guard/7/m/8/cbzlh0010d200-390-corebikerz-original-imaeqy4rbcjgspyz.jpeg?q=70
const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {product, loading, error} = useSelector((state) => state.productDetails)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id,error,alert]);

    const addToCartHandler = () =>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Items Added To Cart");
    }

    const options = {
        edit:false,
        color:"rbga(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth <600 ?20:25,
        value:product.rating,
        isHalf:true,
    }
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () =>{
        if(product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity =() =>{
        if(quantity === 1) return;
        setQuantity(quantity-1); 
    }
    return (
        <Fragment>
            
            {loading ? <Loader /> :<Fragment>
                <MetaData title={`${product.name} --conceptTwo`} />
        <div className='ProductDetails'>
            <div>
            <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
                <div className='detailsBlock-1'>
                    <h2>{
                        product.name
                    }</h2>
                    <p>Product # {
                        product._id
                    }</p>
                </div>
                <div className='detailsBlock-2'>
                    <ReactStars {...options}/>
                    <span>({
                        product.numOfReviews
                    }
                        Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                    <h1>{
                        `रु${
                            product.price
                        }`
                    }</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly value={quantity} type='number'/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button onClick={addToCartHandler}>Add To Cart</button>
                    </div>
                    <p>Status:<b className={
                            product.stock < 1 ? "redColor" : "greenColor"
                        }>
                            {
                            product.stock < 1 ? "OutOfStock" : "InStock"
                        } </b>
                    </p>

                </div>
                <div className='detailsBlock-4'>
                    Description:<p>{product.description}</p>
                </div>
                <button className='submitButton'>Submit Review</button>
            </div>
        </div>
        <h3 className='reviewHeading'>Reviews</h3>
        {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
                {product.reviews.map(review =><ReviewCard review={review} />)}
            </div>
        ):(
            <p className='noReviews'>No Reviews Yet</p>
        )}
    </Fragment>}
        </Fragment>
    );

};

export default ProductDetails;
