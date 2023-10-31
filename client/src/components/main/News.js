import React, { memo, useEffect } from 'react';
import withBaseComp from '../../hocs/withBaseComp';
import { useSelector } from 'react-redux';
import { getNews } from '../../store/app/asyncActions';
import { Link } from 'react-router-dom';

const News = ({ dispatch }) => {
    const { news } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(getNews());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className=" border rounded-lg overflow-hidden bg-white shadow-lg p-[20px] mb-[20px]">
            <h1 className="mb-[8px] text-[18px] font-semibold">Tin mới đăng</h1>

            {news?.map(item => {
                const image = JSON.parse(item.images.image);
                return (
                    <Link
                        to={`/${item?.title.replaceAll('/', '')}/${item?.id}`}
                        key={item.id}
                        className="flex gap-4 py-2 border-gray-200 border-b cursor-pointer"
                    >
                        <img
                            className="min-w-[65px] h-[65px] rounded-md overflow-hidden object-cover"
                            alt=""
                            src={image[0]}
                        />
                        <div className="flex flex-col gap-1">
                            <span className="line-clamp-2 text-[#055699]">{item.title}</span>
                            <div className="flex items-center justify-between">
                                <span className="text-price font-semibold w-[120px]">{item.attributes.price}</span>
                                <span className="text-[12px] text-gray-400 line-clamp-1">
                                    {item.attributes.published}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default withBaseComp(memo(News));
