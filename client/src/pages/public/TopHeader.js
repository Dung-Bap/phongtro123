/** @format */

import React from 'react';
import logo from '../../assets/logo-phongtro.png';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import { path } from '../../ultils/path';

const TopHeader = () => {
    const { AiOutlineHeart, AiOutlineUserAdd, AiOutlineLogout, AiOutlinePlusCircle } = icons;

    return (
        <div className="w-full flex justify-center">
            <div className="w-main">
                <div className="flex justify-between">
                    <Link to={`${path.HOME}`}>
                        <img className="w-[240px] h-[70px] object-contain" alt="" src={logo}></img>
                    </Link>
                    <div className="flex items-center">
                        <span className="flex items-center text-sm cursor-pointer hover:underline mr-[20px]">
                            <span className="mr-[5px]">
                                <AiOutlineHeart size={20} />
                            </span>
                            Yêu Thích
                        </span>
                        <Link
                            to={`/${path.LOGIN}`}
                            className="flex items-center text-sm cursor-pointer hover:underline mr-[20px]"
                        >
                            <span className="mr-[5px]">
                                <AiOutlineUserAdd size={20} />
                            </span>
                            Đăng nhập
                        </Link>
                        <Link
                            to={`/${path.REGISTER}`}
                            className="flex items-center text-sm cursor-pointer hover:underline mr-[20px]"
                        >
                            <span className="mr-[5px]">
                                <AiOutlineLogout size={20} />
                            </span>
                            Đăng ký
                        </Link>
                        <span className="flex items-center text-sm cursor-pointer hover:underline p-2 bg-secondary rounded-lg text-white">
                            Đăng tin mới
                            <span className="ml-[5px]">
                                <AiOutlinePlusCircle size={20} />
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
