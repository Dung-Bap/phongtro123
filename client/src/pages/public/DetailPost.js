import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetPost } from '../../apis';
import { renderStars } from '../../ultils/helpers';
import icons from '../../ultils/icons';

const DetailPost = () => {
    const { LuMapPin, IoPricetagsOutline, BsTextareaResize, AiOutlineFieldTime, CiHashtag } = icons;
    const { title, id } = useParams();
    const [post, setPost] = useState();

    console.log(post);

    useEffect(() => {
        const fetchApiGetPost = async () => {
            const response = await apiGetPost(id);
            if (response?.success) setPost(response.post);
        };

        fetchApiGetPost();
    }, [id]);

    return (
        <div className="w-full flex justify-center">
            <main className="w-main flex gap-4">
                <section className="w-[68%]">
                    <div className="border p-4 rounded-lg overflow-hidden bg-white shadow-lg">
                        <div>React Slick</div>
                        <div className="uppercase text-[24px] text-secondary font-semibold line-clamp-3 mb-[10px]">
                            <span className="flex items-center">
                                {renderStars(post?.star, 15)?.map((el, index) => (
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
                        <div>
                            <span>{post?.description}</span>
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
                <section className="w-[32%]"></section>
            </main>
        </div>
    );
};

export default DetailPost;
