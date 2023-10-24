import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SidebarManage from './SidebarManage';
import { useSelector } from 'react-redux';
import { path } from '../../ultils/path';

const ManageLayout = () => {
    const { isLoggedIn } = useSelector(state => state.user);
    if (!isLoggedIn) return <Navigate to={`${path.HOME}`} replace={true} />;
    return (
        <div className="relative max-h-screen overflow-y-auto bg-[#ffffff] min-h-screen">
            <SidebarManage />
            <div className="pl-[240px]">
                <Outlet />
            </div>
        </div>
    );
};

export default ManageLayout;
