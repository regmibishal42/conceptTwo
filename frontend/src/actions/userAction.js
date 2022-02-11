import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
} from '../constants/userConstants';
import axios from 'axios';


// Action to Login a User --SignIn
export const login = (email,password) => async(dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{'Content-Type':"application/json"}};
        const {data} = await axios.post(
            '/api/v1/login',
            {email,password},
            config
        );
        dispatch({type:LOGIN_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message});
    }
};


// Action to register a new User --SIGNUP Process
export const register = (userData) => async(dispatch) =>{
    try{
        dispatch({type:REGISTER_USER_REQUEST});
        const config = {headers:{'Content-Type':'multipart/form-data'}};
        const {data} =  await axios.post(
            '/api/v1/register',
            userData,
            config
        );
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.message});
    }
};

// Loading User
export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const {data} = await axios.get(
            '/api/v1/me',
        );
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
    }
    catch(error){
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message});
    }
};
// Logout User
export const logout = () =>async(dispatch) =>{
    try{
        await axios.get('/api/v1/logout');
        dispatch({type:LOGOUT_USER_SUCCESS});
    }catch(error){
        dispatch({type:LOGOUT_USER_FAIL,payload:error.response.data.message});
    }
};

// Update User Profile -- action 

export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Password For Client 
export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Login Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERRORS});
}