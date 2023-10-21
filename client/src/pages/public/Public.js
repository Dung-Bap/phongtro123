/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopHeader, Navigate } from './';
import { Support, Whyus } from '../../components/main';

const Public = () => {
    return (
        <div className="max-h-screen overflow-y-auto w-full flex flex-col items-center">
            <TopHeader />
            <Navigate />
            <Outlet />
            <Whyus />
            <Support />
        </div>
    );
};
export default Public;
