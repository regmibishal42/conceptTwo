import {BrowserRouter as Router} from "react-router-dom";
import Header from './components/layout/Header/header.js';
import './App.css';
import WebFont from 'webfontloader';
import React, {useEffect} from 'react';
import Footer from "./components/layout/Footer/footer.js";

function App() {
    useEffect(() => {
            WebFont.load({
                    google: {
                    families: ["Roborto", "Droid Sans", "Chilanka"]
                }}
        )},
    []
);
return <Router>
    <Header/>
    <Footer/>
</Router>}export default App;
