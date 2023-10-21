import React, { memo, useEffect, useState } from 'react';
import withBaseComp from '../../hocs/withBaseComp';
import { showModal } from '../../store/app/appSlice';
import clsx from 'clsx';

const SelectRadio = ({ des, value, setCheckValue, type, dispatch, checkValue }) => {
    const [checkek, setCheckek] = useState(false);

    const handleSetValue = value => {
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        setCheckValue(prev => ({ ...prev, [type]: value }));
    };
    useEffect(() => {
        setCheckek(checkValue === des ? true : false);
    }, [checkValue, des, type]);

    return (
        <div className="p-[12px] border-b cursor-pointer hover:text-main">
            <input
                className="focus:ring-blue-500"
                type="radio"
                onChange={e => handleSetValue(e.target.value)}
                id={value}
                value={value}
                checked={checkek}
            />
             
            <label
                className={clsx(checkValue === des && 'text-main', 'font-medium ml-[10px] cursor-pointer')}
                htmlFor={value}
            >
                {des}
            </label>
        </div>
    );
};

export default withBaseComp(memo(SelectRadio));
