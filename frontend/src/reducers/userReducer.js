import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

export const userReducer = (state = {
    user: {}
}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {loading: true, isAuthenticated: false}

        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };

        case LOGIN_REQUEST:
            return {loading: true, isAuthenticated: false};
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {loading: false, isAuthenticated: false, user: null, error: action.payload};
        case LOGOUT_USER_SUCCESS:
            return {loading: false, user: null, isAuthenticated: false};
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const forgetPasswordReducer = (state={},action) => {
    switch(action.payload){
      case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
        return {...state,loading:true,error:null};
      case FORGET_PASSWORD_SUCCESS:
        return {...state,loading:false,message:action.payload};
      case RESET_PASSWORD_SUCCESS:
        return {...state,loading:false,success:action.payload};
      case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
        return {...state,loading:false,error:action.payload};
      case CLEAR_ERRORS:
        return {...state,error:null};
      default:
        return state;
    }
  }