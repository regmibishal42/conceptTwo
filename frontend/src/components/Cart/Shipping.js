import React, {Fragment, useState} from 'react';
import './Shipping.css';
import {useSelector, useDispatch} from 'react-redux';
import {saveShippingInfo} from '../../actions/cartAction';
import MetaData from '../layout/metadata';
import {nepaliStates} from './districtNames';

import {
    Home,
    LocationCity,
    Phone,
    TransferWithinAStation
} from '@mui/icons-material';
import {useAlert} from 'react-alert';

const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {shippingInfo} = useSelector(state => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) =>{
        e.preventDefault();
    }
  
    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <form className='shippingForm' encType='multipart/form-data'
                        onSubmit={shippingSubmit}>
                        <div>
                            <Home/>
                            <input type="text" placeholder="Address" required
                                value={address}
                                onChange={
                                    (e) => setAddress(e.target.value)
                                }/>
                        </div>
                        <div>
                            <LocationCity/>
                            <input type="text" placeholder='City' required
                                value={city}
                                onChange={
                                    (e) => setCity(e.target.value)
                                }/>
                        </div>
                        <div>
                            <Phone/>
                            <input type="number" placeholder='Phone Number' required
                                value={phoneNo}
                                onChange={
                                    (e) => setPhoneNo(e.target.value)
                                }/>
                        </div>
                        <div>
                            <TransferWithinAStation/>
                            <select required
                                value={state}
                                onChange={
                                    (e) => setState(e.target.value)
                            }>
                                <option value="">State</option>
                                {
                                nepaliStates && nepaliStates.map((item) => (
                                    <option key={item.enName}
                                        value={item.enName}>
                                        {item.name}</option>
                                ))
                            } </select>
                        </div>
                        <input type="subit"
                            value="Container"
                            className="shippingBtn"
                            disabled={state ? false :true} 
                            />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
