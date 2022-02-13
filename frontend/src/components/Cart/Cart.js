import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';
const Cart = () => {
    const item = {
        product:"ProductId",
        price:1000,
        name:"Hand Guard",
        quantity:1
    }
  return (
    <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            <div className="cartContainer">
                <CartItemCard item={item} />
                <div className="cartInput">
                    <button>-</button>
                    <input type='number' readOnly value={item.quantity}/>
                    <button>+</button>
                </div>
                <p className='cartSubtotal'>{`रु${item.quantity*item.price}`}</p>
            </div>
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
  )
}

export default Cart