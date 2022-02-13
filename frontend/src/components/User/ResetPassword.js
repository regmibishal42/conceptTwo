import React, {useState, useEffect, Fragment} from 'react';
import './resetPassword.css';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/metadata';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, resetPassword} from '../../actions/userAction';
import {useAlert} from 'react-alert';
import {useNavigate,useParams} from 'react-router-dom';
import { LockOpen} from '@mui/icons-material';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    const {token} = useParams();

    const {error, success, loading} = useSelector((state) => state.forgetPassword);


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token,myForm));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            history("/login");
        }
    }, [
        dispatch,
        error,
        alert,
        history,
        success
    ]);
    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title="Reset Password" />
              <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                  <h2 className="resetPasswordHeading">Reset Password</h2>
    
                  <form
                    className="resetPasswordForm"
                    onSubmit={resetPasswordSubmit}
                  >
                    <div>
                      <LockOpen />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="loginPassword">
                      <LockOpen />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Change"
                      className="resetPasswordBtn"
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );
}

export default ResetPassword