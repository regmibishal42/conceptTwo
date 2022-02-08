import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';

export const ProtectedRoute = function({component:RouteComponent,roles}){
    const {loading,isAuthenticated,user} = useSelector(state => state.user);
    if(loading===false){
        return <RouteComponent />
    }
    return <Navigate to='/' />
 
};


