import React, {Fragment, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import './OrderList.css';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, deleteOrder,getAllOrders} from '../../actions/orderAction';
import {Link,useNavigate} from 'react-router-dom';
import MetaData from '../layout/metadata';
import {Button} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import {Sidebar} from './Sidebar';
import {useAlert} from 'react-alert';
import {DELETE_ORDER_RESET} from '../../constants/orderConstants';

export const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, orders} = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.order
    );
    const deleteOrderHandler = (id) =>{
      dispatch(deleteOrder(id));
    };
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Product Deleted Successfully");
        navigate("/admin/dashboard");
        dispatch({ type: DELETE_ORDER_RESET });
      }
  
      dispatch(getAllOrders());
    }, [dispatch, alert, error,navigate,deleteError,isDeleted]);

    const columns = [
        {field:"id",headerName:"Order Id",minWidth:300,flex:1},
        {field:"status",
        headerName:"Status",
        cellClassName:(params) =>{
          return params.getValue(params.id,"status") === "Delivered" ? "greenColor" : "redColor";
        },
        minWidth:150,
        flex:0.5},
        {field:"itemQty",headerName:"Items Qty",type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            type: 'number',
            sortable: false,
            renderCell:(params) =>{
              return (
                <Fragment>
                  <Link to={`/admin/order/${params.getValue(params.id,"id")}`} >
                    <Edit />
                  </Link>
                  <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
                    <Delete />
                  </Button>
                </Fragment>
              )
            }
        },
    ];
    const rows = [];

    orders &&
      orders.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          amount: item.totalPrice,
          status: item.orderStatus,
        });
      });
    return (
    <Fragment>
    <MetaData title={`All Orders - Admin`} />

    <div className="dashboard">
      <Sidebar />
      <div className="orderListContainer">
        <h1 id="orderListHeading">ALL ORDERS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="orderListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
);
}

