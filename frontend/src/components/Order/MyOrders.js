import React,{Fragment,useEffect} from 'react';
import './MyOrders.css';
import { useSelector,useDispatch } from 'react-redux';
import {clearErrors,myOrders} from '../../actions/orderAction';
import {DataGrid} from '@mui/x-data-grid';
import {Link,useNavigate} from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Typography} from '@mui/material';
import {Launch} from '@mui/icons-material';
import MetaData from '../layout/metadata';
import Loader from '../layout/Loader/Loader';


const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const {loading,error,orders} = useSelector((state)=>state.myOrders);
  const {user} = useSelector((state)=>state.user);
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
      field:"actions",
      flex:0.3,
      headerName:"Actions",
      type:"number",
      sortable:false,
      renderCell:(params) =>{
        return (
          <Link to={`/order/${params.getValue(params.id,"id")}`}>
            <Launch />
          </Link>
        );
      }
    }

  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
 
  }, [dispatch,alert,error]);
  

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Orders`} />
      {loading ? <Loader /> : (
        <div className="myOrdersPage">
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  )
}

export default MyOrders;