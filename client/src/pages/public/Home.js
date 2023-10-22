/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from 'rc-pagination';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import { Header, SelectProvinceItem } from '../../components/header';
import { AsideItem, News, PostItem } from '../../components/main';
import { Search } from './';
import { getAcreages, getCategories, getPosts, getPrices, getProvinces } from '../../store/app/asyncActions';
import { convertPath } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import withBaseComp from '../../hocs/withBaseComp';

const Home = ({ dispatch, navigate, location }) => {
    const { MdKeyboardArrowRight, MdKeyboardArrowLeft } = icons;
    const { posts, categories, prices, acreages } = useSelector(state => state.app);
    const [params] = useSearchParams();
    const [categoryCode, setCategoryCode] = useState('');
    const [update, setUpdate] = useState(false);
    const currentPageRef = useRef();
    const pageRef = useRef();
    // eslint-disable-next-line no-unused-vars
    const [size, setSize] = useState(6);
    const [current, setCurrent] = useState(1);
    // Pagination
    const PerPageChange = value => {
        setSize(value);
        const newPerPage = Math.ceil(posts?.count / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
        const queries = Object.fromEntries([...params]);
        queries.page = page;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        });
    };

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev')
            <button>
                <MdKeyboardArrowLeft size={20} />
            </button>;
        if (type === 'next')
            <button>
                <MdKeyboardArrowRight size={20} />
            </button>;
        return originalElement;
    };
    //
    useEffect(() => {
        setCategoryCode(categories?.find(item => `/${convertPath(item?.value)}` === location.pathname)?.code);
    }, [categories, location.pathname]);

    useEffect(() => {
        currentPageRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });

        const queries = Object.fromEntries([...params]);
        if (categoryCode) {
            queries.categoryCode = categoryCode;
        }
        dispatch(getPosts(queries));
        dispatch(getCategories());
        dispatch(getAcreages());
        dispatch(getPrices());
        dispatch(getProvinces());
    }, [categoryCode, dispatch, params, update]);

    useEffect(() => {
        setCurrent(+params.get('page') || 1);
    }, [categoryCode, params, update]);

    useEffect(() => {
        pageRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.get('page'), update]);

    return (
        <div className="w-full">
            <Search currentPageRef={currentPageRef} setUpdate={setUpdate} />
            <Header
                title={
                    categories?.find(item => `/${convertPath(item?.value)}` === location.pathname)?.header ||
                    'Kênh thông tin Phòng Trọ số 1 Việt Nam'
                }
                des={
                    categories?.find(item => `/${convertPath(item?.value)}` === location.pathname)?.subheader ||
                    'Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.'
                }
            />
            <div className="w-full flex justify-center gap-4 mb-[25px]">
                <SelectProvinceItem
                    title={'Phòng trọ Hồ Chí Minh'}
                    image={'https://phongtro123.com/images/location_hcm.jpg'}
                />
                <SelectProvinceItem
                    title={'Phòng trọ Hà Nội'}
                    image={'https://phongtro123.com/images/location_hn.jpg'}
                />
                <SelectProvinceItem
                    title={'Phòng trọ Đà Nẵng'}
                    image={'https://phongtro123.com/images/location_dn.jpg'}
                />
            </div>
            <div className="w-full flex justify-center">
                <main ref={pageRef} className="w-main flex gap-4">
                    <section className="w-[68%]">
                        <div className="border min-h-[300px] rounded-lg overflow-hidden bg-white shadow-lg">
                            <div className="w-full p-[20px]">
                                <h1 className="mb-[8px] text-[18px] font-semibold">{`Tổng ${posts?.count} kết quả`}</h1>
                                <div className="flex items-center">
                                    <span className="mr-[10px] text-[14px]">Sắp xếp:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="p-[4px] bg-gray-100 rounded-md text-[14px]">Mặc định</span>
                                        <span className="p-[4px] bg-gray-100 rounded-md text-[14px]">Mới nhất</span>
                                        <span className="p-[4px] bg-gray-100 rounded-md text-[14px]">Có video</span>
                                    </div>
                                </div>
                            </div>
                            {posts?.rows?.map(post => (
                                <PostItem key={post.id} post={post} image={JSON.parse(post.images.image)} />
                            ))}
                        </div>
                        <div className="w-full flex justify-center p-[20px]">
                            <Pagination
                                className="pagination-data"
                                showTotal={(total, range) => `Kết quả ${range[0]}-${range[1]} của ${total}`}
                                onChange={PaginationChange}
                                total={posts?.count}
                                current={current}
                                pageSize={size}
                                showSizeChanger={false}
                                itemRender={PrevNextArrow}
                                onShowSizeChange={PerPageChange}
                            />
                        </div>
                    </section>
                    <section className="w-[32%]">
                        <AsideItem
                            setUpdate={setUpdate}
                            title={'Danh mục cho thuê'}
                            contents={categories}
                            categoryCode={categoryCode}
                        />
                        <AsideItem
                            custom
                            setUpdate={setUpdate}
                            type="priceCode"
                            title={'Xem theo giá'}
                            contents={prices}
                        />
                        <AsideItem
                            custom
                            setUpdate={setUpdate}
                            type="acreageCode"
                            title={'Xem theo diện tích'}
                            contents={acreages}
                        />
                        <News />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default withBaseComp(Home);
