import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetNews } from '../../apis';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const News = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGetNews = async () => {
            setLoading(true);
            const response = await apiGetNews();
            setLoading(false);
            if (response?.success) setNews(response?.result);
        };

        fetchGetNews();
    }, []);

    return (
        <div className="border lg:rounded-lg overflow-hidden bg-white shadow-lg p-[20px]">
            <h1 className="mb-[8px] text-[18px] font-semibold">Tin mới đăng</h1>

            <div className="flex lg:flex-col overflow-x-auto gap-3">
                {loading &&
                    Array(12)
                        .fill(0)
                        .map((item, index) => (
                            <div key={index} className="lg:flex gap-4 py-2 border-gray-200 border-b cursor-pointer ">
                                <LoadingSkeleton className="w-full lg:w-[65px] h-[120px] lg:h-[65px] rounded-md overflow-hidden object-cover" />
                                <div className="flex flex-col justify-between gap-1 w-[150px] lg:w-[220px] ">
                                    <LoadingSkeleton className={'w-full h-[30px]'} />
                                    <div className="flex items-center justify-between">
                                        <LoadingSkeleton className={'w-[100px] h-[20px]'} />
                                        <LoadingSkeleton className={'w-[100px] h-[20px]'} />
                                    </div>
                                </div>
                            </div>
                        ))}

                {news?.map(item => {
                    const image = JSON.parse(item.images.image);
                    return (
                        <div
                            onClick={() => navigate(`/${item?.title.replaceAll('/', '')}/${item?.id}`)}
                            key={item.id}
                            className={`lg:flex gap-4 py-2 border-gray-200 lg:border-b cursor-pointer`}
                        >
                            <img
                                loading="lazy"
                                className="w-full lg:w-[65px] h-[120px] lg:h-[65px] rounded-md overflow-hidden object-cover"
                                alt=""
                                src={
                                    image[0] ||
                                    'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image'
                                }
                            />
                            <div className="flex flex-col justify-between gap-1 w-[150px] lg:w-[220px] ">
                                <span className="line-clamp-2 text-[#055699]">{item.title}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-price font-semibold line-clamp-1">
                                        {item.attributes.price}
                                    </span>
                                    <span className="hidden lg:block text-[12px] text-gray-400 line-clamp-1">
                                        {item?.overviews?.created.split(',')[1]}
                                    </span>
                                </div>
                                <span className="lg:hidden text-[12px] text-gray-400 line-clamp-1">
                                    {item?.address?.startsWith('Địa chỉ:')
                                        ? item?.address?.replace('Địa chỉ:', '')
                                        : item?.address}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(News);
