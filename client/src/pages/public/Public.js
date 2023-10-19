/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopHeader, Navigate } from './';

const Public = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <TopHeader />
            <Navigate />
            <Outlet />
        </div>
    );
};
export default Public;
