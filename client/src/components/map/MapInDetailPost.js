import React from 'react';
import Map from './Map';

const MapInDetailPost = ({ address, title, code }) => {
    const positionInfos = address?.startsWith('Địa chỉ:') ? address?.replace('Địa chỉ:', '') : address;
    return (
        <>
            <h1 className="font-semibold text-[18px]">Bản đồ</h1>
            <div className="lg:px-[10px]">
                <div className="my-[10px]">
                    <span>{address}</span>
                </div>
                <Map positionInfos={positionInfos}></Map>
                <div className="my-[10px] text-gray-500 texy-[12px]">
                    <span>
                        Bạn đang xem nội dung tin đăng: "<span className="italic">{title}</span>
                        <span className="italic">- Mã tin :</span>
                        <span className="italic">{code}</span>". Mọi thông tin liên quan đến tin đăng này chỉ mang tính
                        chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc
                        được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.
                    </span>
                </div>
            </div>
        </>
    );
};

export default MapInDetailPost;
