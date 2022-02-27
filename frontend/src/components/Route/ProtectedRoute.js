import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';

export const ProtectedRoute = function({component:RouteComponent,roles}){
    const {loading,isAuthenticated,user} = useSelector(state => state.user);
    if(isAuthenticated && roles)
    if(loading ===true && isAuthenticated === false){
        return <Navigate to='/' />
    }
    return <RouteComponent />;
 
};


