import React from 'react';
import {Link} from 'react-router-dom';
import {Rating} from '@mui/material';


const ProductCard = ({product}) => {
  const options = {
    size:"large",
    value:product.ratings,
    readOnly:true,
    precision:0.5
};
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name}/>
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span>{product.numOfReviews}</span>
      </div>
      <span>रु.{product.price}</span>
    </Link>
  );
};

export default ProductCard;
