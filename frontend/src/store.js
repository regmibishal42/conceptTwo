import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    deleteProductReducer,
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    reviewReducer
} from './reducers/productReducer';
import {
    allUsersReducer,
    forgetPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer
} from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer
} from './reducers/orderReducer';


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgetPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: deleteProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    review: reviewReducer,
    productReviews: productReviewsReducer

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
