import React from 'react';

const SelectProvinceItem = ({ title, image }) => {
    return (
        <div className="w-[220px] shadow-lg rounded-lg overflow-hidden hover:shadow-xl bg-white cursor-pointer text-main hover:text-secondary">
            <img className="w-full h-[110px] object-cover" alt="" src={image} />
            <span className="flex justify-center w-full p-[8px] font-semibold text-[14px]">{title}</span>
        </div>
    );
};

export default SelectProvinceItem;
