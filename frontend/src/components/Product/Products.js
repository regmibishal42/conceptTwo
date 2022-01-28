import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import {useDispatch,useSelector} from 'react-redux';
import {clearErrors,getProduct} from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

// Categories List --SInce there is no enum implem in backend
const categories = [
    "clothing",
    "Mobile",
    "laptop",
    "Bike"
]


const Products = () => {
    const dispatch = useDispatch();
    const[currentPage,setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,25000]);
    const [category, setCategory] = useState("");

    const {products,loading,error,productCount,resultPerPage,filteredProductsCount} = useSelector(state => state.products);
    const {keyword} = useParams();

    const setCurrentPageNo = (event) =>{
        setCurrentPage(event);
    };
    const priceHandler = (event,newPrice) =>{
         setPrice(newPrice);
    };

    useEffect(()=>{
        dispatch(getProduct(keyword,currentPage,price,category));
    },[dispatch,keyword,currentPage,price,category]);

    let count = filteredProductsCount;
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
                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider 
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='range-slider'
                            min={0}
                            max={25000}
                            />
                            <Typography>Categories</Typography>
                            <ul className='categoryBox'>
                                {categories.map((category)=>(
                                    <li
                                    className='category-link'
                                    key={category}
                                    onClick={()=> setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    </div>

                    {
                        resultPerPage < count && (
                            <div className='paginationBox'>
                            <Pagination
                                 activePage={currentPage}
                                 itemsCountPerPage={resultPerPage}
                                 totalItemsCount={productCount}
                                 onChange={setCurrentPageNo}
                                 nextPageText="Next"
                                 prevPageText="Prev"
                                 firstPageText="1st"
                                 lastPageText="Last"
                                 itemClass="page-item"
                                 linkClass='page-link'
                                 activeClass='pageItemActive'
                                 activeLinkClass='pageLinkActive'
                           />
        
                        </div>
                        )
                    }
          </Fragment>}
  </Fragment>;
};

export default Products;
