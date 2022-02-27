import React, {Fragment, useEffect,useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction';
import {useParams} from 'react-router-dom';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert";
import MetaData from '../layout/metadata';
import {addItemsToCart} from '../../actions/cartAction';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from '@mui/material';
import {Rating} from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

// https://rukminim1.flixcart.com/image/416/416/bike-crash-guard/7/m/8/cbzlh0010d200-390-corebikerz-original-imaeqy4rbcjgspyz.jpeg?q=70
const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {product, loading, error} = useSelector((state) => state.productDetails);
    const {success,error:reviewError} = useSelector((state) => state.newReview);

    const options = {
        size:"large",
        value:product.rating,
        readOnly:true,
        precision:0.5
    };
    const [quantity, setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");
    const increaseQuantity = () =>{
        if(product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity =() =>{
        if(quantity === 1) return;
        setQuantity(quantity-1); 
    };
    const addToCartHandler = () =>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Items Added To Cart");
    };
    const submitReviewToggle = () =>{
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () =>{
        const myForm = new FormData();
        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",id);
        dispatch(newReview(myForm));
        setOpen(false);
    };
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        };
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors())
        };
        if(success){
            alert.success("Review Added SuccessFully");
            dispatch({type:NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id));
    }, [dispatch, success,id,error,alert,reviewError]);



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
                    <Rating {...options}/>
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
                        <button disabled={product.stock <1 ? true : false} onClick={addToCartHandler}>Add To Cart</button>
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
                <button onClick={submitReviewToggle} className='submitButton'>Submit Review</button>
            </div>
        </div>
        <h3 className='reviewHeading'>Reviews</h3>
        <Dialog
         aria-labelledby='simple-dialog-title'
         open={open}
         onClose={submitReviewToggle}
        >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
                <Rating onChange={(e)=> setRating(e.target.value)}
                value={rating}
                size="large"
                />
                <textarea 
                className='submitDialogTextArea'
                cols="30"
                rows='5'
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                >
                </textarea>
                <DialogActions>
                    <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                    <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
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
