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
    const payBtn = useRef(null);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const [khaltiPublicKey,setKhaltiPublicKey] = useState("");
    const {user} =  useSelector((state)=>state.user);
    const {cartItems} = useSelector(state=>state.cart);


    async function getPublicKey() {
      const {data} = await axios.get('/api/v1//khalti/key');
      setKhaltiPublicKey(data.khaltiPublicKey);
    };
    {console.log(cartItems)}

    let config = {
        // replace this key with yours
        "publicKey": khaltiPublicKey,
        "productIdentity": cartItems[0].product,
        "productName": cartItems[0].name,
        "productUrl": cartItems[0].image,
        "eventHandler": {
            async onSuccess (payload) {
                // const paymentData = {
                //     amount:payload.amount,
                //     token:payload.token
                // };
                // const headerConfig = {headers:{"Content-Type":"application/json"}};
                // const {data} = await axios.post("/api/v1/payment/process",paymentData,headerConfig);
                // console.log(data);
                // console.log(payload);
                console.log(payload);
                let data = {
                  token: payload.token,
                  amount: payload.amount,
                };
          
                axios
                  .get(
                    `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${khaltiPublicKey}`
                  )
                  .then((response) => {
                    console.log(response.data);
                    alert.success("Thank you for generosity");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
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
            ref={payBtn}
            className="paymentFormBtn"
          />
            </form>
       </div>
   </Fragment>
  )
}

export default PaymentCard;