import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { createSearchParams, useParams } from 'react-router-dom';
import { apiGetPost } from '../../apis';
import { renderStars } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import Slider from 'react-slick';
import { getCategories } from '../../store/app/asyncActions';
import { News } from '../../components/main';
import { ProfileBox } from '../../pages/public';
import { path } from '../../ultils/path';
import { MapInDetailPost } from '../../components/map';
import LoadingDetailPost from '../../components/loading/LoadingDetailPost';
import withBaseComp from '../../hocs/withBaseComp';
import moment from 'moment';
import 'moment/locale/vi';
import { ContextEnvironment } from '../../components/common/ContextProvider';

const DetailPost = ({ dispatch, navigate }) => {
    const { handleScrollToView } = useContext(ContextEnvironment);
    const { LuMapPin, IoPricetagsOutline, BsTextareaResize, AiOutlineFieldTime, CiHashtag, MdFlag } = icons;
    const [count, setCount] = useState(1);
    const { id } = useParams();
    const [post, setPost] = useState();
    const images = post?.images?.image ? JSON.parse(post?.images?.image) : [];
    const description = post?.description ? JSON.parse(post?.description) : [];
    const currentPageRef = useRef();
    const [loading, setLoading] = useState(true);

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

    const handleSearchDistrict = (code, value) => {
        const queries = {};
        if (code) {
            queries.labelCode = code;
            navigate(
                {
                    pathname: path.HOME,
                    search: createSearchParams(queries).toString(),
                },
                {
                    state: {
                        title: `${value}, Nhà Trọ Giá Rẻ, Mới Nhất 2023`,
                        des: `${value}, nhà trọ giá rẻ mới nhất năm 2023: mới xây, không chung chủ, vệ sinh riêng. Tìm phòng trọ Quận Bình Thạnh nhiều diện tích, mức giá khác nhau.`,
                    },
                }
            );
        }
    };

    useEffect(() => {
        currentPageRef?.current?.scrollIntoView({ behavior: 'smooth' });
        dispatch(getCategories());
        const fetchApiGetPost = async () => {
            setLoading(true);
            const response = await apiGetPost(id);
            setLoading(false);
            if (response?.success) setPost(response.post);
        };
        setCount(1);

        fetchApiGetPost();
    }, [dispatch, id]);

    return loading ? (
        <LoadingDetailPost currentPageRef={currentPageRef} />
    ) : (
        <div ref={currentPageRef} className="w-full flex justify-center pt-[50px] pb-[16px] lg:py-4">
            <main className="w-full lg:w-main lg:flex gap-4 scroll-m-[16px]">
                <section className="w-full lg:w-[68%]">
                    <div className="border lg:p-4 lg:rounded-lg bg-white shadow-lg">
                        <div className="w-full relative bg-black lg:rounded-t-lg mb-[20px]">
                            <Slider {...settings}>
                                {images?.map((item, index) => (
                                    <div className="flex justify-center h-[350px] mb-[-6px]" key={index}>
                                        <img className="object-contain h-full w-full" alt="" src={item} />
                                    </div>
                                ))}
                            </Slider>
                            <span className="absolute bottom-[10px] right-[47%] p-1 bg-[rgb(0,0,0,.1)] text-white rounded-md flex justify-center ">{`${count} / ${images.length}`}</span>
                        </div>
                        <div className="px-4 lg:px-0">
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
                                <span
                                    onClick={() => handleSearchDistrict(post?.labels?.code, post?.labels?.value)}
                                    className=" text-main underline cursor-pointer hover:text-secondary font-semibold"
                                >
                                    {post?.labels?.value}
                                </span>
                            </div>
                            <div className="flex items-center mb-[6px]">
                                <span className="mr-[5px]">
                                    <LuMapPin />
                                </span>
                                <span className="capitalize">{post?.address}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-8 flex-wrap">
                                <div className="flex items-center">
                                    <span className="mr-[5px]">
                                        <IoPricetagsOutline />
                                    </span>
                                    <span className="text-price text-[18px] font-semibold">
                                        {post?.attributes?.price}
                                    </span>
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
                                    <span>{moment(post?.overviews?.createdAt).fromNow()}</span>
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
                                                <span className="text-[15px] text-secondary">
                                                    {post?.overviews?.bonus}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[25%] p-[10px]">Ngày đăng:</td>
                                            <td>{post?.overviews?.created}</td>
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
                            <MapInDetailPost address={post?.address} title={post?.title} code={post?.overviews?.code} />
                            <span
                                onClick={() => {
                                    navigate(`/${path.CONTACT}`);
                                    handleScrollToView();
                                }}
                                className="w-full lg:w-[130px] p-[10px] flex items-center justify-center border border-main rounded-md lg:ml-[10px] text-main cursor-pointer mb-[20px]"
                            >
                                <span>
                                    <MdFlag size={20} />
                                </span>
                                Gửi phản hồi
                            </span>
                        </div>
                    </div>
                </section>
                <div className="lg:hidden">
                    <News />
                </div>
                <section className="w-[32%] hidden lg:block">
                    <ProfileBox dataUser={post} />
                    <News />
                </section>
            </main>
        </div>
    );
};

export default withBaseComp(memo(DetailPost));
