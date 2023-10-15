/** @format */

import React from 'react';
import { TopHeader, Navigate, Search } from './';
import { Outlet } from 'react-router-dom';

const Public = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <TopHeader />
            <Navigate />
            <Search />
            <div className="w-main">
                <Outlet />
            </div>
        </div>
    );
};
export default Public;
