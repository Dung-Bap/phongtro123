/** @format */

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/app/asyncActions';
import { convertPath } from '../../ultils/helpers';
import { path } from '../../ultils/path';

const Navigate = () => {
    const { categories } = useSelector(state => state.app);
    console.log(categories);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="w-full bg-main flex justify-center">
            <div className="w-main flex items-center">
                <NavLink
                    to={path.HOME}
                    className={({ isActive }) =>
                        isActive
                            ? 'py-[10px] px-[5px] text-sm font-medium text-white bg-secondary'
                            : 'py-[10px] px-[5px] text-sm font-medium text-white hover:bg-secondary'
                    }
                >
                    Trang chủ
                </NavLink>
                {categories.map(el => (
                    <NavLink
                        to={`/${convertPath(el?.value)}`}
                        className={({ isActive }) =>
                            isActive
                                ? 'py-[10px] px-[5px] text-sm font-medium text-white bg-secondary'
                                : 'py-[10px] px-[5px] text-sm font-medium text-white hover:bg-secondary'
                        }
                        key={el.id}
                    >
                        {el.value}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Navigate;
