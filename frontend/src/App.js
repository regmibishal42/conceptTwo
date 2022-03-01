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
import store from './store';
import { loadUser } from "./actions/userAction.js";
import {UserOptions} from './components/layout/Header/UserOptions.js';
import { useSelector } from "react-redux";
import Profile from './components/User/Profile.js';
import {ProtectedRoute} from "./components/Route/ProtectedRoute.js";
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import {ForgetPassword} from './components/User/ForgetPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import PaymentCard  from './components/Cart/Payment.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js';
import {Dashboard} from './components/Admin/Dashboard.js';
import {ProductList} from './components/Admin/ProductList.js';
import { NewProduct } from "./components/Admin/NewProduct.js";


 function App() {
  const {isAuthenticated,user} = useSelector(state => state.user);


    useEffect(() => {
        WebFont.load({
            google: {
              families: ["Roboto", "Droid Sans", "Chilanka"],
            },
          });
          store.dispatch(loadUser());
    }, []);
    return <Router>
        <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/password/forget' element={<ForgetPassword />} />
        <Route path='/password/:token' element={<ResetPassword />}/>
        <Route path='/cart' element={<Cart />} />


        <Route path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route path='/me/update' element={<ProtectedRoute component={UpdateProfile}/>} />
        <Route path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
        <Route path='/login/shipping' element={<ProtectedRoute component={Shipping} />} />
        <Route path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
        <Route path='/process/payment' element={<ProtectedRoute component={PaymentCard} />} />
        <Route path="/success" element={<ProtectedRoute component={OrderSuccess}/>} />
        <Route path='/orders' element={<ProtectedRoute component={MyOrders}/>} />
        <Route path='/order/:id' element={<ProtectedRoute component={OrderDetails} />} />
        
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} component={Dashboard}/>} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList}/>} />
        <Route path="/admin/product/new" element={<ProtectedRoute isAdmin={true} component={NewProduct}/>} />
        </Routes>
        <Footer/>
    </Router>
}
export default App;
