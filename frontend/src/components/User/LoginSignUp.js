import React, { Fragment,useRef } from 'react';
import './LoginSignUp.css';
import Loader from '../layout/Loader/Loader';
import {MailOutline,LockOpenRounded} from '@mui/icons-material';

export const LoginSignUp = () => {
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const switchTabs = (e,tab) =>{
        if(tab === "login"){
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }
        if(tab === 'register'){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

  return (
      <Fragment>
          <div className='loginSignUpContainer'>
              <div className='loginSignUpBox'>
                  <div>
                      <div className='login-signup-toogle'>
                          <p onClick={(e)=> switchTabs(e,"login")}>Login</p>
                          <p onClick={(e)=>switchTabs(e,"register")}>Register</p>
                      </div>
                      <button ref={switcherTab}></button>
                  </div>
                  <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MailOutline />
                            <input 
                                type='email'
                                placeholder='Email' 
                                required 
                                value={loginEmail}
                                onChange={(e)=>setLoginEmail(e.target.value)}
                                />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenRounded />
                            <input 
                                type='password'
                                placeholder='Password' 
                                required 
                                value={loginPassword}
                                onChange={(e)=>setLoginPassword(e.target.value)}
                                />
                        </div>
                        <Link to='/password/forget'>Forget Password ?</Link>
                        <input type='submit' value='login' className='loginBtn' />
                  </form>
              </div>
          </div>
      </Fragment>
  );
};
