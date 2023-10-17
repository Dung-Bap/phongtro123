/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';

const Public = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <Outlet />
        </div>
    );
};
export default Public;
