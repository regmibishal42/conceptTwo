import React from 'react';
import './Sidebar.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import {TreeItem, TreeView} from '@mui/lab';
import {
    ExpandMore,
    PostAdd,
    Add,
    ImportExport,
    ListAlt,
    Dashboard,
    People,
    RateReview
} from '@mui/icons-material';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to='/'>
                <img src={logo}
                    alt='conceptTwo'/>
            </Link>
            <Link to='/admin/dashboard'>
                <p>
                    <Dashboard/>DashBoard
                </p>
            </Link>
            <Link>
                <TreeView defaultCollapseIcon={<ExpandMore/>}
                    defaultExpandIcon={<ImportExport/>}>
                    <TreeItem nodeId='1' label="Products">
                        <Link to='/admin/products'>
                          <TreeItem nodeId='2' label="All" icon={<PostAdd />} />
                        </Link>
                        <Link to='/admin/product'>
                          <TreeItem nodeId='3' label="Create" icon={<Add />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to='/admin/orders'>
               <p>
                 <ListAlt />
                 Orders
               </p>
            </Link>
            <Link to='/admin/users'>
              <p>
                <PeopleIcon />Users
              </p>
            </Link>
            <Link to='/admin/reviews'>
              <RateReview />
              Reviews
            </Link>
        </div>
    )
};
