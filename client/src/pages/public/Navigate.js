/** @format */

import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { convertPath } from '../../ultils/helpers';
import { path } from '../../ultils/path';
import { useSelector } from 'react-redux';
import { clsx } from 'clsx';

const Navigate = () => {
    const { categories } = useSelector(state => state.app);

    return (
        <div className={clsx('hidden w-main lg:flex items-center')}>
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
    );
};

export default memo(Navigate);
