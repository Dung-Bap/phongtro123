import React, { memo } from 'react';
import Button from '../common/Button';

const Support = () => {
    return (
        <div className="w-full flex justify-center mt-[30px]">
            <div className="w-main border-dashed border-8 border-[#e8eefc] py-[40px] px-[70px] rounded-lg shadow-lg bg-white flex flex-col justify-center items-center text-center">
                <img className="h-[150px] object-contain" alt="" src="https://phongtro123.com/images/support-bg.jpg" />
                <p className="my-[14px]">Liên hệ với chúng tôi nếu bạn cần hỗ trợ:</p>
                <div className="flex items-center justify-between w-full my-[14px]">
                    <span className="flex flex-col justify-center w-[25%]">
                        <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0902657123</span>
                    </span>
                    <span className="flex flex-col justify-center w-[25%]">
                        <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0901424123</span>
                    </span>
                    <span className="flex flex-col justify-center w-[25%]">
                        <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0901424123</span>
                    </span>
                    <span className="flex flex-col justify-center w-[25%]">
                        <span className="text-orange-500 font-semibold">PHẢN ÁNH/KHIẾU NẠI</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0917686101</span>
                    </span>
                </div>

                <Button primary>Gửi liên hệ</Button>
            </div>
        </div>
    );
};

export default memo(Support);