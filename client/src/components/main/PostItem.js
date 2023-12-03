import icons from '../../ultils/icons';
import { renderStars } from '../../ultils/helpers';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const PostItem = ({ post, image }) => {
    const { AiOutlineHeart } = icons;
    const navigate = useNavigate();
    return (
        <div className="sm:flex justify-between gap-3 w-full p-[10px] sm:p-[20px] bg-[#fff9f3] border-t border-secondary">
            <div
                onClick={() => navigate(`/${post?.title.replaceAll('/', '')}/${post?.id}`)}
                className="relative rounded-lg overflow-hidden sm:w-[40%] h-[300px] sm:h-[150px] md:h-[240px]"
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
            </div>
            <div className="flex flex-col sm:w-[60%]">
                <Link
                    to={`/${post?.title.replaceAll('/', '')}/${post?.id}`}
                    className="uppercase text-[14px] text-secondary font-semibold line-clamp-3 hover:underline mb-[10px] cursor-pointer"
                >
                    <span className="flex items-center mt-[10px] sm:mt-0">
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
                            src={post.user.avatar || 'https://phongtro123.com/images/default-user.png'}
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

const Loading = () => {
    return (
        <div className="sm:flex justify-between gap-3 w-full p-[10px] sm:p-[20px] bg-[#fff9f3] border-t border-secondary">
            <div className="relative rounded-lg overflow-hidden sm:w-[40%] h-[300px] sm:h-[150px] md:h-[240px]">
                <LoadingSkeleton className={'w-full h-full '} />
            </div>
            <div className="flex flex-col sm:w-[60%]">
                <div className="uppercase text-[14px] text-secondary font-semibold line-clamp-3 hover:underline mb-[10px] cursor-pointer">
                    <LoadingSkeleton className={'w-full h-[60px]'} />
                </div>
                <div className="flex items-center mb-[10px]">
                    <LoadingSkeleton className={'w-full h-[20px] mr-[20px]'} />
                    <LoadingSkeleton className={'w-full h-[20px]'} />
                </div>
                <div className="flex justify-between items-center mb-[10px]">
                    <LoadingSkeleton className={'w-full h-[20px]'} />
                </div>
                <LoadingSkeleton className={'w-full h-[50px] mb-[10px]'} />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LoadingSkeleton className={'w-[30px] h-[30px]'} />
                        <LoadingSkeleton className={'w-[60px] h-[30px]'} />
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <LoadingSkeleton className={'w-[100px] h-[30px]'} />
                        <LoadingSkeleton className={'w-[100px] h-[30px]'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

PostItem.Loading = Loading;

export default PostItem;
