import React from 'react';

const Filter = ({ title, icon, iconRight }) => {
    return (
        <div className="min-w-[208px] flex items-center justify-between bg-[white] p-[8px] rounded-md hover:shadow-xl cursor-pointer text-gray-600">
            <div className="flex items-center">
                <span className="mr-[5px]">{icon}</span>
                <span className="text-[14px]">{title}</span>
            </div>
            <span>{iconRight}</span>
        </div>
    );
};

export default Filter;
