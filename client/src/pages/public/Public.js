/** @format */

import React from 'react';
import { TopHeader, Navigate } from './';
import { Outlet } from 'react-router-dom';

const Public = () => {
    return (
        <div className="max-h-screen w-full flex flex-col items-center">
            <TopHeader />
            <Navigate />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Public;
