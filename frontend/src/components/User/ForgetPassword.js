import React, {useState, useEffect, Fragment} from 'react';
import './forgetPassword.css';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/metadata';
import {MailOutlined} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors,forgetPassword, loadUser} from '../../actions/userAction';
import {useAlert} from 'react-alert';



export const ForgetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.forgetPassword);
  
    const [email, setEmail] = useState("");

    const forgetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
      myForm.set("email", email);
      dispatch(forgetPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if(message){
        alert.success(message);

    }
    }, [dispatch, error, alert, message]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Forget Password" />
        <div className="forgetPasswordContainer">
          <div className="forgetPasswordBox">
            <h2 className="forgetPasswordHeading">Forget Password</h2>

            <form
              className="forgetPasswordForm"
              onSubmit={forgetPasswordSubmit}
            >

              <div className="forgetPasswordEmail">
                <MailOutlined />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="forgetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}
