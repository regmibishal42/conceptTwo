import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Search.css';

const Search = () => {
    const [keyword,setKeyword] = useState("");
    let navigate =  useNavigate();

    const searchSubmitHandler = (event) =>{
        event.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products");
        }
    };

  return <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
          <input 
                type='text'
                placeholder='Search a Product'
                onChange={(event)=>setKeyword(event.target.value)}
            />
            <input type="submit" value="Search" />
      </form>
  </Fragment>;
};

export default Search;
