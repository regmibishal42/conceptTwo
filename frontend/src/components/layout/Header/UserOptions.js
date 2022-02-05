import React,{useState} from 'react';
import './Header.css'; 
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import DashBoardIcon from '@mui/icons-material/Dashboard';
// import PersonIcon from '@mui/icons-material/Person';
import { ExitToApp,ListAlt,Dashboard,Person } from '@mui/icons-material';


export const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const options = [
        {icon:<ListAlt />,name:'Orders',func:orders},
        {icon:<Person /> ,name:"Profile",func:accounts},
        {icon:<ExitToApp />,name:"Logout",func:logoutUser},
    ];

  return <>
    <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=> setOpen(true)}
        open={open}
        direction='down'
        icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : '/Profile.png'} alt='Profile'/>}
        >
            <SpeedDialAction icon={<Dashboard />} tooltipTitle="DashBoard0" />
            <SpeedDialAction icon={<Person />} tooltipTitle="Person" />

    </SpeedDial>
  </>;
};
