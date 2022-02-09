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


        <Route path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route path='/me/update' element={<ProtectedRoute component={UpdateProfile}/>} />
        </Routes>
        <Footer/>
    </Router>
}
export default App;
