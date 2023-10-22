import clsx from 'clsx';
import React from 'react';

const Filter = ({ title, icon, iconRight, checkValue, setCheckValue, type }) => {
    const handleReset = e => {
        e.stopPropagation();
        setCheckValue(prev => {
            const { [type]: current, ...newValue } = prev;
            return newValue;
        });
    };

    return (
        <div className="min-w-[208px] flex items-center justify-between bg-[white] p-[6px] rounded-md hover:shadow-xl cursor-pointer text-gray-600">
            <div className="flex items-center">
                <span className="mr-[5px]">{icon}</span>
                <span className={clsx(title === checkValue && 'font-semibold', 'text-[13px]')}>{title}</span>
            </div>
            <span className="p-1" onClick={e => handleReset(e)}>
                {iconRight}
            </span>
        </div>
    );
};

export default Filter;
