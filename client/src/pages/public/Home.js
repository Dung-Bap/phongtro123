/** @format */

import React, { useEffect } from 'react';
import { Header, SelectProvinceItem } from '../../components/header';
import { PostItem } from '../../components/post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/app/asyncActions';

const Home = () => {
    const { posts } = useSelector(state => state.app);
    console.log(posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="w-full">
            <Header
                title={'Kênh thông tin Phòng Trọ số 1 Việt Nam'}
                des={
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
            <main className="w-full flex gap-4">
                <section className="w-[68%] border min-h-[300px] rounded-lg overflow-hidden bg-white shadow-lg">
                    <div className="w-full p-[20px]">
                        <h1 className="mb-[8px] text-[18px] font-semibold">{`Tổng ${'115.400'} kết quả`}</h1>
                        <div className="flex items-center">
                            <span className="mr-[10px] text-[14px]">Sắp xếp:</span>
                            <div className="flex items-center gap-2">
                                <span className="p-[4px] bg-gray-100 rounded-md text-[14px]">Mặc định</span>
                                <span className="p-[4px] bg-gray-100 rounded-md text-[14px]">Mới nhất</span>
                                <span className="p-[4px] bg-gray-100 rounded-md text-[14px]">Có video</span>
                            </div>
                        </div>
                    </div>
                    {posts?.map(post => (
                        <PostItem key={post.id} post={post} image={JSON.parse(post.images.image)} />
                    ))}
                </section>
                <section className="w-[32%] border min-h-[300px] rounded-lg overflow-hidden bg-white shadow-lg"></section>
            </main>
        </div>
    );
};

export default Home;
