import React, { memo, useEffect } from 'react';
import { MENUMANAGE } from '../../ultils/contants';
import withBaseComp from '../../hocs/withBaseComp';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/user/userSlice';
import { BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { getCurrent } from '../../store/user/asyncActions';
import icons from '../../ultils/icons';
import { path } from '../../ultils/path';
import Swal from 'sweetalert2';

const SidebarManage = ({ dispatch }) => {
    const { dataUser } = useSelector(state => state.user);
    const { FcHome } = icons;
    useEffect(() => {
        const dispatchUser = setTimeout(() => {
            dispatch(getCurrent());
        }, 300);
        return () => {
            clearTimeout(dispatchUser);
        };
    }, [dispatch]);
    const handleLogout = () => {
        Swal.fire({
            title: 'Bạn chắc chứ ?',
            text: 'Bạn muốn đăng xuất !',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý !',
        }).then(rs => {
            if (rs.isConfirmed) {
                dispatch(logout());
            }
        });
    };
    return (
        <div className="hidden lg:block fixed bg-[#f8f9fa] top-0 left-0 bottom-0 w-[240px] border-l-2 border">
            <div className="flex items-center text-sm  mr-[10px] px-[20px] py-[10px] relative">
                <img
                    className="min-w-[50px] h-[50px] rounded-full object-cover mr-[5px]"
                    alt=""
                    src={`${
                        dataUser?.avatar ||
                        'https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2023/10/22/img-1641_1697968197.jpg'
                    }`}
                />
                <div className="flex flex-col">
                    <span className="font-semibold ml-[5px] text-[16px]">{dataUser?.name}</span>
                    <span className="text-[12px] ml-[5px]">{dataUser?.phone}</span>
                </div>

                <Link to={`${path.HOME}`} className="absolute top-[5px] right-0">
                    <FcHome size={26} />
                </Link>
            </div>
            <div className="flex flex-col px-[20px] py-[10px]">
                {MENUMANAGE.map(item => (
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'py-[10px] hover:text-secondary flex items-center gap-3 border-b text-secondary'
                                : 'py-[10px] hover:text-secondary flex items-center gap-3 border-b'
                        }
                        to={item.path}
                        key={item.id}
                    >
                        <span>{item.icon}</span>
                        {item.des}
                    </NavLink>
                ))}
                <div
                    onClick={handleLogout}
                    className={'py-[10px]  hover:text-secondary flex items-center gap-3 cursor-pointer'}
                >
                    <span>
                        <BiLogOut />
                    </span>
                    Thoát
                </div>
            </div>
        </div>
    );
};

export default withBaseComp(memo(SidebarManage));
