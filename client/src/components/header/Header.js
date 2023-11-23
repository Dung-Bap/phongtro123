import React, { memo } from 'react';

const Header = ({ title, des }) => {
    return (
        <div className="w-full flex justify-center">
            <div className="px-[10px] lg:px-[0] w-full lg:w-main mb-[15px]">
                <h1 className="text-[28px] font-semibold">{title}</h1>
                <p className="text-[14px] text-gray-500">{des}</p>
            </div>
        </div>
    );
};

export default memo(Header);
