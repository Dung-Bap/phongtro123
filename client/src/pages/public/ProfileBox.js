import React, { memo } from 'react';
import icons from '../../ultils/icons';

const ProfileBox = ({ dataUser }) => {
    const { AiOutlineHeart, FiPhoneCall, SiZalo, GoDotFill } = icons;

    return (
        <div className=" border rounded-lg overflow-hidden bg-[#febb00] shadow-lg p-[20px] w-full felx flex-col justify-center mb-[18px]">
            <div className="flex flex-col items-center">
                <img
                    className="min-w-[80px] h-[80px] object-cover rounded-full mb-[10px]"
                    alt=""
                    src={dataUser?.user?.avatar || 'https://phongtro123.com/images/default-user.png'}
                />
                <span className="text-[20px] font-semibold">{dataUser?.user?.name}</span>
                <div className="flex items-center mb-[10px]">
                    <span className="mr-[5px]">
                        <GoDotFill color="#14c784" />
                    </span>
                    <span>Đang hoạt động</span>
                </div>
            </div>
            <div className="flex items-center w-full border bg-[#14c784] rounded-lg p-2 justify-center mb-[10px]">
                <span className="mr-[5px]">
                    <FiPhoneCall size={20} />
                </span>
                <span className="text-[20px]">{dataUser?.user?.phone}</span>
            </div>
            <div className="flex items-center w-full border bg-white rounded-lg p-2 justify-center mb-[10px]">
                <span className="mr-[5px]">
                    <SiZalo size={20} />
                </span>
                <span>{dataUser?.user?.zalo || dataUser?.user?.phone}</span>
            </div>
            <div className="flex items-center w-full border bg-white rounded-lg p-2 justify-center">
                <span className="mr-[5px]">
                    <AiOutlineHeart size={20} />
                </span>
                <span>Yêu thích</span>
            </div>
        </div>
    );
};

export default memo(ProfileBox);
