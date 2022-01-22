import React from 'react';
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import "./footer.css";

function Footer() {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>Download Our App</h4>
                <p>Download App from Android or Ios mobile Phones</p>
                <img src={playstore} alt='playstore' />
                <img src={appstore} alt='Appstore' />
            </div>
            <div className='midFooter'>
                <h1>conceptTwo</h1>
                <p>High Quality Products is our Priority</p>
                <p>Copyrights 2022 &copy; Bishal Regmi</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Our Developers</h4>
                <a href='https://www.instagram.com/vishal_regmi42/'>Bishal Regmi</a>
                <a href='https://www.instagram.com/grishmaximoff/'>Grishma Shrestha</a>
                <a href='https://www.instagram.com/aryaliuss/'>Aayush Aryal</a>
            </div>
        </footer>
    )
}

export default Footer;
