import React, { memo, useContext } from 'react';
import { renderStars } from '../../ultils/helpers';
import { path } from '../../ultils/path';
import { useSelector } from 'react-redux';
import withBaseComp from '../../hocs/withBaseComp';
import { ContextEnvironment } from '../common/ContextProvider';

const Whyus = ({ navigate }) => {
    const { isLoggedIn } = useSelector(state => state.user);
    const { handleScrollToView } = useContext(ContextEnvironment);

    const handleOnclick = () => {
        navigate(isLoggedIn ? `/${path.MANAGE}/${path.NEW_POST}` : `/${path.LOGIN}`);
        handleScrollToView();
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-main border py-[40px] px-[10px] sm:px-[70px] rounded-lg shadow-lg bg-white flex flex-col justify-center items-center text-center">
                <h1 className="text-[18px] font-semibold">Tại sao lại chọn PhongTro123.com?</h1>
                <p className="my-[14px]">
                    Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google
                    về các từ khóa: cho thuê phòng trọ, nhà trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép,
                    cho thuê mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn,
                    do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
                </p>
                <div className="flex items-center justify-between w-full flex-wrap">
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-[20px] font-semibold">116.998+</span>
                        <span>Thành viên</span>
                    </span>
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-[20px] font-semibold">1103.348+</span>
                        <span>Tin đăng</span>
                    </span>
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-[20px] font-semibold">300.000+</span>
                        <span>Lượt truy cập/tháng</span>
                    </span>
                    <span className="flex flex-col justify-center w-[50%] mb-[14px] sm:w-[25%]">
                        <span className="text-[20px] font-semibold">2.500.000+</span>
                        <span>Lượt xem/tháng</span>
                    </span>
                </div>
                <h1 className="text-[16px] font-semibold my-[14px]">Chi phí thấp, hiệu quả tối đa</h1>
                <span className="flex items-center">
                    {renderStars(5, 22)?.map((el, index) => (
                        <span className="gap-1" key={index}>
                            {el}
                        </span>
                    ))}
                </span>
                <p className="italic my-[14px]">
                    "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho
                    thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi
                    biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi
                    phí khá thấp, không còn tình trạng phòng trống kéo dài."
                </p>
                <h1 className="text-[16px] font-semibold">Bạn đang có phòng trọ / căn hộ cho thuê?</h1>
                <p className=" my-[14px]">Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
                <div
                    onClick={handleOnclick}
                    className="flex items-center text-sm cursor-pointer hover:underline p-3 bg-secondary rounded-lg text-white"
                >
                    Đăng tin ngay
                </div>
            </div>
        </div>
    );
};

export default withBaseComp(memo(Whyus));
