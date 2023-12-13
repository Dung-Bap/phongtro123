import React, { memo, useContext } from 'react';
import Button from '../common/Button';
import withBaseComp from '../../hocs/withBaseComp';
import { path } from '../../ultils/path';
import { ContextEnvironment } from '../common/ContextProvider';

const Support = ({ navigate }) => {
    const { handleScrollToView } = useContext(ContextEnvironment);

    return (
        <div className="w-full flex justify-center mt-[30px]">
            <div className="w-main border-dashed border-8 border-[#e8eefc] py-[40px] px-[10px] sm:px-[70px] rounded-lg shadow-lg bg-white flex flex-col justify-center items-center text-center">
                <img
                    loading="lazy"
                    className="h-[150px] object-contain"
                    alt=""
                    src="https://phongtro123.com/images/support-bg.jpg"
                />
                <p className="my-[14px]">Liên hệ với chúng tôi nếu bạn cần hỗ trợ:</p>
                <div className="flex items-center justify-between w-full my-[14px] flex-wrap">
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0902657123</span>
                    </span>
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0901424123</span>
                    </span>
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-orange-500 font-semibold">HỖ TRỢ ĐĂNG TIN</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0901424123</span>
                    </span>
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-orange-500 font-semibold">PHẢN ÁNH/KHIẾU NẠI</span>
                        <span className="text-[16px] font-semibold">Điện thoại: 0917686101</span>
                    </span>
                </div>

                <Button
                    onClick={() => {
                        navigate(`/${path.CONTACT}`);
                        handleScrollToView();
                    }}
                    primary
                >
                    Gửi liên hệ
                </Button>
            </div>
        </div>
    );
};

export default withBaseComp(memo(Support));
