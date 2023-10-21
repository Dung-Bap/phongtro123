import React, { memo, useEffect } from 'react';
import withBaseComp from '../../hocs/withBaseComp';
import { useSelector } from 'react-redux';
import { getNews } from '../../store/app/asyncActions';

const News = ({ dispatch }) => {
    const { news } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(getNews());
    }, []);
    return (
        <div className=" border rounded-lg overflow-hidden bg-white shadow-lg p-[20px] mb-[20px]">
            <h1 className="mb-[8px] text-[18px] font-semibold">Tin mới đăng</h1>

            {news?.map(item => {
                const image = JSON.parse(item.images.image);
                return (
                    <div key={item.id} className="flex gap-4 py-2 border-gray-200 border-b">
                        <img
                            className="min-w-[65px] h-[65px] rounded-md overflow-hidden object-cover"
                            alt=""
                            src={image[0]}
                        />
                        <div className="flex flex-col gap-1">
                            <span className="line-clamp-2 text-[#055699]">{item.title}</span>
                            <div className="flex items-center justify-between">
                                <span className="text-price font-semibold">{item.attributes.price}</span>
                                <span className="text-[12px] text-gray-400">{item.attributes.published}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default withBaseComp(memo(News));
