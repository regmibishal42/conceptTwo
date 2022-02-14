import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';
import {useSelector,useDispatch} from 'react-redux';
import {addItemsToCart,removeItemsFromCart} from '../../actions/cartAction';
import {Typography} from "@mui/material";
import {RemoveShoppingCart} from '@mui/icons-material';
import {Link} from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart);
    const increaseQuantity = (id,quantity,stock) =>{
        const newQty = quantity + 1;
        if(stock <= quantity) return;
        dispatch(addItemsToCart(id,newQty));
    };
    const decreaseQuantity = (id,quantity) =>{
        const newQty = quantity-1;
        if(quantity >=1) return;
        dispatch(addItemsToCart(id,newQty));

    }
    const deleteCartItem = (id) =>{
        dispatch(removeItemsFromCart(id));
    }
  return (
        <Fragment>
            {cartItems.length === 0 ?
             (
                 <div className="emptyCart">
                    <RemoveShoppingCart />
                    <Typography>No Products In Your Cart</Typography> 
                    <Link to='/products'>View Products</Link>
                 </div>
             ) : (
                    <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                    {cartItems && cartItems.map((item)=>(
                                    <div className="cartContainer">
                                    <CartItemCard item={item} deleteCartItem={deleteCartItem}/>
                                    <div className="cartInput" key={item.product}>
                                        <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                                        <input type='number' readOnly value={item.quantity}/>
                                        <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                                    </div>
                                    <p className='cartSubtotal'>{`रु${item.quantity*item.price}`}</p>
                                </div>
                    ))}
                        <div className="cartGrossProfit">
                            <div>
                            </div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`रु600`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
  )
}

export default Cart