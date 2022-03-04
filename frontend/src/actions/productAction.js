import axios from 'axios';

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCCESS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    CLEAR_ERRORS
} from '../constants/productConstants';

// Calling API ENDPOINTS FOR ALL PRODUCTS DATA
export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0) => async (dispatch) =>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });

    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};
// Calling Api endpoints for single products Details
export const getProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        });

    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
};

// Post a new Review 
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProducts = () => async (dispatch) =>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get('/api/v1/admin/products');

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        });

    }catch(error){
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};

// Create a new Product
export const createProduct = (productData) => async(dispatch) =>{
    try{
        dispatch({type:NEW_PRODUCT_REQUEST});
        const config = {headers:{'Content-Type':'application/json'}};
        const {data} =  await axios.post(
            '/api/v1/product/new',
            productData,
            config
        );
        dispatch({type:NEW_PRODUCT_SUCCESS,payload:data});
    }
    catch(error){
        dispatch({type:NEW_PRODUCT_FAIL,payload:error.response.data.message});
    }
};

// Deleteting a Product
export const deleteProduct = (productId) => async(dispatch) =>{
    try{
        dispatch({type:DELETE_PRODUCT_REQUEST});
        const {data} =  await axios.delete(
            `/api/v1/product/${productId}`,
        );
        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data.success});
    }
    catch(error){
        dispatch({type:DELETE_PRODUCT_FAIL,payload:error.response.data.message});
    }
};

// Update Product Details
export const updateProduct = (id,productData) => async(dispatch) =>{
    try{
        dispatch({type:UPDATE_PRODUCT_REQUEST});
        const config = {headers:{'Content-Type':'application/json'}};
        const {data} =  await axios.put(
            `/api/v1/product/${id}`,
            productData,
            config
        );
        dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data.success});
    }
    catch(error){
        dispatch({type:UPDATE_PRODUCT_FAIL,payload:error.response.data.message});
    }
};

// Get All reviews for admin Dashboard
export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });

  
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
      console.log(typeof(data.reviews))
      console.log(data.reviews);
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };




// To Clear All Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}