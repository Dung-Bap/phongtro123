import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetPost } from '../../apis';
import { renderStars } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import Slider from 'react-slick';
import withBaseComp from '../../hocs/withBaseComp';
import { getCategories } from '../../store/app/asyncActions';
import { News } from '../../components/main';
import { ProfileBox } from '../../pages/public';

const DetailPost = ({ dispatch }) => {
    const { LuMapPin, IoPricetagsOutline, BsTextareaResize, AiOutlineFieldTime, CiHashtag } = icons;
    const [count, setCount] = useState(1);
    const { id } = useParams();
    const [post, setPost] = useState();
    const images = post?.images?.image ? JSON.parse(post?.images?.image) : [];
    const description = post?.description ? JSON.parse(post?.description) : [];
    const currentPageRef = useRef();

    const settings = {
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: e => {
            setCount(e + 1);
        },
    };

    useEffect(() => {
        currentPageRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        dispatch(getCategories());
        const fetchApiGetPost = async () => {
            const response = await apiGetPost(id);
            if (response?.success) setPost(response.post);
        };
        setCount(1);

        fetchApiGetPost();
    }, [dispatch, id]);

    return (
        <div className="w-full flex justify-center py-4">
            <main ref={currentPageRef} className="w-main flex gap-4">
                <section className="w-[68%]">
                    <div className="border p-4 rounded-lg overflow-hidden bg-white shadow-lg w-full">
                        <div className="w-full relative bg-black rounded-t-lg mb-[20px]">
                            <Slider {...settings}>
                                {images?.map((item, index) => (
                                    <div className="flex justify-cente h-[350px] mb-[-6px]" key={index}>
                                        <img className="object-contain h-full w-full" alt="" src={item} />
                                    </div>
                                ))}
                            </Slider>
                            <span className="absolute bottom-[10px] right-[47%] p-1 bg-[rgb(0,0,0,.1)] text-white rounded-md flex justify-center ">{`${count} / ${images.length}`}</span>
                        </div>
                        <div className="uppercase text-[24px] text-secondary font-semibold line-clamp-3 mb-[10px]">
                            <span className="flex items-center">
                                {renderStars(post?.star, 24)?.map((el, index) => (
                                    <span className="gap-1" key={index}>
                                        {el}
                                    </span>
                                ))}
                            </span>
                            {post?.title}
                        </div>
                        <div className="flex items-center mb-[6px]">
                            <span className="mr-[5px]">Chuyên mục: </span>
                            <span className=" text-main underline cursor-pointer hover:text-secondary font-semibold">
                                {post?.overviews?.area}
                            </span>
                        </div>
                        <div className="flex items-center mb-[6px]">
                            <span className="mr-[5px]">
                                <LuMapPin />
                            </span>
                            <span className="capitalize">{post?.address}</span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center">
                                <span className="mr-[5px]">
                                    <IoPricetagsOutline />
                                </span>
                                <span className="text-price text-[18px] font-semibold">{post?.attributes?.price}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-[5px]">
                                    <BsTextareaResize />
                                </span>
                                <span>{post?.attributes?.acreage}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-[5px]">
                                    <AiOutlineFieldTime />
                                </span>
                                <span>{post?.attributes?.published}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-[5px]">
                                    <CiHashtag />
                                </span>
                                <span>{post?.attributes?.hashtag}</span>
                            </div>
                        </div>
                        <h1 className="text-[18px] font-semibold py-3">Thông tin mô tả</h1>
                        <div className="flex flex-col">
                            {typeof description !== 'string' &&
                                description?.map((item, index) => (
                                    <span className="my-[6px] font-normal" key={index}>
                                        {item}
                                    </span>
                                ))}
                            {typeof description === 'string' && description}
                        </div>
                        <h1 className="text-[18px] font-semibold py-3">Đặc điểm tin đăng</h1>
                        <div>
                            <table className="table-auto w-full">
                                <tbody>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Mã tin:</td>
                                        <td>{`#${post?.attributes?.hashtag}`}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Khu vực:</td>
                                        <td>{post?.overviews?.area}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Loại tin rao:</td>
                                        <td>{post?.overviews?.type}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Đối tượng thuê:</td>
                                        <td>{post?.overviews?.target ? post?.overviews?.target : 'Tất cả'}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Gói tin:</td>
                                        <td>
                                            <span className="text-[15px] text-secondary">{post?.overviews?.bonus}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Ngày đăng:</td>
                                        <td>{post?.attributes?.published}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h1 className="text-[18px] font-semibold py-3">Thông tin liên hệ</h1>
                        <div>
                            <table className="table-auto w-full">
                                <tbody>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Liên hệ:</td>
                                        <td>{post?.user?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Điện thoại:</td>
                                        <td>{post?.user?.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="w-[25%] p-[10px]">Zalo:</td>
                                        <td>{post?.user?.zalo ? post?.user?.zalo : post?.user?.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className="w-[32%]">
                    <ProfileBox dataUser={post} />
                    <News />
                </section>
            </main>
        </div>
    );
};

export default withBaseComp(DetailPost);
