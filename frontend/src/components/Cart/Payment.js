import React,{Fragment,useEffect,useRef,useState} from 'react';
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/metadata';
import KhaltiCheckout from 'khalti-checkout-web';
import { useSelector,useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import  './Payment.css';
import axios from 'axios';

const PaymentCard = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const [khaltiPublicKey,setKhaltiPublicKey] = useState("");
    async function getPublicKey() {
      const {data} = await axios.get('/api/v1//khalti/key');
      setKhaltiPublicKey(data.khaltiPublicKey);
    };
    let config = {
        // replace this key with yours
        "publicKey": khaltiPublicKey,
        "productIdentity": "1234567890",
        "productName": "Drogon",
        "productUrl": "http://gameofthrones.com/buy/Dragons",
        "eventHandler": {
            onSuccess (payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
            },
            // onError handler is optional
            onError (error) {
                // handle errors
               alert.error(error);
            },
            onClose () {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    let checkout = new KhaltiCheckout(config);
    const submitHandler = (event) =>{

        event.preventDefault();
        checkout.show({amount: 1000});
    };
    useEffect(() => {
        getPublicKey();
    }, []);
    
  return (
   <Fragment>
       <MetaData title="Payment" />
       <CheckoutSteps activeSteps={2} />
       <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={(event)=>submitHandler(event)}>
                <Typography>Payment With Khalti</Typography>
                <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            // ref={payBtn}
            className="paymentFormBtn"
          />
            </form>
       </div>
   </Fragment>
  )
}

export default PaymentCard;