import React, { Fragment, useEffect } from 'react';
import './Products.css';
import {useDispatch,useSelector} from 'react-redux';
import {clearErrors,getProduct} from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const {products,loading,error,productsCount} = useSelector(state => state.products);
    const {keyword} = useParams();
    {console.log(keyword)};

    useEffect(()=>{
        dispatch(getProduct(keyword));
    },[dispatch,keyword]);
  return <Fragment>
      {
          loading? <Loader />  :
          <Fragment>
                <div className='products'>
                {
                        products && products.map(product => (
                            <ProductCard key={
                                    product._id
                                }
                                product={product}/>
                        ))
                    }
                </div>
          </Fragment>}
  </Fragment>;
};

export default Products;
