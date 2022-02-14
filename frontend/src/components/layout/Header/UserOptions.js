import React,{useState} from 'react';
import './Header.css'; 
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Backdrop } from '@mui/material';
import { ExitToApp,ListAlt,Dashboard,Person,RemoveShoppingCart} from '@mui/icons-material';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAlert} from 'react-alert';
import {logout} from '../../../actions/userAction';
import { useDispatch,useSelector} from 'react-redux';


export const UserOptions = ({user}) => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.cart)
    const alert = useAlert();
    const [open, setOpen] = useState(false);
    const options = [
        {icon:<ListAlt />,name:'Orders',func:orders},
        {icon:<Person /> ,name:"Profile",func:account},
        {icon:<RemoveShoppingCart/>,name:`Cart (${cartItems.length})`,func:cart},
        {icon:<ExitToApp />,name:"Logout",func:logoutUser},
    ];
    if(user.role ==='admin'){
      options.unshift({icon:<Dashboard />,name:"DashBoard",func:dashboard});
    }
    function dashboard(){
      navigator('/dashboard');
    }
    function orders(){
      navigator('/orders');
    }
    function account(){
      navigator('/account');
    }
    function logoutUser(){
      dispatch(logout());
      alert.success("Logout SuccessFully");
    }
    function cart(){
      Navigate('/cart');
    }

  return <>
  <Backdrop open={open} style={{zIndex:'10'}} />
    <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=> setOpen(true)}
        open={open}
        direction='down'
        className='speedDial'
        style={{zIndex:'11'}}
        icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : '/Profile.png'} alt='Profile'/>}
        >
          {options.map((item)=>(
            <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} key={item.name}/>
          ))}

    </SpeedDial>
  </>;
};
