import React from 'react';
import Button from '../common/Button';
import { useSelector } from 'react-redux';
import { path } from '../../ultils/path';
import { convertPath } from '../../ultils/helpers';
import withBaseComp from '../../hocs/withBaseComp';
import { showMenu } from '../../store/app/appSlice';
import { MENUMANAGE } from '../../ultils/contants';
import clxs from 'clsx';
import icons from '../../ultils/icons';
import Swal from 'sweetalert2';
import { logout } from '../../store/user/userSlice';

const Menu = ({ navigate, dispatch }) => {
    const { categories } = useSelector(state => state.app);
    const { dataUser, isLoggedIn } = useSelector(state => state.user);
    const { BiLogOut, GoDot } = icons;

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
                dispatch(showMenu());
            }
        });
    };

    return (
        <div
            onClick={e => e.stopPropagation()}
            className="min-h-screen w-[312px] sm:w-[656px] bg-[white] animate-slide-left overflow-y-auto"
        >
            {isLoggedIn ? (
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
                </div>
            ) : (
                <div className="flex flex-col bg-[#3f51b5] p-[15px] min-h-[110px]">
                    <span className="text-white font-medium ">Chào mừng bạn đến với Phongtro123.com</span>
                    <span className="pt-[15px]">
                        <Button
                            onClick={() => {
                                navigate(`/${path.LOGIN}`);
                                dispatch(showMenu());
                            }}
                            main
                        >
                            Đăng nhập
                        </Button>
                    </span>
                </div>
            )}

            <div className="flex flex-col px-[15px] py-[20px] border border-b-2">
                <div
                    onClick={() => {
                        navigate(path.HOME);
                        dispatch(showMenu());
                    }}
                    className={'pb-[15px]'}
                >
                    Trang chủ
                </div>
                {categories.map(el => (
                    <div
                        onClick={() => {
                            navigate(`/${convertPath(el?.value)}`);
                            dispatch(showMenu());
                        }}
                        className={'py-[10px] flex items-center gap-3'}
                        key={el.id}
                    >
                        <span>{<GoDot />}</span>
                        {el.value}
                    </div>
                ))}
                {isLoggedIn && (
                    <div className="flex flex-col ">
                        {MENUMANAGE.map(item => (
                            <div
                                onClick={() => {
                                    navigate(item.path);
                                    dispatch(showMenu());
                                }}
                                className={clxs('py-[10px] flex items-center gap-3')}
                                key={item.id}
                            >
                                <span>{item.icon}</span>
                                {item.des}
                            </div>
                        ))}
                        <div onClick={handleLogout} className={clxs('py-[10px] flex items-center gap-3')}>
                            <span>
                                <BiLogOut />
                            </span>
                            Thoát
                        </div>
                    </div>
                )}
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

export default withBaseComp(Menu);
