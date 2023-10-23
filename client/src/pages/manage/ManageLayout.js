import React from 'react';
import { Outlet } from 'react-router-dom';

const ManageLayout = () => {
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default ManageLayout;
