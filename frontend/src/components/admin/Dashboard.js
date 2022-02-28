import React from 'react';
import {Sidebar} from './Sidebar.js';
import './Dashboard.css';
import {Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {Doughnut,Line} from 'react-chartjs-2';

export const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboardContainer">

          <Typography component='h1'>DashBoard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>Total Amount <br /> 2000</p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to='/admin/products'>
                <p>Product</p>
                <p>50</p>
              </Link>
              <Link to='/admin/orders'>
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link to='/admin/users'>
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line 
              data={lineState}
            />
          </div>
      </div>
    </div>
  )
}
