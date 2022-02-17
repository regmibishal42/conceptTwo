import React,{Fragment} from 'react';
import {Typography,Stepper, StepLabel,Step} from '@mui/material';
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';
import "./CheckoutSteps.css";

const CheckoutSteps = ({activeSteps}) => {
    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShipping />
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheck />
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalance />
        },
    ];
    const stepsStyle = {
        boxSizing:"border-box",
    }
  return (
    <Fragment>
        <Stepper alternativeLabel activeSteps={activeSteps} style={stepsStyle}>
            {steps.map((item,index)=> (
                <Step key={index} active={activeSteps === index ? true :false} completed={activeSteps >= index ? true : false} >
                    <StepLabel 
                    style={{color:activeSteps >= index ? "tomato" : "rgba(0,0,0,0.649)"}}
                    icon={item.icon}>
                        {item.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps