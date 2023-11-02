import React, { memo } from 'react';
import icons from '../../ultils/icons';
import { renderStars } from '../../ultils/helpers';
import { Link } from 'react-router-dom';

const PostItem = ({ post, image }) => {
    const { AiOutlineHeart } = icons;
    return (
        <div className="flex justify-between gap-3 w-full p-[20px] bg-[#fff9f3] border-t border-secondary">
            <Link
                to={`/${post?.title.replaceAll('/', '')}/${post?.id}`}
                className="relative rounded-lg overflow-hidden w-[40%] h-[240px]"
            >
                <img
                    className="w-full h-full object-cover cursor-pointer"
                    alt=""
                    src={
                        image[0] ||
                        'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image'
                    }
                />
                <span className="absolute bottom-[10px] left-[10px] p-[2px] rounded bg-[rgba(0,0,0,.5)] text-white text-[12px]">{`${image.length} ảnh`}</span>
                <span className="absolute bottom-[10px] right-[10px] cursor-pointer ">
                    <AiOutlineHeart color="white" size={28} />
                </span>
            </Link>
            <div className="flex flex-col w-[60%]">
                <Link
                    to={`/${post?.title.replaceAll('/', '')}/${post?.id}`}
                    className="uppercase text-[14px] text-secondary font-semibold line-clamp-3 hover:underline mb-[10px] cursor-pointer"
                >
                    <span className="flex items-center">
                        {renderStars(post.star, 15)?.map((el, index) => (
                            <span className="gap-1" key={index}>
                                {el}
                            </span>
                        ))}
                    </span>
                    {post.address}
                </Link>
                <div className="flex items-center mb-[10px]">
                    <span className="mr-[20px] text-price font-semibold">{post.attributes.price}</span>
                    <span>{post.attributes.acreage}</span>
                </div>
                <div className="flex justify-between items-center mb-[10px]">
                    <span>{post.address.split(',').splice(-2).join(',')}</span>
                    <span className="text-gray-400">{post?.overviews?.created.split(',')[1]}</span>
                </div>
                <p className="line-clamp-3 text-gray-500 mb-[10px]">{JSON.parse(post.description)}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img
                            className="rounded-full w-[30px] h-[30px] object-cover"
                            alt=""
                            src="https://phongtro123.com/images/default-user.png"
                        />
                        <span className="text-gray-500">{post.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <a
                            target="_blank"
                            href={`tel:${post.user.phone}`}
                            className="text-white p-[3px] rounded-md bg-main cursor-pointer"
                            rel="noreferrer"
                        >{`Gọi ${post.user.phone}`}</a>
                        <a
                            target="_blank"
                            href={`https://zalo.me/${post.user.zalo}`}
                            className="text-main p-[2px] rounded-md border-main border bg-white cursor-pointer hover:text-white hover:bg-main  "
                            rel="noreferrer"
                        >
                            {'Nhắn Zalo'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(PostItem);
