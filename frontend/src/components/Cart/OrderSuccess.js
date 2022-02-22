import React,{Fragment} from 'react';
import './OrderSuccess.css';
import MetaData from '../layout/metadata';
import {CheckCircle} from '@mui/icons-material';
import {Typography} from '@mui/material';
import {Link } from 'react-router-dom';


const OrderSuccess = () => {
  return (
    <Fragment>
        <MetaData title='orderSuccess' />
        <div className="orderSuccess">
            <CheckCircle />
            <Typography>Your Order has been Placed Successfully</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    </Fragment>
  )
}

export default OrderSuccess