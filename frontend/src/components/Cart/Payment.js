import React,{Fragment,useEffect,useRef,useState} from 'react';
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/metadata';
import KhaltiCheckout from 'khalti-checkout-web';
import { useSelector,useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import {useNavigate} from 'react-router-dom';
import  './Payment.css';
import axios from 'axios';
import {clearErrors,createOrder} from '../../actions/orderAction';

const PaymentCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const payBtn = useRef(null);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const [khaltiPublicKey,setKhaltiPublicKey] = useState("");
    const {error} = useSelector((state)=>state.newOrder);
    const {cartItems,shippingInfo} = useSelector(state=>state.cart);


    async function getPublicKey() {
      const {data} = await axios.get('/api/v1//khalti/key');
      setKhaltiPublicKey(data.khaltiPublicKey);
    };
    const order = {
        shippingInfo,
        orderItems:cartItems,
        // paymentInfo,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    };

    let config = {
        // replace this key with yours
        "publicKey": khaltiPublicKey,
        "productIdentity": cartItems[0].product,
        "productName": cartItems[0].name,
        "productUrl": cartItems[0].image,
        "eventHandler": {
            async onSuccess (payload) {
                const paymentData = {
                    amount:payload.amount,
                    token:payload.token
                };
                const headerConfig = {headers:{"Content-Type":"application/json","Access-Control-Allow-Origin": "*"}};
                const {data} = await axios.post("/api/v1/payment/process",paymentData,headerConfig);
                console.log("Payment Success",data);
                if(data.success){
                    console.log(data.data.idx);
                    console.log(order);
                    order.paymentInfo = {
                        id:data.data.idx,
                        status:"Completed"
                    };
                    dispatch(createOrder(order));
                    navigate('/success');
                    
                }

            
            },
            // onError handler is optional
            onError (error) {
                // handle errors
                console.log('Error At Payment',error);
               alert.error(error);
               payBtn.current.disabled=false;
            },
            onClose () {
                console.log('widget is closing');
                payBtn.current.disabled = false;
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    let checkout = new KhaltiCheckout(config);
    const submitHandler = (event) =>{

        event.preventDefault();
        payBtn.current.disabled = true;
        checkout.show({amount: orderInfo.totalPrice});
        // order.paymentInfo = {
        //     id:"randomidhafj",
        //     status:"Completed"
        // };
        // dispatch(createOrder(order));

    };
    useEffect(() => {
        getPublicKey();
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
    }, [error,dispatch,alert]);
    
  return (
   <Fragment>
       <MetaData title="Payment" />
       <CheckoutSteps activeSteps={2} />
       <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={(event)=>submitHandler(event)}>
                <Typography>Payment With Khalti</Typography>
                <input
            type="submit"
            value={`Pay - रु.${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
            </form>
       </div>
   </Fragment>
  )
}

export default PaymentCard;