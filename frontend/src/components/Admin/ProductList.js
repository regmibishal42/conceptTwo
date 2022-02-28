import React, {Fragment, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import './ProductList.css';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, getAdminProducts} from '../../actions/productAction';
import {Link,useNavigate} from 'react-router-dom';
import MetaData from '../layout/metadata';
import {Button} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import {Sidebar} from './Sidebar';
import {useAlert} from 'react-alert';

export const ProductList = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, products} = useSelector((state) => state.products);
    // const { error: deleteError, isDeleted } = useSelector(
    //   (state) => state.product
    // );
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      // if (deleteError) {
      //   alert.error(deleteError);
      //   dispatch(clearErrors());
      // }
  
      // if (isDeleted) {
      //   alert.success("Product Deleted Successfully");
      //   history("/admin/dashboard");
      //   dispatch({ type: DELETE_PRODUCT_RESET });
      // }
  
      dispatch(getAdminProducts());
    }, [dispatch, alert, error]);

    const columns = [
        {
            field: "id",
            headerName: "Product Id",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "name",
            minWidth: 350,
            flex: 1
        },
        {
            field: "stock",
            headerName: "Stock",
            type: 'number',
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "price",
            headerName: "Price",
            type: 'number',
            minWidth: 270,
            flex: 0.3
        }, {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell:(params) =>{
              return (
                <Fragment>
                  <Link to={`/admin/product/${params.getValue(params.id,"id")}`} >
                    <Edit />
                  </Link>
                  <Button>
                    <Delete />
                  </Button>
                </Fragment>
              )
            }
        },
    ];
    const rows = [];

    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.Stock,
          price: item.price,
          name: item.name,
        });
      });
    return (
    <Fragment>
    <MetaData title={`ALL PRODUCTS - Admin`} />

    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
);
}
