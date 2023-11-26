import React from 'react';
import Button from '../common/Button';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { path } from '../../ultils/path';
import { convertPath } from '../../ultils/helpers';

const Menu = () => {
    const { categories } = useSelector(state => state.app);

    return (
        <div className="min-h-screen w-[312px] sm:w-[656px] bg-[white] animate-slide-left">
            <div className="bg-[#3f51b5] p-[15px] min-h-[110px]">
                <span className="text-white font-medium ">Chào mừng bạn đến với Phongtro123.com</span>
                <div className="pt-[15px]">
                    <Button main>Đăng nhập</Button>
                </div>
            </div>
            <div className="flex flex-col px-[15px] py-[20px] border border-b-2">
                <NavLink className={'pb-[15px]'} to={path.HOME}>
                    Trang chủ
                </NavLink>
                {categories.map(el => (
                    <NavLink className={'pb-[15px]'} to={`/${convertPath(el?.value)}`} key={el.id}>
                        {el.value}
                    </NavLink>
                ))}
            </div>
            <div className="flex gap-1 justify-between w-full p-[15px] flex-wrap">
                <div className="flex flex-col w-[50%] mb-[14px] sm:w-[25%]">
                    <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                    <span className="text-[14px] font-semibold">Điện thoại: 0902657123</span>
                </div>
                <div className="flex flex-col w-[50%] mb-[14px] sm:w-[25%]">
                    <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                    <span className="text-[14px] font-semibold">Điện thoại: 0901424123</span>
                </div>
                <div className="flex flex-col w-[50%] mb-[14px] sm:w-[25%]">
                    <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                    <span className="text-[14px] font-semibold">Điện thoại: 0901424123</span>
                </div>
                <div className="flex flex-col w-[50%] mb-[14px] sm:w-[25%]">
                    <span className="text-orange-500 font-semibold">PHẢN ÁNH/KHIẾU NẠI</span>
                    <span className="text-[14px] font-semibold">Điện thoại: 0917686101</span>
                </div>
            </div>
        </div>
    );
};

export default Menu;
